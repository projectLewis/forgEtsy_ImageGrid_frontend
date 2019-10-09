const express = require('express')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

let port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})