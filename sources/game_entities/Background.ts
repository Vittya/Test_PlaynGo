export abstract class Background{
    private texture:PIXI.Texture;
    private readonly tSprite:PIXI.extras.TilingSprite;
    constructor(t:PIXI.Texture,sz:number,h:number){

        this.texture=t;
        this.tSprite = new PIXI.extras.TilingSprite(t,sz,h);
    }

    public abstract update():void;

    public tilinSprite():PIXI.extras.TilingSprite{
        return this.tSprite;
    }
}