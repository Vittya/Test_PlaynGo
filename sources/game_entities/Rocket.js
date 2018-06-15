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
var SpaceCraft_1 = require("./SpaceCraft");
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    function Rocket() {
        var _this = _super.call(this, PIXI.Texture.fromImage("kp/lvdk.png")) || this;
        _this.sprite().anchor.x = 0.5;
        _this.sprite().anchor.y = 0.5;
        return _this;
    }
    Rocket.prototype.update = function () {
    };
    return Rocket;
}(SpaceCraft_1.SpaceCraft));
exports.Rocket = Rocket;
