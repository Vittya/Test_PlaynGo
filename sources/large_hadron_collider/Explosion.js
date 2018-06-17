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
var Explosion = /** @class */ (function (_super) {
    __extends(Explosion, _super);
    function Explosion() {
        var _this = _super.call(this, PIXI.Texture.fromImage("kp/ii.png")) || this;
        _this.ss.addChild(_this.sprite());
        return _this;
    }
    Explosion.prototype.update = function () {
        for (var i = 0; i < Math.PI * 2; i += 0.01) {
            this.sprite().position.x = Util_1.Util.polarbolCart(100, i)[0];
            this.sprite().position.y = Util_1.Util.polarbolCart(100, i)[1];
        }
    };
    return Explosion;
}(SpaceCraft_1.SpaceCraft));
exports.Explosion = Explosion;
