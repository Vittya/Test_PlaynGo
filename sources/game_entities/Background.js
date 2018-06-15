"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Background = /** @class */ (function () {
    function Background(t, sz, h) {
        this.texture = t;
        this.tSprite = new PIXI.extras.TilingSprite(t, sz, h);
    }
    Background.prototype.tilinSprite = function () {
        return this.tSprite;
    };
    return Background;
}());
exports.Background = Background;
