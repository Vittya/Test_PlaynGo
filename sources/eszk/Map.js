"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Map = /** @class */ (function () {
    function Map() {
        this.elemek = {};
    }
    Map.prototype.add = function (key, value) {
        this.elemek[key] = value;
    };
    Map.prototype.has = function (key) {
        //
        return key in this.elemek;
    };
    Map.prototype.get = function (key) {
        return this.elemek[key];
    };
    Map.prototype.remove = function (key) {
        this.elemek[key];
    };
    return Map;
}());
exports.Map = Map;
