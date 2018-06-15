"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vektor_1 = require("../eszk/Vektor");
var SpaceCraft = /** @class */ (function () {
    function SpaceCraft(t) {
        this.position = new Vektor_1.Vektor();
        this.texture = t;
        this._sprite = new PIXI.Sprite(this.texture);
    }
    SpaceCraft.prototype.sprite = function () {
        return this._sprite;
    };
    return SpaceCraft;
}());
exports.SpaceCraft = SpaceCraft;
