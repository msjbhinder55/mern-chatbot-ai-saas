import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

async function startServer() {
  // Define routes
  app.get("/", (req, res) => {
    res.send("Muhammad Saad Bhinder");
  });

  // Define a port for the server
  const PORT = process.env.PORT || 5000;

  try {
    await connectToDatabase();
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
