var fps = 50;

var angVelText = document.getElementById("angVelText");
var angVelInput = document.getElementById("angularVelocity1");

var linVelText = document.getElementById("linVelText");

window.onload = startGame;

function startGame() {
    // circle(simAreaName, x, y, radius, startAngle, endAngle,
    //     pathRadius = 0, angularVelocity = 0, color = "black", mass = 1)

    // ellipse(simAreaName, x, y, width, height, color = "black")

    //canvas1
    simArea1.start();

    circle1 = new circle("simArea1", simArea1.canvas.width/2, simArea1.canvas.height/2, 
        5, 0, 2 * Math.PI, 80, 1, "black", 1);
    
    //canvas2
    simArea2.start();

    ellipse2 = new ellipse("simArea2", simArea2.canvas.width/2, simArea2.canvas.height/2, 200, 80);
    frictionEllipse = new ellipse("simArea2", simArea2.canvas.width/2, simArea2.canvas.height/2, 22, 12, "red");

}


var simArea1 = {
    canvas : document.getElementById("canvas1"),
    start : function() {
        this.canvas.width = window.innerWidth * 0.5;
        this.canvas.height = window.innerHeight * 0.5;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSimArea1, 1000 / fps);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
}

var simArea2 = {
    canvas : document.getElementById("canvas2"),
    start : function() {
        this.canvas.width = window.innerWidth * 0.5;
        this.canvas.height = window.innerHeight * 0.5;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSimArea2, 1000 / fps);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function updateSimArea1() {

    simArea1.clear();

    //moving circle
    circle1.angularVelocity = parseFloat(angVelInput.value);
    if (isNaN(circle1.angularVelocity)) {
        circle1.angularVelocity = 0;
    }

    circle1.radians += circle1.angularVelocity / fps;

    xpos = circle1.initialx - (Math.cos(circle1.radians) * circle1.pathRadius);
    ypos = circle1.initialy - (Math.sin(circle1.radians) * circle1.pathRadius);

    circle1.x = xpos;
    circle1.y = ypos;
    circle1.update();
    

    //circle path
    ctx = simArea1.context;
    ctx.beginPath();
    ctx.arc(simArea1.canvas.width/2, simArea1.canvas.height/2, circle1.pathRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();


    //tangent line
    ctx.beginPath();
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(xpos - Math.cos(circle1.radians + Math.PI/2) * circle1.angularVelocity / 50 * 1000,
        ypos - Math.sin(circle1.radians + Math.PI/2) * circle1.angularVelocity / 50 * 1000);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    //centripetal force line
    ctx.beginPath();
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(xpos - Math.cos(circle1.radians + Math.PI) * circle1.angularVelocity / 50 * 1000,
        ypos - Math.sin(circle1.radians + Math.PI) * circle1.angularVelocity / 50 * 1000);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();


    linVel1 = circle1.mass * circle1.angularVelocity;

    console.log(typeof(circle1.mass), typeof(circle1.angularVelocity));
    ///////// Text displays //////////

    angVelText.innerHTML = circle1.angularVelocity;
    linVelText.innerHTML = linVel1;

}

function updateSimArea2 () {

    simArea2.clear();

    ctx = simArea2.context;

    ellipse2.update();

    //moving circle
    frictionEllipse.radians += Math.PI / fps;

    xpos = frictionEllipse.initialx - (Math.cos(circle1.radians) * 85);
    ypos = frictionEllipse.initialy - (Math.sin(circle1.radians) * 22);

    frictionEllipse.x = xpos;
    frictionEllipse.y = ypos;
    frictionEllipse.update();

    //movement line
    ctx.beginPath();
    ctx.moveTo(simArea2.canvas.width/2, simArea2.canvas.height/2);
    ctx.lineTo(simArea2.canvas.width/2 - (100 * Math.cos(circle1.radians + Math.PI)),
        simArea2.canvas.height/2 - (31 * Math.sin(circle1.radians + Math.PI)));
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath;
    

}

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
//////////////////////////// S H A P E S ////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


function rectangle(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.update = function(){
        ctx = simArea1.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function circle(simAreaName, x, y, radius, startAngle, endAngle,
    pathRadius = 0, angularVelocity = 0, color = "black", mass = 1) {
    
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.x = x;
    this.y = y;
    this.initialx = x;
    this.initialy = y;
    this.radians = 0;
    this.pathRadius = pathRadius;
    this.angularVelocity = angularVelocity;
    this.update = function() {
        ctx = window[simAreaName].context;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
        ctx.fill();
        ctx.closePath();
    }
}

function ellipse(simAreaName, x, y, width, height, color = "black") {
	
    //adapted from http://www.williammalone.com/briefs/how-to-draw-ellipse-html5-canvas/

    this.x = x;
    this.y = y;
    this.initialx = x;
    this.initialy = y;

    this.update = function() {
        
        ctx = window[simAreaName].context;
        ctx.beginPath();
        
        ctx.moveTo(this.x - width/2, this.y); // A1
        
        ctx.bezierCurveTo(
            this.x - width/2, this.y - height/2, // C1
            this.x + width/2, this.y - height/2, // C2
            this.x + width/2, this.y); // A2

        ctx.bezierCurveTo(
            this.x + width/2, this.y + height/2, // C3
            this.x - width/2, this.y + height/2, // C4
            this.x - width/2, this.y); // A1
        
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}