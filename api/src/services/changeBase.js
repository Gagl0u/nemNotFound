/* global exports */

var padRadix = require("./pad_radix.js");

/*
    permet de depadder la newBase
*/

function depad(text, padCarac){
    if (text.charAt(0) == padCarac) {
        return depad(text.substring(1,text.length), padCarac);
    }else{
        return text;
    };
}

/*
    Fonction pour passer un texte d'une base à une autre.

    text : le texte à convertir
    fromAlpha : alphabet du texte
    toAlpha : alphabet cible
*/

function changeBaseAlpha (text, fromAlpha, toAlpha){
    var alphabet = toAlpha;
    var length = toAlpha.length;
    var newBase = "";
    var step;
    var alphabetOrigine = fromAlpha;
    var lengthOrigine = fromAlpha.length;
    var padCarac = alphabet.substring(0,1);
    var pad_length;
    var isCutable = true;

    if (lengthOrigine == 64) {
        step = 8;
        if (length == 16) {
            pad_length = 12;
        }else if (length == 2){
            pad_length = 48;
        }else if (length == lengthOrigine){
            pad_length = step;
        }else{
            isCutable = false;
        };
    }else if(lengthOrigine == 16){
        step = 12;
        if (length == 64) {
            pad_length = 8;
        }else if (length == 2){
            pad_length = 48;
        }else if (length == lengthOrigine){
            pad_length = step;
        }else{
              isCutable = false;
        };
    }else if(lengthOrigine == 2){
        step = 48;
        if (length == 16) {
            pad_length = 12;
        }else if(length == 64){
            pad_length = 8;
        }else if (length == lengthOrigine){
            pad_length = step;
        }else{
            isCutable = false;
        };
    }else{
        isCutable = false;
    };

    console.log('alphabetOrigine '+ alphabetOrigine+ '\nalphabet cible '+ alphabet);

    if (isCutable) {
        var R = padRadix.Radix(lengthOrigine, alphabetOrigine);
        var tab_16 = [];
        depart = text.length-step;
        fin = text.length;
        var tmp;
        var U = padRadix.Radix(length, alphabet);
        for (var i = 0; fin > 0; i++) { 
            tmp = text.substring(depart, fin);
            console.log("ce que je découpe "+ tmp);
            var T = R.from(tmp);
            /*if (length == lengthOrigine) {    
                // tab_16[i] = U.to(T);
                tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);
            }else{
                tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);    
            };*/
            tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);
            // console.log(depart + " " + fin);
            depart -= step;
            fin -= step;
            // console.log(depart + " " + fin);
            console.log("équivaut " + tab_16[i]);
        }
        for (var i = tab_16.length-1; i>= 0 ; i--) {
            newBase += tab_16[i];
        }
        newBase = depad(newBase, padCarac);
        // return newBase;
    }else{
        var R = padRadix.Radix(lengthOrigine, alphabetOrigine);
        var U = padRadix.Radix(length, alphabet);
        var T = R.from(text);
        newBase = U.to(T);
    };
    console.log("newBase "+ newBase);
    return newBase;
};


/*
    Fonction pour passer un texte d'une base à une autre.

    text : le texte à convertir
    fromBase : base du texte
    toBase : base cible
*/

function changeBase (text, fromBase, toBase){
   var alphabet = "";
    var length;
    var newBase = "";
    var step;
    var isCutable = true;

    if (fromBase == "b64u" && toBase == "b64c") {
        var tmp = text.replace(/\-/g, "+");
        newBase = tmp.replace(/\_/g, "/");
    }
    else if(fromBase == "b64c" && toBase == "b64u"){
        var tmp = text.replace(/\+/g, "-");
        newBase = tmp.replace(/\//g, "_");
    }
    else if (toBase !== fromBase) {
        if (fromBase == "b64c") {
            console.log("64u " + text);
            text = text.replace(/\-/g, "+");
            text = text.replace(/\_/g, "/");
            console.log("64c " + text);
        }
        switch (toBase) {
            case "b64x":
                alphabet = "Jl-xzGAyPa6k873f_eVC02LMKSbRETjBvrpIhu4YHmZUtdgWOc1wnoqi59FNXsQD";
                length = 64;
                break;
            case "b02c":
                alphabet = "01";
                length = 2;
                break;
            case "b64u":
                alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
                length = 64;
                break;

            case "b64x66":
                alphabet = "xWrzAFU4I{V8jXaleKt16H9iON7QYmc3dLEG2STC)DMnJh5B0vwqgfsR(ubZkyop";
                length = 64;
                break;
            case "b64x73":
                alphabet = ",Vz}(n_v6Pyj8RXGhuLbFdscwel]f9xYEg-4HZQtMS0IqT{!miJKB7DU1rkpC3W[";
                length = 64;
                break;

            case "b10c":
                alphabet = "0123456789";
                length = 10;
                break;
            case "b64c":
                alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                length = 64;
                break;

            case "b62c":
                alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                length = 62;
                break;

            case "b73x":
                alphabet = "W]qU6i)LpN7!jclRybn28QV-EsAwH0Z1OtK39rdfgJ(SzMeIa*ku,TCX5v{xFho}[PYmB_D4G";
                length = 73;
                break;

            case "b16c":
                alphabet = "0123456789ABCDEF";
                length = 16;
                break;

            default:
                alphabet = "Jl-xzGAyPa6k873f_eVC02LMKSbRETjBvrpIhu4YHmZUtdgWOc1wnoqi59FNXsQD";
                length = 64;
                break;
        }

        var alphabetOrigine = "";
        var lengthOrigine;
        var padCarac = alphabet.substring(0,1);

        switch (fromBase) {
            case "b64u":
                alphabetOrigine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
                lengthOrigine = 64;
                break;

            case "b64c":
                alphabetOrigine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                lengthOrigine = 64;
                break;

            case "b64x":
                alphabetOrigine = "Jl-xzGAyPa6k873f_eVC02LMKSbRETjBvrpIhu4YHmZUtdgWOc1wnoqi59FNXsQD";
                lengthOrigine = 64;
                break;

            case "b73x":
                alphabetOrigine = "W]qU6i)LpN7!jclRybn28QV-EsAwH0Z1OtK39rdfgJ(SzMeIa*ku,TCX5v{xFho}[PYmB_D4G";
                lengthOrigine = 73;
                break;

            case "b10c":
                alphabetOrigine = "0123456789";
                lengthOrigine = 10;
                break;

            case "b64x66":
                alphabetOrigine = "xWrzAFU4I{V8jXaleKt16H9iON7QYmc3dLEG2STC)DMnJh5B0vwqgfsR(ubZkyop";
                lengthOrigine = 64;
                break;
            case "b64x73":
                alphabetOrigine = ",Vz}(n_v6Pyj8RXGhuLbFdscwel]f9xYEg-4HZQtMS0IqT{!miJKB7DU1rkpC3W[";
                lengthOrigine = 64;
                break;

            case "b02c":
                alphabetOrigine = "01";
                lengthOrigine = 2;
                break;

            case "b62c":
                alphabetOrigine = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                lengthOrigine = 62;
                break;
                
            case "b16c":
                alphabetOrigine = "0123456789ABCDEF";
                lengthOrigine = 16;
                break;

            default:
                alphabetOrigine = "0123456789ABCDEF";
                lengthOrigine = 16;
        }

        var pad_length;

        if (lengthOrigine == 64) {
            step = 8;
            if (length == 16) {
                pad_length = 12;
            }else if (length == 2){
                pad_length = 48;
            }else if (length == lengthOrigine){
                pad_length = step;
            }else{
                isCutable = false;
            };
        }else if(lengthOrigine == 16){
            step = 12;
            if (length == 64) {
                pad_length = 8;
            }else if (length == 2){
                pad_length = 48;
            }else if (length == lengthOrigine){
                pad_length = step;
            }else{
                  isCutable = false;
            };
        }else if(lengthOrigine == 2){
            step = 48;
            if (length == 16) {
                pad_length = 12;
            }else if(length == 64){
                pad_length = 8;
            }else if (length == lengthOrigine){
                pad_length = step;
            }else{
                isCutable = false;
            };
        }else{
            isCutable = false;
        };

        console.log("pad_length " +pad_length + " step "+ step + " isCutable " + isCutable);

        if (isCutable) {
            console.log('alphabetOrigine '+ alphabetOrigine+ '\nalphabet cible '+ alphabet);

            var R = padRadix.Radix(lengthOrigine, alphabetOrigine);
            var tab_16 = [];
            depart = text.length-step;
            fin = text.length;
            var tmp;
            var U = padRadix.Radix(length, alphabet);
            for (var i = 0; fin > 0; i++) { 
                tmp = text.substring(depart, fin);
                console.log("ce que je découpe "+tmp);
                var T = R.from(tmp);
             /*   if (length == lengthOrigine) {    
                    // tab_16[i] = U.to(T);
                    tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);
                }else{
                    tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);    
                };*/
                tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);
                // console.log(depart + " " + fin);
                depart -= step;
                fin -= step;
                // console.log(depart + " " + fin);
                console.log("équivaut à "+ tab_16[i]);
            }
            for (var i = tab_16.length-1; i>= 0 ; i--) {
                newBase += tab_16[i];
            }
            newBase = depad(newBase, padCarac);
        }
        else{
            console.log("je ne découpe pas");
            var R = padRadix.Radix(lengthOrigine, alphabetOrigine);
            var U = padRadix.Radix(length, alphabet);
            var T = R.from(text);
            newBase = U.to(T);
        }
    }else{
        newBase = text;
    };
    console.log("newBase "+ newBase);
    return newBase;
};


exports.changeBaseFront = function (text, fromBase, toBase){
    return changeBase(text,fromBase, toBase);
};

exports.changeBaseAlphaFront = function (text, fromAlpha, toAlpha){
    return changeBaseAlpha(text,fromAlpha, toAlpha);
};

exports.changeBaseFrontTest = function (text, fromBase, toBase){
    return changeBaseTest(text,fromBase, toBase);
};

function changeBaseTest (text, fromBase, toBase){
    var alphabet = "";
    var length;
    var newBase = "";
    var step;

    if (fromBase == "b64u" && toBase == "b64c") {
        var tmp = text.replace(/\-/g, "+");
        newBase = tmp.replace(/\_/g, "/");
    }
    else if(fromBase == "b64c" && toBase == "b64u"){
        var tmp = text.replace(/\+/g, "-");
        newBase = tmp.replace(/\//g, "_");
    }
    else if (toBase !== fromBase) {
        switch (toBase) {
            case "b64x":
                alphabet = "Jl-xzGAyPa6k873f_eVC02LMKSbRETjBvrpIhu4YHmZUtdgWOc1wnoqi59FNXsQD";
                length = 64;
                break;
            case "b02c":
                alphabet = "01";
                length = 2;
                break;
            case "b64u":
                alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
                length = 64;
                break;
            case "b64x66":
                alphabet = "xWrzAFU4I{V8jXaleKt16H9iON7QYmc3dLEG2STC)DMnJh5B0vwqgfsR(ubZkyop";
                length = 64;
                break;
            case "b64x73":
                alphabet = ",Vz}(n_v6Pyj8RXGhuLbFdscwel]f9xYEg-4HZQtMS0IqT{!miJKB7DU1rkpC3W[";
                length = 64;
                break;

            case "b64c":
                alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                length = 64;
                break;

            case "b62c":
                alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                length = 62;
                break;

            case "b73x":
                alphabet = "W]qU6i)LpN7!jclRybn28QV-EsAwH0Z1OtK39rdfgJ(SzMeIa*ku,TCX5v{xFho}[PYmB_D4G";
                length = 73;
                break;

            case "b16c":
                alphabet = "0123456789ABCDEF";
                length = 16;
                break;

            default:
                alphabet = "Jl-xzGAyPa6k873f_eVC02LMKSbRETjBvrpIhu4YHmZUtdgWOc1wnoqi59FNXsQD";
                length = 64;
                break;
        }

        var alphabetOrigine = "";
        var lengthOrigine;
        var padCarac = alphabet.substring(0,1);

        switch (fromBase) {
            case "b64u":
                alphabetOrigine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
                lengthOrigine = 64;
                break;

            case "b64c":
                alphabetOrigine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                lengthOrigine = 64;
                break;

            case "b64x":
                alphabetOrigine = "Jl-xzGAyPa6k873f_eVC02LMKSbRETjBvrpIhu4YHmZUtdgWOc1wnoqi59FNXsQD";
                lengthOrigine = 64;
                break;

            case "b64x66":
                alphabetOrigine = "xWrzAFU4I{V8jXaleKt16H9iON7QYmc3dLEG2STC)DMnJh5B0vwqgfsR(ubZkyop";
                lengthOrigine = 64;
                break;
            case "b64x73":
                alphabetOrigine = ",Vz}(n_v6Pyj8RXGhuLbFdscwel]f9xYEg-4HZQtMS0IqT{!miJKB7DU1rkpC3W[";
                lengthOrigine = 64;
                break;

            case "b73x":
                alphabetOrigine = "W]qU6i)LpN7!jclRybn28QV-EsAwH0Z1OtK39rdfgJ(SzMeIa*ku,TCX5v{xFho}[PYmB_D4G";
                lengthOrigine = 73;
                break;

            case "b02c":
                alphabetOrigine = "01";
                lengthOrigine = 2;
                break;

            case "b62c":
                alphabetOrigine = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                lengthOrigine = 62;
                break;
                
            case "b16c":
                alphabetOrigine = "0123456789ABCDEF";
                lengthOrigine = 16;
                break;

            default:
                alphabetOrigine = "0123456789ABCDEF";
                lengthOrigine = 16;
        }

        var pad_length;

        if (lengthOrigine == 64) {
            step = 8;
            if (length == 16) {
                pad_length = 12;
            }else{
                pad_length = 48;
            };
        }else if(lengthOrigine == 16){
            step = 12;
            if (length == 64) {
                pad_length = 8;
            }else{
                pad_length = 48;
            };
        }else if(lengthOrigine == 2){
            step = 48;
            if (length == 16) {
                pad_length = 12;
            }else{
                pad_length = 8;
            };
        };

        console.log(alphabetOrigine, alphabet);

        var R = padRadix.Radix(lengthOrigine, alphabetOrigine);
        if (false) { //ATTENTION 29 NORMALEMENT ICI TEST
            var T = R.from(text); //uid you want to convert into base 64x
            var U = padRadix.Radix(length, alphabet); 
            // var U = padRadix.Radix(64, alphabet);
            newBase = U.to(T);
        } else {
            var tab_16 = [];
            // var depart = 0;
            depart = text.length-step;
            // var fin = step; //plus dynamique comme ça
            fin = text.length;
            var tmp;
            // var U = padRadix.Radix(73, alphabet);
            var U = padRadix.Radix(length, alphabet);
            // for (var i = 0; depart < text.length; i++) {
            for (var i = 0; fin > 0; i++) { 
                tmp = text.substring(depart, fin);
                console.log(tmp);
                var T = R.from(tmp);
                // if (length == lengthOrigine || fin > text.length) {
                if (length == lengthOrigine) {    
                    // tab_16[i] = U.to(T);
                    tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);
                }else{
                    tab_16[i] = padRadix.pad(U.to(T), pad_length, padCarac);    
                };
                console.log(depart + " " + fin);
                depart -= step;
                fin -= step;
                console.log(depart + " " + fin);
                console.log(tab_16[i]);
            }
            /*for (var i = 0; i < tab_16.length; i++) {
                newBase += tab_16[i];
            }*/
            for (var i = tab_16.length-1; i>= 0 ; i--) {
                newBase += tab_16[i];
            }
            /*if (newBase.substring(newBase.length-2, newBase.length-1) == padCarac) {
                newBase = newBase.substring(0,newBase.length-2) + newBase.substring(newBase.length-1, newBase.length);
            };*/
            newBase = depad(newBase, padCarac);
        };
    }else{
        newBase = text;
    };
    return newBase;
};
