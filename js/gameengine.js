var myGamePiece;
var myGamePieceAnim=['img/char1.png'
		,'img/char2.png'
		,'img/char3.png'
		,'img/char4.png'
		,'img/char5.png'
		];
var myGamePieceAnimIdx=0;
var myBackground;
var change=false;

function startGame() {
    myGamePiece = new component(61, 134, myGamePieceAnim[myGamePieceAnimIdx], 10, 370, "image");
    myBackground = new component(965, 495, "img/bg1.png", 0, 0, "background");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 965;
        this.canvas.height = 495;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type=="background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        myGamePiece.image.src = myGamePieceAnim[myGamePieceAnimIdx];
        if (type == "image" || type=="background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
	if (type =="background") {
		ctx.drawImage(this.image,
			this.x + this.width -1,
			this.y,
			this.width, this.height);
		ctx.drawImage(this.image,
			this.x - this.width +1,
			this.y,
			this.width, this.height);
	}
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
        if (this.type == "background") {
            if (this.x == -(this.width)) {
                this.x = 0;
            }
            if (this.x == (this.width)) {
                this.x = 0;
            }
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myBackground.newPos();    
    myBackground.update();
    myGamePiece.newPos();    
    myGamePiece.update();
}

function move(dir) {
    if (dir == "up") {myBackground.speedY = 1; 
		myGamePieceAnimIdx=--myGamePieceAnimIdx%myGamePieceAnim.length;
	}
		
    if (dir == "down") {
		myBackground.speedY = -1; 
		myGamePieceAnimIdx=++myGamePieceAnimIdx%myGamePieceAnim.length;
	}
    if (dir == "left") {myBackground.speedX = 1; 
		myGamePieceAnimIdx=--myGamePieceAnimIdx%myGamePieceAnim.length;
	}
    if (dir == "right") {myBackground.speedX = -1; 
		myGamePieceAnimIdx=++myGamePieceAnimIdx%myGamePieceAnim.length;
	}
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
    myBackground.speedX = 0; 
    myBackground.speedY = 0; 
}
