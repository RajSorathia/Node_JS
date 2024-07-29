const express = require('express')
const app = express();
const users = require('./MOCK_DATA');
app.use(express.urlencoded({ extended : false}));

// const PORT = 8000;
//routes
app.get("/", (req, res) => {
  const html = `
    <ul>
      ${users.map( (user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// app.listen(process.env.PORT || 4000, () => console.log("Server start on : ", process.env.PORT));
// const startServer = async () => {
//     try {
//       app.listen(PORT, () => console.log('Server started at PORT:', PORT));
//     } catch (error) {
//       console.error('Failed to connect to the database', error);
//     }
//   };
  
// startServer();

