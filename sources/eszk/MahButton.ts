export class MahButton extends PIXI.Sprite {

        private pTxt: PIXI.Text;

        private callback: Function;

        constructor(x: number, y: number, width: number, height: number) {
            super();
            this.onCreate(x, y, width, height);
        }


        onCreate(x: number, y: number, width: number, height: number) {
            let g = new PIXI.Graphics();
            g.beginFill(0x738073, 1);
            g.drawRoundedRect(0, 0, width, height, height / 5);
            g.endFill();
            this.texture = g.generateCanvasTexture();

            this.x = x;
            this.y = y;
            this.anchor.x = 0.5;
            this.anchor.y = 0.5;

            this.pTxt = new PIXI.Text("");
            this.pTxt.anchor.x = 0.5;
            this.pTxt.anchor.y = 0.5;
            this.addChild(this.pTxt);

            this.interactive = true;

            this.on("mousedown", () => {
                this.onDown();
            }, this);

            this.on("mouseup", () => {
                this.onUp();
            }, this);

            this.on("mouseover", () => {
                this.onTouch();
            }, this);

            this.on("mouseout", () => {
                this.onOut();
            }, this);
        }

        public setText(val: string, style?: PIXI.TextStyle) {
            this.pTxt.text = val;
            this.pTxt.style = style;
        }

        private onDown() {
            this.y += 5;
            this.tint = 0xC60000;
        }

        private onUp() {
            if(typeof(this.callback) === 'function') {
                this.callback();
            }
            this.y -= 5;
            this.tint = 0xF8F8F8;
        }

        private onTouch() {
            this.tint = 0xFF0000;
            this.scale.x = 1.2;
            this.scale.y = 1.2;
        }

        private onOut() {
            this.tint = 0xF8F8F8;
            this.scale.x = 1;
            this.scale.y = 1;
        }

        public get clicked() {
            return this.callback;
        }

        public set clicked(cb: Function) {
            this.callback = cb;
        }


    }