"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vektor = /** @class */ (function () {
    function Vektor(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var _this = this;
        this.x = 0;
        this.y = 0;
        this.magnitude = function () {
            return Math.sqrt(_this.x * _this.x + _this.y * _this.y);
        };
        this.magSq = function () {
            return _this.x * _this.x + _this.y * _this.y;
        };
        this.normalize = function () {
            var len = Math.sqrt(_this.x * _this.x + _this.y * _this.y);
            _this.x /= len;
            _this.y /= len;
            return _this;
        };
        this.zero = function () {
            _this.x = 0;
            _this.y = 0;
        };
        this.copy = function (point) {
            _this.x = point.x;
            _this.y = point.y;
        };
        this.duplicate = function () {
            var dup = new Vektor(_this.x, _this.y);
            return dup;
        };
        this.rotate = function (radians) {
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var x = (cos * _this.x) + (sin * _this.y);
            var y = (cos * _this.y) - (sin * _this.x);
            _this.x = x;
            _this.y = y;
        };
        this.rotate90 = function () {
            var x = -_this.y;
            var y = _this.x;
            _this.x = x;
            _this.y = y;
        };
        this.getAngle = function () {
            return Math.atan2(_this.x, _this.y);
        };
        this.multiply = function (value) {
            _this.x *= value;
            _this.y *= value;
        };
        this.add = function (value) {
            _this.x += value.x;
            _this.y += value.y;
        };
        this.subtract = function (value) {
            _this.x -= value.x;
            _this.y -= value.y;
        };
        this.dot = function (vec) {
            return _this.x * vec.x + _this.y * vec.y;
        };
        this.project = function (onto) {
            var proj = _this.duplicate();
            var d = onto.magSq();
            if (d != 0) {
                var mult = new Vektor(onto.x, onto.y);
                mult.multiply(proj.dot(onto) / d);
                return mult;
            }
            return onto;
        };
        this.x = x;
        this.y = y;
    }
    return Vektor;
}());
exports.Vektor = Vektor;
