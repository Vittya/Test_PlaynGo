import {View} from "./View";
import {Ship} from "../game_entities/Ship";
import {Far} from "../game_entities/Far";
import {Close} from "../game_entities/Close";
import {HiggsBozon} from "../large_hadron_collider/HiggsBozon";
import {Impulse} from "../large_hadron_collider/Impulse";
import {Util} from "../eszk/Util";
import {EZkey} from "../eszk/EZkey";
import {Enemy} from "../game_entities/enemy/Enemy";
import {Vektor} from "../eszk/Vektor";
import {Rocket} from "../game_entities/Rocket";
import {ViewProvider} from "./ViewProvider";
import {GameOver} from "./GameOver";
import {Explosion} from "../large_hadron_collider/Explosion";

export class DaGame extends View {

    private hajo: Ship;
    private tavoli: Far;
    private kozeli: Close;
    private i: number;


    private delta: number = 0;
    private preDelta: number = 0;

    private input: EZkey;


    private enemyPool: any = [];


    constructor() {
        super();

        this.input = new EZkey();
        this.input.addKey(38, () => this.hajo.impulseEngine());
        this.input.addKey(37, () => this.hajo.lateralThrust(-0.1));
        this.input.addKey(39, () => this.hajo.lateralThrust(0.1));

        this.i = 0;
        this.kozeli = new Close(this);
        this.tavoli = new Far(this);
        this.hajo = new Ship(this);


        this.interactive = true;




        setTimeout(()=>this.emitter(),2000);


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

        this.tavoli.update();
        this.kozeli.update();



        this.hajo.update();


        for (let i = 0; i < this.hajo.tar.length; i++) {

            for (let c = 0; c < this.enemyPool.length - 1; c++) {
                if (this.hajo.tar[i]!=undefined&&Util.excuse4SAT(
                    this.hajo.tar[i].sprite().position.x,//this.hajo.getB().grafix().x,
                    this.hajo.tar[i].sprite().position.y,//this.hajo.getB().grafix().y,
                    this.enemyPool[c].b.grafix().x,
                    this.enemyPool[c].b.grafix().y,
                    this.hajo.tar[i].b.s,
                    this.enemyPool[c].b.s) == true) {

                    console.log(" rX ");
                 this.hajo.tar[i].vege();
                 this.enemyPool[c].vege();
                 this.enemyPool.splice(c,1);
                 this.hajo.tar.splice(i,1);

                }
            }
        }


        for (let b = 0; b < this.enemyPool.length; b++) {

            if (Util.excuse4SAT(
                this.hajo.getB().grafix().x,
                this.hajo.getB().grafix().y,
                this.enemyPool[b].b.grafix().x,
                this.enemyPool[b].b.grafix().y,
                this.hajo.getB().s,
                this.enemyPool[b].b.s) == true) {

                this.hajo.sprite().visible = false;

                this.hajo.emitter();

            }
        }


        if(this.hajo.end) {
            ViewProvider.initJelenet("GO", GameOver);
            ViewProvider.startJelenet("GO");
        }
    }


    private emitter(): void {
    //2 sec as specified
        this.enemyPool.push(new Enemy(this));
        setTimeout(()=>this.emitter(),2000);
    }




}

