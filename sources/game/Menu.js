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
var MahButton_1 = require("../eszk/MahButton");
var JelenetManager_1 = require("./JelenetManager");
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super.call(this) || this;
        _this.gomb = new MahButton_1.MahButton(400, 300, 100, 50);
        return _this;
    }
    Menu.prototype.innit = function () {
        var _this = this;
        this.gomb.setText("Play!");
        this.addChild(this.gomb);
        this.gomb.clicked = function () {
            if (_this.getIsPaused())
                return;
            console.log('I am clicked');
            JelenetManager_1.JelenetManager.startJelenet('játék');
        };
    };
    return Menu;
}(Jelenet_1.Jelenet));
exports.Menu = Menu;
