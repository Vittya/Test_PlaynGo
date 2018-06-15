export class EZkey {

    public EZcallback: { [keycode: number]: () => void; } = {};
    public keyDown: { [keycode: number]: boolean; } = {};

    constructor() {
        document.addEventListener('keydown', this.keyboardDown);
        document.addEventListener('keyup', this.keyboardUp);
    }

    public addKey = (keycode: number, f: () => void): void => {
        this.EZcallback[keycode] = f;
        this.keyDown[keycode] = false;
    };

    public keyboardDown = (event: KeyboardEvent): void => {
        event.preventDefault();
        this.keyDown[event.keyCode] = true;
    };

    public keyboardUp = (event: KeyboardEvent): void => {
        this.keyDown[event.keyCode] = false;
    };

    public inputLoop = (): void => {
        for (var key in this.keyDown) {
            var is_down: boolean = this.keyDown[key];

            if (is_down) {
                var callback: () => void = this.EZcallback[key];
                if (callback != null) {
                    callback();
                }
            }
        }
    }

}