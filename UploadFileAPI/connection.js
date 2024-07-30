const mongoose = require("mongoose");


async function connectMongoDB(MONGO_URL) {
    return mongoose.connect(MONGO_URL);

}

module.exports = {
    connectMongoDB,
}
