import {View} from "./View";
import {MahButton} from "../eszk/MahButton";
import {ViewProvider} from "./ViewProvider";
import {EZkey} from "../eszk/EZkey";
import {DaGame} from "./DaGame";
import {Util} from "../eszk/Util";

export class Menu extends View {

   private bground:PIXI.Texture;
   private logo:PIXI.Sprite;
   private ruler:PIXI.Sprite;
   private b1:MahButton;
   private b2:MahButton;
   private b3:MahButton;
   private exit:MahButton;

    constructor() {
        super();

        this.bground = PIXI.Texture.fromImage("kp/hatter.jpg");
        let bg:PIXI.Sprite = new PIXI.Sprite(this.bground);
        this.addChild(bg);

        this.logo = PIXI.Sprite.fromImage("kp/planet.png");

        this.logo.position.x=400;
        this.logo.position.y=200;
        this.logo.anchor.x=0.5;
        this.logo.anchor.y=0.5;

        this.ruler = PIXI.Sprite.fromImage("kp/ruler.png");

        this.ruler.position.x=400;
        this.ruler.position.y=200;

        this.ruler.anchor.x=0.1;
        this.addChild(this.ruler);
        this.addChild(this.logo);


        this.b1 = new MahButton(400,300,100,50);
        this.b2 = new MahButton(400,370,100,50);
        this.b3 = new MahButton(400,440,100,50);
        this.exit = new MahButton(400,510,100,50);



        this.innit();


    }

    private innit():void{
        this.b1.setText("Game1");
        this.b2.setText("Game2");
        this.b3.setText("Game3");
        this.exit.setText("Exit");

        this.addChild(this.b1);
        this.addChild(this.b2);
        this.addChild(this.b3);
        this.addChild(this.exit);

        this.b1.clicked = () => {
            if(this.getIsPaused())return;
            ViewProvider.initView("játék",DaGame);
            ViewProvider.startView('játék');
        };

        this.exit.clicked = () => {
            if (this.getIsPaused()) return;

            window.location.assign("http://www.playngo.com");
        };

    }

    update(): void {
        super.update();

        this.logo.rotation+=0.01;
        this.ruler.rotation-=0.01;

    }




}