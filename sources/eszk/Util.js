"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.vltln = function (lega, legf) {
        return Math.floor(Math.random() * (lega - legf + 1) + lega);
    };
    Util.polarbolCart = function (o, szg) {
        var tmb = [];
        var x = o * Math.cos(szg);
        var y = o * Math.sin(szg);
        tmb = [x, y];
        return tmb;
    };
    Util.cartbolPolar = function (x, y) {
        var tmb = [];
        var o = Math.sqrt((Math.pow(x, 2) * Math.pow(y, 2)));
        var szg = Math.atan2(y, x);
        tmb = [o, szg];
        return tmb;
    };
    Util.intersector = function (rectA, rectB) {
        var combinedHalfWidths, combinedHalfHeights, vx, vy;
        var intersects = false;
        rectA.centerX = rectA.x + rectA.width / 2;
        rectA.centerY = rectA.y + rectA.height / 2;
        rectB.centerX = rectB.x + rectB.width / 2;
        rectB.centerY = rectB.y + rectB.height / 2;
        rectA.halfWidth = rectA.width / 2;
        rectA.halfHeight = rectA.height / 2;
        rectB.halfWidth = rectB.width / 2;
        rectB.halfHeight = rectB.height / 2;
        vx = rectA.centerX - rectB.centerX;
        vy = rectA.centerY - rectB.centerY;
        combinedHalfWidths = rectA.halfWidth + rectB.halfWidth;
        combinedHalfHeights = rectA.halfHeight + rectB.halfHeight;
        if (Math.abs(vx) < combinedHalfWidths) {
            if (Math.abs(vy) < combinedHalfHeights) {
                intersects = true;
            }
            else {
                intersects = false;
            }
        }
        else {
            intersects = false;
        }
        return intersects;
    };
    Util.collision = function (a, b) {
        a.calculateBounds();
        b.calculateBounds();
        var aX1 = a.getLocalBounds().x;
        var aY1 = a.getLocalBounds().y;
        var aX2 = a.getLocalBounds().x + a.getLocalBounds().width;
        var aY2 = a.getLocalBounds().y - a.getLocalBounds().height;
        var bX1 = b.getLocalBounds().x;
        var bY1 = b.getLocalBounds().y;
        var bX2 = b.getLocalBounds().x + b.getLocalBounds().width;
        var bY2 = b.getLocalBounds().y - b.getLocalBounds().height;
        return (aX1 < bX2 && aX2 > bX1 && aY1 > bY2 && aY2 < bY1);
    };
    return Util;
}());
exports.Util = Util;
