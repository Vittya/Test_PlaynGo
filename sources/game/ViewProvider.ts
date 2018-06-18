import {View} from "./View";



export class ViewProvider {

    private static viewArray:any={};
    public static viewNow:View;
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

        if(!ViewProvider.viewNow||ViewProvider.viewNow.getIsPaused()) return;
        ViewProvider.viewNow.update();
        ViewProvider.renderer.render(ViewProvider.viewNow);
    }
    public static initView(id: string, J: new () => View = View): View {

        let j = new J();
        ViewProvider.viewArray[id] = j;
        return j;
    }

    public static startView(id: string):boolean{

        if (ViewProvider.viewArray[id]) {
            ViewProvider.viewNow = ViewProvider.viewArray[id];
            if (ViewProvider.viewArray[id]) ViewProvider.viewNow.onPause();

            ViewProvider.viewNow.onResume();
            return true;
        }
        return false;

    }


}