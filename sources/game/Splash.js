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
var JelenetManager_1 = require("./JelenetManager");
var Splash = /** @class */ (function (_super) {
    __extends(Splash, _super);
    function Splash() {
        var _this = _super.call(this) || this;
        _this.logo = PIXI.Sprite.fromImage("kp/bcube.png");
        _this.addChild(_this.logo);
        _this.logo.anchor.x = 0.5;
        _this.logo.anchor.y = 0.5;
        _this.logo.alpha = 0;
        _this.logo.position.x = 400;
        _this.logo.position.y = 300;
        return _this;
    }
    Splash.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.logo.alpha < 1)
            this.logo.alpha += 0.01;
        else
            JelenetManager_1.JelenetManager.startJelenet('menu');
    };
    return Splash;
}(Jelenet_1.Jelenet));
exports.Splash = Splash;
