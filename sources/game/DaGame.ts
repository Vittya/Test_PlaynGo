import {Jelenet} from "./Jelenet";
import {Hajo} from "../game_entities/Hajo";
import {Tavoli} from "../game_entities/Tavoli";
import {Kozeli} from "../game_entities/Kozeli";
import {HiggsBozon} from "../large_hadron_collider/HiggsBozon";
import {Impulse} from "../large_hadron_collider/Impulse";
import {Util} from "../eszk/Util";
import {EZkey} from "../eszk/EZkey";
import {Enemy} from "../game_entities/ai/Enemy";
import {Vektor} from "../eszk/Vektor";
import {Rocket} from "../game_entities/Rocket";
import {JelenetManager} from "./JelenetManager";
import {GameOver} from "./GameOver";

export class DaGame extends Jelenet {

    private hajo: Hajo;
    private tavoli: Tavoli;
    private kozeli: Kozeli;
    private i: number;
    private X: number;
    private Y: number;

    private delta: number = 0;
    private preDelta: number = 0;

    private input: EZkey;

    private enemy: Enemy;
    private enemyPool: any = [];


    constructor() {
        super();

        this.input = new EZkey();
        this.input.addKey(38, () => this.hajo.impulseEngine());
        this.input.addKey(37, () => this.hajo.lateralThrust(-0.1));
        this.input.addKey(39, () => this.hajo.lateralThrust(0.1));

        this.i = 0;
        this.kozeli = new Kozeli(this);
        this.tavoli = new Tavoli(this);
        this.hajo = new Hajo(this);

        this.interactive = true;


        //this.enemy = new Enemy(this);




    }


    public update() {
        super.update();

        this.delta = (new Date().getTime() - this.preDelta) / 1000;
        this.preDelta = Date.now();

        setTimeout(this.emitter(),10000);

        this.input.inputLoop();

        this.tavoli.update();
        this.kozeli.update();
        //this.enemy.update();



        this.hajo.update();


        //score
        for (let i = 0; i < this.hajo.tar.length; i++) {

            for (let c = 0; c < this.enemyPool.length - 1; c++) {
                if (Util.excuse4SAT(
                    this.hajo.tar[i].sprite().position.x,//this.hajo.getB().grafix().x,
                    this.hajo.tar[i].sprite().position.y,//this.hajo.getB().grafix().y,
                    this.enemyPool[c].b.grafix().x,
                    this.enemyPool[c].b.grafix().y) == true) {

                    console.log(" rX ");
                 this.hajo.tar[i].vege();
                 this.enemyPool[c].vege();

                 this.enemyPool.splice(c,1);
                 //this.hajo.tar.splice(i,1);

                }
            }
        }


        for (let b = 0; b < this.enemyPool.length; b++) {

            if (Util.excuse4SAT(
                this.hajo.getB().grafix().x,
                this.hajo.getB().grafix().y,
                this.enemyPool[b].b.grafix().x,
                this.enemyPool[b].b.grafix().y) == true) {

                this.hajo.sprite().visible = false;
                JelenetManager.initJelenet("GO", GameOver);
                JelenetManager.startJelenet("GO");
            }
        }
    }


    //this.emitter();


    /* if(Util.excuse4SAT(
         this.hajo.tar[0].sprite().x,
         this.hajo.tar[0].sprite().y,
         this.enemy.b.grafix().x,
         this.enemy.b.grafix().y)==true)

         console.log(" BOOM");
 */

    /*
      for (let b = this.hajo.tar.length - 1; b >= 0; b--) {


                 if (Util.intersector(this.hajo.tar[b].sprite(), this.enemyPool[i].sprite())) {
                     this.hajo.tar[b].vege();
                     this.hajo.tar.splice(b,1);
                     this.enemyPool.splice(i,1);
                     console.log("SIKER");
                 }

             }



    if(this.i<this.bozon.length-1)
         this.i++;
     else
         this.i=0;
     this.bozon[this.i].update();

 */


    private emitter(): void {

        this.enemyPool.push(new Enemy(this));

        for (let k = 0; k < this.enemyPool.length; k++) this.enemyPool[k].update();

    }


    private ffff():void{
        for (let i = 0; i < this.enemyPool.length - 1; i++) {
            for (let j = 0; j < this.hajo.tar.length - 1; j++) {

                this.enemyPool[i].update();
                if (this.enemyPool[i] === undefined) {
                    this.enemyPool[i] = new Enemy(this);
                }
                else if (Util.excuse4SAT(
                    this.enemyPool[i].b.grafix().x,
                    this.enemyPool[i].b.grafix().y,
                    this.hajo.tar[j].sprite().position.x,
                    this.hajo.tar[j].sprite().position.y)) {

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

