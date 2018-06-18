import {ViewProvider} from "./game/ViewProvider";
import {DaGame} from "./game/DaGame";
import {Splash} from "./game/Splash";
import {Menu} from "./game/Menu";
import {GameOver} from "./game/GameOver";

class App {

    constructor() {
        console.log('Init');

        //800x600 as specified
        ViewProvider.onCreate(800,600);

        ViewProvider.initView("splash",Splash);
        ViewProvider.initView("menu",Menu);
        ViewProvider.initView("játék",DaGame);
        ViewProvider.initView("GO",GameOver);
        ViewProvider.startView("splash");

    }
}

export = App;
