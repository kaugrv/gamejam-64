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

  document.querySelector(".save-button").addEventListener("click", function() {
    saveCanvas('Laisse_moi_dormir.jpg');
  })

  

}



let nbPoints=100;
let clicked=0;

document.querySelector(".score").innerHTML = `${clicked} / ${nbPoints}`;

let lastPoint = ["#point0", [50,0]];

let allPoints = [lastPoint];

function link2points(p1, p2) {
  
  beginShape(LINES);

  strokeWeight(5);
  vertex(p1[0], p1[1]); // Last Point
  vertex(p2[0], p2[1]); // Next Point

  endShape();

  beginShape(LINES);

  strokeWeight(2.5);
  vertex(p1[0]/10, p1[1]); // Last Point
  vertex(p2[0]/10, p2[1]); // Next Point
  
  endShape();

  

  
}

function clickOnPoint(nextPoint) {
  allPoints.push(nextPoint);

  link2points([lastPoint[1][0]*windowWidth/100, lastPoint[1][1]*windowHeight/100], [nextPoint[1][0]*windowWidth/100, nextPoint[1][1]*windowHeight/100]);
  document.querySelector(nextPoint[0]).style.display = "none";

  lastPoint = nextPoint;
  clicked++;

  document.querySelector(".score").innerHTML = `${clicked} / ${nbPoints}`

  console.log(allPoints);


}

function initRandomPoints(n) {
  for (let i=0; i<n; i++) {
    document.querySelector(".jeu").innerHTML+=(`<span class="point" id="point${i}"><img src="images/star.png"/></span>`)
  }

  for (let i=0; i<n; i++) {
    let x = Math.floor(Math.random() * 80) + 10 ;
    let y = Math.floor(Math.random() * 960) + 15;
    document.querySelector(`#point${i}`).addEventListener("click", function() {
      clickOnPoint([`#point${i}`, [x, y]])}
)
      
    document.querySelector(`#point${i}`).style.top = y+"%";
    
    document.querySelector(`#point${i}`).style.filter = "invert("+(y/1000+0.4)+")";

    document.querySelector(`#point${i}`).style.left = x+"%";

    
    gsap.to(`#point${i}`, {
      scale: 2,
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


gsap.to('.titre', {
  opacity:0,
  duration: 3,
  scrollTrigger: {
      start: "50% center",
      trigger: '.titre',
  },
  delay:2
});

gsap.to('.window', {
  opacity:0,
  duration: 2,
  scrollTrigger: {
      start: "50% center",
      trigger: '.titre',
  },
});




function draw() {
}



// Timer
let totalSeconds = 0;
let timer = document.querySelector(".time");

const timerInterval = setInterval(() => {
  totalSeconds++;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  timer.innerText = formattedTime;

  if(clicked===nbPoints) {
    clearInterval(timerInterval);
    timer.style.animation = "clignote 1s infinite";

    document.querySelector(".sitting").style.display = "none";
    document.querySelector(".sleeping").style.display = "block";
    
    document.querySelector(".save-button").style.display = "block";
  }

}, 1000);


