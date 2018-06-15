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
var Jelenet = /** @class */ (function (_super) {
    __extends(Jelenet, _super);
    function Jelenet() {
        var _this = _super.call(this) || this;
        _this.isPaused = false;
        _this.updateThisShit = function () { };
        console.log('shit son');
        return _this;
    }
    Jelenet.prototype.update = function () {
        this.updateThisShit();
    };
    Jelenet.prototype.onPause = function () {
        this.isPaused = true;
    };
    Jelenet.prototype.onResume = function () {
        this.isPaused = false;
    };
    Jelenet.prototype.getIsPaused = function () {
        return this.isPaused;
    };
    return Jelenet;
}(PIXI.Container));
exports.Jelenet = Jelenet;
