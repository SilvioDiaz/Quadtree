
let particles = [];
// let qt;

  let count = 0;
//   let qt;

//   function setup(){

//   }

//   function createNewCanvas(width,height){
//     clear();
//     createCanvas(width, height);
//     background(0);
//   }

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

//   function randomGeneratePoints(){
//     const widthCanvas = +document.getElementById("widthScreen").value
//     const heightCanvas = +document.getElementById("heightScreen").value

//     createNewCanvas(widthCanvas,heightCanvas)
//     createQuadTree(widthCanvas,heightCanvas)
//     createPoints()
//     createDetectionArea();

//   }

//   // function draw(){
//   //     qt.show();
//   //     stroke(0,255,0);
//   //     rectMode(CENTER);
//   //     let range = new Rectangle(mouseX,mouseY,25,25);
//   //     rect(range.x,range.y,range.w * 2,range.h * 2);
//   //     let points = [];
//   //     qt.query(range,points);
//   //     for(let p of points){
//   //       strokeWeight(4)
//   //       point(p.x,p.y);
//   //   }
//   // }

//   function drawDectectionArea(range){
//     stroke(0,255,0);
//     strokeWeight(1);
//     rectMode(CENTER);
   
    
//     rect(range.x,range.y,range.w * 2,range.h *2);
//   }

//   function markFoundPoints(range){
//     let points = [];
//     qt.query(range,points);
    
//     for(let p of points){
//       strokeWeight(4);
//       point(p.x,p.y);
//     }

//     return points;
//   }

//   function displayDetectedInformation(markedPoints){
//     const informationDiv = document.getElementById("informations");
//     informationDiv.innerHTML = "";

//     const p = document.createElement("p");

//     const informationElements = [
//       `Checked Points: ${count}`,
//       `Founded Points: ${markedPoints.length}`  
//     ]

//     informationElements.forEach(element => informationDiv.append(p.innerHTML = element))
//   }

//   function createDetectionArea(followMouse = false){
//     count = 0;
//     qt.show();

//     const xRange = followMouse ? mouseX : 250;
//     const yRange = followMouse ? mouseY : 250;
//     let range = new Rectangle(xRange,yRange,107,75);

//     drawDectectionArea(range);
//     const markedPoints = markFoundPoints(range);
    
//     displayDetectedInformation(markedPoints);
//   }


// //   function draw(){
// //     if(mouseIsPressed) {
// //         let m = new Point(mouseX,mouseY);
// //         qt.insert(m);
// //     }

// //     qt.show();
// //   }


function setup(){
  createCanvas(1000,1000)


  for(let i = 0; i < 900; i++){
    const isPlayer = i === 5;
    particles[i] = new Particle(random(width),random(height),isPlayer);
  }

 }

function draw(){
  background(0);

  const qtree = createQuadTree(1000,1000);

  for(let p of particles){
    let point = new Point(p.x,p.y,p);
    qtree.insert(point);

    if(p.isPlayer){
      p.move(mouseX,mouseY);
    } else p.move();

    p.render();
    p.setHighlight(false);
  }

  for(let p of particles){
    let range = new Circle(p.x,p.y,p.r * 2);
    let points = qtree.query(range);

    for(let point of points){
      let other = point.userData;
      if(p !== other && p.intersects(other)){
        p.setHighlight(true);
      }
   }

    // for(let other of particles){
    //   if(p !== other && p.intersects(other)){
    //     p.setHighlight(true);
    //   }
    // }
  }

  show(qtree);

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