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
var Jelenet_1 = require("./Jelenet");
var DaGame = /** @class */ (function (_super) {
    __extends(DaGame, _super);
    function DaGame() {
        var _this = _super.call(this) || this;
        _this.pixiShit = new PIXI.Graphics();
        _this.pixiShit.beginFill(0xFF0000);
        _this.pixiShit.drawRect(0, 0, 100, 100);
        _this.pixiShit.endFill();
        _this.addChild(_this.pixiShit);
        return _this;
    }
    DaGame.prototype.update = function () {
        _super.prototype.update.call(this);
        this.pixiShit.position.x++;
    };
    return DaGame;
}(Jelenet_1.Jelenet));
exports.DaGame = DaGame;
