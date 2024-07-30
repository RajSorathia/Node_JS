const mongoose = require("mongoose");


async function connectMongoDB(url) {
    return mongoose.connect(url);

}


module.exports = {
    connectMongoDB,
}

// .then( () => console.log("Mongodb connected"))
// .catch( (err) => console.log("Mongo Error", err));
