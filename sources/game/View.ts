export class View extends PIXI.Container{
	private isPaused:boolean = false;
	private updateThis = function(){};

	constructor() {
		super();

	}

	public update():void{
		this.updateThis();
	}

	public onPause():void{
		this.isPaused = true;
	}
	public onResume():void{
		this.isPaused = false;
	}
	public getIsPaused():boolean{
		return this.isPaused;
	}


}
