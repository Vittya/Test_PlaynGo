import {View} from "./View";



export class ViewProvider {

    //sajnos es5ön még nem gondoltak a Map<>re
    private static jelentTMB:any={};
    public static mostJelenet:View;
    public static renderer: any;
    x: number;
    y: number;

    //érdekelne h itt mi a visszatérési érték fajtája...ez lenne az any??
    public static onCreate(sz:number,h:number):any{


        if (ViewProvider.renderer!=null) return this;
        ViewProvider.renderer = PIXI.autoDetectRenderer(sz,h);
        document.body.appendChild(ViewProvider.renderer.view);
        requestAnimationFrame(ViewProvider.update);
        return this;
    }

    private static update(){
        requestAnimationFrame(function(){ViewProvider.update()});

        if(!ViewProvider.mostJelenet||ViewProvider.mostJelenet.getIsPaused()) return;
        ViewProvider.mostJelenet.update();
        ViewProvider.renderer.render(ViewProvider.mostJelenet);
    }
//lamb monoid
    public static initJelenet(id: string, J: new () => View = View): View {

        //if (ViewProvider.jelentTMB[id]) return undefined;

        let j = new J();
        ViewProvider.jelentTMB[id] = j;
        return j;
    }

    public static startJelenet(id: string):boolean{

        if (ViewProvider.jelentTMB[id]) {
            ViewProvider.mostJelenet = ViewProvider.jelentTMB[id];
            if (ViewProvider.jelentTMB[id]) ViewProvider.mostJelenet.onPause();

            ViewProvider.mostJelenet.onResume();
            return true;
        }
        return false;

    }


}