class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.game_over = false;
        this.playing = false;
        this.bars = [];


    }

    get elements() {

        var elements = this.bars.map(function (bar) { return bar; });

        elements.push(this.ball);
        return elements;

    }

}

class BoardView {
    constructor(canvas, board) {
        this.canvas = canvas;
        this.canvas.width = board.width;
        this.canvas.height = board.height;
        this.board = board;
        this.ctx = canvas.getContext("2d");
    }
    draw = function () {

        for (let i = this.board.elements.length - 1; i >= 0; i--) {
            let el = this.board.elements[i];
            draw2(this.ctx, el);
        }
    }


    clean() {
        this.ctx.clearRect(0, 0, this.board.width, this.board.height);
    }
    play() {
        if (this.board.playing) {
            this.clean();
            this.draw();
            this.board.ball.move();
        }
    }
}

window.addEventListener("load", controller);

document.addEventListener("keydown", function (ev) {
    if (ev.keyCode == 38) {
        ev.preventDefault();
        bar.up();
    } else if (ev.keyCode == 40) {
        ev.preventDefault();
        bar.down();
    } else if (ev.keyCode === 87) {
        ev.preventDefault();
        bar_2.up();
    } else if (ev.keyCode === 83) {
        ev.preventDefault();
        bar_2.down();
    } else if (ev.keyCode === 32) {
        ev.preventDefault();
        board.playing = !board.playing;
    }
});

class Bar {
    constructor(x, y, width, height, board) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.board = board;
        this.board.bars.push(this)
        this.kind = "rectangle";
        this.speed = 10;

    }

    down() {
        this.y += this.speed;

    }
    up() {
        this.y -= this.speed;

    }
    toString() {
        return "x:" + this.x + "y:" + this.y;
    }

}
class Ball {
    constructor(x, y, radius, board) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed_y = 0;
        this.speed_x = 3;
        this.speed = 3;
        this.board = board;
        this.kind = "circle";
        this.direction = 1;
        board.ball = this;

    }

    move() {
        this.x += (this.speed_x * this.direction)
        this.y += (this.speed_y);
    }
}

var board = new Board(800, 400);
var bar = new Bar(20, 100, 40, 100, board);
var bar2 = new Bar(700, 100, 40, 100, board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas, board);
var ball = new Ball(350, 100, 10, board)

window.requestAnimationFrame(controller);
board_view.draw();
function draw2(ctx, element) {

    //if(element!== null && element.hasOwnProperty("kind")){      
    console.log("ddddd")
    switch (element.kind) {
        case "rectangle":
            ctx.fillRect(element.x, element.y, element.width, element.height);
            break;
        case "circle":
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.radius, 0, 7);
            ctx.fill();
            ctx.closePath();
            break;

        //}
    }
}


function controller() {
    board_view.play();
    window.requestAnimationFrame(controller)



}