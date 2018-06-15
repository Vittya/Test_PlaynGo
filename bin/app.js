define("game/Jelenet", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Jelenet extends PIXI.Container {
        constructor() {
            super();
            this.isPaused = false;
            this.updateThisShit = function () { };
            console.log('shit son');
        }
        update() {
            this.updateThisShit();
        }
        onPause() {
            this.isPaused = true;
        }
        onResume() {
            this.isPaused = false;
        }
        getIsPaused() {
            return this.isPaused;
        }
    }
    exports.Jelenet = Jelenet;
});
define("game/JelenetManager", ["require", "exports", "game/Jelenet"], function (require, exports, Jelenet_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class JelenetManager {
        static onCreate(sz, h) {
            if (JelenetManager.renderer != null)
                return this;
            JelenetManager.renderer = PIXI.autoDetectRenderer(sz, h);
            document.body.appendChild(JelenetManager.renderer.view);
            requestAnimationFrame(JelenetManager.update);
            return this;
        }
        static update() {
            requestAnimationFrame(function () { JelenetManager.update(); });
            if (!JelenetManager.mostJelenet || JelenetManager.mostJelenet.getIsPaused())
                return;
            JelenetManager.mostJelenet.update();
            JelenetManager.renderer.render(JelenetManager.mostJelenet);
        }
        static initJelenet(id, J = Jelenet_1.Jelenet) {
            let j = new J();
            JelenetManager.jelentTMB[id] = j;
            return j;
        }
        static startJelenet(id) {
            if (JelenetManager.jelentTMB[id]) {
                JelenetManager.mostJelenet = JelenetManager.jelentTMB[id];
                if (JelenetManager.jelentTMB[id])
                    JelenetManager.mostJelenet.onPause();
                JelenetManager.mostJelenet.onResume();
                return true;
            }
            return false;
        }
    }
    JelenetManager.jelentTMB = {};
    exports.JelenetManager = JelenetManager;
});
define("eszk/Vektor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vektor {
        constructor(x = 0, y = 0) {
            this.x = 0;
            this.y = 0;
            this.magnitude = () => {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };
            this.magSq = () => {
                return this.x * this.x + this.y * this.y;
            };
            this.normalize = () => {
                var len = Math.sqrt(this.x * this.x + this.y * this.y);
                this.x /= len;
                this.y /= len;
                return this;
            };
            this.zero = () => {
                this.x = 0;
                this.y = 0;
            };
            this.copy = (point) => {
                this.x = point.x;
                this.y = point.y;
            };
            this.duplicate = () => {
                var dup = new Vektor(this.x, this.y);
                return dup;
            };
            this.rotate = (radians) => {
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);
                var x = (cos * this.x) + (sin * this.y);
                var y = (cos * this.y) - (sin * this.x);
                this.x = x;
                this.y = y;
            };
            this.rotate90 = () => {
                var x = -this.y;
                var y = this.x;
                this.x = x;
                this.y = y;
            };
            this.getAngle = () => {
                return Math.atan2(this.x, this.y);
            };
            this.multiply = (value) => {
                this.x *= value;
                this.y *= value;
            };
            this.add = (value) => {
                this.x += value.x;
                this.y += value.y;
            };
            this.subtract = (value) => {
                this.x -= value.x;
                this.y -= value.y;
            };
            this.dot = (vec) => {
                return this.x * vec.x + this.y * vec.y;
            };
            this.project = (onto) => {
                var proj = this.duplicate();
                var d = onto.magSq();
                if (d != 0) {
                    var mult = new Vektor(onto.x, onto.y);
                    mult.multiply(proj.dot(onto) / d);
                    return mult;
                }
                return onto;
            };
            this.x = x;
            this.y = y;
        }
    }
    exports.Vektor = Vektor;
});
define("game_entities/SpaceCraft", ["require", "exports", "eszk/Vektor"], function (require, exports, Vektor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpaceCraft {
        constructor(t) {
            this.position = new Vektor_1.Vektor();
            this.texture = t;
            this._sprite = new PIXI.Sprite(this.texture);
        }
        sprite() {
            return this._sprite;
        }
    }
    exports.SpaceCraft = SpaceCraft;
});
define("game_entities/Bounding", ["require", "exports", "eszk/Vektor"], function (require, exports, Vektor_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Bounding extends PIXI.Graphics {
        constructor(x, y) {
            super();
            this.alfa = 100;
            this.circle = new Vektor_2.Vektor(x, y);
            this.graphix = new PIXI.Graphics();
            this.graphix.beginFill(0x444, this.alfa);
            this.graphix.drawCircle(this.circle.x, this.circle.y, 20);
            this.graphix.endFill();
        }
        update(x, y) {
            this.graphix.position.x = x;
            this.graphix.position.y = y;
        }
        grafix() {
            return this.graphix;
        }
    }
    exports.Bounding = Bounding;
});
define("eszk/Util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Util {
        static vltln(lega, legf) {
            return Math.floor(Math.random() * (lega - legf + 1) + lega);
        }
        static polarbolCart(o, szg) {
            let tmb = [];
            let x = o * Math.cos(szg);
            let y = o * Math.sin(szg);
            tmb = [x, y];
            return tmb;
        }
        static cartbolPolar(x, y) {
            let tmb = [];
            let o = Math.sqrt((Math.pow(x, 2) * Math.pow(y, 2)));
            let szg = Math.atan2(y, x);
            tmb = [o, szg];
            return tmb;
        }
        static intersector(rectA, rectB) {
            let combinedHalfWidths, combinedHalfHeights, vx, vy;
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
        }
        static collision(a, b) {
            a.calculateBounds();
            b.calculateBounds();
            let aX1 = a.getLocalBounds().left;
            let aY1 = a.getLocalBounds().top;
            let aX2 = a.getLocalBounds().right;
            let aY2 = a.getLocalBounds().bottom;
            let bX1 = b.getLocalBounds().left;
            let bY1 = b.getLocalBounds().top;
            let bX2 = b.getLocalBounds().right;
            let bY2 = b.getLocalBounds().bottom;
            return (aX1 < bX2 && aX2 > bX1 && aY1 < bY2 && aY2 > bY1);
        }
        static excuse4SAT(ax, ay, bx, by) {
            let A = (ax - bx);
            let B = (ay - by);
            let C = A * A + B * B;
            let divergent = Math.sqrt(C);
            return (divergent < 20 + 20);
        }
    }
    exports.Util = Util;
});
define("game_entities/Rocket", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util", "game_entities/Hajo", "game_entities/Bounding"], function (require, exports, SpaceCraft_1, Util_1, Hajo_1, Bounding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rocket extends SpaceCraft_1.SpaceCraft {
        constructor(x, y, ss) {
            super(PIXI.Texture.fromImage("kp/lvdk.png"));
            this.ss = ss;
            this.sprite().anchor.x = 0.5;
            this.sprite().anchor.y = 0.5;
            this.sprite().position.x = x;
            this.sprite().position.y = y;
            this.x = x;
            this.y = y;
            this.sprite().rotation = Hajo_1.Hajo.aim;
            this.angle = Hajo_1.Hajo.aim;
            this.b = new Bounding_1.Bounding(this.sprite().x, this.sprite().y);
            this.ss.addChild(this.sprite());
        }
        update() {
            this.sprite().position.x += Util_1.Util.polarbolCart(10, this.angle)[0];
            this.sprite().position.y += Util_1.Util.polarbolCart(10, this.angle)[1];
            console.log("ROCKET UPDATE");
            if (Math.abs(Util_1.Util.cartbolPolar(this.sprite().position.x, this.sprite().position.y)[0] -
                Util_1.Util.cartbolPolar(this.x, this.y)[0]) > 1000000)
                this.vege();
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
        }
        vege() {
            this.ss.removeChild(this.sprite());
        }
    }
    exports.Rocket = Rocket;
});
define("large_hadron_collider/HiggsBozon", ["require", "exports", "eszk/Util"], function (require, exports, Util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HiggsBozon extends PIXI.Graphics {
        constructor(x, y) {
            super();
            this.alfa = 100;
            this.x = x;
            this.cX = x;
            this.cY = y;
            this.y = y;
            this.graphix = new PIXI.Graphics();
            this.graphix.beginFill(0x444, this.alfa);
            this.graphix.drawCircle(x, y, 2);
            this.graphix.endFill();
        }
        update() {
            this.graphix.position.x += Util_2.Util.polarbolCart(1, Util_2.Util.vltln(-22.5, 22.5))[0];
            this.graphix.position.y += Util_2.Util.polarbolCart(1, Util_2.Util.vltln(-22.5, 22.5))[1];
            this.alfa -= 10;
            this.graphix.alpha = this.alfa;
        }
        grafix() {
            return this.graphix;
        }
        vege() {
            if (this.alfa < 0)
                return true;
            else
                return false;
        }
    }
    exports.HiggsBozon = HiggsBozon;
});
define("game_entities/Hajo", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util", "game_entities/Rocket", "game/JelenetManager", "eszk/Vektor", "large_hadron_collider/HiggsBozon", "game_entities/Bounding"], function (require, exports, SpaceCraft_2, Util_3, Rocket_1, JelenetManager_1, Vektor_3, HiggsBozon_1, Bounding_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hajo extends SpaceCraft_2.SpaceCraft {
        constructor(s) {
            super(PIXI.Texture.fromImage("kp/spsh.png"));
            this.speed = 0;
            this.tar = [];
            this.end = false;
            this.bozon = new Array(30);
            this.acceleration = new Vektor_3.Vektor(0, 0);
            this.direction = new Vektor_3.Vektor(1, 0);
            this.filler = new Vektor_3.Vektor(0, 0);
            this.b = new Bounding_2.Bounding(this.sprite().x, this.sprite().y);
            this.ss = s;
            this.horgX = 0.5;
            this.horgY = 0.5;
            this.sprite().anchor.x = this.horgX;
            this.sprite().anchor.y = this.horgY;
            this.sprite().position.x = 100;
            this.sprite().position.y = 300;
            this.agyu = new PIXI.particles.ParticleContainer();
            const someFunc = () => {
                this.rocket = new Rocket_1.Rocket(this.sprite().position.x, this.sprite().position.y, this.agyu);
                Hajo.aim = this.iranybaFordul(this.sprite().position.x, this.sprite().position.y);
                this.tar.push(this.rocket);
            };
            s.addChild(this.sprite());
            s.addChild(this.agyu);
            s.addChild(this.b.grafix());
            this.ss.on("mousedown", someFunc, this.ss);
        }
        update() {
            this.fire();
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
            Hajo.aim = this.iranybaFordul(this.sprite().position.x, this.sprite().position.y);
            for (let i = 0; i < 30; i++) {
                if (this.bozon[i]) {
                    this.bozon[i].update();
                    if (this.bozon[i].vege()) {
                        this.ss.removeChild(this.bozon[i].grafix());
                        this.bozon.splice(i, 1);
                    }
                }
            }
        }
        lateralThrust(impulse) {
            this.sprite().rotation += impulse;
            if (this.sprite().rotation < 0) {
                this.sprite().rotation += Math.PI * 2;
            }
            this.direction.x = 1;
            this.direction.y = 0;
            this.direction.rotate(-this.sprite().rotation);
        }
        getB() {
            return this.b;
        }
        impulseEngine() {
            this.sprite().position.x += Util_3.Util.polarbolCart(10, this.sprite().rotation)[0];
            this.sprite().position.y += Util_3.Util.polarbolCart(10, this.sprite().rotation)[1];
            for (let i = 0; i < 30; i++) {
                if (this.bozon[i] === undefined) {
                    this.bozon[i] = new HiggsBozon_1.HiggsBozon(this.sprite().position.x, this.sprite().position.y);
                    this.ss.addChild(this.bozon[i].grafix());
                }
            }
        }
        fire() {
            for (var b = this.tar.length - 1; b >= 0; b--) {
                this.tar[b].update();
            }
        }
        iranybaFordul(x, y) {
            let tavY = JelenetManager_1.JelenetManager.renderer.plugins.interaction.mouse.global.y - y;
            let tavX = JelenetManager_1.JelenetManager.renderer.plugins.interaction.mouse.global.x - x;
            let szg = Util_3.Util.cartbolPolar(tavX, tavY)[1];
            return szg;
        }
    }
    exports.Hajo = Hajo;
});
define("game_entities/Background", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Background {
        constructor(t, sz, h) {
            this.texture = t;
            this.tSprite = new PIXI.extras.TilingSprite(t, sz, h);
        }
        tilinSprite() {
            return this.tSprite;
        }
    }
    exports.Background = Background;
});
define("game_entities/Tavoli", ["require", "exports", "game_entities/Background"], function (require, exports, Background_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Tavoli extends Background_1.Background {
        constructor(s) {
            super(PIXI.Texture.fromImage("kp/törmelék.png"), 800, 600);
            this.tilinSprite().tilePosition.x = -100;
            this.tilinSprite().tilePosition.y = -100;
            s.addChild(this.tilinSprite());
        }
        update() {
            this.tilinSprite().tilePosition.x -= 0.64;
        }
    }
    exports.Tavoli = Tavoli;
});
define("game_entities/Kozeli", ["require", "exports", "game_entities/Background"], function (require, exports, Background_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Kozeli extends Background_2.Background {
        constructor(s) {
            super(PIXI.Texture.fromImage("kp/messziHttr.jpg"), 1800, 1600);
            this.tilinSprite().tilePosition.x = -100;
            this.tilinSprite().tilePosition.y = -100;
            s.addChild(this.tilinSprite());
        }
        update() {
            this.tilinSprite().tilePosition.x -= 0.128;
        }
    }
    exports.Kozeli = Kozeli;
});
define("large_hadron_collider/Impulse", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util"], function (require, exports, SpaceCraft_3, Util_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Impulse extends SpaceCraft_3.SpaceCraft {
        constructor(s, x, y) {
            super(PIXI.Texture.fromImage("kp/bcube.png"));
            this.sprite().anchor.x = 0.5;
            this.sprite().anchor.y = 0.5;
            this.sprite().position.x = 900;
            this.sprite().position.y = Util_4.Util.vltln(500, 100);
            this.sprite().alpha = 1;
            this.s = s;
            this.s.addChild(this.sprite());
        }
        update() {
            this.sprite().position.x--;
            if (this.sprite().alpha < 0)
                this.vege();
        }
        vege() {
            this.s.removeChild(this.sprite());
        }
    }
    exports.Impulse = Impulse;
});
define("eszk/EZkey", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EZkey {
        constructor() {
            this.EZcallback = {};
            this.keyDown = {};
            this.addKey = (keycode, f) => {
                this.EZcallback[keycode] = f;
                this.keyDown[keycode] = false;
            };
            this.keyboardDown = (event) => {
                event.preventDefault();
                this.keyDown[event.keyCode] = true;
            };
            this.keyboardUp = (event) => {
                this.keyDown[event.keyCode] = false;
            };
            this.inputLoop = () => {
                for (var key in this.keyDown) {
                    var is_down = this.keyDown[key];
                    if (is_down) {
                        var callback = this.EZcallback[key];
                        if (callback != null) {
                            callback();
                        }
                    }
                }
            };
            document.addEventListener('keydown', this.keyboardDown);
            document.addEventListener('keyup', this.keyboardUp);
        }
    }
    exports.EZkey = EZkey;
});
define("game_entities/ai/Enemy", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util", "eszk/Vektor", "game_entities/Bounding"], function (require, exports, SpaceCraft_4, Util_5, Vektor_4, Bounding_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enemy extends SpaceCraft_4.SpaceCraft {
        constructor(s) {
            super(PIXI.Texture.fromImage("kp/ruler.png"));
            this.preX = 800;
            this.acceleration = new Vektor_4.Vektor(0, 0);
            this.direction = new Vektor_4.Vektor(1, 0);
            this.filler = new Vektor_4.Vektor(0, 0);
            this.sprite().anchor.x = 0.5;
            this.sprite().anchor.y = 0.5;
            this.preY = this.sprite().position.y;
            this.b = new Bounding_3.Bounding(this.sprite().x, this.sprite().y);
            this.sprite().position.x = 800;
            this.sprite().position.y = 300;
            this.s = s;
            this.s.addChild(this.b.grafix());
        }
        update() {
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
            this.sprite().position.x--;
            this.sprite().position.y += Util_5.Util.vltln(-2, 2);
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
        }
        vege() {
            this.s.removeChild(this.b.grafix());
        }
    }
    exports.Enemy = Enemy;
});
define("game/GameOver", ["require", "exports", "game/JelenetManager", "game/Jelenet"], function (require, exports, JelenetManager_2, Jelenet_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameOver extends Jelenet_2.Jelenet {
        constructor() {
            super();
            this.logo = PIXI.Sprite.fromImage("kp/bcube.png");
            this.addChild(this.logo);
            this.logo.anchor.x = 0.5;
            this.logo.anchor.y = 0.5;
            this.logo.alpha = 0;
            this.logo.position.x = 400;
            this.logo.position.y = 300;
        }
        update() {
            super.update();
            if (this.logo.alpha < 1)
                this.logo.alpha += 0.01;
            else
                JelenetManager_2.JelenetManager.startJelenet('menu');
        }
    }
    exports.GameOver = GameOver;
});
define("game/DaGame", ["require", "exports", "game/Jelenet", "game_entities/Hajo", "game_entities/Tavoli", "game_entities/Kozeli", "eszk/Util", "eszk/EZkey", "game_entities/ai/Enemy", "game/JelenetManager", "game/GameOver"], function (require, exports, Jelenet_3, Hajo_2, Tavoli_1, Kozeli_1, Util_6, EZkey_1, Enemy_1, JelenetManager_3, GameOver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DaGame extends Jelenet_3.Jelenet {
        constructor() {
            super();
            this.delta = 0;
            this.preDelta = 0;
            this.enemyPool = [];
            this.input = new EZkey_1.EZkey();
            this.input.addKey(38, () => this.hajo.impulseEngine());
            this.input.addKey(37, () => this.hajo.lateralThrust(-0.1));
            this.input.addKey(39, () => this.hajo.lateralThrust(0.1));
            this.i = 0;
            this.kozeli = new Kozeli_1.Kozeli(this);
            this.tavoli = new Tavoli_1.Tavoli(this);
            this.hajo = new Hajo_2.Hajo(this);
            this.interactive = true;
        }
        update() {
            super.update();
            this.delta = (new Date().getTime() - this.preDelta) / 1000;
            this.preDelta = Date.now();
            setTimeout(this.emitter(), 10000);
            this.input.inputLoop();
            this.tavoli.update();
            this.kozeli.update();
            this.hajo.update();
            for (let i = 0; i < this.hajo.tar.length; i++) {
                for (let c = 0; c < this.enemyPool.length - 1; c++) {
                    if (Util_6.Util.excuse4SAT(this.hajo.tar[i].sprite().position.x, this.hajo.tar[i].sprite().position.y, this.enemyPool[c].b.grafix().x, this.enemyPool[c].b.grafix().y) == true) {
                        console.log(" rX ");
                        this.hajo.tar[i].vege();
                        this.enemyPool[c].vege();
                        this.enemyPool.splice(c, 1);
                    }
                }
            }
            for (let b = 0; b < this.enemyPool.length; b++) {
                if (Util_6.Util.excuse4SAT(this.hajo.getB().grafix().x, this.hajo.getB().grafix().y, this.enemyPool[b].b.grafix().x, this.enemyPool[b].b.grafix().y) == true) {
                    this.hajo.sprite().visible = false;
                    JelenetManager_3.JelenetManager.initJelenet("GO", GameOver_1.GameOver);
                    JelenetManager_3.JelenetManager.startJelenet("GO");
                }
            }
        }
        emitter() {
            this.enemyPool.push(new Enemy_1.Enemy(this));
            for (let k = 0; k < this.enemyPool.length; k++)
                this.enemyPool[k].update();
        }
        ffff() {
            for (let i = 0; i < this.enemyPool.length - 1; i++) {
                for (let j = 0; j < this.hajo.tar.length - 1; j++) {
                    this.enemyPool[i].update();
                    if (this.enemyPool[i] === undefined) {
                        this.enemyPool[i] = new Enemy_1.Enemy(this);
                    }
                    else if (Util_6.Util.excuse4SAT(this.enemyPool[i].b.grafix().x, this.enemyPool[i].b.grafix().y, this.hajo.tar[j].sprite().position.x, this.hajo.tar[j].sprite().position.y)) {
                        this.enemyPool[i].vege();
                        this.hajo.tar[j].vege();
                        this.hajo.tar.splice(j, 1);
                        this.enemyPool[i].splice(i, 1);
                        return this.emitter();
                    }
                }
            }
        }
    }
    exports.DaGame = DaGame;
});
define("game/Splash", ["require", "exports", "game/Jelenet", "game/JelenetManager"], function (require, exports, Jelenet_4, JelenetManager_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Splash extends Jelenet_4.Jelenet {
        constructor() {
            super();
            this.logo = PIXI.Sprite.fromImage("kp/bcube.png");
            this.addChild(this.logo);
            this.logo.anchor.x = 0.5;
            this.logo.anchor.y = 0.5;
            this.logo.alpha = 0;
            this.logo.position.x = 400;
            this.logo.position.y = 300;
        }
        update() {
            super.update();
            if (this.logo.alpha < 1)
                this.logo.alpha += 0.01;
            else
                JelenetManager_4.JelenetManager.startJelenet('menu');
        }
    }
    exports.Splash = Splash;
});
define("eszk/MahButton", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MahButton extends PIXI.Sprite {
        constructor(x, y, width, height) {
            super();
            this.onCreate(x, y, width, height);
        }
        onCreate(x, y, width, height) {
            let gfx = new PIXI.Graphics();
            gfx.beginFill(0xffffff, 1);
            gfx.drawRoundedRect(0, 0, width, height, height / 5);
            gfx.endFill();
            this.texture = gfx.generateCanvasTexture();
            this.x = x;
            this.y = y;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            this._text = new PIXI.Text("");
            this._text.anchor.x = 0.5;
            this._text.anchor.y = 0.5;
            this.addChild(this._text);
            this.interactive = true;
            this.on("mousedown", () => {
                this.onDown();
            }, this);
            this.on("mouseup", () => {
                this.onUp();
            }, this);
            this.on("mouseover", () => {
                this.onHover();
            }, this);
            this.on("mouseout", () => {
                this.onOut();
            }, this);
        }
        setText(val, style) {
            this._text.text = val;
            this._text.style = style;
        }
        onDown() {
            console.log('Clicked');
            this.y += 5;
            this.tint = 0xffffff;
        }
        onUp() {
            console.log('onup');
            if (typeof (this._cb) === 'function') {
                this._cb();
            }
            this.y -= 5;
            this.tint = 0xF8A9F9;
        }
        onHover() {
            console.log('On Hover');
            this.tint = 0xF8A9F9;
            this.scale.x = 1.2;
            this.scale.y = 1.2;
        }
        onOut() {
            console.log('On Out');
            this.tint = 0xffffff;
            this.scale.x = 1;
            this.scale.y = 1;
        }
        get clicked() {
            return this._cb;
        }
        set clicked(cb) {
            this._cb = cb;
        }
    }
    exports.MahButton = MahButton;
});
define("game/Menu", ["require", "exports", "game/Jelenet", "eszk/MahButton", "game/JelenetManager", "game/DaGame"], function (require, exports, Jelenet_5, MahButton_1, JelenetManager_5, DaGame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Menu extends Jelenet_5.Jelenet {
        constructor() {
            super();
            this.gomb = new MahButton_1.MahButton(400, 300, 100, 50);
            this.innit();
        }
        innit() {
            this.gomb.setText("Play!");
            this.addChild(this.gomb);
            this.gomb.clicked = () => {
                if (this.getIsPaused())
                    return;
                console.log('I am clicked');
                JelenetManager_5.JelenetManager.initJelenet("játék", DaGame_1.DaGame);
                JelenetManager_5.JelenetManager.startJelenet('játék');
            };
        }
        update() {
            super.update();
        }
    }
    exports.Menu = Menu;
});
define("App", ["require", "exports", "game/JelenetManager", "game/DaGame", "game/Splash", "game/Menu", "game/GameOver"], function (require, exports, JelenetManager_6, DaGame_2, Splash_1, Menu_1, GameOver_2) {
    "use strict";
    class App {
        constructor() {
            console.log('Hello World');
            JelenetManager_6.JelenetManager.onCreate(800, 600);
            JelenetManager_6.JelenetManager.initJelenet("splash", Splash_1.Splash);
            JelenetManager_6.JelenetManager.initJelenet("menu", Menu_1.Menu);
            JelenetManager_6.JelenetManager.initJelenet("játék", DaGame_2.DaGame);
            JelenetManager_6.JelenetManager.initJelenet("GO", GameOver_2.GameOver);
            JelenetManager_6.JelenetManager.startJelenet("splash");
        }
    }
    return App;
});
//# sourceMappingURL=app.js.map