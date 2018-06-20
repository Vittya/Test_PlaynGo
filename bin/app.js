define("game/View", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class View extends PIXI.Container {
        constructor() {
            super();
            this.isPaused = false;
            this.updateThis = function () { };
        }
        update() {
            this.updateThis();
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
    exports.View = View;
});
define("game/ViewProvider", ["require", "exports", "game/View"], function (require, exports, View_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ViewProvider {
        static onCreate(sz, h) {
            if (ViewProvider.renderer != null)
                return this;
            ViewProvider.renderer = PIXI.autoDetectRenderer(sz, h);
            document.body.appendChild(ViewProvider.renderer.view);
            requestAnimationFrame(ViewProvider.update);
            return this;
        }
        static update() {
            requestAnimationFrame(function () { ViewProvider.update(); });
            if (!ViewProvider.viewNow || ViewProvider.viewNow.getIsPaused())
                return;
            ViewProvider.viewNow.update();
            ViewProvider.renderer.render(ViewProvider.viewNow);
        }
        static initView(id, J = View_1.View) {
            let j = new J();
            ViewProvider.viewArray[id] = j;
            return j;
        }
        static startView(id) {
            if (ViewProvider.viewArray[id]) {
                ViewProvider.viewNow = ViewProvider.viewArray[id];
                if (ViewProvider.viewArray[id])
                    ViewProvider.viewNow.onPause();
                ViewProvider.viewNow.onResume();
                return true;
            }
            return false;
        }
    }
    ViewProvider.viewArray = {};
    exports.ViewProvider = ViewProvider;
});
define("game_entities/SpaceCraft", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SpaceCraft {
        constructor(t) {
            this.texture = t;
            this._sprite = new PIXI.Sprite(this.texture);
        }
        sprite() {
            return this._sprite;
        }
    }
    exports.SpaceCraft = SpaceCraft;
});
define("eszk/Util", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Util {
        static randomize(lega, legf) {
            return Math.floor(Math.random() * (lega - legf + 1) + lega);
        }
        static polarToCartesian(o, szg) {
            let tmb = [];
            let x = o * Math.cos(szg);
            let y = o * Math.sin(szg);
            tmb = [x, y];
            return tmb;
        }
        static cartesianToPolar(x, y) {
            let tmb = [];
            let o = Math.sqrt((Math.pow(x, 2) * Math.pow(y, 2)));
            let szg = Math.atan2(y, x);
            tmb = [o, szg];
            return tmb;
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
        static excuse4SAT(ax, ay, bx, by, as, bs) {
            let A = (ax - bx);
            let B = (ay - by);
            let C = A * A + B * B;
            let divergent = Math.sqrt(C);
            return (divergent < as + bs);
        }
    }
    exports.Util = Util;
});
define("eszk/Vektor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Vektor {
        constructor(x = 0, y = 0) {
            this.x = 0;
            this.y = 0;
            this.x = x;
            this.y = y;
        }
    }
    exports.Vektor = Vektor;
});
define("game_entities/Bounding", ["require", "exports", "eszk/Vektor"], function (require, exports, Vektor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Bounding extends PIXI.Graphics {
        constructor(x, y, s) {
            super();
            this.alfa = 100;
            this.circle = new Vektor_1.Vektor(x, y);
            this.s = s;
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
define("game_entities/Rocket", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util", "game_entities/Ship", "game_entities/Bounding"], function (require, exports, SpaceCraft_1, Util_1, Ship_1, Bounding_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Rocket extends SpaceCraft_1.SpaceCraft {
        constructor(x, y, ss) {
            super(PIXI.Texture.fromImage("kp/lvdk.png"));
            this.isOutside = false;
            this.ss = ss;
            this.sprite().anchor.x = 0.5;
            this.sprite().anchor.y = 0.5;
            this.sprite().position.x = x;
            this.sprite().position.y = y;
            this.x = x;
            this.y = y;
            this.sprite().rotation = Ship_1.Ship.aim;
            this.angle = Ship_1.Ship.aim;
            this.b = new Bounding_1.Bounding(this.sprite().x, this.sprite().y, 1.5);
            this.ss.addChild(this.sprite());
        }
        update() {
            this.sprite().position.x += Util_1.Util.polarToCartesian(10, this.angle)[0];
            this.sprite().position.y += Util_1.Util.polarToCartesian(10, this.angle)[1];
            if (Math.abs(Util_1.Util.cartesianToPolar(this.sprite().position.x, this.sprite().position.y)[0] -
                Util_1.Util.cartesianToPolar(this.x, this.y)[0]) > 300000) {
                this.end();
                this.isOutside = true;
            }
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
        }
        end() {
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
            this.graphix.position.x += Util_2.Util.polarToCartesian(1, Util_2.Util.randomize(-22.5, 22.5))[0];
            this.graphix.position.y += Util_2.Util.polarToCartesian(1, Util_2.Util.randomize(-22.5, 22.5))[1];
            this.alfa -= 10;
            this.graphix.alpha = this.alfa;
        }
        grafix() {
            return this.graphix;
        }
        end() {
            if (this.alfa < 0)
                return true;
            else
                return false;
        }
    }
    exports.HiggsBozon = HiggsBozon;
});
define("large_hadron_collider/Explosion", ["require", "exports", "game_entities/SpaceCraft"], function (require, exports, SpaceCraft_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Explosion extends SpaceCraft_2.SpaceCraft {
        constructor(x, y, s) {
            super(PIXI.Texture.fromImage("kp/image823.png"));
            if (s != null)
                this.ss = s;
            this.sprite().position.x = x;
            this.sprite().position.y = y;
            this.ss.addChild(this.sprite());
        }
        update() {
            this.sprite().alpha = 1;
            this.sprite().rotation++;
        }
    }
    exports.Explosion = Explosion;
});
define("game_entities/Ship", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util", "game_entities/Rocket", "game/ViewProvider", "large_hadron_collider/HiggsBozon", "game_entities/Bounding", "large_hadron_collider/Explosion"], function (require, exports, SpaceCraft_3, Util_3, Rocket_1, ViewProvider_1, HiggsBozon_1, Bounding_2, Explosion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Ship extends SpaceCraft_3.SpaceCraft {
        constructor(s) {
            super(PIXI.Texture.fromImage("kp/ufo.png"));
            this.mag = [];
            this.end = false;
            this.bozon = new Array(30);
            this.m = 100;
            this.d = 9;
            this.n = 2;
            this.b = new Bounding_2.Bounding(this.sprite().x, this.sprite().y, 20);
            this.ss = s;
            this.anchX = 0.5;
            this.anchY = 0.5;
            this.sprite().anchor.x = this.anchX;
            this.sprite().anchor.y = this.anchY;
            this.sprite().position.x = 100;
            this.sprite().position.y = 300;
            this.gun = new PIXI.particles.ParticleContainer();
            const someFunc = () => {
                this.rocket = new Rocket_1.Rocket(this.sprite().position.x, this.sprite().position.y, this.gun);
                Ship.aim = this.turnInPosition(this.sprite().position.x, this.sprite().position.y);
                this.mag.push(this.rocket);
            };
            s.addChild(this.gun);
            s.addChild(this.sprite());
            this.ss.on("mousedown", someFunc, this.ss);
        }
        update() {
            this.fire();
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
            Ship.aim = this.turnInPosition(this.sprite().position.x, this.sprite().position.y);
            for (let i = 0; i < 30; i++) {
                if (this.bozon[i]) {
                    this.bozon[i].update();
                    if (this.bozon[i].end()) {
                        this.ss.removeChild(this.bozon[i].grafix());
                        this.bozon.splice(i, 1);
                    }
                }
            }
            this.shipOutofBounds();
        }
        lateralThrust(impulse) {
            this.sprite().rotation += impulse;
            if (this.sprite().rotation < 0) {
                this.sprite().rotation += Math.PI * 2;
            }
        }
        getB() {
            return this.b;
        }
        impulseEngine() {
            this.sprite().position.x += Util_3.Util.polarToCartesian(10, this.sprite().rotation)[0];
            this.sprite().position.y += Util_3.Util.polarToCartesian(10, this.sprite().rotation)[1];
            for (let i = 0; i < 30; i++) {
                if (this.bozon[i] === undefined) {
                    this.bozon[i] = new HiggsBozon_1.HiggsBozon(this.sprite().position.x, this.sprite().position.y);
                    this.ss.addChild(this.bozon[i].grafix());
                }
            }
        }
        fire() {
            for (var b = this.mag.length - 1; b >= 0; b--) {
                if (this.mag[b] != undefined && this.mag[b].isOutside == false)
                    this.mag[b].update();
            }
        }
        turnInPosition(x, y) {
            let tavY = ViewProvider_1.ViewProvider.renderer.plugins.interaction.mouse.global.y - y;
            let tavX = ViewProvider_1.ViewProvider.renderer.plugins.interaction.mouse.global.x - x;
            let szg = Util_3.Util.cartesianToPolar(tavX, tavY)[1];
            return szg;
        }
        emitter() {
            for (let q = 0; q < Math.PI * this.d; q += 0.2) {
                let k = this.n / this.d;
                let s = Math.cos(k * q) * this.m;
                new Explosion_1.Explosion(Util_3.Util.polarToCartesian(s, q)[0] + this.sprite().position.x, Util_3.Util.polarToCartesian(s, q)[1] + this.sprite().position.y, this.ss).update();
            }
            this.m += 10;
            let ii = setTimeout(() => this.emitter(), 200);
            if (this.m > 1000) {
                this.sprite().interactive = false;
                this.ss.removeChildren(3);
                this.end = true;
                clearTimeout(ii);
            }
        }
        shipOutofBounds() {
            if (this.sprite().position.y < -100)
                this.sprite().position.y = 650;
            if (this.sprite().position.y > 700)
                this.sprite().position.y = -50;
            if (this.sprite().position.x < -100)
                this.sprite().position.x = 850;
            if (this.sprite().position.x > 900)
                this.sprite().position.x = -50;
        }
    }
    exports.Ship = Ship;
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
define("game_entities/Far", ["require", "exports", "game_entities/Background"], function (require, exports, Background_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Far extends Background_1.Background {
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
    exports.Far = Far;
});
define("game_entities/Close", ["require", "exports", "game_entities/Background"], function (require, exports, Background_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Close extends Background_2.Background {
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
    exports.Close = Close;
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
                for (let key in this.keyDown) {
                    let is_down = this.keyDown[key];
                    if (is_down) {
                        let callback = this.EZcallback[key];
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
define("game_entities/enemy/Enemy", ["require", "exports", "game_entities/SpaceCraft", "eszk/Util", "game_entities/Bounding", "large_hadron_collider/Explosion"], function (require, exports, SpaceCraft_4, Util_4, Bounding_3, Explosion_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Enemy extends SpaceCraft_4.SpaceCraft {
        constructor(s) {
            super(PIXI.Texture.fromImage("kp/enemy.png"));
            this.ar = [];
            this.m = 10;
            this.d = 1;
            this.n = 2;
            this.sprite().anchor.x = 0.5;
            this.sprite().anchor.y = 0.5;
            this.preY = this.sprite().position.y;
            this.b = new Bounding_3.Bounding(this.sprite().x, this.sprite().y, 20);
            this.ps = new PIXI.particles.ParticleContainer();
            this.sprite().position.x = 800;
            this.sprite().position.y = 300;
            this.s = s;
            this.s.addChild(this.ps);
            this.s.addChild(this.sprite());
        }
        update() {
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
            this.sprite().position.x--;
            this.sprite().position.y += Math.sin(Util_4.Util.randomize(-10, 10)) * 5;
            this.b.grafix().position.x = this.sprite().position.x;
            this.b.grafix().position.y = this.sprite().position.y;
        }
        end() {
            for (let q = 0; q < Math.PI * this.d; q += 0.1) {
                let k = this.n / this.d;
                let s = Math.cos(k * q) * this.m;
                this.ar.push(new Explosion_2.Explosion(Util_4.Util.polarToCartesian(s, q)[0] + this.sprite().position.x, Util_4.Util.polarToCartesian(s, q)[1] + this.sprite().position.y, this.s));
            }
            this.m += 10;
            let ii = setTimeout(() => this.end(), 20);
            if (this.m > 100) {
                this.s.removeChild(this.sprite());
                for (let i = 0; i < this.ar.length; i++)
                    this.s.removeChild(this.ar[i].sprite());
                clearTimeout(ii);
            }
        }
    }
    exports.Enemy = Enemy;
});
define("game/GameOver", ["require", "exports", "game/ViewProvider", "game/View"], function (require, exports, ViewProvider_2, View_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GameOver extends View_2.View {
        constructor() {
            super();
            this.logo = PIXI.Sprite.fromImage("kp/endscreen.jpg");
            this.addChild(this.logo);
            this.logo.alpha = 0;
            this.logo.position.x = 0;
            this.logo.position.y = 75;
        }
        update() {
            super.update();
            if (this.logo.alpha < 1)
                this.logo.alpha += 0.005;
            else
                ViewProvider_2.ViewProvider.startView('menu');
        }
    }
    exports.GameOver = GameOver;
});
define("game/DaGame", ["require", "exports", "game/View", "game_entities/Ship", "game_entities/Far", "game_entities/Close", "eszk/Util", "eszk/EZkey", "game_entities/enemy/Enemy", "game/ViewProvider", "game/GameOver"], function (require, exports, View_3, Ship_2, Far_1, Close_1, Util_5, EZkey_1, Enemy_1, ViewProvider_3, GameOver_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DaGame extends View_3.View {
        constructor() {
            super();
            this.delta = 0;
            this.preDelta = 0;
            this.enemyPool = [];
            this.input = new EZkey_1.EZkey();
            this.input.addKey(38, () => this.ship.impulseEngine());
            this.input.addKey(37, () => this.ship.lateralThrust(-0.1));
            this.input.addKey(39, () => this.ship.lateralThrust(0.1));
            this.i = 0;
            this.close1 = new Close_1.Close(this);
            this.far = new Far_1.Far(this);
            this.ship = new Ship_2.Ship(this);
            this.interactive = true;
            this.iii = setTimeout(() => this.emitter(), 2000);
        }
        update() {
            super.update();
            this.delta = (new Date().getTime() - this.preDelta) / 1000;
            this.preDelta = Date.now();
            for (let k = 0; k < this.enemyPool.length; k++) {
                if (this.enemyPool[k] != undefined)
                    this.enemyPool[k].update();
            }
            this.input.inputLoop();
            this.far.update();
            this.close1.update();
            this.ship.update();
            for (let i = 0; i < this.ship.mag.length; i++) {
                for (let c = 0; c < this.enemyPool.length - 1; c++) {
                    if (this.ship.mag[i] != undefined && Util_5.Util.excuse4SAT(this.ship.mag[i].sprite().position.x, this.ship.mag[i].sprite().position.y, this.enemyPool[c].b.grafix().x, this.enemyPool[c].b.grafix().y, this.ship.mag[i].b.s, this.enemyPool[c].b.s) == true) {
                        this.ship.mag[i].end();
                        this.enemyPool[c].end();
                        this.enemyPool.splice(c, 1);
                        this.ship.mag.splice(i, 1);
                    }
                }
            }
            for (let b = 0; b < this.enemyPool.length; b++) {
                if (Util_5.Util.excuse4SAT(this.ship.getB().grafix().x, this.ship.getB().grafix().y, this.enemyPool[b].b.grafix().x, this.enemyPool[b].b.grafix().y, this.ship.getB().s, this.enemyPool[b].b.s) == true) {
                    this.ship.sprite().visible = false;
                    this.ship.emitter();
                }
            }
            if (this.ship.end) {
                clearTimeout(this.iii);
                ViewProvider_3.ViewProvider.initView("GO", GameOver_1.GameOver);
                ViewProvider_3.ViewProvider.startView("GO");
            }
        }
        emitter() {
            this.enemyPool.push(new Enemy_1.Enemy(this));
            this.iii.setTimeout(() => this.emitter(), 2000);
        }
    }
    exports.DaGame = DaGame;
});
define("game/Splash", ["require", "exports", "game/View", "game/ViewProvider"], function (require, exports, View_4, ViewProvider_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Splash extends View_4.View {
        constructor() {
            super();
            this.logo = PIXI.Sprite.fromImage("kp/mini_logo.png");
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
                ViewProvider_4.ViewProvider.startView('menu');
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
            let g = new PIXI.Graphics();
            g.beginFill(0x738073, 1);
            g.drawRoundedRect(0, 0, width, height, height / 5);
            g.endFill();
            this.texture = g.generateCanvasTexture();
            this.x = x;
            this.y = y;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;
            this.pTxt = new PIXI.Text("");
            this.pTxt.anchor.x = 0.5;
            this.pTxt.anchor.y = 0.5;
            this.addChild(this.pTxt);
            this.interactive = true;
            this.on("mousedown", () => {
                this.onDown();
            }, this);
            this.on("mouseup", () => {
                this.onUp();
            }, this);
            this.on("mouseover", () => {
                this.onTouch();
            }, this);
            this.on("mouseout", () => {
                this.onOut();
            }, this);
        }
        setText(val, style) {
            this.pTxt.text = val;
            this.pTxt.style = style;
        }
        onDown() {
            this.y += 5;
            this.tint = 0xC60000;
        }
        onUp() {
            if (typeof (this.callback) === 'function') {
                this.callback();
            }
            this.y -= 5;
            this.tint = 0xF8F8F8;
        }
        onTouch() {
            this.tint = 0xFF0000;
            this.scale.x = 1.2;
            this.scale.y = 1.2;
        }
        onOut() {
            this.tint = 0xF8F8F8;
            this.scale.x = 1;
            this.scale.y = 1;
        }
        get clicked() {
            return this.callback;
        }
        set clicked(cb) {
            this.callback = cb;
        }
    }
    exports.MahButton = MahButton;
});
define("game/Menu", ["require", "exports", "game/View", "eszk/MahButton", "game/ViewProvider", "game/DaGame"], function (require, exports, View_5, MahButton_1, ViewProvider_5, DaGame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Menu extends View_5.View {
        constructor() {
            super();
            this.bground = PIXI.Texture.fromImage("kp/hatter.jpg");
            let bg = new PIXI.Sprite(this.bground);
            this.addChild(bg);
            this.logo = PIXI.Sprite.fromImage("kp/planet.png");
            this.logo.position.x = 400;
            this.logo.position.y = 200;
            this.logo.anchor.x = 0.5;
            this.logo.anchor.y = 0.5;
            this.ruler = PIXI.Sprite.fromImage("kp/ruler.png");
            this.ruler.position.x = 400;
            this.ruler.position.y = 200;
            this.ruler.anchor.x = 0.1;
            this.addChild(this.ruler);
            this.addChild(this.logo);
            this.b1 = new MahButton_1.MahButton(400, 300, 100, 50);
            this.b2 = new MahButton_1.MahButton(400, 370, 100, 50);
            this.b3 = new MahButton_1.MahButton(400, 440, 100, 50);
            this.exit = new MahButton_1.MahButton(400, 510, 100, 50);
            this.innit();
        }
        innit() {
            this.b1.setText("Game1");
            this.b2.setText("Game2");
            this.b3.setText("Game3");
            this.exit.setText("Exit");
            this.addChild(this.b1);
            this.addChild(this.b2);
            this.addChild(this.b3);
            this.addChild(this.exit);
            this.b1.clicked = () => {
                if (this.getIsPaused())
                    return;
                ViewProvider_5.ViewProvider.initView("játék", DaGame_1.DaGame);
                ViewProvider_5.ViewProvider.startView('játék');
            };
            this.exit.clicked = () => {
                if (this.getIsPaused())
                    return;
                window.location.assign("http://www.playngo.com");
            };
        }
        update() {
            super.update();
            this.logo.rotation += 0.01;
            this.ruler.rotation -= 0.01;
        }
    }
    exports.Menu = Menu;
});
define("App", ["require", "exports", "game/ViewProvider", "game/DaGame", "game/Splash", "game/Menu", "game/GameOver"], function (require, exports, ViewProvider_6, DaGame_2, Splash_1, Menu_1, GameOver_2) {
    "use strict";
    class App {
        constructor() {
            console.log('Init');
            ViewProvider_6.ViewProvider.onCreate(800, 600);
            ViewProvider_6.ViewProvider.initView("splash", Splash_1.Splash);
            ViewProvider_6.ViewProvider.initView("menu", Menu_1.Menu);
            ViewProvider_6.ViewProvider.initView("játék", DaGame_2.DaGame);
            ViewProvider_6.ViewProvider.initView("GO", GameOver_2.GameOver);
            ViewProvider_6.ViewProvider.startView("splash");
        }
    }
    return App;
});
//# sourceMappingURL=app.js.map