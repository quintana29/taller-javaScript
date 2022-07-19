class Board{
    constructor(width,height){
        this.width = width;
        this.height = height;
        this.playing=false;
        this.game_over=false;
        this.bars=[];
        

    }
      
    get elements(){
        let elements = this.bars;
        return elements;
    }
  
}

class BoardView{
    constructor(canvas,board){
        this.canvas = canvas;
        this.canvas.width =board.width;
        this.canvas.height=board.height;
        this.board=board;
        this.ctx=canvas.getContext("2d");
    }
    draw =  function(){
        console.log("jjjjjj")
        for(let i= this.board.elements.length-1; i>=0; i--) {
                let el=this.board.elements[i];
                draw2(this.ctx,el);
            }
    }
}
window.addEventListener("load",main);

class Bar{
    constructor(x,y,width,height,board){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.board=board;
        this.board.bars.push(this)
        this.kind="rectangle";
        this.speed=10;

    }
    /* self.Bar.prototype={
        down: function(){
        }
        up: function(){
        }
    } */
}
function draw2(ctx,element){

    if(element!== null && element.hasOwnProperty("kind")){      
        console.log("ddddd")
        switch(element.kind){
            case "rectangle":
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                     break;   
                
        }
    }
    }
    
 

function main(){
var board = new Board(800,400);
let bar = new Bar(20,100,40,100,board);
let bar2 = new Bar(700,100,40,100,board);
var canvas = document.getElementById('canvas');
var board_view = new BoardView(canvas,board);

board_view.draw();
}