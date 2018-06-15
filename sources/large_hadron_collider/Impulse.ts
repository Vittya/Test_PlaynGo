import {SpaceCraft} from "../game_entities/SpaceCraft";
import {Util} from "../eszk/Util";

export class Impulse extends SpaceCraft{

    private s:PIXI.Container;
    constructor(s:PIXI.Container,x:number,y:number){
        super(PIXI.Texture.fromImage("kp/bcube.png"));

        this.sprite().anchor.x=0.5;
        this.sprite().anchor.y=0.5;
        this.sprite().position.x=900;
        this.sprite().position.y=Util.vltln(500,100);
        this.sprite().alpha=1;
        this.s=s;
        this.s.addChild(this.sprite());


    }

    update(): void {

        this.sprite().position.x--;//=Util.polarbolCart(1,Util.vltln(-22.5,22.5))[0];
        //this.sprite().position.y+=Util.polarbolCart(1,Util.vltln(-22.5,22.5))[1];
        //this.sprite().alpha-=0.01;
        if(this.sprite().alpha<0)
            this.vege();
    }

    public vege():void{
        this.s.removeChild(this.sprite());
    }


}