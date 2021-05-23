const express = require('express');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 4001;

app.use(express.static('./'))
console.log("someone is here")


app.listen(port, () => console.log("**************lisenting on the port " + port)
)