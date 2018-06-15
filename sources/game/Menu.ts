import {Jelenet} from "./Jelenet";
import {MahButton} from "../eszk/MahButton";
import {JelenetManager} from "./JelenetManager";
import {EZkey} from "../eszk/EZkey";
import {DaGame} from "./DaGame";

export class Menu extends Jelenet {

   private gomb:MahButton;
    constructor() {
        super();

        this.gomb = new MahButton(400,300,100,50);
        this.innit();


    }

    private innit():void{
        this.gomb.setText("Play!");

        this.addChild(this.gomb);

        this.gomb.clicked = () => {
            if(this.getIsPaused())return;
            console.log('I am clicked');
            JelenetManager.initJelenet("játék",DaGame);
            JelenetManager.startJelenet('játék');
        }

     




    }

    update(): void {
        super.update();
    }




}