// Pendulumn class
class Pendulum{
    constructor(x,y,len,r,a){
        this.origin = createVector(x,y)
        this.point = x;
        this.bob = createVector(0,0)
        this.len = len
        this.size = r
        // PI/4 = 45 PI/3 = 60 PI/2 = 90 
        var receivedAngle = a;
        if(Math.abs(receivedAngle) == 0){
            receivedAngle = 1
        }
        this.angle = PI/receivedAngle
        // this.angle = PI/2 //-Math.abs(a)
        this.Acc = 0
        this.aVel = 0
        this.dragging = false
    }


    /**
     * Calculates next position of pendulumn based on angle
     * Uses downwords velocity to determine gravity
     * 
     * @retruns {array} - containing x and y coordinates of the pendulumn
     */
    update(){
        this.bob.x = this.origin.x + this.len * sin(this.angle)
        this.bob.y = this.origin.y + this.len * cos(this.angle)
        this.angle+=0.02
        this.aAcc = -(0.8/this.len) * sin(this.angle)
        // this.angle += this.aVel
        this.aVel += this.aAcc
        // Apply downwords velocity force (gravity)
        this.aVel *=0.99 
        this.angle += this.aVel
        
        return [this.bob.x, this.bob.y];
    }

    /**
     * Display pendulumn based on string length and mass (radius)
     * 
     * @param {string} c - color of the pendulumn
     * @retruns {number} - index point of a pendulumn
     */
    display(c){
        let co = color(c);
        fill(co);
        stroke(co);
        strokeWeight(3);
        line(this.origin.x,this.origin.y,this.bob.x,this.bob.y);
        ellipse(this.bob.x,this.bob.y,this.size,this.size);
        stroke(51);
        strokeWeight(5);
        line(100,50,window.innerWidth-100,50);
        return this.point;
    }

    // Function to check if pendulumn is clicked
    clicked(mx,my) {
        let d = dist(mx, my, this.bob.x, this.bob.y);
        if (d < this.size) {
            this.dragging = true;
        }
    }

    // This tells us we are not longer clicking on the ball
    stopDragging() {
        if (this.dragging) {
            this.aVel = 0; // No velocity once you let go
            this.dragging = false;
        }
    }
    
    drag() {
        // If we are draging the ball, we calculate the angle between the 
        // pendulum origin and mouse position
        // we assign that angle to the pendulum
        if (this.dragging) {
            // Difference between 2 points
            let mouseV = createVector(mouseX, mouseY)
            let diff = createVector(0,0)
    
            diff.x = this.origin.x - mouseV.x
            diff.y = this.origin.y - mouseV.y  
            // Angle relative to vertical axis
            this.angle = atan2(-1*diff.y, diff.x) - PI/2;  
        }
    }
}