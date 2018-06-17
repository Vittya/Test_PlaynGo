export class Vektor {

    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }
/*
 public magnitude = (): number => {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    public magSq = (): number => {
        return this.x * this.x + this.y * this.y;
    };

    public normalize = (): Vektor => {
        var len: number = Math.sqrt(this.x * this.x + this.y * this.y);
        this.x /= len;
        this.y /= len;
        return this;
    };
 */
}