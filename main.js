class Board {
    constructor(width, height) {
        this.width = width;
        this.height = height;
       
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
            this.check_collisions();
            this.board.ball.move();
            

        }
    }

    check_collisions(){
        for(vari=this.board.bars.length-1;i>=0;i--){
          var bar=this.board.bars[i];
           if(hit(bar,this.board.ball)){
            this.board.ball.collision(bar);
          }
        
}
    }
}


window.addEventListener("load", controller);

document.addEventListener("keydown", function (ev) {
    ev.preventDefault();
    if (ev.code === "ArrowUp") {
        //ev.preventDefault();
        bar.up();
    } else if (ev.code === "ArrowDown") {
        //ev.preventDefault();
        bar.down();
    } else if (ev.code === "KeyW") {
        //ev.preventDefault();
        bar2.up();
    } else if (ev.code === "KeyS") {
        //ev.preventDefault();
        bar2.down();
    } else if (ev.code === "Space") {
        //ev.preventDefault();
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
        this.bounce_angle = 0;
        this.max_bounce_angle = Math.PI/12;

    }

    move() {
        this.x += (this.speed_x * this.direction)
        this.y += (this.speed_y);
    }
    collision(bar){
        let relative_intersect_y=(bar.y+(bar.height/2))-this.y;
        let normalized_intersect_y=relative_intersect_y/(bar.height/2);
        this.bounce_angle=normalized_intersect_y*this.max_bounce_angle;
                             
        this.speed_y=this.speed*-Math.sin(this.bounce_angle);
        this.speed_x=this.speed*Math.cos(this.bounce_angle);
        if(this.x>(this.board.width/2))this.direction=-1;
        else this.direction=1;

    }
    get width(){
        return this.radius*2;
    }
    get height(){
        return this.radius*2;
    }
}
function hit(a, b) {
    let hit = false;
    
    if(b.x + b.width >= a.x && b.x < a.x + a.width){
        if(b.y  +b.height>= a.y && b.y < a.y + a.height){
            hit=true;
        }
    }

    if(b.x <= a.x && b.x + b.width >= a.x + a.width){
        if(b.y <= a.y && b.y + b.height >= a.y + a.height){
            hit=true;
        }
    }
    if(a.x <= b.x && a.x + a.width >= b.x + b.width){
        if(a.y <= b.y && a.y + a.height >= b.y + b.height){
            hit=true;
        }
    }

    return hit;
                             
}
let board = new Board(800, 400);
let bar = new Bar(20, 100, 40, 100, board);
let bar2 = new Bar(700, 100, 40, 100, board);
let canvas = document.getElementById('canvas');
let board_view = new BoardView(canvas, board);
let ball = new Ball(350, 100, 10, board)

board_view.draw();
window.requestAnimationFrame(controller);

function draw2(ctx, element) {

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

    
    }
}


function controller() {
    board_view.play();
    window.requestAnimationFrame(controller)



}