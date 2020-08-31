// BASE_URL=https://hexboy.ir PUBLIC_URL=https://app.mykaseb.ir PORT=3000 node serve.js

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const baseUrl = process.env.BASE_URL || 'https://api.mykaseb.ir';
const publicUrl = process.env.PUBLIC_URL || 'http://localhost:3000';

if (fs.existsSync(path.join(__dirname, 'build/index.html'))) {
	fs.renameSync(
		path.join(__dirname, 'build/index.html'),
		path.join(__dirname, 'build/index_.html')
	);
}

if (fs.existsSync(path.join(__dirname, 'build/kio.js'))) {
	fs.renameSync(
		path.join(__dirname, 'build/kio.js'),
		path.join(__dirname, 'build/kio_.js')
	);
}

let kiojs = fs
	.readFileSync(path.join(__dirname, 'build', 'kio_.js'))
	.toString();
kiojs = kiojs.replace('__BASE_URL__', baseUrl);

let content = fs
	.readFileSync(path.join(__dirname, 'build', 'index_.html'))
	.toString();

content = content
	.replace(new RegExp('http://localhost:3000', 'g'), publicUrl)
	.replace('__BASE_URL__', baseUrl);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/kio.js', function (req, res) {
	res.type('application/javascript');
	res.charset = 'utf-8';
	res.send(kiojs);
});

app.get('/*', function (req, res) {
	res.send(content);
});

app.listen(process.env.PORT || 3000);
console.log('start listening port ' + (process.env.PORT || 3000));
