"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Background_1 = require("./Background");
var Tavoli = /** @class */ (function (_super) {
    __extends(Tavoli, _super);
    function Tavoli() {
        var _this = _super.call(this, PIXI.Texture.fromImage("kp/csillagok.png"), 800, 600) || this;
        _this.tilinSprite().tilePosition.x = -100;
        _this.tilinSprite().tilePosition.y = -100;
        return _this;
    }
    Tavoli.prototype.update = function () {
        this.tilinSprite().tilePosition.x -= 0.128;
    };
    return Tavoli;
}(Background_1.Background));
exports.Tavoli = Tavoli;
