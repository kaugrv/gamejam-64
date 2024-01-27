gsap.registerPlugin(ScrollTrigger);


function setup() {
  var canvas = createCanvas(windowWidth, windowHeight*10, document.getElementById("scrolling-area"));

  // Gradient Background

  c1 = color(250);
  c2 = color(10);
  for(let y=0; y<=windowHeight*10; y++){
    n = map(y, 0, windowHeight*10,0,1);
    let newc = lerpColor(c1,c2,n);
    stroke(newc);
    line(0,y,width, y);
  }

  
  smooth();

  stroke(0);
  strokeWeight(5);
  strokeCap(ROUND);
  strokeJoin(ROUND);
  fill(255, 0, 0);

  
  drawingContext.shadowBlur = 50;
  drawingContext.shadowColor = color(255, 255, 0);

}




let nbPoints=100;
let clicked=0;

let lastPoint = ["#point0", [50,0]];

let allPoints = [lastPoint];

function link2points(p1, p2) {
  
  beginShape(LINES);


  
  vertex(p1[0], p1[1]); // Last Point
  vertex(p2[0], p2[1]); // Next Point

  


  endShape();
  
}

function clickOnPoint(nextPoint) {
  allPoints.push(nextPoint);

  link2points([lastPoint[1][0]*windowWidth/100, lastPoint[1][1]*windowHeight/100], [nextPoint[1][0]*windowWidth/100, nextPoint[1][1]*windowHeight/100]);
  // document.querySelector(nextPoint[0]).style.display = "none";

  lastPoint = nextPoint;
  clicked++;

  console.log(allPoints);


}

function initRandomPoints(n) {
  for (let i=0; i<n; i++) {
    document.querySelector(".jeu").innerHTML+=(`<span class="point" id="point${i}">⭐</span>`)
  }

  for (let i=0; i<n; i++) {
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 1000);
    document.querySelector(`#point${i}`).addEventListener("click", function() {
      clickOnPoint([`#point${i}`, [x, y]])}
)
      
    document.querySelector(`#point${i}`).style.top = y+"%";
    
    document.querySelector(`#point${i}`).style.filter = "brightness('"+y+"%')";

    document.querySelector(`#point${i}`).style.left = x+"%";

    
    gsap.to(`#point${i}`, {
      rotate: 80,
      duration: 3,
      scrollTrigger: {
          start: "50% center",
          trigger: `#point${i}`,
          scrub: 1,
      },
    });
}
    }

initRandomPoints(nbPoints);






function draw() {
}