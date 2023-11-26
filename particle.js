class Particle {
    constructor(x,y,isPlayer){
        this.x = x;
        this.y = y;
        this.r = 8;
        this.highlight = false;
        this.isPlayer = isPlayer 
    }

    intersects(other){
        let d = dist(this.x,this.y,other.x,other.y)
        return (d < this.r + other.r)
    }

    setHighlight(value){
        this.highlight = value;
    }

    move(x,y){
        if(!x && !y){
            this.x += random(-1,1);
            this.y += random(-1,1);
        }else{
            this.x = x;
            this.y = y;
        }
    }

    render(){
        noStroke();

        if(this.highlight) fill(255);
        else fill(255, 204, 0);

        if(this.isPlayer) fill('red')

        ellipse(this.x,this.y,this.r * 2); 
    }
}