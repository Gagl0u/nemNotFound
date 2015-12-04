/* global exports */

var crypto = require("./crypto.js"); 


exports.encryptAES = function (texte, cle, iv){
    crypto.createKey(cle);
    crypto.createIV(iv);
    var encrypt = crypto.encryptAES(texte);
    encrypt = encrypt.toString();
    return encrypt.replace(/\=/g, "");
}

/*
exports.encryptAESPass = function (texte){
    var encrypt = crypto.encryptPass(texte);
    encrypt = encrypt.toString();
    return encrypt.replace(/\=/g, "");
}
*/

exports.decryptAES = function (crypedText, cle, InitVector) {
    crypto.createKey(cle);
    crypto.createIV(InitVector);
    return crypto.decryptAES(crypedText);
};

/*
exports.decryptAESPass = function (crypted) {
    return crypto.decryptPass(crypted);
};
*/
