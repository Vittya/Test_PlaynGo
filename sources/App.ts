import { Jelenet } from "./game/Jelenet";
import {JelenetManager} from "./game/JelenetManager";
import {DaGame} from "./game/DaGame";
import {Splash} from "./game/Splash";
import {Menu} from "./game/Menu";
import {GameOver} from "./game/GameOver";

class App {
	private _game: Jelenet;


    constructor() {
        console.log('Hello World');

        //this._game = new Jelenet();


        JelenetManager.onCreate(800,600);

        JelenetManager.initJelenet("splash",Splash);
        JelenetManager.initJelenet("menu",Menu);
        JelenetManager.initJelenet("játék",DaGame);
        JelenetManager.initJelenet("GO",GameOver);
        JelenetManager.startJelenet("splash");

        /*const renderer = PIXI.autoDetectRenderer(800, 600, {backgroundColor: 0x000000});
        document.body.appendChild(renderer.view);


        const stage: PIXI.Container = new PIXI.Container();

		const faszom: PIXI.Graphics = new PIXI.Graphics();
		faszom.beginFill(0xFF0000);
		faszom.drawRect(0, 0, 100,100);
		faszom.endFill();
		stage.addChild(faszom);

		renderer.render(stage);
*/
    }
}

export = App;
