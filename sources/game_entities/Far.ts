import {Background} from "./Background";

export class Far extends Background{

    constructor(s:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/törmelék.png"),800,600);
        this.tilinSprite().tilePosition.x=-100;
        this.tilinSprite().tilePosition.y=-100;
        s.addChild(this.tilinSprite());
    }

    update(): void {
        this.tilinSprite().tilePosition.x-=0.64;
    }


}