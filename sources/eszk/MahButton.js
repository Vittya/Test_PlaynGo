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
var MahButton = /** @class */ (function (_super) {
    __extends(MahButton, _super);
    function MahButton(x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.onCreate(x, y, width, height);
        return _this;
    }
    MahButton.prototype.onCreate = function (x, y, width, height) {
        var _this = this;
        // generate the texture
        var gfx = new PIXI.Graphics();
        gfx.beginFill(0xffffff, 1);
        gfx.drawRoundedRect(0, 0, width, height, height / 5);
        gfx.endFill();
        this.texture = gfx.generateCanvasTexture();
        // set the x, y and anchor
        this.x = x;
        this.y = y;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        // create the text object
        this._text = new PIXI.Text("", PIXI.TextStyle.apply("arial"));
        this._text.anchor.x = 0.5;
        this._text.anchor.y = 0.5;
        this.addChild(this._text);
        // set the interactivity to true and assign callback functions
        this.interactive = true;
        this.on("mousedown", function () {
            _this.onDown();
        }, this);
        this.on("mouseup", function () {
            _this.onUp();
        }, this);
        this.on("mouseover", function () {
            _this.onHover();
        }, this);
        this.on("mouseout", function () {
            _this.onOut();
        }, this);
    };
    MahButton.prototype.setText = function (val, style) {
        // Set text to be the value passed as a parameter
        this._text.text = val;
        // Set style of text to the style passed as a parameter
        this._text.style = style;
    };
    MahButton.prototype.onDown = function () {
        console.log('Clicked');
        this.y += 5;
        this.tint = 0xffffff;
    };
    MahButton.prototype.onUp = function () {
        console.log('onup');
        if (typeof (this._cb) === 'function') {
            this._cb();
        }
        this.y -= 5;
        this.tint = 0xF8A9F9;
    };
    MahButton.prototype.onHover = function () {
        console.log('On Hover');
        this.tint = 0xF8A9F9;
        this.scale.x = 1.2;
        this.scale.y = 1.2;
    };
    MahButton.prototype.onOut = function () {
        console.log('On Out');
        this.tint = 0xffffff;
        this.scale.x = 1;
        this.scale.y = 1;
    };
    Object.defineProperty(MahButton.prototype, "clicked", {
        get: function () {
            return this._cb;
        },
        set: function (cb) {
            this._cb = cb;
        },
        enumerable: true,
        configurable: true
    });
    return MahButton;
}(PIXI.Sprite));
exports.MahButton = MahButton;
