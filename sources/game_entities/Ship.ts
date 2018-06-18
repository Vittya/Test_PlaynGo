import {SpaceCraft} from "./SpaceCraft";
import {Util} from "../eszk/Util";
import {Rocket} from "./Rocket";
import {ViewProvider} from "../game/ViewProvider";
import {HiggsBozon} from "../large_hadron_collider/HiggsBozon";
import {Bounding} from "./Bounding";
import {Explosion} from "../large_hadron_collider/Explosion";

export class Ship extends SpaceCraft{

    private anchX:number;
    private anchY:number;
    private rocket:Rocket;
    public mag:Rocket[]=[];
    public gun:PIXI.particles.ParticleContainer;
    public static aim:number;
    private ss:PIXI.Container;
    public end:boolean=false;
    private b:Bounding;
    private bozon:any = new Array(30);
    private m:number=10;
    private d:number=9;
    private n:number=2;

    constructor(s:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/ufo.png"));

        this.b = new Bounding(this.sprite().x,this.sprite().y,20);
        this.ss=s;
        this.anchX=0.5;
        this.anchY=0.5;
        this.sprite().anchor.x=this.anchX;
        this.sprite().anchor.y=this.anchY;
        this.sprite().position.x=100;
        this.sprite().position.y=300;
        this.gun = new PIXI.particles.ParticleContainer();


    const someFunc = () => {

                this.rocket = new Rocket(this.sprite().position.x, this.sprite().position.y, this.gun);
                Ship.aim = this.turnInPosition(this.sprite().position.x, this.sprite().position.y);
                this.mag.push(this.rocket);

    };


    s.addChild(this.gun);
    s.addChild(this.b.grafix());
    s.addChild(this.sprite());
        this.ss.on("mousedown", someFunc, this.ss);

    }
    //@Override
    update(): void {

        this.fire();

        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;

        Ship.aim=this.turnInPosition(this.sprite().position.x,this.sprite().position.y);

        for(let i=0;i<30;i++) {

            if(this.bozon[i]) {
                this.bozon[i].update();

                if (this.bozon[i].end()) {
                    this.ss.removeChild(this.bozon[i].grafix());
                    this.bozon.splice(i,1);
                }
            }
        }

    }

    public lateralThrust(impulse:number):void{

            this.sprite().rotation += impulse;
            if (this.sprite().rotation < 0) {
                this.sprite().rotation += Math.PI * 2;
            }

    }

    public getB():Bounding{
        return this.b;
    }


    public impulseEngine():void {

           this.sprite().position.x+=Util.polarToCartesian(10,this.sprite().rotation)[0];
           this.sprite().position.y+=Util.polarToCartesian(10,this.sprite().rotation)[1];

        for(let i=0;i<30;i++) {
            if (this.bozon[i] === undefined) {
                this.bozon[i] = new HiggsBozon(
                    this.sprite().position.x,
                    this.sprite().position.y
                );
                this.ss.addChild(this.bozon[i].grafix());
            }
        }


        }

    public fire():void{

        for(var b=this.mag.length-1; b>=0; b--) {

            if(this.mag[b]!=undefined&&this.mag[b].isOutside==false)
            this.mag[b].update();

        }
    }


    public turnInPosition(x:number, y:number):number{

        let tavY = ViewProvider.renderer.plugins.interaction.mouse.global.y - y;
        let tavX = ViewProvider.renderer.plugins.interaction.mouse.global.x - x;
        let szg = Util.cartesianToPolar(tavX,tavY)[1];
        return szg;
    }


    public emitter():void {

        for (let q = 0; q < Math.PI * this.d; q +=0.2) {
            let k = this.n / this.d;

            let s = Math.cos(k * q) * this.m;
            new Explosion(Util.polarToCartesian(s, q)[0] + this.sprite().position.x,
                Util.polarToCartesian(s, q)[1] + this.sprite().position.y, this.ss).update();

        }

        this.m+=10;
        var ii = setTimeout(() => this.emitter(), 200);
        if(this.m>100){
            this.sprite().interactive=false;
            this.ss.removeChildren(3);
            this.end=true;
            clearTimeout(ii);
        }

    }


}