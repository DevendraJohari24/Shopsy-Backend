const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db/conn");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
})

// dotenv config
dotenv.config({path: "./config/config.env"})

// Database connect
connectDatabase();


const server = app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is working on ${process.env.PORT || 8000}`);
});

// UnHandled Promise Rejection
process.on("unhandledRejection", error => {
    console.log(`Error : ${error.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
})