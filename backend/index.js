const app = require("./app");
const connectDb = require("./configs/db");
const PORT = process.env.PORT || 8000;

connectDb();

app.listen(PORT, () => {
    console.log("Server started successfully at " + PORT + "...");
});
