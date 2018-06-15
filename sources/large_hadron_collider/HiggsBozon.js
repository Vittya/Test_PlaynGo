"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util_1 = require("../eszk/Util");
var HiggsBozon = /** @class */ (function () {
    function HiggsBozon(x, y) {
        this.x = x;
        this.y = y;
        this.alfa = 255;
        this.sX = Util_1.Util.vltln(-1, 1);
        this.sY = Util_1.Util.vltln(-5, -1);
    }
    HiggsBozon.prototype.update = function () {
        this.x += this.sX;
        this.y += this.sY;
        this.alfa -= 5;
    };
    HiggsBozon.prototype.draw = function () {
        var graphix = new PIXI.Graphics();
        graphix.beginFill(0xFF0000, this.alfa);
        graphix.drawRect(0, 0, 5, 5);
        graphix.endFill();
    };
    HiggsBozon.prototype.vege = function () { return this.alfa < 0; };
    return HiggsBozon;
}());
exports.HiggsBozon = HiggsBozon;
