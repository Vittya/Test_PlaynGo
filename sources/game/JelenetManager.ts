import {Jelenet} from "./Jelenet";



export class JelenetManager {

    //sajnos es5ön még nem gondoltak a Map<>re
    private static jelentTMB:any={};
    public static mostJelenet:Jelenet;
    public static renderer: any;
    x: number;
    y: number;

    //érdekelne h itt mi a visszatérési érték fajtája...ez lenne az any??
    public static onCreate(sz:number,h:number):any{


        if (JelenetManager.renderer!=null) return this;
        JelenetManager.renderer = PIXI.autoDetectRenderer(sz,h);
        document.body.appendChild(JelenetManager.renderer.view);
        requestAnimationFrame(JelenetManager.update);
        return this;
    }

    private static update(){
        requestAnimationFrame(function(){JelenetManager.update()});

        if(!JelenetManager.mostJelenet||JelenetManager.mostJelenet.getIsPaused()) return;
        JelenetManager.mostJelenet.update();
        JelenetManager.renderer.render(JelenetManager.mostJelenet);
    }
//lamb monoid
    public static initJelenet(id: string, J: new () => Jelenet = Jelenet): Jelenet {

        //if (JelenetManager.jelentTMB[id]) return undefined;

        let j = new J();
        JelenetManager.jelentTMB[id] = j;
        return j;
    }

    public static startJelenet(id: string):boolean{

        if (JelenetManager.jelentTMB[id]) {
            JelenetManager.mostJelenet = JelenetManager.jelentTMB[id];
            if (JelenetManager.jelentTMB[id]) JelenetManager.mostJelenet.onPause();

            JelenetManager.mostJelenet.onResume();
            return true;
        }
        return false;

    }


}