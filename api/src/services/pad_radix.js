/* global exports */

"use strict";

exports.pad = function (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};


exports.Radix = function (Base, Alpha) {
//	var Chars = Alpha.substr(0, Base);
    var chars = Alpha;
    var convert = {
        to: function (Number) {
            var hexN = "", absInt = Math.floor(Math.abs(Number)), R;
            while (true) {
                R = absInt % Base;
                hexN = chars.charAt(R) + hexN;
                absInt = (absInt - R) / Base;
                if (absInt === 0) {
                    break;
                }
            }
            // return ((Number < 0) ? "-" + hexN : hexN);
            return hexN;
        },
        from: function (String) {
            var number = 0,
                    String = String.toString(),
                    // negative = String[0] === "-";
                    negative = false;
            var index;
            for (var i = 0; i < String.length; i += 1) {
                if (negative && !i)
                    continue;
                index = chars.indexOf(String[i]);
                if (index === -1) {
                    throw "Input error: The source string does not match the Base conversion.";
                }
                number = index + (number * Base);
            }
            // return negative ? parseInt(negative + number) : number;
            return number;
        },
        encode: this.to,
        decode: this.from
    };
    // return this.Convert;
    return convert;
};