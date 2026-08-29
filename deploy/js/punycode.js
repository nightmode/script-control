'use strict'

//-------
// Notes
//-------
/*
    This file is a highly edited version of the public domain code originally found at...
        https://stackoverflow.com/questions/183485/converting-punycode-with-dash-character-to-unicode/
*/

// Javascript Punycode converter derived from example in RFC3492.
var punycode = new function Punycode() {
    // This object converts to and from puny-code used in IDN
    //
    // punycode.to_unicode (domain)
    //
    // Converts a puny-coded domain name to unicode.
    // It only converts the puny-coded parts of the domain name.
    // It does not matter if you call it on a string
    // that already has been converted to unicode.
    //
    this.utf16 = {
        // The utf16-class is necessary to convert from a javascript internal character representation to unicode.
        encode: function(input) {
            // this function is needed by decode()
            var output = []
            var i = 0
            var len = input.length
            var value

            while (i < len) {
                value = input[i++]

                if ((value & 0xF800) === 0xD800) {
                    throw new RangeError('UTF-16(encode): Illegal UTF-16 value')
                } // if

                if (value > 0xFFFF) {
                    value -= 0x10000
                    output.push(String.fromCharCode(((value >>>10) & 0x3FF) | 0xD800))
                    value = 0xDC00 | (value & 0x3FF)
                } // if

                output.push(String.fromCharCode(value))
            } // while

            return output.join('')
        } // encode
    } // utf16

    //Default parameters
    var initial_n = 0x80
    var initial_bias = 72
    var delimiter = '\x2D'
    var base = 36
    var damp = 700
    var tmin = 1
    var tmax = 26
    var skew = 38
    var maxint = 0x7FFFFFFF

    function decode_digit(cp) {
        // this function is needed by decode()

        // decode_digit(cp) returns the numeric value of a basic code
        // point (for use in representing integers) in the range 0 to
        // base-1, or base if cp is does not represent a value.

        return cp - 48 < 10 ? cp - 22 : cp - 65 < 26 ? cp - 65 : cp - 97 < 26 ? cp - 97 : base
    } // decode_digit

    function adapt(delta, numpoints, firsttime) {
        // this function is needed by decode()

        // Bias adaptation function

        var k

        delta = firsttime ? Math.floor(delta / damp) : (delta >> 1)
        delta += Math.floor(delta / numpoints)

        for (k = 0; delta > (((base - tmin) * tmax) >> 1); k += base) {
            delta = Math.floor(delta / (base - tmin))
        } // for

        return Math.floor(k + (base - tmin + 1) * delta / (delta + skew))
    } // adapt

    // Main decode
    this.decode = function(input, preserveCase) {
        // this function is needed by to_unicode()

        // Dont use utf16
        var output = []
        var case_flags = []
        var input_length = input.length

        var n, out, i, bias, basic, j, ic, oldi, w, k, digit, t, len

        // Initialize the state:

        n = initial_n
        i = 0
        bias = initial_bias

        // Handle the basic code points: Let basic be the number of input code
        // points before the last delimiter, or 0 if there is none, then
        // copy the first basic code points to the output.

        basic = input.lastIndexOf(delimiter)

        if (basic < 0) {
            basic = 0
        } // if

        for (j = 0; j < basic; ++j) {
            if (preserveCase) {
                case_flags[output.length] = (input.charCodeAt(j) -65 < 26)
            } // if

            if (input.charCodeAt(j) >= 0x80) {
                throw new RangeError('Illegal input >= 0x80')
            } // if

            output.push(input.charCodeAt(j))
        } // for

        // Main decoding loop: Start just after the last delimiter if any
        // basic code points were copied; start at the beginning otherwise.

        for (ic = basic > 0 ? basic + 1 : 0; ic < input_length;) {
            // ic is the index of the next character to be consumed,

            // Decode a generalized variable-length integer into delta,
            // which gets added to i. The overflow checking is easier
            // if we increase i as we go, then subtract off its starting
            // value at the end to obtain delta.
            for (oldi = i, w = 1, k = base; ; k += base) {
                if (ic >= input_length) {
                    throw RangeError ('punycode_bad_input(1)')
                } // if

                digit = decode_digit(input.charCodeAt(ic++))

                if (digit >= base) {
                    throw RangeError('punycode_bad_input(2)')
                } // if

                if (digit > Math.floor((maxint - i) / w)) {
                    throw RangeError ('punycode_overflow(1)')
                } // if

                i += digit * w
                t = k <= bias ? tmin : k >= bias + tmax ? tmax : k - bias

                if (digit < t) {
                    break
                } // if

                if (w > Math.floor(maxint / (base - t))) {
                    throw RangeError('punycode_overflow(2)')
                } // if

                w *= (base - t)
            } // for

            out = output.length + 1
            bias = adapt(i - oldi, out, oldi === 0)

            // i was supposed to wrap around from out to 0,
            // incrementing n each time, so we'll fix that now:
            if (Math.floor(i / out) > maxint - n) {
                throw RangeError('punycode_overflow(3)')
            } // if

            n += Math.floor(i / out)
            i %= out

            // Insert n at position i of the output:
            // Case of last character determines uppercase flag:
            if (preserveCase) {
                case_flags.splice(i, 0, input.charCodeAt(ic -1) -65 < 26)
            } // if

            output.splice(i, 0, n)

            i++
        } // for

        if (preserveCase) {
            for (i = 0, len = output.length; i < len; i++) {
                if (case_flags[i]) {
                    output[i] = (String.fromCharCode(output[i]).toUpperCase()).charCodeAt(0)
                } // if
            } // for
        } // if

        return this.utf16.encode(output)
    } // decode

    this.to_unicode = function(domain) {
        var domain_array = domain.split('.')
        var out = []

        for (var i = 0; i < domain_array.length; ++i) {
            var s = domain_array[i]
            out.push(
                s.match(/^xn--/) ? punycode.decode(s.slice(4)) : s
            )
        } // for

        return out.join('.')
    } // to_unicode
}();