/**
 *  Setup Canvas for pendulumn animation 
 *  Read data from pendulum_array and create Pendulums objects using the Pendulum Class
 * 
 *  dump/log resulting object array in browser console
 */
function setup() {
    createCanvas(window.innerWidth, 700);

    for(var i = 0; i < list.length; i++){
        point_start = parseInt(list[i].point);
        pendulum_array[i] = new Pendulum(point_start,50,list[i].length,list[i].mass,parseInt(list[i].angle));
    }
    console.log(pendulum_array);
}

/**
 *  Function gets called by p5 script repeatedly to resulting in a moving pendulum
 *  Also detacts colision based on the neighbour's coordinates 
 * 
 */
function draw(){
    background(225);
    var position_array = [];
    for(var i = 0; i<pendulum_array.length; i++){
        var temp_point = pendulum_array[i].display(list[i].color);
        pendulum_array[i].drag();
        var position = pendulum_array[i].update();
        position_array.push(position);
        for(var j = 0; j < sortedList.length; j++){
            if(sortedList[j].point == temp_point){
                // sortedList[j].xPosition = parseInt(position[0])+parseInt(sortedList[j].mass);
                sortedList[j].xPosition = parseInt(position[0]);
                sortedList[j].yPosition = parseInt(position[1]);
            }
        }   
    }
    // console.log(sortedList);

    if(sortedList.length>1){
        loop1:
            for(var i =0;i<sortedList.length;i++){
                if(sortedList[i].rightNeighbor !== 0 && sortedList[i].leftNeighbor === 0){
                    // console.log(sortedList[i].rightNeighbor);
                    var xI = Math.round(sortedList[i].xPosition);
                    var yI = Math.round(sortedList[i].yPosition);
                    var massI = parseInt(sortedList[i].mass);
                    var xJ = Math.round(sortedList[i+1].xPosition);
                    var yJ = Math.round(sortedList[i+1].yPosition);
                    var massJ = parseInt(sortedList[i+1].mass);
                    
                    var shortPendulumnIndex = i;
                    var small = "i";
                    if(yI < yJ){
                        shortPendulumnIndex = i;
                        small = "i";
                    }else if(yI > yJ){
                        shortPendulumnIndex = i+1;
                        small = "j";
                    }else{
                        shortPendulumnIndex = i+1;
                        small = "nan";
                    }

                    if(small === "i"){
                        xI = xI-massI;
                    }else if(small === "j"){
                        xJ = xJ+massJ;
                    }else{
                        xI = xI-massI;
                        xJ = xJ+massJ;
                    }
                    var minHeight = Math.min(yI, yJ);
                    var distance = Math.abs(parseInt(sortedList[i].point)-parseInt(sortedList[i+1].point));
                    // console.log("D:"+xI+"-"+ minHeight+"-"+  xJ+"-"+  minHeight+"-"+yI+"-"+ yJ);
                    // console.log("D:"+dist(xI, minHeight, xJ, minHeight));
                    if(dist(xI, minHeight, xJ, minHeight) < 12){
                    // if(Math.abs(xI-xJ) < 20){
                        console.log(dist(xI, yI, xJ, yJ));
                        console.log("collision on right: "+Math.abs(xI-xJ));
                        document.getElementById("pause").click();
                        socket.emit("status", {"message": "STOP"});
                    }
                }
                else if(sortedList[i].leftNeighbor !== 0 && sortedList[i].rightNeighbor === 0){
                    var xI = Math.round(sortedList[i].xPosition);
                    var yI = Math.round(sortedList[i].yPosition);
                    var xJ = Math.round(sortedList[i-1].xPosition);
                    var yJ = Math.round(sortedList[i-1].yPosition);
                    var distance = Math.abs(parseInt(sortedList[i].point)-parseInt(sortedList[i-1].point));
                    if(dist(xI, yI, xJ, yJ) < 80){
                        console.log("collision on left: "+Math.abs(xI-xJ));
                        document.getElementById("pause").click();
                        socket.emit("status", {"message": "STOP"});
                    }
                }else if(sortedList[i].leftNeighbor !== 0 && sortedList[i].rightNeighbor !== 0){
                    var currentX = Math.round(sortedList[i].xPosition);
                    var currentY = Math.round(sortedList[i].yPosition);
                    var xI = Math.round(sortedList[i+1].xPosition);
                    var yI = Math.round(sortedList[i+1].yPosition);
                    var xJ = Math.round(sortedList[i-1].xPosition);
                    var yJ = Math.round(sortedList[i-1].yPosition);

                    if(dist(xI, yI, currentX, currentY) < 80 || dist(xJ, yJ, currentX, currentY) < 80){
                        dist(xI, yI, currentX, currentY) < 80 ? console.log("collision-T: right : "+dist(xI, yI, currentX, currentY)) : console.log("collision: right : "+dist(xJ, yJ, currentX, currentY));
                        document.getElementById("pause").click();
                        socket.emit("status", {"message": "STOP"});
                    }
                }
            }
    }
}

/**
 *  mousePressed function to check if object/pendulum is clicked on for drag and drop task
 */
function mousePressed() {
    for(var i = 0; i<pendulum_array.length; i++){
        pendulum_array[i].clicked(mouseX,mouseY);
    }
}

/**
 *  mouseReleased function to check if object/pendulum is released
 */
function mouseReleased() {
    for(var i = 0; i<pendulum_array.length; i++){
        pendulum_array[i].stopDragging();
    }
}


