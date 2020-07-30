// BASE_URL=https://hexboy.ir PUBLIC_URL="https://dev.mykaseb.ir" PORT=3000 node serve.js

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

let content = fs
	.readFileSync(path.join(__dirname, "build", "index.html"))
	.toString();

const baseUrl = process.env.BASE_URL || "https://dev-api.mykaseb.ir";
const publicUrl = process.env.PUBLIC_URL || "http://localhost:3000";

content = content
	.replace(new RegExp("http://localhost:3000", "g"), publicUrl)
	.replace("__BASE_URL__", baseUrl);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
	res.send(content);
});

app.listen(process.env.PORT || 3000);
console.log("start listening port " + (process.env.PORT || 3000));
