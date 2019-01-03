var timeStep = 1000/50  // 1000/x where x is number of update per second

function startGame() {
    simArea.start();
    circle1 = new circle(simArea.canvas.width/2, simArea.canvas.height/2, 
        5, 0, 2 * Math.PI);
}
window.onload = startGame;

var simArea = {
    canvas : document.getElementById("canvas2"),
    start : function() {
        this.canvas.width = window.innerWidth * 0.5;
        this.canvas.height = window.innerHeight * 0.5;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateGameArea, timeStep);
		console.log(this.canvas.width, this.canvas.height);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function rectangle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.update = function(){
        ctx = simArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function circle(x, y, radius, startAngle, endAngle) {
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.x = x;
    this.y = y;
    this.initialx = x;
    this.initialy = y;
    this.radians = 0;
    this.velocity = 0.25 * Math.PI * 1/timeStep;
    this.pRadius = pathRadius;
    this.update = function() {
        ctx = simArea.context;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        ctx.fill();
    }
}