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
var SpaceCraft_1 = require("../SpaceCraft");
var Util_1 = require("../../eszk/Util");
var Vektor_1 = require("../../eszk/Vektor");
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy(s) {
        var _this = _super.call(this, PIXI.Texture.fromImage("kp/bcube.png")) || this;
        _this.preX = 900;
        _this.acceleration = new Vektor_1.Vektor(0, 0);
        _this.direction = new Vektor_1.Vektor(1, 0);
        _this.filler = new Vektor_1.Vektor(0, 0);
        _this.sprite().position.x = 900;
        _this.sprite().position.y = Util_1.Util.randomize(100, 500);
        _this.sprite().anchor.x = 0.5;
        _this.sprite().anchor.y = 0.5;
        _this.preY = _this.sprite().position.y;
        _this.s = s;
        _this.s.addChild(_this.sprite());
        return _this;
    }
    Enemy.prototype.update = function () {
        if (this.acceleration.x == 0 && this.acceleration.y == 0) {
            this.acceleration.copy(this.direction);
            this.acceleration.multiply(0.1);
        }
        this.filler.copy(this.direction);
        this.filler.multiply(this.speed);
        this.acceleration.add(this.filler);
        if (this.acceleration.magSq() >= 25) {
            this.acceleration.multiply(5 / this.acceleration.magnitude());
        }
        this.sprite().position.x += this.acceleration.x;
        this.sprite().position.y = this.acceleration.y;
        if (Util_1.Util.cartesianToPolar(this.preX, this.preY)[0] < 100)
            this.end();
    };
    Enemy.prototype.vege = function () {
        this.s.removeChild(this.sprite());
    };
    return Enemy;
}(SpaceCraft_1.SpaceCraft));
exports.Enemy = Enemy;
