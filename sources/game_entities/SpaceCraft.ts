

export abstract class SpaceCraft{

    private readonly texture:PIXI.Texture;
    private readonly _sprite:PIXI.Sprite;

    constructor(t:PIXI.Texture){
        this.texture=t;
        this._sprite=new PIXI.Sprite(this.texture);

    }



    public sprite(): PIXI.Sprite {
        return this._sprite;
    }

    public abstract update():void;

}
