import {View} from "./View";
import {ViewProvider} from "./ViewProvider";

export class Splash extends View{

    private readonly logo:PIXI.Sprite;
    constructor(){
        super();
        this.logo=PIXI.Sprite.fromImage("kp/mini_logo.png");
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
        else ViewProvider.startView('menu');
    }

}