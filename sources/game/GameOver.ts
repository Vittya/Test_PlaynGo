import {ViewProvider} from "./ViewProvider";
import {View} from "./View";

export class GameOver extends View{

    private logo:PIXI.Sprite;
    constructor(){
        super();
        this.logo=PIXI.Sprite.fromImage("kp/endscreen.jpg");
        this.addChild(this.logo);

        this.logo.alpha=0;
        this.logo.position.x=0;
        this.logo.position.y=75;
    }

    public update():void {
        super.update();
        if (this.logo.alpha < 1) this.logo.alpha += 0.005;
        else ViewProvider.startJelenet('menu');
    }

}