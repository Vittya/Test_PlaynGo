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
var SpaceCraft_1 = require("../game_entities/SpaceCraft");
var Util_1 = require("../eszk/Util");
var Impulse = /** @class */ (function (_super) {
    __extends(Impulse, _super);
    function Impulse(s, x, y) {
        var _this = _super.call(this, PIXI.Texture.fromImage("kp/bcube.png")) || this;
        _this.sprite().anchor.x = 0.5;
        _this.sprite().anchor.y = 0.5;
        _this.sprite().position.x = x;
        _this.sprite().position.y = Util_1.Util.vltln(y, y + 30);
        _this.sprite().alpha = 255;
        _this.s = s;
        _this.s.addChild(_this.sprite());
        return _this;
    }
    Impulse.prototype.update = function () {
        this.sprite().position.x += Util_1.Util.polarbolCart(1, Util_1.Util.vltln(-22.5, 22.5))[0];
        this.sprite().position.y += Util_1.Util.polarbolCart(1, Util_1.Util.vltln(-22.5, 22.5))[1];
        this.sprite().alpha--;
    };
    Impulse.prototype.vege = function () {
        this.s.removeChild(this.sprite());
    };
    return Impulse;
}(SpaceCraft_1.SpaceCraft));
exports.Impulse = Impulse;
