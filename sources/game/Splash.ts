import {Jelenet} from "./Jelenet";
import {JelenetManager} from "./JelenetManager";

export class Splash extends Jelenet{

    private logo:PIXI.Sprite;
    constructor(){
        super();
        this.logo=PIXI.Sprite.fromImage("kp/bcube.png");
        this.addChild(this.logo);
        this.logo.anchor.x=0.5;
        this.logo.anchor.y=0.5;
        this.logo.alpha=0;
        this.logo.position.x=400;
        this.logo.position.y=300;
    }

    public update():void {
        super.update();
        if (this.logo.alpha < 1) this.logo.alpha += 0.01;
        else JelenetManager.startJelenet('menu');
    }

}