require('dotenv').config();

var http = require('http');

//create a server object:
// http.createServer(function (req, res) {
//   res.write('A Monk in Cloud'); //write a response to the client
//   res.end(); //end the response
// }).listen(80); //the server object listens on port 80
// PORT = 5050


const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log('Server started at PORT:', PORT));
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
};

startServer();
