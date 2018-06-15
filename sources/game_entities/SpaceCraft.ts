import {Vektor} from "../eszk/Vektor";

export abstract class SpaceCraft{

    private texture:PIXI.Texture;
    private _sprite:PIXI.Sprite;


    public position: Vektor = new Vektor();


    constructor(t:PIXI.Texture){
        this.texture=t;
        this._sprite=new PIXI.Sprite(this.texture);

    }



    public sprite(): PIXI.Sprite {
        return this._sprite;
    }

    public abstract update():void;

}
