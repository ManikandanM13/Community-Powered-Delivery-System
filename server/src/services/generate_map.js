import { spawn } from "child_process";

export async function generate_map(start, destination) {
  return new Promise((resolve, reject) => {
    console.log("Generating maps");
    // Spawn a new Python process
    const pythonProcess = spawn("python", [
      "./src/map_generation/script.py",
      start,
      destination,
    ]);

    let saved_at = "";

    // Collect data from the script's stdout
    pythonProcess.stdout.on("data", (data) => {
      console.log(`Output from Python: ${data.toString()}`);

      const output = data.toString().split("\n");
      output.forEach((line) => {
        if (line.startsWith("saved_at")) {
          saved_at = data.toString().split("@")[1].trim();
        }
      });
    });

    // Capture any error output
    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error from Python: ${data.toString()}`);
    });

    // Detect when the process ends
    pythonProcess.on("close", (code) => {
      if (code === 0) {
        console.log(`Python script ended with code ${code}`);
        resolve(saved_at); // Resolve the promise with the saved_at value
      } else {
        reject(new Error(`Python script ended with code ${code}`)); // Reject the promise if there's an error
      }
    });
  });
}
