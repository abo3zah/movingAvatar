class Game{
    constructor(){

        //define variables
        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        //enable touch events
        this.stage.enableMouseOver(10);

        //stage width
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        //enable tap on touch device
        createjs.Touch.enable(this.stage);

        //making the game shapes more sharp
        this.retinalize();

        //set frame per
        createjs.Ticker.setFPS(60);

        //keep re-drawing the stage.
        createjs.Ticker.on("tick", this.stage)

        var framePerRow = 4;
        var framePerCol = 4;
        var count = framePerRow * framePerCol;
        var width = 1601;
        var height = 2397;
        var frameWidth = width/framePerRow;
        var frameHeight = height/framePerCol;

        var data = {
            images: ["img/sprites.png"],
            frames: {width:width, height:height, regX: 0, regY:0},
            animations: {
                runFront:[0,3],
                runBack:[4,7],
                runLeft:[8,11],
                runRight:[12,15]
            }
        };
        var spriteSheet = new createjs.SpriteSheet(data);
        var animation = new createjs.Sprite(spriteSheet);
        animation.gotoAndPlay('runFront');
        
        //animation.scaleX = this.stage.width/frameWidth;
        //animation.scaleY = this.stage.height/frameHeight;

        this.stage.addChild(animation);
    }

    retinalize(){
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        let ratio = window.devicePixelRatio;
        if (ratio === undefined){
            return;
        }

        this.canvas.setAttribute('width', Math.round( this.stage.width * ratio))
        this.canvas.setAttribute('height', Math.round( this.stage.height * ratio))

        this.stage.scaleX = this.stage.scaleY = ratio;

        //set CSS style
        this.canvas.style.width = this.stage.width + "px";
        this.canvas.style.height = this.stage.height + "px";
    }
}

function init() {
    var game = new Game();
}