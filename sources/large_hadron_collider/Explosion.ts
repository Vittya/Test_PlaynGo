import {SpaceCraft} from "../game_entities/SpaceCraft";

export class Explosion extends SpaceCraft{

    private ss:PIXI.Container;


    constructor(x:number,y:number,s:PIXI.Container){
       super(PIXI.Texture.fromImage("kp/image823.png"));
       if(s!=null)
        this.ss=s;
        this.sprite().position.x=x;
        this.sprite().position.y=y;
       this.ss.addChild(this.sprite());
    }

    update(): void {

        this.sprite().alpha=1;

        this.sprite().rotation++;

    }






}