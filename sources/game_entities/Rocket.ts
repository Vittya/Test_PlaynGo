import {SpaceCraft} from "./SpaceCraft";
import {Util} from "../eszk/Util";
import {Hajo} from "./Hajo";
import {Bounding} from "./Bounding";

export class Rocket extends SpaceCraft{
    private ss:PIXI.Container;
    private angle:number;
    private x:number;
    private y:number;
    public b:Bounding;

    constructor(x:number,y:number,ss:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/lvdk.png"));
        this.ss=ss;
        this.sprite().anchor.x=0.5;
        this.sprite().anchor.y=0.5;
        this.sprite().position.x=x;
        this.sprite().position.y=y;
        this.x=x;
        this.y=y;
        this.sprite().rotation=Hajo.aim;
        this.angle=Hajo.aim;
        this.b = new Bounding(this.sprite().x,this.sprite().y);
        this.ss.addChild(this.sprite());
        //this.ss.addChild(this.b.grafix());

    }

    update(): void {

        this.sprite().position.x += Util.polarbolCart(10, this.angle)[0];
        this.sprite().position.y += Util.polarbolCart(10, this.angle)[1];
        console.log("ROCKET UPDATE");

        if(Math.abs(Util.cartbolPolar(this.sprite().position.x,this.sprite().position.y)[0]-
            Util.cartbolPolar(this.x,this.y)[0])>1000000)
            this.vege();


        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;

    }

    public vege():void{
        this.ss.removeChild(this.sprite()) ;
    }
}