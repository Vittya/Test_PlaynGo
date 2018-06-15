import {Bounding} from "../game_entities/Bounding";
import {Vektor} from "./Vektor";

export class Util {

    static vltln(lega: number, legf: number): number {
        return Math.floor(Math.random() * (lega - legf + 1) + lega);
    }

    static polarbolCart(o: number, szg: number): number[] {
        let tmb: number[] = [];
        let x = o * Math.cos(szg);
        let y = o * Math.sin(szg);
        tmb = [x, y];
        return tmb;
    }

    static cartbolPolar(x: number, y: number): number[] {
        let tmb: number[] = [];
        let o = Math.sqrt((Math.pow(x, 2) * Math.pow(y, 2)));
        let szg = Math.atan2(y, x);
        tmb = [o, szg];
        return tmb;
    }

    static intersector(rectA: any, rectB: any): boolean {


        let combinedHalfWidths, combinedHalfHeights, vx, vy;

        var intersects: boolean = false;

        rectA.centerX = rectA.x + rectA.width / 2;
        rectA.centerY = rectA.y + rectA.height / 2;
        rectB.centerX = rectB.x + rectB.width / 2;
        rectB.centerY = rectB.y + rectB.height / 2;

        rectA.halfWidth = rectA.width / 2;
        rectA.halfHeight = rectA.height / 2;
        rectB.halfWidth = rectB.width / 2;
        rectB.halfHeight = rectB.height / 2;

        vx = rectA.centerX - rectB.centerX;
        vy = rectA.centerY - rectB.centerY;

        combinedHalfWidths = rectA.halfWidth + rectB.halfWidth;
        combinedHalfHeights = rectA.halfHeight + rectB.halfHeight;

        if (Math.abs(vx) < combinedHalfWidths) {

            if (Math.abs(vy) < combinedHalfHeights) {

                intersects = true;
            } else {

                intersects = false;
            }
        } else {

            intersects = false;
        }


        return intersects;
    }

    static collision(a: PIXI.Sprite, b: PIXI.Sprite): boolean {

        a.calculateBounds();
        b.calculateBounds();
        let aX1 = a.getLocalBounds().left;
        let aY1 = a.getLocalBounds().top;
        let aX2 = a.getLocalBounds().right;
        let aY2 = a.getLocalBounds().bottom;

        let bX1 = b.getLocalBounds().left;
        let bY1 = b.getLocalBounds().top;
        let bX2 = b.getLocalBounds().right;
        let bY2 = b.getLocalBounds().bottom;

        return (aX1 < bX2 && aX2 > bX1 && aY1 < bY2 && aY2 > bY1);

    }

    public static excuse4SAT(ax:number,ay:number,bx:number,by:number): boolean {
        let A=(ax - bx);
        let B=(ay - by);
        let C=A*A+B*B;

        let divergent = Math.sqrt(C);

        return (divergent < 20 + 20);
    }
}

