function setup() {

}

  function randomGeneratePoints(){
    clear();

    const widthCanvas = +document.getElementById("widthScreen").value
    const heightCanvas = +document.getElementById("heightScreen").value

    createCanvas(widthCanvas, heightCanvas);
    background(0);
    let boundary = new Rectangle(widthCanvas/2,heightCanvas /2,widthCanvas/2,heightCanvas/2);
    let qt = new QuadTree(boundary,4);
    
    const pointsNumber = +document.getElementById("pointsInput").value

    for(let i = 0; i < pointsNumber; i++){
        const newWidth = random(width);
        const newHeight = random(height);

        let p = new Point(newWidth,newHeight)
        qt.insert(p);
    }


    qt.show();
  }

//   function draw(){
//     if(mouseIsPressed) {
//         let m = new Point(mouseX,mouseY);
//         qt.insert(m);
//     }

//     qt.show();
//   }