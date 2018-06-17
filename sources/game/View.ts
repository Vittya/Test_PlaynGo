export class View extends PIXI.Container{
	private isPaused:boolean = false;
	private updateThisShit = function(){};

	constructor() {
		super();
		console.log('shit son');

	}

	public update():void{
		this.updateThisShit();
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
