import {Vektor} from "../eszk/Vektor";

export class Bounding extends PIXI.Graphics{

    private graphix:PIXI.Graphics;
    private alfa:number=100;
    public circle:Vektor;
    public s:number;



    constructor(x:number,y:number,s:number){
        super();

        this.circle = new Vektor(x,y);
        this.s=s;
        this.graphix = new PIXI.Graphics();
        this.graphix.beginFill(0x444,this.alfa);
        this.graphix.drawCircle(this.circle.x,this.circle.y,20);
        this.graphix.endFill();
    }

    public update(x:number,y:number):void{

        this.graphix.position.x=x;
        this.graphix.position.y=y;

    }

    public grafix():PIXI.Graphics{
        return this.graphix;
    }
}