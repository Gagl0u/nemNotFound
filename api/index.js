// "use strict";

//import our hand-made "crypto" module
var express = require('express');
var app = express();
var changeBase = require("./src/services/changeBase.js");
var crypto = require("./src/services/crypto.js");
var mobilead = require("./src/services/mobiLead.js");


var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); //wtf ..
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}


app.set('port', '80');
app.use(allowCrossDomain);
app.use(express.static(__dirname + '../../../'));

app.get('/', function (request, response) {
  response.send("The server is OK :)");
});

//méthode dépréciée car doit maintenir le code..
app.get('/changeBase/:plain/:alphaFrom/:alphaTo', function (request, response) {
  response.send(changeBase.changeBaseFront(request.params.plain, request.params.alphaFrom, request.params.alphaTo));
});

//méthode à utiliser
app.get('/changeBase2/:plain/:alphaFrom/:alphaTo', function (request, response) {
  response.send(changeBase.changeBaseAlphaFront(request.params.plain, request.params.alphaFrom, request.params.alphaTo));
});

app.get('/changeBaseTest/:plain/:alphaFrom/:alphaTo', function (request, response) {
  response.send(changeBase.changeBaseFrontTest(request.params.plain, request.params.alphaFrom, request.params.alphaTo));
});


app.get('/encryptAES/:plain/:key/:iv', function (request, response) {
  console.log("Ce que je vais crypter " + request.params.plain);
  var cipher = mobilead.encryptAES(request.params.plain, request.params.key, request.params.iv);
  console.log("Ce que j'ai crypté " + cipher);
  response.send(cipher);
});

app.get('/encryptAESPass/:plain', function (request, response) {
  var cipher = crypto.encryptAESPass(request.params.plain);
  response.send(crypto.encode(cipher));
});

app.get('/encryptTDES/:plain', function (request, response) {
  var cipher = crypto.encryptTDES(request.params.plain);
  response.send(crypto.encode(cipher));
});

app.get('/decryptAES/:cryptedText/:key/:iv', function (request, response) {
  //cryptedText has to be 64based.
  // response.send(mobilead.decryptAES(request.params.cryptedText, request.params.key, request.params.iv));
  console.log("DecryptAES, ce que je recois " + request.params.cryptedText);
  var cipher = request.params.cryptedText.replace(/\-/g, "+");
  cipher = cipher.replace(/\_/g, "/");
  console.log("DecryptAES, ce que je vais vraiment decrypter " + cipher);
  response.send(mobilead.decryptAES(cipher, request.params.key, request.params.iv));
});

app.get('/decryptAESPass/:cryptedText', function (request, response) {
  var decoded = crypto.decode(request.params.cryptedText);
  response.send(crypto.decryptAESPass(decoded));
});

app.get('/decryptTDES/:cryptedText', function (request, response) {
  var decoded = crypto.decode(request.params.cryptedText);
  response.send(crypto.decryptTDES(decoded));
});

app.get('/hello', function (request, response) {
  response.send("Hello world!");
});

app.listen(app.get('port'), 'http://nuitinfo2015-nemnotfound.azurewebsites.net/#/api/');
