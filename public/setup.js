function setup() {
    createCanvas(window.innerWidth, 700);

    for(var i = 0; i < list.length; i++){
        point_start = parseInt(list[i].point);
        pendulum_array[i] = new Pendulum(point_start,50,list[i].length,list[i].mass,parseInt(list[i].angle));
    }
    console.log(pendulum_array);
}

function draw(){
    background(225);
    var position_array = [];
    for(var i = 0; i<pendulum_array.length; i++){
        var temp_point = pendulum_array[i].display(list[i].color);
        pendulum_array[i].drag();
        var position = pendulum_array[i].update();
        position_array.push(position);
        // var temp_point = pendulum_array[i].point();
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
                    // if(Math.abs(xI-xJ) < 17){
                    var heightDifference = Math.abs((parseInt(sortedList[i].length))-(parseInt(sortedList[i+1].length)));
                    var pointDifference = Math.abs(dist(xI, yI, xJ, yJ));

                    var yCoordinate = sortedList[i].yPosition > sortedList[i+1].yPosition ? sortedList[i+1].yPosition : sortedList[i].yPosition
                    console.log(xI+"-"+xJ);
                    var minHeight = Math.min(yI, yJ);
                    console.log(yI+"-"+yJ+"("+minHeight+"): "+Math.abs(yI-yJ));
                    // console.log("T:"+dist(xI, yI, xJ, yJ));
                    if(dist(xI, yI, xJ, yJ) < 80){
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

                    if(dist(xI, yI, currentX, currentY) < 80 || dist(xJ, yJ, currentX, currentY) < 10){
                        dist(xI, yI, currentX, currentY) < 80 ? console.log("collision-T: right : "+dist(xI, yI, currentX, currentY)) : console.log("collision: right : "+dist(xJ, yJ, currentX, currentY));
                        document.getElementById("pause").click();
                        socket.emit("status", {"message": "STOP"});
                    }
                }
            }
    }
}

function mousePressed() {
    for(var i = 0; i<pendulum_array.length; i++){
        pendulum_array[i].clicked(mouseX,mouseY);
    }
}

function mouseReleased() {
    for(var i = 0; i<pendulum_array.length; i++){
        pendulum_array[i].stopDragging();
    }
}


