var fps = 50;

var angVelText = document.getElementById("angVelText");
var angVelInput = document.getElementById("angularVelocity1");
var cenForText = document.getElementById("cenForText");
var massText = document.getElementById("massText");

var linVelText = document.getElementById("linVelText");

window.onload = startGame;

function startGame() {
    // circle(simAreaName, x, y, radius, startAngle, endAngle,
    //     pathRadius = 0, angularVelocity = 0, color = "black", mass = 1)
    // ellipse(simAreaName, x, y, width, height, color = "black")

    //canvas1
    simArea1.start();

    circle1 = new circle("simArea1", simArea1.canvas.width/2, simArea1.canvas.height/2, 
        10, 0, 2 * Math.PI, 80, 1, "black", 1);
    
    //canvas2
    simArea2.start();

    ellipse2 = new ellipse("simArea2", simArea2.canvas.width/2, simArea2.canvas.height/2, 200, 80);
    frictionEllipse = new ellipse("simArea2", simArea2.canvas.width/2, simArea2.canvas.height/2, 22, 12, "red");

    simArea1.canvas.onclick = function() {
        simArea1.isPaused = !simArea1.isPaused;
    };

    simArea2.canvas.onclick = function() {
        simArea2.isPaused = !simArea2.isPaused;
    };

}


var simArea1 = {
    canvas : document.getElementById("canvas1"),
    isPaused : false,
    start : function() {
        this.canvas.width = window.innerWidth - 400;
        this.canvas.height = window.innerHeight - 400;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSimArea1, 1000 / fps);
        this.isPaused = false;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var simArea2 = {
    canvas : document.getElementById("canvas2"),
    isPaused : false,
    start : function() {
        this.canvas.width = window.innerWidth - 400;
        this.canvas.height = window.innerHeight - 400;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSimArea2, 1000 / fps);
        this.isPaused = false;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////// U P D A T E   F U N C T I O N S ////////////
/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

function updateSimArea1() {

    ctx = simArea1.context;
    if (simArea1.isPaused == true) {

        ctx.font = "30px Lato";
        ctx.fillStyle = "#303639";
        ctx.fillText("Paused", simArea2.canvas.width - 115, 35);

        return;

    } else {
        ctx.fillStyle = "lightgray";
        ctx.fillText("Paused", simArea1.canvas.width - 50, 10);

    }
            

    simArea1.clear();


    //moving circle -- update function at bottom so it draws over arrows
    circle1.angularVelocity = parseFloat(angVelInput.value);
    if (isNaN(circle1.angularVelocity)) {
        circle1.angularVelocity = 0;
    }

    if (circle1.angularVelocity > 10) {
        circle1.angularVelocity = 10;
        angVelInput.value = 10;
    }

    circle1.radians += circle1.angularVelocity / fps;

    xpos = circle1.initialx - (Math.cos(circle1.radians) * circle1.pathRadius);
    ypos = circle1.initialy - (Math.sin(circle1.radians) * circle1.pathRadius);

    circle1.x = xpos;
    circle1.y = ypos;
    

    //circle path
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.setLineDash([5, 3]);
    ctx.arc(simArea1.canvas.width/2, simArea1.canvas.height/2, circle1.pathRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    //circle path radius
    ctx.beginPath();
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = "black";
    ctx.moveTo(simArea1.canvas.width/2, simArea1.canvas.height/2);
    ctx.lineTo(simArea1.canvas.width/2, simArea1.canvas.height/2 - circle1.pathRadius);
    ctx.setLineDash([1, 0]);
    ctx.closePath();



    //centripetal force line
    ctx.beginPath();
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(xpos - Math.cos(circle1.radians + Math.PI) * circle1.angularVelocity * 10,
        ypos - Math.sin(circle1.radians + Math.PI) * circle1.angularVelocity * 10);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();


    //linear velocity arrow
    linVel1 = circle1.pathRadius * circle1.angularVelocity;

    drawArrow(xpos, ypos, xpos - Math.cos(circle1.radians + Math.PI/2) * circle1.angularVelocity * 15,
        ypos - Math.sin(circle1.radians + Math.PI/2) * circle1.angularVelocity * 15, "darkred", 3, 5);

    
    //centripetal force arrow
    drawArrow(xpos, ypos, xpos - Math.cos(circle1.radians + Math.PI) * circle1.angularVelocity * 10,
        ypos - Math.sin(circle1.radians + Math.PI) * circle1.angularVelocity * 10);
    
    circle1.update();


    //reference line
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "lightblue";
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(xpos, ypos + circle1.radius);
    ctx.stroke();
    ctx.closePath();

    


    ///////// Text displays //////////

    angVelText.innerHTML = circle1.angularVelocity;
    linVelText.innerHTML = linVel1.toFixed(2);
    cenForText.innerHTML = (Math.pow(linVel1, 2) * circle1.mass / circle1.pathRadius).toFixed(2);
    massText.innerHTML = circle1.mass;

}

function updateSimArea2 () {


    ctx = simArea2.context;

    if (simArea2.isPaused == true) {

        ctx.font = "30px Lato";
        ctx.fillStyle = "#303639";
        ctx.fillText("Paused", simArea2.canvas.width - 115, 35);

        return;

    } else {
        ctx.fillStyle = "lightgray";
        ctx.fillText("Paused", simArea2.canvas.width - 50, 10);

    }

    simArea2.clear();

    ellipse2.update();

    //moving circle
    frictionEllipse.radians += Math.PI / fps;

    xpos = frictionEllipse.initialx - (Math.cos(frictionEllipse.radians) * 85);
    ypos = frictionEllipse.initialy - (Math.sin(frictionEllipse.radians) * 22);

    frictionEllipse.x = xpos;
    frictionEllipse.y = ypos;
    frictionEllipse.update();

    //reference line
    ctx.beginPath();
    ctx.moveTo(simArea2.canvas.width/2, simArea2.canvas.height/2);
    ctx.lineTo(simArea2.canvas.width/2 - (Math.cos(frictionEllipse.radians + Math.PI) * 100),
        simArea2.canvas.height/2 - (Math.sin(frictionEllipse.radians + Math.PI) * 31));
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    

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
    this.mass = mass;
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

    this.radians = 0;

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

function drawArrow(fromx, fromy, tox, toy, color = "black", len = 4, width = 6){
    //variables to be used when creating the arrow

    var ctx = simArea1.canvas.getContext("2d");
    var headlen = 4;

    var angle = Math.atan2(toy - fromy,tox - fromx);

    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    //ctx.strokeStyle = "#cc0000";
    ctx.lineWidth = 6;
    ctx.stroke();
    ctx.closePath();

    

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI/7), toy - headlen * Math.sin(angle - Math.PI/7));
    
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI/7),toy - headlen * Math.sin(angle + Math.PI/7));
    
    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI/7), toy - headlen * Math.sin(angle - Math.PI/7));
    
    //draws the paths created above
    //ctx.strokeStyle = "#cc0000";
    ctx.lineWidth = 6;
    ctx.stroke();
    //ctx.fillStyle = "#cc0000";
    ctx.fill();
    ctx.closePath();
}