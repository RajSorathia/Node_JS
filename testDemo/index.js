require('dotenv').config();

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


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
