var player;
var stage;
var frameWidth;
var frameHeight;
var animationStatus = false;

//TODO: Player as an Object
//TODO: load the data as json

function handleKeyDown(evt){
    console.log(evt);
}

function init() {
    var imageWidth = 408;
    var imageHeight = 611;
    var imagePerRow = 4;
    var imagePerCol =  4;
    frameWidth = imageWidth/imagePerCol;
    frameHeight = imageHeight/imagePerRow;
    var data = {
        "images": ["img/sprites-transparent.png"],
        "framerate": 5,
        "frames": [
            [0*frameWidth, 0*frameHeight, frameWidth, frameHeight],
            [1*frameWidth, 0*frameHeight, frameWidth, frameHeight],
            [2*frameWidth, 0*frameHeight, frameWidth, frameHeight],
            [3*frameWidth, 0*frameHeight, frameWidth, frameHeight],
            [0*frameWidth, 1*frameHeight, frameWidth, frameHeight],
            [1*frameWidth, 1*frameHeight, frameWidth, frameHeight],
            [2*frameWidth, 1*frameHeight, frameWidth, frameHeight],
            [3*frameWidth, 1*frameHeight, frameWidth, frameHeight],
            [0*frameWidth, 2*frameHeight, frameWidth, frameHeight],
            [1*frameWidth, 2*frameHeight, frameWidth, frameHeight],
            [2*frameWidth, 2*frameHeight, frameWidth, frameHeight],
            [3*frameWidth, 2*frameHeight, frameWidth, frameHeight],
            [0*frameWidth, 3*frameHeight, frameWidth, frameHeight],
            [1*frameWidth, 3*frameHeight, frameWidth, frameHeight],
            [2*frameWidth, 3*frameHeight, frameWidth, frameHeight],
            [3*frameWidth, 3*frameHeight, frameWidth, frameHeight]
        ],
        "animations": {
            "frontRun": {
                frames:[0, 1, 2, 3, 0, 1, 2, 3],
                next:"stop"
            },
            "backRun": {
                frames:[4, 5, 6, 7, 4, 5, 6, 7],
                next:"stop"
            },
            "leftRun": {
                frames:[8, 9, 10, 11, 8, 9, 10],
                next:"stop"
            },
            "rightRun": {
                frames:[12, 13, 14, 15,12, 13, 14],
                next:"stop"
            },
            "stop":{
                frames:[0]
            }
        }
    }

    canvas = document.getElementById("game-canvas");
    canvas.width = frameWidth * 10;
    canvas.height = frameHeight * 5;

    stage = new createjs.Stage("game-canvas");

    var spriteSheet = new createjs.SpriteSheet(data);
    player = new createjs.Sprite(spriteSheet);

    stage.addChild(player);

    // Add Betty to the stage, and add her as a listener to Ticker to get updates each frame.
    createjs.Ticker.on("tick", stage);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
    document.addEventListener('keydown', handleKeyDown);
}

function handleKeyDown(evt){

    var playerSpeed = 600;

    if (animationStatus == true)return

    if (evt.key == "ArrowLeft"){

        if (player.x-frameWidth<0)return

        player.gotoAndPlay('leftRun');

        createjs.Tween.get(player,{loop:false})
            .to({x:player.x-frameWidth}, playerSpeed, createjs.Ease.getPowIn(4)).addEventListener('complete', function(){animationStatus=false});
    }
    if (evt.key == "ArrowRight"){

        if (player.x+2*frameWidth>frameWidth*10)return

        player.gotoAndPlay('rightRun');

        createjs.Tween.get(player,{loop:false})
            .to({x:player.x+frameWidth}, playerSpeed, createjs.Ease.getPowIn(4)).addEventListener('complete', function(){animationStatus=false});
    }
    if (evt.key == "ArrowUp"){

        if (player.y-frameHeight<0)return

        player.gotoAndPlay('backRun');

        createjs.Tween.get(player,{loop:false})
            .to({y:player.y-frameHeight}, playerSpeed+200, createjs.Ease.getPowIn(4)).addEventListener('complete', function(){animationStatus=false});
    }
    if (evt.key == "ArrowDown"){

        if (player.y+2*frameHeight>frameHeight*5)return

        player.gotoAndPlay('frontRun');

        createjs.Tween.get(player,{loop:false})
            .to({y:player.y+frameHeight}, playerSpeed+200, createjs.Ease.getPowIn(4)).addEventListener('complete', function(){animationStatus=false})
    }
    animationStatus = true;
}