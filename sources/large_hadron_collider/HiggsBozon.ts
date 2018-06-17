import {Util} from "../eszk/Util";

export class HiggsBozon extends PIXI.Graphics{
    public x:number;
    public y:number;
    private cX:number;
    private cY:number;
    private alfa:number=100;
    private graphix:PIXI.Graphics;



    constructor(x:number,y:number,){
        super();
        this.x=x;
        this.cX=x;
        this.cY=y;
        this.y=y;
        this.graphix = new PIXI.Graphics();
        this.graphix.beginFill(0x444,this.alfa);
        this.graphix.drawCircle(x,y,2);
        this.graphix.endFill();

    }

    public update():void{
        this.graphix.position.x+=Util.polarbolCart(1,Util.vltln(-22.5,22.5))[0];
        this.graphix.position.y+=Util.polarbolCart(1,Util.vltln(-22.5, 22.5))[1];




        this.alfa-=10;
        this.graphix.alpha=this.alfa;





    }


    public grafix():PIXI.Graphics{
        return this.graphix;
    }

    public vege():boolean{
        if(this.alfa<0)
        return true;
        else return false;
    }


}