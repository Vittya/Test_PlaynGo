export class Vektor{

    public x: number = 0;
    public y: number = 0;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

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

    public zero = (): void => {
        this.x = 0;
        this.y = 0;
    };

    public copy = (point: Vektor): void => {
        this.x = point.x;
        this.y = point.y;
    };

    public duplicate = (): Vektor => {
        var dup: Vektor = new Vektor(this.x, this.y);
        return dup;
    };

    public rotate = (radians: number): void => {
        var cos: number = Math.cos(radians);
        var sin: number = Math.sin(radians);
        var x: number = (cos * this.x) + (sin * this.y);
        var y: number = (cos * this.y) - (sin * this.x);
        this.x = x;
        this.y = y;
    };

    public rotate90 = (): void => {
        var x: number = -this.y;
        var y: number = this.x;
        this.x = x;
        this.y = y;
    };

    public getAngle = (): number => {
        return Math.atan2(this.x, this.y);
    };

    public multiply = (value: number): void => {
        this.x *= value;
        this.y *= value;
    };

    public add = (value: Vektor): void => {
        this.x += value.x;
        this.y += value.y;
    };

    public subtract = (value: Vektor): void => {
        this.x -= value.x;
        this.y -= value.y;
    };

    public dot = (vec: Vektor): number => {
        return this.x * vec.x + this.y * vec.y;
    };

    public project = (onto: Vektor): Vektor => {
        var proj: Vektor = this.duplicate();
        var d: number = onto.magSq();

        if (d != 0) {
            var mult: Vektor = new Vektor(onto.x, onto.y);
            mult.multiply(proj.dot(onto) / d);
            return mult;
        }
        return onto;
    }

}