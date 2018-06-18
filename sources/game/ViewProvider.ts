import {View} from "./View";



export class ViewProvider {

    private static jelentTMB:any={};
    public static mostJelenet:View;
    public static renderer: any;
    x: number;
    y: number;

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
    public static initView(id: string, J: new () => View = View): View {


        let j = new J();
        ViewProvider.jelentTMB[id] = j;
        return j;
    }

    public static startView(id: string):boolean{

        if (ViewProvider.jelentTMB[id]) {
            ViewProvider.mostJelenet = ViewProvider.jelentTMB[id];
            if (ViewProvider.jelentTMB[id]) ViewProvider.mostJelenet.onPause();

            ViewProvider.mostJelenet.onResume();
            return true;
        }
        return false;

    }


}