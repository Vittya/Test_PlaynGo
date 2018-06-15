export class Map<T>{

    private elemek: {[key:string]:T};

    constructor(){
        this.elemek = {};
    }

    public add(key:string,value:T):void{
        this.elemek[key]=value;
    }


    public has(key: string): boolean {
//
        return key in this.elemek;
    }

    public get(key: string): T {
        return this.elemek[key];
    }

    public remove(key:string):void{
        this.elemek[key]
    }


}