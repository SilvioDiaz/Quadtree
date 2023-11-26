
let particles = [];
let count = 0;
let boardGenerated = false;

function setup(){

}

function createQuadTree(width,height){
  let boundary = new Rectangle(width/2,height /2,width/2,height/2);
  let qt = new QuadTree(boundary,4);

  return qt;
}

function createPoints(){
  const pointsNumber = +document.getElementById("pointsInput").value

  for(let i = 0; i < pointsNumber; i++){
      particles[i] = new Particle(random(width),random(height));

      let p = new Point(particles[i].x,particles[i].y,particles[i])
      qt.insert(p);
  }
}


function drawDectectionArea(range){
  stroke(0,255,0);
  strokeWeight(1);
  rectMode(CENTER);
  
  
  rect(range.x,range.y,range.w * 2,range.h *2);
}

function markFoundPoints(qt,range){
  let points = [];
  qt.query(range,points);
  
  for(let p of points){
    strokeWeight(4);
    point(p.x,p.y);
  }

  return points;
}



function createDetectionArea(qt,followMouse = false){
  const xRange = followMouse ? mouseX : 250;
  const yRange = followMouse ? mouseY : 250;
  let range = new Rectangle(xRange,yRange,107,75);

  drawDectectionArea(range);
  const markedPoints = markFoundPoints(qt,range);
  displayInformationList([`Founded Points: ${markedPoints.length}`]);
}


function createParticles(qnt = 10){
  const havePlayer = document.getElementById("havePlayer").checked;
  for(let i = 0; i < qnt; i++){
    const isPlayer =  havePlayer  && i === 1;
    particles[i] = new Particle(random(width),random(height),isPlayer);
  }
}


function generateBoard(){
    const particlesInput = document.getElementById("pointsInput");
    createParticles(+particlesInput.value);
    boardGenerated = true;
}

function displayInformationList(informationList){
  const informationDiv = document.getElementById("informations");
  informationDiv.innerHTML = "";

  const p = document.createElement("p");

  informationList.forEach(element => informationDiv.append(p.innerHTML = element))
}

function draw(){
  const fr = floor(frameRate());
  const widthCanvas = +document.getElementById("widthScreen").value
  const heightCanvas = +document.getElementById("heightScreen").value

  createCanvas(widthCanvas,heightCanvas)
  background(0);

  const qtree = createQuadTree(widthCanvas,heightCanvas);

  if(boardGenerated){
    renderParticles(qtree);
    checkParticles(true,qtree)
    show(qtree);
    const haveCheckArea = document.getElementById("haveCheckArea").checked;
    if(haveCheckArea) createDetectionArea(qtree, true);
  }
}

function renderParticles(qtree){
  for(let p of particles){
    let point = new Point(p.x,p.y,p);
    qtree.insert(point);

    if(p.isPlayer){
      p.move(mouseX,mouseY);
    } else p.move();

    p.render();
    p.setHighlight(false);
  }
}

function checkParticles(isQt,qtree){

  function highlightIntersection(p,other){
    if(p !== other && p.intersects(other)){
      p.setHighlight(true);
    }
  };

  if(isQt){
    for(let p of particles){
      let range = new Circle(p.x,p.y,p.r * 2);

      let points = qtree.query(range);
      
      for(let point of points){
        let other = point.userData;
        highlightIntersection(p,other)
      }
    }
  }

  if(!isQt){
    for(let p of particles){
      for(let other of particles){
        highlightIntersection(p,other)
      }
    }
  }
  
}

function show(qtree){
  stroke(255);
  strokeWeight(1);
  noFill();
  rectMode(CENTER);
  rect(qtree.boundary.x,qtree.boundary.y,qtree.boundary.w*2,qtree.boundary.h*2);
  
  if(qtree.divided){
    show(qtree.northwest);
    show(qtree.northeast);
    show(qtree.southeast);
    show(qtree.southwest);
  }

  for(let p of qtree.points){
    strokeWeight(4);
    point(p.x,p.y);
  }


}