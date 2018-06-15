"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vektor_1 = require("./Vektor");
var ScalarHelper = /** @class */ (function () {
    function ScalarHelper() {
        this.position = new Vektor_1.Vektor();
        this.endPosition = new Vektor_1.Vektor(1, 1);
    }
    return ScalarHelper;
}());
exports.ScalarHelper = ScalarHelper;
