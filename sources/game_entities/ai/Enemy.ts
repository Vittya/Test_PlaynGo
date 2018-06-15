import {SpaceCraft} from "../SpaceCraft";
import {Util} from "../../eszk/Util";
import {Vektor} from "../../eszk/Vektor";
import {Bounding} from "../Bounding";

export class Enemy extends SpaceCraft {

    private s:PIXI.Container;
    private acceleration:Vektor;
    private direction:Vektor;
    private filler:Vektor;
    private speed:number;
    private preX:number=800;
    private preY:number;


    public b: Bounding;


    constructor(s:PIXI.Container){
        super(PIXI.Texture.fromImage("kp/ruler.png"));

        this.acceleration = new Vektor(0,0);
        this.direction = new Vektor(1,0);
        this.filler = new Vektor(0, 0);
        //Util.vltln(300,500);
        this.sprite().anchor.x=0.5;
        this.sprite().anchor.y=0.5;
        this.preY=this.sprite().position.y;

        this.b = new Bounding(this.sprite().x,this.sprite().y);

        this.sprite().position.x=800;
        this.sprite().position.y=300;

        this.s=s;
        //this.s.addChild(this.sprite());
        this.s.addChild(this.b.grafix());

    }

    update(): void {


        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;
        this.sprite().position.x--;
        //this.sprite().rotation+=0.1;
        this.sprite().position.y+=Util.vltln(-2,2);


        this.b.grafix().position.x=this.sprite().position.x;
        this.b.grafix().position.y=this.sprite().position.y;
    }

    public vege():void{
        //this.s.removeChild(this.sprite());
        this.s.removeChild(this.b.grafix());

    }






}
