

  let count = 0;
  let qt;

  function setup(){

  }

  function createNewCanvas(width,height){
    clear();


    createCanvas(width, height);
    background(0);
  }

  function createQuadTree(width,height){
    let boundary = new Rectangle(width/2,height /2,width/2,height/2);
    qt = new QuadTree(boundary,4);
  }

  function createPoints(){
    const pointsNumber = +document.getElementById("pointsInput").value

    for(let i = 0; i < pointsNumber; i++){
        const newWidth = random(width);
        const newHeight = random(height);

        let p = new Point(newWidth,newHeight)
        qt.insert(p);
    }
  }

  function randomGeneratePoints(){
    const widthCanvas = +document.getElementById("widthScreen").value
    const heightCanvas = +document.getElementById("heightScreen").value

    createNewCanvas(widthCanvas,heightCanvas)
    createQuadTree(widthCanvas,heightCanvas)
    createPoints()
    createDetectionArea();

  }

  // function draw(){
  //     qt.show();
  //     stroke(0,255,0);
  //     rectMode(CENTER);
  //     let range = new Rectangle(mouseX,mouseY,25,25);
  //     rect(range.x,range.y,range.w * 2,range.h * 2);
  //     let points = [];
  //     qt.query(range,points);
  //     for(let p of points){
  //       strokeWeight(4)
  //       point(p.x,p.y);
  //   }
  // }

  function drawDectectionArea(range){
    stroke(0,255,0);
    strokeWeight(1);
    rectMode(CENTER);
   
    
    rect(range.x,range.y,range.w * 2,range.h *2);
  }

  function markFoundPoints(range){
    let points = [];
    qt.query(range,points);
    
    for(let p of points){
      strokeWeight(4);
      point(p.x,p.y);
    }

    return points;
  }

  function displayDetectedInformation(markedPoints){
    const informationDiv = document.getElementById("informations");
    informationDiv.innerHTML = "";

    const p = document.createElement("p");

    const informationElements = [
      `Checked Points: ${count}`,
      `Founded Points: ${markedPoints.length}`  
    ]

    informationElements.forEach(element => informationDiv.append(p.innerHTML = element))
  }

  function createDetectionArea(followMouse = false){
    count = 0;
    qt.show();

    const xRange = followMouse ? mouseX : 250;
    const yRange = followMouse ? mouseY : 250;
    let range = new Rectangle(xRange,yRange,107,75);

    drawDectectionArea(range);
    const markedPoints = markFoundPoints(range);
    
    displayDetectedInformation(markedPoints);
  }


//   function draw(){
//     if(mouseIsPressed) {
//         let m = new Point(mouseX,mouseY);
//         qt.insert(m);
//     }

//     qt.show();
//   }