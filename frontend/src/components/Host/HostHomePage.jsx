import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { useEffect } from "react";
import { Button } from "@mui/material";

const HostHomePage = () => {

    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem('userInfo');
        navigate('/login');
    }

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');
        if(!userInfo) navigate('/login');
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xs={2} id="sidebar-wrapper">
                    <Nav className="flex-column">
                        <Nav.Item>
                            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#profile">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#orders">Orders</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#settings">Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Button onClick={logout}>Logout</Button>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col xs={10} id="page-content-wrapper">
                    <h1>Welcome to the Host Dashboard</h1>
                    <p>Select an option from the sidebar to get started.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default HostHomePage;
