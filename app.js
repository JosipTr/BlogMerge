const express = require('express');

const app = express();

app.set(express.static("public"));

app.listen(3000);