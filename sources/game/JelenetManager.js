"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Jelenet_1 = require("./Jelenet");
var JelenetManager = /** @class */ (function () {
    function JelenetManager() {
    }
    //érdekelne h itt mi a visszatérési érték fajtája...ez lenne az any??
    JelenetManager.onCreate = function (sz, h) {
        if (JelenetManager.renderer != null)
            return this;
        JelenetManager.renderer = PIXI.autoDetectRenderer(sz, h);
        document.body.appendChild(JelenetManager.renderer.view);
        requestAnimationFrame(JelenetManager.update);
        return this;
    };
    JelenetManager.update = function () {
        //rekurz
        requestAnimationFrame(function () { JelenetManager.update(); });
        if (!JelenetManager.mostJelenet || JelenetManager.mostJelenet.getIsPaused())
            return;
        JelenetManager.mostJelenet.update();
        JelenetManager.renderer.render(JelenetManager.mostJelenet);
    };
    //lamb monoid
    JelenetManager.initJelenet = function (id, J) {
        if (J === void 0) { J = Jelenet_1.Jelenet; }
        if (JelenetManager.jelentTMB[id])
            return undefined;
        var j = new J();
        JelenetManager.jelentTMB[id] = j;
        return j;
    };
    JelenetManager.startJelenet = function (id) {
        if (JelenetManager.jelentTMB[id]) {
            JelenetManager.mostJelenet = JelenetManager.jelentTMB[id];
            if (JelenetManager.jelentTMB[id])
                JelenetManager.mostJelenet.onPause();
            JelenetManager.mostJelenet.onResume();
            return true;
        }
        return false;
    };
    //sajnos es5ön még nem gondoltak a Map<>re
    JelenetManager.jelentTMB = {};
    return JelenetManager;
}());
exports.JelenetManager = JelenetManager;
