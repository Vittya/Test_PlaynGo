import {SpaceCraft} from "./SpaceCraft";
import {Util} from "../eszk/Util";
import {Rocket} from "./Rocket";
import {JelenetManager} from "../game/JelenetManager";
import {Vektor} from "../eszk/Vektor";
import {HiggsBozon} from "../large_hadron_collider/HiggsBozon";
import {Bounding} from "./Bounding";

export class Hajo extends SpaceCraft{

    private horgX:number;
    private horgY:number;

    private acceleration:Vektor;
    private direction:Vektor;
    private filler:Vektor;

    private speed:number=0;
    private rocket:Rocket;
    public tar:Rocket[]=[];
    public agyu:PIXI.particles.ParticleContainer;
    public static aim:number;
    private ss:PIXI.Container;

    private end:boolean=false;
    private b:Bounding;

    private bozon:any = new Array(30);



    constructor(s:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/spsh.png"));

        this.acceleration = new Vektor(0,0);
        this.direction = new Vektor(1,0);
        this.filler = new Vektor(0, 0);

        this.b = new Bounding(this.sprite().x,this.sprite().y);

        this.ss=s;
        this.horgX=0.5;
        this.horgY=0.5;




    this.sprite().anchor.x=this.horgX;
    this.sprite().anchor.y=this.horgY;
    this.sprite().position.x=100;
    this.sprite().position.y=300;



        this.agyu = new PIXI.particles.ParticleContainer();

    const someFunc = () => {

                this.rocket = new Rocket(this.sprite().position.x, this.sprite().position.y, this.agyu);
                //this.rocket.sprite().rotation=this.iranybaFordul(this.sprite().position.x,this.sprite().position.y);
                Hajo.aim = this.iranybaFordul(this.sprite().position.x, this.sprite().position.y);
                this.tar.push(this.rocket);
                //this.agyu.addChild(this.rocket.sprite());



    };

    s.addChild(this.sprite());
    s.addChild(this.agyu);
    s.addChild(this.b.grafix());

        this.ss.on("mousedown", someFunc, this.ss);




    }
    //@Override
    update(): void {

        this.fire();


        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;


        Hajo.aim=this.iranybaFordul(this.sprite().position.x,this.sprite().position.y);

        for(let i=0;i<30;i++) {

            if(this.bozon[i]) {
                this.bozon[i].update();

                if (this.bozon[i].vege()) {
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

            this.direction.x = 1;
            this.direction.y = 0;
            this.direction.rotate(-this.sprite().rotation);

    }



    public getB():Bounding{
        return this.b;
    }


    public impulseEngine():void {
           /* if (this.acceleration.x == 0 && this.acceleration.y == 0) {
                this.acceleration.copy(this.direction);
                this.acceleration.multiply(0.1);
            }

            this.filler.copy(this.direction);
            this.filler.multiply(this.speed);
            this.acceleration.add(this.filler);
            if (this.acceleration.magSq() >= 25) {
                this.acceleration.multiply(5 / this.acceleration.magnitude());
            }
            */

           this.sprite().position.x+=Util.polarbolCart(10,this.sprite().rotation)[0];
           this.sprite().position.y+=Util.polarbolCart(10,this.sprite().rotation)[1];

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

        for(var b=this.tar.length-1;b>=0;b--) {
            this.tar[b].update();

        }
        }





    public iranybaFordul(x:number, y:number):number{

        let tavY = JelenetManager.renderer.plugins.interaction.mouse.global.y - y;
        let tavX = JelenetManager.renderer.plugins.interaction.mouse.global.x - x;
        let szg = Util.cartbolPolar(tavX,tavY)[1];
        return szg;
    }




}