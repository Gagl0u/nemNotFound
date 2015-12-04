"use strict";

var CryptoJS = require("crypto-js");

/**
 * Passphrase used while encrypting/decrypting text.
 * It won't be accessible from outside this module
 *
 * @attribute SECRET_PASSPHRASE
 * @attribute KEY
 * @attribute IV
 * @type {string}
 */
var SECRET_PASSPHRASE = "ma_passphrase_secrete";
var KEY;
var IV;

/**
 * @method createKey
 * @param hexadecimal {string} text to be converted into cryptojs key
 */
exports.createKey = function(hexa) {
    KEY = CryptoJS.enc.Hex.parse(hexa);
};

/**
 * @method createIV
 * @param hexadecimal {string} text to be converted into cryptojs initialization vector
 */
exports.createIV = function(hexa) {
    IV = CryptoJS.enc.Hex.parse(hexa);
};

/**
 * @method encryptAES
 * @param plain {string} text to be encrypted
 * @returns {string}
 */
exports.encryptAES = function(plain) {
    return CryptoJS.AES.encrypt(plain, KEY,{iv: IV});
    // return CryptoJS.AES.encrypt(plain, SECRET_PASSPHRASE);
};

/**
 * @method encryptTDES
 * @param plain {string} text to be encrypted
 * @returns {string}
 */
exports.encryptTDES = function(plain) {
    return CryptoJS.TripleDES.encrypt(plain, SECRET_PASSPHRASE);
};

/**
 * @method encryptAESPass
 * @param plain {string} text to be encrypted
 * @returns {string}
 */
exports.encryptAESPass = function(plain) {
    return CryptoJS.AES.encrypt(plain, SECRET_PASSPHRASE);
};

/**
 * @method decryptAES
 * @param cipher {string} text to be decrypted
 * @returns {string}
 */
exports.decryptAES = function(cipher) {
    return CryptoJS.AES.decrypt(cipher, KEY,{iv: IV}).toString(CryptoJS.enc.Utf8);
    // return CryptoJS.AES.decrypt(cipher, SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
};

/**
 * @method decryptAESPass
 * @param cipher {string} text to be decrypted
 * @returns {string}
 */
exports.decryptAESPass = function(cipher) {
    return CryptoJS.AES.decrypt(cipher, SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
};

/**
 * @method decryptTDES
 * @param cipher {string} text to be decrypted
 * @returns {string}
 */
exports.decryptTDES = function(cipher) {
    return CryptoJS.TripleDES.decrypt(cipher, SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
};

/**
 * Encode text in parameter into base64 string
 * @param text
 * @returns {*|string}
 */
exports.encode = function(text) {
    var t = CryptoJS.enc.Utf8.parse(text);
    return CryptoJS.enc.Base64.stringify(t);
};

/**
 * Decode base64-encoded string into UTF8 string
 * @param text
 * @returns {*|string}
 */
exports.decode = function(text) {
    var t = CryptoJS.enc.Base64.parse(text);
    return t.toString(CryptoJS.enc.Utf8);
};



