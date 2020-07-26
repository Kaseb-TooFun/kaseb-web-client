// ID=1 BASE_URL=https://hexboy.ir OLD_PUBLIC_URL="https://dev.mykaseb.ir" PUBLIC_URL="http://localhost:3000" PORT=3000 node serve.js

const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

try {
	fs.renameSync(
		path.join(__dirname, "build", "index.html"),
		path.join(__dirname, "build", "index-org.html")
	);
} catch (error) {}

let content = fs
	.readFileSync(path.join(__dirname, "build", "index-org.html"))
	.toString();

const id = process.env.ID || 0;
const baseUrl = process.env.BASE_URL || "https://dev-api.mykaseb.ir";
const oldPublicUrl = process.env.OLD_PUBLIC_URL || "https://dev.mykaseb.ir";
const newPublicUrl = process.env.PUBLIC_URL || "https://dev.mykaseb.ir";
const fileName = "index-" + id + ".html";

content = content
	.replace(new RegExp(oldPublicUrl, "g"), newPublicUrl)
	.replace("__BASE_URL__", baseUrl);

fs.writeFileSync(path.join(__dirname, "build", fileName), content);

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "build", fileName));
});

app.listen(process.env.PORT || 3000);
console.log("start listening port " + (process.env.PORT || 3000));
