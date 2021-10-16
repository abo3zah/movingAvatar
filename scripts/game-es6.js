var animationStatus = false;

class GameStartView extends createjs.Container{
    constructor(game){
        super();

        this.game= game;

        var borderWidth = this.game.stage.width;
        var borderHeight= this.game.stage.height;

        var border = new createjs.Shape();
        
        border.graphics
            .s('black')
            .r(0, 0, borderWidth,borderHeight);

        this.addChild(border);
        this.setBounds(0,0,borderWidth,borderHeight);
    }
}

class Player {
    constructor(game){

        this.game = game;
        
        var preload = new createjs.LoadQueue();
        preload.on("fileload", this.handleFileComplete.bind(this));
        preload.loadFile("img/sprites.json");

    }

    handleFileComplete(event) {
        //create the player
        var spriteSheet = new createjs.SpriteSheet(event.result);
        this.game.player = new createjs.Sprite(spriteSheet);

        //append the player and adjust the canvas and stage
        this.game.handlePlayerIsLoaded();
    }
}

class Game {
    constructor(){

        this.scaleRatio = 0.5;
        var numberOfMoves = 8;
        var frameWidth = 102;
        var frameHeight = 152;

        this.canvas = document.getElementById('game-canvas');

        this.stage = new createjs.Stage(this.canvas);

        this.canvas.width = this.stage.width =  frameWidth * numberOfMoves * this.scaleRatio;
        this.canvas.height = this.stage.height = frameHeight * numberOfMoves * this.scaleRatio;

        new Player(this);

        var gameStartView = new GameStartView(this);
        this.stage.addChild(gameStartView);
        gameStartView.x = GameStartView.y = 0;

        createjs.Ticker.on("tick", this.stage);
        createjs.Ticker.timingMode = createjs.Ticker.RAF;
        createjs.Ticker.addEventListener("tick", this.stage);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    handlePlayerIsLoaded() {
        //append the player and adjust the canvas and stage
        this.player.scaleX = this.player.scaleY = this.scaleRatio;
        this.stage.addChild(this.player);
    }

    handleKeyDown(evt){

        var playerSpeed = 550;
        var movementHorizontal = this.player.getBounds().width * this.scaleRatio;
        var movementVertical = this.player.getBounds().height * this.scaleRatio;
    
        if (animationStatus == true)return
    
        if (evt.key == "ArrowLeft"){
    
            if (this.player.x-movementHorizontal<0)return
    
            this.player.gotoAndPlay('leftRun');
    
            createjs.Tween.get(this.player,{loop:false})
                .to({x:this.player.x-movementHorizontal}, playerSpeed, createjs.Ease.linear).addEventListener('complete', function(){animationStatus=false});
        }
        if (evt.key == "ArrowRight"){
    
            if (this.player.x+2*movementHorizontal>this.stage.width)return
    
            this.player.gotoAndPlay('rightRun');
    
            createjs.Tween.get(this.player,{loop:false})
                .to({x:this.player.x+movementHorizontal}, playerSpeed, createjs.Ease.linear).addEventListener('complete', function(){animationStatus=false});
        }
        if (evt.key == "ArrowUp"){
    
            if (this.player.y-movementVertical<0)return
    
            this.player.gotoAndPlay('backRun');
    
            createjs.Tween.get(this.player,{loop:false})
                .to({y:this.player.y-movementVertical}, playerSpeed+200, createjs.Ease.linear).addEventListener('complete', function(){animationStatus=false});
        }
        if (evt.key == "ArrowDown"){
    
            if (this.player.y+2*movementVertical>this.stage.height)return
    
            this.player.gotoAndPlay('frontRun');
    
            createjs.Tween.get(this.player,{loop:false})
                .to({y:this.player.y+movementVertical}, playerSpeed+200, createjs.Ease.linear).addEventListener('complete', function(){animationStatus=false})
        }
        animationStatus = true;
    }

}

function init() {

    var canvas = document.createElement('canvas');
    canvas.id = 'game-canvas';

    document.body.appendChild(canvas); // adds the canvas to the body element

    var game = new Game;
}