//#region initVars
var fps = 50;
var gravity = 9.8;

var massInput1 = document.getElementById("mass1");
var radiusInput1 = document.getElementById("radius1");
var angVelInput1 = document.getElementById("angularVelocity1");
var cenForce1 = document.getElementById("cenForceText1");
var linVel1 = document.getElementById("linVelText1");

var massInput2 = document.getElementById("mass2");
var radiusInput2 = document.getElementById("radius2");
var angVelInput2 = document.getElementById("angularVelocity2");
var coefInput2 = document.getElementById("coef2");
var cenForceText2 = document.getElementById("cenForceText2");
var fricForceText2 = document.getElementById("fricForceText2");
var minCoefLabel2 = document.getElementById("coefLabel2");

var massInput3 = document.getElementById("mass3");
var radiusInput3 = document.getElementById("radius3");
var angVelInput3 = document.getElementById("angularVelocity3");
var linVelText3 = document.getElementById("linearVelocity3");
var tenForceText3 = document.getElementById("tenForceText3");
var angleText3 = document.getElementById("angleText3");

//#endregion initVars

//#region startGame
window.onload = startGame;

function startGame() {
    // circle(simAreaName, x, y, radius, startAngle, endAngle,
    //     pathRadius = 0, angularVelocity = 0, color = "black", mass = 1)
    // ellipse(simAreaName, x, y, width, height, color = "black")

    //canvas1
    simArea1.start();
    console.log(massInput3);
    circle1 = new circle("simArea1", simArea1.canvas.width/2, simArea1.canvas.height/2, 
        10, 0, 2 * Math.PI, 80, 1, "black", 1);
    
    //canvas2
    simArea2.start();

    turnTable2 = new ellipse("simArea2", simArea2.canvas.width/2, simArea2.canvas.height/2, 200, 80);
    ellipse2 = new ellipse("simArea2", simArea2.canvas.width/2, simArea2.canvas.height/2, 22, 12, "red");

    //canvas3
    simArea3.start();
    
    circle3 = new circle("simArea3", simArea3.canvas.width/2, simArea3.canvas.height/1.7,
        10, 0, 2 * Math.PI, 80, Math.PI, "black", 1);

    simArea1.canvas.onclick = function() {
        simArea1.isPaused = !simArea1.isPaused;
    };

    simArea2.canvas.onclick = function() {
        simArea2.isPaused = !simArea2.isPaused;
    };

    simArea3.canvas.onclick = function() {
        simArea3.isPaused = !simArea3.isPaused;
    };

    // source: https://stackoverflow.com/a/26202266

    minCoefLabel2.onclick = function() {setMinCoef()};

}

//#endregion startGame

//#region simAreaInits
var simArea1 = {
    canvas : document.getElementById("canvas1"),
    isPaused : false,
    start : function() {
        /*if (window.innerWidth/2 >= 250)
        {
            this.canvas.width = window.innerWidth/2;
        } else {
            this.canvas.width = 100;
        }
        if (window.innerHeight/2  >= 250)
        {
            this.canvas.height = window.innerHeight/2;
        }
        else {
            this.canvas.height = 100;
        }*/
        this.canvas.width = window.innerWidth/2;
        this.canvas.height = window.innerHeight/2;



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
        if (window.innerWidth/2 >= 250)
        {
            this.canvas.width = window.innerWidth/2;
        } else {
            this.canvas.width = 250;
        }
        if (window.innerHeight/2  >= 250)
        {
            this.canvas.height = window.innerHeight/2;
        }
        else {
            this.canvas.height = 250;
        }

        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSimArea2, 1000 / fps);
        this.isPaused = false;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var simArea3 = {
    canvas : document.getElementById("canvas3"),
    isPaused : false,
    start : function() {
        if (window.innerWidth/2 >= 250)
        {
            this.canvas.width = window.innerWidth/2;
        } else {
            this.canvas.width = 250;
        }
        if (window.innerHeight/2  >= 250)
        {
            this.canvas.height = window.innerHeight/2;
        }
        else {
            this.canvas.height = 250;
        }

        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateSimArea3, 1000 / fps);
        this.isPaused = false;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//#endregion simAreaInits

//#region updateSimArea1
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

    circle1.mass = parseFloat(massInput1.value);
    circle1.pathRadius = parseFloat(radiusInput1.value) * 20;
    circle1.angularVelocity = parseFloat(angVelInput1.value);

    if (isNaN(circle1.mass)) {
        circle1.mass = 0;
        massInput1.value = 0;
    }

    if (isNaN(circle1.pathRadius)) {
        circle1.pathRadius = 5;
    }

    if (circle1.pathRadius > 200) {
        circle1.pathRadius = 200;
        radiusInput1.value = 10;
    }

    if (isNaN(circle1.angularVelocity)) {
        circle1.angularVelocity = 0;
    }

    if (circle1.angularVelocity > 10) {
        circle1.angularVelocity = 10;
        angVelInput1.value = 10;
    }

    pathRadiusMeters = circle1.pathRadius / 20;

    circle1.radians += circle1.angularVelocity / fps;

    xpos = circle1.initialx - (Math.cos(circle1.radians) * circle1.pathRadius);
    ypos = circle1.initialy - (Math.sin(circle1.radians) * circle1.pathRadius);

    circle1.x = xpos;
    circle1.y = ypos;
    

    //circle path and radius
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 3]);

    //path
    ctx.arc(simArea1.canvas.width/2, simArea1.canvas.height/2, circle1.pathRadius, 0, 2 * Math.PI);

    //radius
    ctx.moveTo(simArea1.canvas.width/2, simArea1.canvas.height/2);
    ctx.lineTo(simArea1.canvas.width/2 - circle1.pathRadius, simArea1.canvas.height/2);
    ctx.stroke();
    ctx.setLineDash([1, 0]);
    ctx.closePath();

    ctx.font = "16px Lato";
    ctx.fillStyle = "black";
    ctx.fillText(pathRadiusMeters + " m", simArea1.canvas.width/2 - circle1.pathRadius/2, simArea1.canvas.height/2 + 16);


    //centripetal force line
    ctx.beginPath();
    ctx.moveTo(xpos, ypos);
    ctx.lineTo(xpos - Math.cos(circle1.radians + Math.PI) * circle1.angularVelocity * 10,
        ypos - Math.sin(circle1.radians + Math.PI) * circle1.angularVelocity * 10);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();


    //linear velocity arrow
    //linVel1 = circle1.pathRadius * circle1.angularVelocity;

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

    linVel1.innerHTML = (circle1.angularVelocity * pathRadiusMeters).toFixed(2);
    cenForce1.innerHTML = (Math.pow((circle1.angularVelocity * pathRadiusMeters), 2) 
        * circle1.mass / pathRadiusMeters).toFixed(2);

}
//#endregion updateSimArea1

//#region updateSimArea2
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

    ellipse2.mass = parseFloat(massInput2.value);
    ellipse2.pathRadius = parseFloat(radiusInput2.value) * 20;
    ellipse2.angularVelocity = parseFloat(angVelInput2.value);
    coef = parseFloat(coefInput2.value);

    if (isNaN(ellipse2.mass)) {
        ellipse2.mass = 0;
        massInput2.value = 0;
    }

    if (isNaN(ellipse2.pathRadius)) {
        ellipse2.pathRadius = 5;
    }

    if (ellipse2.pathRadius > 200) {
        ellipse2.pathRadius = 200;
        radiusInput2.value = 10;
    }

    if (isNaN(ellipse2.angularVelocity)) {
        ellipse2.angularVelocity = 0;
    }

    if (ellipse2.angularVelocity > 20) {
        ellipse2.angularVelocity = 20;
        angVelInput2.value = 20;
    }

    ellipse2.pathRadiusMeters = ellipse2.pathRadius / 20;

    turnTable2.width = 2 * (ellipse2.pathRadius + 15);
    turnTable2.height = 2 * (ellipse2.pathRadius + 15) * 0.4;
    turnTable2.update();

    //moving circle
    ellipse2.radians += ellipse2.angularVelocity / fps;

    xpos = ellipse2.initialx - (Math.cos(ellipse2.radians) * ellipse2.pathRadius);
    ypos = ellipse2.initialy - (Math.sin(ellipse2.radians) * ellipse2.pathRadius * 0.27);

    ellipse2.x = xpos;
    ellipse2.y = ypos;
    ellipse2.update();

    //reference line
    ctx.beginPath();
    ctx.moveTo(simArea2.canvas.width/2, simArea2.canvas.height/2);
    ctx.lineTo(simArea2.canvas.width/2 - (Math.cos(ellipse2.radians + Math.PI) * 0.5 * turnTable2.width), 
        simArea2.canvas.height/2 - (Math.sin(ellipse2.radians + Math.PI) * 0.38 * turnTable2.height));
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    
    cenForce = ellipse2.mass * Math.pow(ellipse2.angularVelocity * ellipse2.pathRadiusMeters, 2) / ellipse2.pathRadiusMeters;
    cenForceText2.innerHTML = cenForce.toFixed(2);

    fricForce = ellipse2.mass * coef * gravity;
    if (fricForce > cenForce)
    {
        //fricForce = cenForce;
    }
    fricForceText2.innerHTML = fricForce.toFixed(2);


}

function setMinCoef () {

    minCoef = Math.pow(ellipse2.angularVelocity * ellipse2.pathRadiusMeters, 2) / (ellipse2.pathRadiusMeters * gravity);
    coefInput2.value = minCoef.toFixed(5);


}
//#endregion updateSimArea2

//#region updateSimArea3
function updateSimArea3 () {
    
    ctx = simArea3.context;

    width = simArea3.canvas.width;
    height = simArea3.canvas.height;

    if (simArea3.isPaused == true) {
        if (Math.cos(circle3.radians) <= -0.8 && circle3.x != circle3.initialx - (-circle3.pathRadius))
        {
            tensionX = (Math.pow((circle3.angularVelocity * pathRadiusMeters), 2) 
                * circle3.mass / pathRadiusMeters).toFixed(2);
            tensionY = circle3.mass * gravity;
            tensionMag = (Math.sqrt(Math.pow(tensionX, 2) + Math.pow(tensionY, 2))).toFixed(2);

            angle = Math.atan(tensionX/tensionY) * 180 / Math.PI;
            angleText3.innerHTML = angle.toFixed(2);

            xpos = circle3.initialx + circle3.pathRadius;
            ypos = width/4 + (circle3.pathRadius / Math.tan(angle * Math.PI / 180)) 
                - (Math.sin(circle3.radians) * 0.25 * circle3.pathRadius);

            circle3.x = xpos;
            circle3.y = ypos;

            simArea3.clear();
            circle3.update();

            ctx.beginPath();
            ctx.moveTo(width/2, 3 * height/4);
            ctx.lineTo(width/2, height/4);
            ctx.lineTo(circle3.x, circle3.y);
            ctx.stroke();
            ctx.closePath();

        } else if (Math.cos(circle3.radians) >= 0.8 && circle3.x != circle3.initialx - (circle3.pathRadius))
        {
            tensionX = (Math.pow((circle3.angularVelocity * pathRadiusMeters), 2) 
                * circle3.mass / pathRadiusMeters).toFixed(2);
            tensionY = circle3.mass * gravity;
            tensionMag = (Math.sqrt(Math.pow(tensionX, 2) + Math.pow(tensionY, 2))).toFixed(2);

            angle = Math.atan(tensionX/tensionY) * 180 / Math.PI;
            angleText3.innerHTML = angle.toFixed(2);

            xpos = circle3.initialx - circle3.pathRadius;
            ypos = width/4 + (circle3.pathRadius / Math.tan(angle * Math.PI / 180)) 
                - (Math.sin(circle3.radians) * 0.25 * circle3.pathRadius);

            circle3.x = xpos;
            circle3.y = ypos;

            simArea3.clear();
            circle3.update();

            ctx.beginPath();
            ctx.moveTo(width/2, 3 * height/4);
            ctx.lineTo(width/2, height/4);
            ctx.lineTo(circle3.x, circle3.y);
            ctx.stroke();
            ctx.closePath();

        }
        ctx.font = "30px Lato";
        ctx.fillStyle = "#303639";
        ctx.fillText("Paused", simArea3.canvas.width - 115, 35);
        
        return;

    } else {
        ctx.fillStyle = "lightgray";
        ctx.fillText("Paused", simArea3.canvas.width - 50, 10);

    }

    simArea3.clear();

    circle3.mass = parseFloat(massInput3.value);
    circle3.angularVelocity = parseFloat(angVelInput3.value);
    circle3.pathRadius = parseFloat(radiusInput3.value) * 20;

    if (isNaN(circle3.mass)) {
        circle3.mass = 0;
        massInput3.value = 0;
    }

    if (isNaN(circle3.pathRadius)) {
        circle3.pathRadius = 5;
    }

    if (circle3.pathRadius > 200) {
        circle3.pathRadius = 200;
        radiusInput3.value = 10;
    }

    if (isNaN(circle3.angularVelocity)) {
        circle3.angularVelocity = 0;
    }

    if (circle3.angularVelocity > 10) {
        circle3.angularVelocity = 10;
        angVelInput3.value = 10;
    }

    pathRadiusMeters = circle3.pathRadius / 20;
    circle3.radians += circle3.angularVelocity / fps;

    tensionX = (Math.pow((circle3.angularVelocity * pathRadiusMeters), 2) 
        * circle3.mass / pathRadiusMeters).toFixed(2);
    tensionY = circle3.mass * gravity;
    tensionMag = (Math.sqrt(Math.pow(tensionX, 2) + Math.pow(tensionY, 2))).toFixed(2);

    angle = Math.atan(tensionX/tensionY) * 180 / Math.PI;
    angleText3.innerHTML = angle.toFixed(2);

    xpos = circle3.initialx - (Math.cos(circle3.radians) * circle3.pathRadius);
    ypos = width/4 + (circle3.pathRadius / Math.tan(angle * Math.PI / 180)) 
        - (Math.sin(circle3.radians) * 0.25 * circle3.pathRadius);

    circle3.x = xpos;
    circle3.y = ypos;

    circle3.update();

    ctx.beginPath();
    ctx.moveTo(width/2, 3 * height/4);
    ctx.lineTo(width/2, height/4);
    ctx.lineTo(circle3.x, circle3.y);
    ctx.stroke();
    ctx.closePath();

    tenForceText3.innerHTML = tensionMag;

    linVel = circle3.angularVelocity * pathRadiusMeters;
    linVelText3.innerHTML = linVel.toFixed(2);

}

//#endregion updateSimArea3

//#region components

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
    this.angularVelocity = 1;
    this.mass = 1;
    this.pathRadius = 100;

    this.width = width;
    this.height = height;

    this.pathRadiusMeters = 100 / 20;

    this.update = function() {
        
        ctx = window[simAreaName].context;
        ctx.beginPath();
        
        ctx.moveTo(this.x - this.width/2, this.y); // A1
        
        ctx.bezierCurveTo(
            this.x - this.width/2, this.y - this.height/2, // C1
            this.x + this.width/2, this.y - this.height/2, // C2
            this.x + this.width/2, this.y); // A2

        ctx.bezierCurveTo(
            this.x + this.width/2, this.y + this.height/2, // C3
            this.x - this.width/2, this.y + this.height/2, // C4
            this.x - this.width/2, this.y); // A1
        
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
//#endregion components