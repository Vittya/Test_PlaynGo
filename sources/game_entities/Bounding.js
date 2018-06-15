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
var Bounding = /** @class */ (function (_super) {
    __extends(Bounding, _super);
    function Bounding(x, y) {
        var _this = _super.call(this) || this;
        _this.alfa = 100;
        _this.circle.x = x;
        _this.circle.y = y;
        _this.graphix = new PIXI.Graphics();
        _this.graphix.beginFill(0x444, _this.alfa);
        _this.graphix.drawCircle(_this.circle.x, _this.circle.y, 20);
        _this.graphix.endFill();
        return _this;
    }
    Bounding.prototype.update = function (x, y) {
        this.graphix.position.x = x;
        this.graphix.position.y = y;
    };
    Bounding.prototype.grafix = function () {
        return this.graphix;
    };
    return Bounding;
}(PIXI.Graphics));
exports.Bounding = Bounding;
