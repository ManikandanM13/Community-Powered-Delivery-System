import openrouteservice as ors
 
import folium
 
from folium.plugins import MarkerCluster
 
from shapely.geometry import shape, Point, LineString
 
from geopy.distance import geodesic
 
import sys;

import random;
 
from pymongo import MongoClient
 
# Connect to MongoDB (replace with your MongoDB connection string)
client_mongo = MongoClient('mongodb+srv://23mp2089:ciUr6HFiM60O2MIS@cluster0.rfewl.mongodb.net/CPDS')
 
# Initialize the OpenRouteService client with the provided API key
 
api_key = '5b3ce3597851110001cf62481f0780b0bdab4acabd3e96d7c2556c86'
 
client = ors.Client(key=api_key)
 
 
 
# Function to get coordinates from an address using ORS Geocoding API
 
def get_coordinates(address):
 
    geocode = client.pelias_search(text=address)
 
    if geocode['features']:
 
        coords = geocode['features'][0]['geometry']['coordinates']
 
        return coords
 
    else:
 
        print(f"Error: Unable to get coordinates for {address}")
 
        return None
 
 
 
# Function to get multiple routes using ORS Directions API
 
def get_multiple_routes(start_coords, end_coords):
 
    routes = []
 
    profiles = ['driving-car', 'cycling-regular', 'driving-hgv']
 
 
 
    for profile in profiles:
 
        route = client.directions(
 
            coordinates=[start_coords, end_coords],
 
            profile=profile,
 
            format='geojson'
 
        )
 
        routes.append({"profile": profile, "route": route})
 
 
 
    return routes
 
 
 
# Function to check if a point is close to a route (within 3 km)
 
def is_point_near_route(point, route, buffer_distance=0.03):
 
    route_line = shape(route['features'][0]['geometry'])
 
    point_geom = Point(point)
 
    return route_line.buffer(buffer_distance).contains(point_geom)
 
 
# Function to get deliveries that match a route (both pickup and dropoff must match the route)
 
def get_matching_deliveries(route, deliveries):
 
    matching_deliveries = []
 
    for delivery in deliveries:
 
        pickup_coords = get_coordinates(delivery["pickup"])
 
        dropoff_coords = get_coordinates(delivery["dropoff"])
 
 
 
        if pickup_coords and dropoff_coords:
 
            if is_point_near_route(pickup_coords, route) and is_point_near_route(dropoff_coords, route):
 
                matching_deliveries.append(delivery)
 
    return matching_deliveries
 
 
 
# Function to calculate distance between two coordinates
 
def calculate_distance(coords1, coords2):
 
    return geodesic((coords1[1], coords1[0]), (coords2[1], coords2[0])).kilometers
 
 
 
# Function to extract route distance from the geojson data
 
def extract_route_distance(route_geojson):
 
    coordinates = route_geojson['features'][0]['geometry']['coordinates']
 
    distance = 0.0
 
    for i in range(len(coordinates) - 1):
 
        start = coordinates[i]
 
        end = coordinates[i + 1]
 
        distance += calculate_distance(start, end)
 
    return distance
 
 
 
# Function to determine if a point is in the same or opposite direction relative to the route
 
def check_direction(pickup_coords, dropoff_coords, route_line):
 
    pickup_point = Point(pickup_coords)
 
    dropoff_point = Point(dropoff_coords)
 
 
 
    # Get the closest points on the route to the pickup and dropoff points
 
    closest_pickup = route_line.interpolate(route_line.project(pickup_point))
 
    closest_dropoff = route_line.interpolate(route_line.project(dropoff_point))
 
 
 
    # Determine if the dropoff is after the pickup along the route
 
    if route_line.project(closest_dropoff) > route_line.project(closest_pickup):
 
        return "on same direction"
 
    else:
 
        return "in opposite direction"
 
 
 
# Delivery requests
 
db = client_mongo['CPDS'] 
orders_collection = db['orders'] 

orders = orders_collection.find()
 
delivery_requests = []
 
# Format each order and append to the list
for order in orders:
    delivery_request = {
        "id": str(order['_id']), 
        "pickup": order['pickup'],
        "dropoff": order['dropoff'],
    }
    delivery_requests.append(delivery_request)
 
 
 
start_address = sys.argv[1]
 
end_address = sys.argv[2]
 
print("Recieved:", start_address, end_address)
 
 
# Get coordinates for the start and end addresses
 
start_coords = get_coordinates(start_address)
 
end_coords = get_coordinates(end_address)
 
 
 
if start_coords is None or end_coords is None:
 
    print("Error: Unable to get coordinates for the start or end address.")
 
else:
 
    # Get multiple routes
 
    routes = get_multiple_routes(start_coords, end_coords)
 
    # Create a folium map centered at the midpoint of the start and end coordinates
 
    midpoint = [(start_coords[1] + end_coords[1]) / 2, (start_coords[0] + end_coords[0]) / 2]
 
    m = folium.Map(location=midpoint, zoom_start=10)
 
 
 
    # Add start and end points in green
 
    folium.Marker(location=[start_coords[1], start_coords[0]], popup='Start', icon=folium.Icon(color='green', icon='cloud')).add_to(m)
 
    folium.Marker(location=[end_coords[1], end_coords[0]], popup='End', icon=folium.Icon(color='green', icon='cloud')).add_to(m)
 
 
 
    # Add multiple routes to the map with different colors
 
    colors = ['blue', 'red', 'orange']
 
    route_info = []
 
 
 
    for i, route_data in enumerate(routes):
 
        profile = route_data['profile']
 
        route = route_data['route']
 
 
 
        # Extract and print route distance
 
        route_distance = extract_route_distance(route)
 
 
 
        # Add route to the map
 
        folium.GeoJson(route, name=f'Route - {profile}', style_function=lambda x, color=colors[i]: {'color': color}).add_to(m)
 
 
 
        # Convert route to LineString for direction checking
 
        route_line = LineString(route['features'][0]['geometry']['coordinates'])
 
 
 
        # Find and add matching deliveries for this route
 
        matching_deliveries = get_matching_deliveries(route, delivery_requests)
 
 
 
        # Define a list of unique colors for markers
 
        delivery_colors = ['purple', 'darkred', 'darkblue', 'darkgreen', 'lightblue', 'pink', 'yellow', 'grey', 'cyan', 'magenta']
 
 
 
        delivery_info = {}
 
 
 
        # Create marker clusters for pickups and dropoffs
 
        pickup_cluster = MarkerCluster(name='Pickup Points').add_to(m)
 
        dropoff_cluster = MarkerCluster(name='Dropoff Points').add_to(m)
 
 
 
        for j, delivery in enumerate(matching_deliveries):
 
            pickup_coords = get_coordinates(delivery["pickup"])
 
            dropoff_coords = get_coordinates(delivery["dropoff"])
 
 
 
            if pickup_coords and dropoff_coords:
 
                # Calculate the distance between pickup and dropoff
 
                distance = calculate_distance(pickup_coords, dropoff_coords)
 
 
 
                # Use a unique color for the markers
 
                delivery_color = delivery_colors[j % len(delivery_colors)]
 
 
 
                # Determine direction
 
                direction = check_direction(pickup_coords, dropoff_coords, route_line)
 
 
 
                # Add markers to clusters
 
                folium.Marker(location=[pickup_coords[1], pickup_coords[0]],
 
                              popup=f'Delivery {delivery["id"]} - Pickup ({distance:.2f} km), Direction: {direction}',
 
                              icon=folium.Icon(color=delivery_color, icon='cloud')).add_to(pickup_cluster)
 
 
 
                folium.Marker(location=[dropoff_coords[1], dropoff_coords[0]],
 
                              popup=f'Delivery {delivery["id"]} - Dropoff ({distance:.2f} km), Direction: {direction}',
 
                              icon=folium.Icon(color=delivery_color, icon='cloud')).add_to(dropoff_cluster)
 
 
 
                # Aggregate delivery info
 
                delivery_info[delivery["id"]] = {
 
                    "pickup": delivery["pickup"],
 
                    "dropoff": delivery["dropoff"],
 
                    "distance": distance,
 
                    "direction": direction
 
                }
 
 
 
        # Print route information with distance
 
        route_info.append({
 
            "route": f"Route {i+1}",
 
            "route_distance": route_distance,
 
            "deliveries": delivery_info
 
        })
 
 
 
    # Print out route and delivery information
 
    for route in route_info:
 
        print(f"{route['route']}: Route Distance = {route['route_distance']:.2f} km")
 
        for delivery_id, info in route["deliveries"].items():
 
            print(f"  Delivery {delivery_id}: Pickup - {info['pickup']}, Dropoff - {info['dropoff']}, Distance = {info['distance']:.2f} km, Direction = {info['direction']}")
 
 
 
 
    # m.save('route_with_matching_deliveries_map.html')
    file_name = f"route_with_matching_deliveries_map_{random.randint(0, 999999)}.html"
    saved_at = f'./public/{file_name}';
    m.save(saved_at)
    print("saved_at", file_name, sep="@", end="\n")
    
 
