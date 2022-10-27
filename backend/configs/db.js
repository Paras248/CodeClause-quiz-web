const mongoose = require("mongoose");

const connectDb = async () => {
    await mongoose
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("db connected successfully"))
        .catch((err) => {
            console.log("========= DB CONNECTION ISSUES =============");
            console.log(err);
            process.exit(1);
        });
};

module.exports = connectDb;
