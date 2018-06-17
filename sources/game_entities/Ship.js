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
var Ship = /** @class */ (function (_super) {
    __extends(Hajo, _super);
    function Hajo() {
        var _this = _super.call(this, PIXI.Texture.fromImage("kp/spsh.png")) || this;
        _this.horgX = 0.5;
        _this.horgY = 0.5;
        _this.sprite().anchor.x = _this.horgX;
        _this.sprite().anchor.y = _this.horgY;
        _this.sprite().position.x = 100;
        _this.sprite().position.y = 300;
        return _this;
    }
    //@Override
    Hajo.prototype.update = function () {
    };
    return Hajo;
}(SpaceCraft_1.SpaceCraft));
exports.Hajo = Ship;
