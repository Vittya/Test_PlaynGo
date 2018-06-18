import {SpaceCraft} from "../SpaceCraft";
import {Util} from "../../eszk/Util";
import {Bounding} from "../Bounding";
import {Explosion} from "../../large_hadron_collider/Explosion";

export class Enemy extends SpaceCraft {

    private readonly s:PIXI.Container;
    private readonly ps:PIXI.particles.ParticleContainer;
    private ar:any = [];
    private preY:number;
    private m:number=50;
    private d:number=1;
    private n:number=2;
    public b: Bounding;

    constructor(s:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/enemy.png"));

        this.sprite().anchor.x=0.5;
        this.sprite().anchor.y=0.5;
        this.preY=this.sprite().position.y;
        this.b = new Bounding(this.sprite().x,this.sprite().y,20);
        this.ps = new PIXI.particles.ParticleContainer();
        this.sprite().position.x=800;
        this.sprite().position.y=300;
        this.s=s;
        this.s.addChild(this.ps);
        this.s.addChild(this.sprite());

    }

    update(): void {


        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;
        this.sprite().position.x--;
        this.sprite().position.y+=Math.sin(Util.randomize(-10,10))*5;
        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;
    }

    public end():void{

            for (let q = 0; q < Math.PI * this.d; q +=0.1) {
            let k = this.n / this.d;
            let s = Math.cos(k * q) * this.m;
            this.ar.push(new Explosion(
                Util.polarToCartesian(s, q)[0] + this.sprite().position.x,
                Util.polarToCartesian(s, q)[1] + this.sprite().position.y, this.s
                )
            );

        }

        this.m+=10;

        let ii=setTimeout(() => this.end(), 20);
        if(this.m>100){

            this.s.removeChild(this.sprite());
            for(let i=0;i<this.ar.length;i++)
            this.s.removeChild(this.ar[i].sprite());
            clearTimeout(ii);
        }


    }


}
