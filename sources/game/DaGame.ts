import {View} from "./View";
import {Ship} from "../game_entities/Ship";
import {Far} from "../game_entities/Far";
import {Close} from "../game_entities/Close";
import {Util} from "../eszk/Util";
import {EZkey} from "../eszk/EZkey";
import {Enemy} from "../game_entities/enemy/Enemy";
import {ViewProvider} from "./ViewProvider";
import {GameOver} from "./GameOver";

export class DaGame extends View {

    private ship: Ship;
    private far: Far;
    private close1: Close;
    private i: number;


    private delta: number = 0;
    private preDelta: number = 0;

    private input: EZkey;
    private iii:any;
    private enemyPool: any = [];


    constructor() {
        super();

        this.input = new EZkey();
        this.input.addKey(38, () => this.ship.impulseEngine());
        this.input.addKey(37, () => this.ship.lateralThrust(-0.1));
        this.input.addKey(39, () => this.ship.lateralThrust(0.1));

        this.i = 0;
        this.close1 = new Close(this);
        this.far = new Far(this);
        this.ship = new Ship(this);


        this.interactive = true;

        this.iii = setTimeout(()=>this.emitter(),2000);


    }


    public update() {
        super.update();

        this.delta = (new Date().getTime() - this.preDelta) / 1000;
        this.preDelta = Date.now();

        for (let k = 0; k < this.enemyPool.length; k++) {
            if(this.enemyPool[k]!=undefined)
                this.enemyPool[k].update();
        }

        this.input.inputLoop();
        this.far.update();
        this.close1.update();
        this.ship.update();


        for (let i = 0; i < this.ship.mag.length; i++) {

            for (let c = 0; c < this.enemyPool.length - 1; c++) {
                if (this.ship.mag[i]!=undefined&&Util.excuse4SAT(
                    this.ship.mag[i].sprite().position.x,//this.ship.getB().grafix().x,
                    this.ship.mag[i].sprite().position.y,//this.ship.getB().grafix().y,
                    this.enemyPool[c].b.grafix().x,
                    this.enemyPool[c].b.grafix().y,
                    this.ship.mag[i].b.s,
                    this.enemyPool[c].b.s) == true) {

                    this.ship.mag[i].end();
                    this.enemyPool[c].end();
                    this.enemyPool.splice(c,1);
                    this.ship.mag.splice(i,1);

                }
            }
        }


        for (let b = 0; b < this.enemyPool.length; b++) {

            if (Util.excuse4SAT(
                this.ship.getB().grafix().x,
                this.ship.getB().grafix().y,
                this.enemyPool[b].b.grafix().x,
                this.enemyPool[b].b.grafix().y,
                this.ship.getB().s,
                this.enemyPool[b].b.s) == true) {

                this.ship.sprite().visible = false;

                this.ship.emitter();

            }
        }


        if(this.ship.end) {
            clearTimeout(this.iii);

            ViewProvider.initView("GO", GameOver);
            ViewProvider.startView("GO");
        }
    }


    private emitter(): void {
    //2 sec as specified
        this.enemyPool.push(new Enemy(this));
        setTimeout(()=>this.emitter(),2000);
    }




}

