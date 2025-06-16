module.exports = function (method, arg, inverted, language) {
    var msgList = inverted ? language === 'pt-Br' ? negativeMessagesBr : language === 'es-Ar' ? negativeMessagesAr : negativeMessages : language === 'pt-Br' ? positiveMessagesBr : language === 'es-Ar' ? positiveMessagesAr : positiveMessages;
    return msgList[method] && msgList[method](arg);
};
/**
 * Add Português BR
 * @author Starley Cazorla
 */
var positiveMessagesBr = {
    min: function (num) { return "A senha deve ter o tamanho minimo de ".concat(num, " caractere").concat(pluralify(num)); },
    max: function (num) { return "A senha deve ter o tamanho m\u00E1ximo de ".concat(num, " caractere").concat(pluralify(num)); },
    letters: function (num) {
        if (num === void 0) { num = 1; }
        return "A senha deve ter no minimo ".concat(num, " letra").concat(pluralify(num));
    },
    digits: function (num) {
        if (num === void 0) { num = 1; }
        return "A senha deve ter no minimo ".concat(num, " digito").concat(pluralify(num));
    },
    uppercase: function (num) {
        if (num === void 0) { num = 1; }
        return "A senha deve ter no minimo ".concat(num, " letra").concat(pluralify(num), " maiuscula");
    },
    lowercase: function (num) {
        if (num === void 0) { num = 1; }
        return "A senha deve ter no minimo ".concat(num, " letra").concat(pluralify(num), " minuscula");
    },
    symbols: function (num) {
        if (num === void 0) { num = 1; }
        return "A senha deve ter no minimo ".concat(num, " caractere").concat(pluralify(num), " ").concat(pluralify(num) ? 'especiais' : 'especial');
    },
    spaces: function (num) {
        if (num === void 0) { num = 1; }
        return "A senha deve ter no minimo ".concat(num, " espa\u00E7o").concat(pluralify(num));
    },
    oneOf: function (list) { return "A senha deve ser ".concat(list.length > 1 ? "um de ".concat(list.slice(0, -1).join(', '), " e ") : '').concat(list[list.length - 1]); },
    has: function (pattern) { return "A senha deve ter o padr\u00E3o '".concat(pattern, "'"); },
    not: function (pattern) { return "A senha n\u00E3o deve ter o padr\u00E3o '".concat(pattern, "'"); },
    usingPlugin: function (fn) { return "A senha n\u00E3o pode violar o ".concat(fn.name || 'plugin'); },
};
var negativeMessagesBr = {
    min: function (num) { return "A senha deve ter o tamanho m\u00E1ximo de ".concat(num, " caractere").concat(pluralify(num)); },
    max: function (num) { return "A senha deve ter o tamanho minimo de ".concat(num, " caractere").concat(pluralify(num)); },
    letters: function (num) {
        if (num === void 0) { num = 0; }
        return "A senha ".concat(num === 0 ? 'não tem' : "ter um m\u00E1ximo de ".concat(num), " letra").concat(pluralify(num));
    },
    digits: function (num) {
        if (num === void 0) { num = 0; }
        return "A senha ".concat(num === 0 ? 'não tem' : "ter um m\u00E1ximo de ".concat(num), " digito").concat(pluralify(num));
    },
    uppercase: function (num) {
        if (num === void 0) { num = 0; }
        return "A senha ".concat(num === 0 ? 'não tem' : "ter um m\u00E1ximo de ".concat(num), " letra").concat(pluralify(num), " maiuscula");
    },
    lowercase: function (num) {
        if (num === void 0) { num = 0; }
        return "A senha ".concat(num === 0 ? 'não tem' : "ter um m\u00E1ximo de ".concat(num), " letra").concat(pluralify(num), " minuscula");
    },
    symbols: function (num) {
        if (num === void 0) { num = 0; }
        return "A senha ".concat(num === 0 ? 'não tem' : "ter um m\u00E1ximo de ".concat(num), " caractere").concat(pluralify(num), " ").concat(pluralify(num) ? 'especiais' : 'especial');
    },
    spaces: function (num) {
        if (num === void 0) { num = 0; }
        return "A senha ".concat(num === 0 ? 'não tem' : "ter um m\u00E1ximo de ".concat(num), " espacio").concat(pluralify(num));
    },
    oneOf: function (list) { return "A senha n\u00E3o deve ser ".concat(list.length > 1 ? "um de ".concat(list.slice(0, -1).join(', '), " e ") : '').concat(list[list.length - 1]); },
    has: function (pattern) { return "A senha n\u00E3o deve ter o padr\u00E3o '".concat(pattern, "'"); },
    not: function (pattern) { return "A senha deve ter o padr\u00E3o '".concat(pattern, "'"); },
    usingPlugin: function (fn) { return "A senha deve violar o ".concat(fn.name || 'plugin'); },
};
/**
 * Add Espanol AR
 * @author Starley Cazorla
 */
var positiveMessagesAr = {
    min: function (num) { return "La contrase\u00F1a debe tener una longitud m\u00EDnima de ".concat(num, " caractere").concat(pluralify(num)); },
    max: function (num) { return "La contrase\u00F1a debe tener una longitud m\u00E1xima de ".concat(num, " caractere").concat(pluralify(num)); },
    letters: function (num) {
        if (num === void 0) { num = 1; }
        return "La contrase\u00F1a debe tener al menos ".concat(num, " letra").concat(pluralify(num));
    },
    digits: function (num) {
        if (num === void 0) { num = 1; }
        return "La contrase\u00F1a debe tener al menos ".concat(num, " digito").concat(pluralify(num));
    },
    uppercase: function (num) {
        if (num === void 0) { num = 1; }
        return "La contrase\u00F1a debe tener al menos ".concat(num, " letra").concat(pluralify(num), " may\u00FAscula");
    },
    lowercase: function (num) {
        if (num === void 0) { num = 1; }
        return "La contrase\u00F1a debe tener al menos ".concat(num, " letra").concat(pluralify(num), " min\u00FAscula");
    },
    symbols: function (num) {
        if (num === void 0) { num = 1; }
        return "La contrase\u00F1a debe tener al menos ".concat(num, " caractere").concat(pluralify(num), " ").concat(pluralify(num) ? 'especiais' : 'especial');
    },
    spaces: function (num) {
        if (num === void 0) { num = 1; }
        return "La contrase\u00F1a debe tener al menos ".concat(num, " espacio").concat(pluralify(num));
    },
    oneOf: function (list) { return "La contrase\u00F1a debe ser ".concat(list.length > 1 ? "uno de ".concat(list.slice(0, -1).join(', '), " e ") : '').concat(list[list.length - 1]); },
    has: function (pattern) { return "La contrase\u00F1a debe tener el patr\u00F3n '".concat(pattern, "'"); },
    not: function (pattern) { return "La contrase\u00F1a no debe tener el patr\u00F3n '".concat(pattern, "'"); },
    usingPlugin: function (fn) { return "La contrase\u00F1a no debe violar la ".concat(fn.name || 'plugin'); },
};
var negativeMessagesAr = {
    min: function (num) { return "La contrase\u00F1a debe tener una longitud m\u00E1xima de ".concat(num, " caractere").concat(pluralify(num)); },
    max: function (num) { return "La contrase\u00F1a debe tener una longitud m\u00EDnima de ".concat(num, " caractere").concat(pluralify(num)); },
    letters: function (num) {
        if (num === void 0) { num = 0; }
        return "La contrase\u00F1a ".concat(num === 0 ? 'no tiene' : "tener un m\u00E1ximo de ".concat(num), " letra").concat(pluralify(num));
    },
    digits: function (num) {
        if (num === void 0) { num = 0; }
        return "La contrase\u00F1a ".concat(num === 0 ? 'no tiene' : "tener un m\u00E1ximo de ".concat(num), " digito").concat(pluralify(num));
    },
    uppercase: function (num) {
        if (num === void 0) { num = 0; }
        return "La contrase\u00F1a ".concat(num === 0 ? 'no tiene' : "tener un m\u00E1ximo de ".concat(num), " letra").concat(pluralify(num), " may\u00FAscula");
    },
    lowercase: function (num) {
        if (num === void 0) { num = 0; }
        return "La contrase\u00F1a ".concat(num === 0 ? 'no tiene' : "tener un m\u00E1ximo de ".concat(num), " letra").concat(pluralify(num), " min\u00FAscula");
    },
    symbols: function (num) {
        if (num === void 0) { num = 0; }
        return "La contrase\u00F1a ".concat(num === 0 ? 'no tiene' : "tener un m\u00E1ximo de ".concat(num), " caractere").concat(pluralify(num), " ").concat(pluralify(num) ? 'especiais' : 'especial');
    },
    spaces: function (num) {
        if (num === void 0) { num = 0; }
        return "La contrase\u00F1a ".concat(num === 0 ? 'no tiene' : "tener un m\u00E1ximo de ".concat(num), " espa\u00E7o").concat(pluralify(num));
    },
    oneOf: function (list) { return "La contrase\u00F1a no debe ser ".concat(list.length > 1 ? "uno de ".concat(list.slice(0, -1).join(', '), " e ") : '').concat(list[list.length - 1]); },
    has: function (pattern) { return "La contrase\u00F1a no debe tener el patr\u00F3n '".concat(pattern, "'"); },
    not: function (pattern) { return "La contrase\u00F1a debe tener el patr\u00F3n '".concat(pattern, "'"); },
    usingPlugin: function (fn) { return "La contrase\u00F1a debe violar la ".concat(fn.name || 'plugin'); },
};
var positiveMessages = {
    min: function (num) { return "The string should have a minimum length of ".concat(num, " character").concat(pluralify(num)); },
    max: function (num) { return "The string should have a maximum length of ".concat(num, " character").concat(pluralify(num)); },
    letters: function (num) {
        if (num === void 0) { num = 1; }
        return "The string should have a minimum of ".concat(num, " letter").concat(pluralify(num));
    },
    digits: function (num) {
        if (num === void 0) { num = 1; }
        return "The string should have a minimum of ".concat(num, " digit").concat(pluralify(num));
    },
    uppercase: function (num) {
        if (num === void 0) { num = 1; }
        return "The string should have a minimum of ".concat(num, " uppercase letter").concat(pluralify(num));
    },
    lowercase: function (num) {
        if (num === void 0) { num = 1; }
        return "The string should have a minimum of ".concat(num, " lowercase letter").concat(pluralify(num));
    },
    symbols: function (num) {
        if (num === void 0) { num = 1; }
        return "The string should have a minimum of ".concat(num, " symbol").concat(pluralify(num));
    },
    spaces: function (num) {
        if (num === void 0) { num = 1; }
        return "The string should have a minimum of ".concat(num, " space").concat(pluralify(num));
    },
    oneOf: function (list) { return "The string should be ".concat(list.length > 1 ? "one of ".concat(list.slice(0, -1).join(', '), " and ") : '').concat(list[list.length - 1]); },
    has: function (pattern) { return "The string should have pattern '".concat(pattern, "'"); },
    not: function (pattern) { return "The string should not have pattern '".concat(pattern, "'"); },
    usingPlugin: function (fn) { return "The string should not violate ".concat(fn.name || 'plugin'); },
};
var negativeMessages = {
    min: function (num) { return "The string should have a maximum length of ".concat(num, " character").concat(pluralify(num)); },
    max: function (num) { return "The string should have a minimum length of ".concat(num, " character").concat(pluralify(num)); },
    letters: function (num) {
        if (num === void 0) { num = 0; }
        return "The string should ".concat(num === 0 ? 'not have' : "have a maximum of ".concat(num), " letter").concat(pluralify(num));
    },
    digits: function (num) {
        if (num === void 0) { num = 0; }
        return "The string should ".concat(num === 0 ? 'not have' : "have a maximum of ".concat(num), " digit").concat(pluralify(num));
    },
    uppercase: function (num) {
        if (num === void 0) { num = 0; }
        return "The string should ".concat(num === 0 ? 'not have' : "have a maximum of ".concat(num), " uppercase letter").concat(pluralify(num));
    },
    lowercase: function (num) {
        if (num === void 0) { num = 0; }
        return "The string should ".concat(num === 0 ? 'not have' : "have a maximum of ".concat(num), " lowercase letter").concat(pluralify(num));
    },
    symbols: function (num) {
        if (num === void 0) { num = 0; }
        return "The string should ".concat(num === 0 ? 'not have' : "have a maximum of ".concat(num), " symbol").concat(pluralify(num));
    },
    spaces: function (num) {
        if (num === void 0) { num = 0; }
        return "The string should ".concat(num === 0 ? 'not have' : "have a maximum of ".concat(num), " space").concat(pluralify(num));
    },
    oneOf: function (list) { return "The string should not be ".concat(list.length > 1 ? "one of ".concat(list.slice(0, -1).join(', '), " and ") : '').concat(list[list.length - 1]); },
    has: function (pattern) { return "The string should not have pattern '".concat(pattern, "'"); },
    not: function (pattern) { return "The string should have pattern '".concat(pattern, "'"); },
    usingPlugin: function (fn) { return "The string should violate ".concat(fn.name || 'plugin'); },
};
function pluralify(num) {
    return num === 1 ? '' : 's';
}
