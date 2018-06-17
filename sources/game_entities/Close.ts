import {Background} from "./Background";

export class Close extends Background{

    constructor(s:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/messziHttr.jpg"),1800,1600);
        this.tilinSprite().tilePosition.x=-100;
        this.tilinSprite().tilePosition.y=-100;
        s.addChild(this.tilinSprite());
    }

    update(): void {
        this.tilinSprite().tilePosition.x-=0.128;
    }


}