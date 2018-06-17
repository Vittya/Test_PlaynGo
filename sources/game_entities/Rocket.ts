import {SpaceCraft} from "./SpaceCraft";
import {Util} from "../eszk/Util";
import {Ship} from "./Ship";
import {Bounding} from "./Bounding";

export class Rocket extends SpaceCraft{
    private ss:PIXI.Container;
    private angle:number;
    private x:number;
    private y:number;
    public b:Bounding;
    public isOutside:boolean=false;

    constructor(x:number,y:number,ss:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/lvdk.png"));
        this.ss=ss;
        this.sprite().anchor.x=0.5;
        this.sprite().anchor.y=0.5;
        this.sprite().position.x=x;
        this.sprite().position.y=y;
        this.x=x;
        this.y=y;
        this.sprite().rotation=Ship.aim;
        this.angle=Ship.aim;
        this.b = new Bounding(this.sprite().x,this.sprite().y,1.5);
        this.ss.addChild(this.sprite());

    }

    update(): void {

        this.sprite().position.x += Util.polarbolCart(10, this.angle)[0];
        this.sprite().position.y += Util.polarbolCart(10, this.angle)[1];

        if (Math.abs(Util.cartbolPolar(this.sprite().position.x, this.sprite().position.y)[0] -
            Util.cartbolPolar(this.x, this.y)[0]) > 300000){

                this.vege();
                this.isOutside=true;

            }

        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;

    }

    public vege():void{
        this.ss.removeChild(this.sprite()) ;
    }
}