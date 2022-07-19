import{Board} from "/Board.js"

class BoardView{
    constructor(canvas,board){
        this.canvas = canvas;
        this.canvas.width =board.width;
        this.canvas.height=board.height;
        this.board=board;
        this.ctx=canvas.getContext("2d");
    }
}
window.addEventListener("load",main);
function main(){
var board = new Board(800,400);
var canvas = document.getElementById('canvas','board');
var board_view = new BoardView(canvas,board);
}