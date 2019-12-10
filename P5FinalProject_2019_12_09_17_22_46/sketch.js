let results;
let Years;
let DBestNumber = 0;
let DLowNumber;
let DHighNumber;
let index = 1;
let cIndex = 0;
let bIndex = 0;

let beat;
let synth1;
let synth2;
let synth3;

let loop;


let MusicIndex1 = 0;
let MusicIndex2 = 0;
let MusicIndex3 = 0;

let notes = ['A1','B1','C1','D1','E1','F1','G1',
'A2','B2','C2','D2','E2','F2','G2',
'A3','B3','C3','D3','E3','F3','G3',
'A4','B4','C4','D4','E4','F4','G4',
'A5','B5','C5','D5','E5','F5','G5',
'A6','B6','C6','D6','E6','F6','G6',];

//color
const Y_AXIS = 1;
let b1,b2;
let bt1,bt2;
let cirColor;
let cirR = 185,cirG = 232,cirB = 196;
//bt color
let b1R = 0, b1G = 78, b1B = 153;
let b2R = 84, b2G = 207, b2B = 154; 

let font1;
let font2;

function preload(){
  img = loadImage('assets/cross.png');
  font1 = loadFont('assets/DIN-Black.otf');
  font2 = loadFont('assets/DIN-Medium.otf');
}

function setup() {
  createCanvas(800, 800);
  
  loadTable('assets/ucdp-brd-dyadic-191.csv',gotData);

  b1 = color (b1R,b1G,b1B);
  b2 = color (b2R,b2G,b2B);

  cirColor = color (cirR,cirG,cirB);
  
  var chorus = new Tone.Chorus(4,2.5,0.5).toMaster();
  beat = new Tone.MembraneSynth().toMaster();
  synth1 = new Tone.Synth().connect(chorus);
  synth2 = new Tone.Synth().connect(chorus);
  synth3 = new Tone.MembraneSynth().connect(chorus);


  loop = new Tone.Loop(playBeat,'2n');
  loop.start();

  Tone.Transport.start();

}

function gotData(data){
  results = data;
}

function playBeat(){
  beat.triggerAttackRelease('C1','4n');
}



function draw() {
  setGradient(0,0,width,height,b1,b2,Y_AXIS);
  noStroke();
  fill(cirColor);
  circle(width/2,height/2,width/1.6,width/1.6);

  drawCross();

  fill(255);
  
  
  textSize(50);
  textFont(font1);
  textAlign(CENTER);
  text(DBestNumber,width/2,750);

  textAlign(LEFT);
  textSize(28);
  textFont(font2);

  text('UCDP',30,50);
  text('Battle-Related Deaths',30,85);
  text('Datasets',30,120);




}

function setGradient(x,y,w,h,C1,C2,axis){
  if(axis === Y_AXIS){
    for (let i = y; i <= y+h;i++){
      let inter = map(i,y,y+h,0,1);
      let c = lerpColor(C1,C2,inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }

}


function mousePressed(){

  if(index<=1567){

    Years = results.rows[index].arr[11];
    DBestNumber = results.rows[index].arr[12];
    DLowNumber = results.rows[index].arr[13];
    DHighNumber = results.rows[index].arr[14];
    // console.log(Years,DBestNumber,DLowNumber,DHighNumber);
    index++;

    MusicIndex1 = floor(map(DBestNumber,0,68614,0,36));
    MusicIndex2 = floor(map(DLowNumber,0,50000,0,36)+random(0,30));
    MusicIndex3 = floor(map(DHighNumber,0,68627,0,36)+random(0,30));

      // synth1.triggerAttackRelease(DBestNumber,'4n');
      // synth2.triggerAttackRelease(DLowNumber,'4n');
      // synth3.triggerAttackRelease(DHighNumber,'4n');
    
    synth1.triggerAttackRelease(notes[MusicIndex1],'4n');
    synth2.triggerAttackRelease(notes[MusicIndex2],'8n');
    synth3.triggerAttackRelease(notes[MusicIndex3],'8n');

    console.log(MusicIndex1,MusicIndex2,MusicIndex3);


    if(cIndex <= 206){
      cIndex++;
      let cirR = map(cIndex,0,206,185,242);
      let cirG = map(cIndex,0,206,232,26);
      let cirB = map(cIndex,0,206,196,0);
      cirR++;
      cirG--;
      cirB--;

      // console.log(cirR,cirG,cirB);
      cirColor = color (cirR,cirG,cirB); 
    }

    if(bIndex <= 171){
      bIndex++;
      let b1R = map(bIndex,0,171,0,0);
      let b1G = map(bIndex,0,171,78,40);
      let b1B = map(bIndex,0,171,153,80);
      let b2R = map(bIndex,0,171,84,255);
      let b2G = map(bIndex,0,171,207,45);
      let b2B = map(bIndex,0,171,80,0);

      b1R++;
      b1G--;
      b1B--;
      b2R++;
      b2G--;
      b2B--;

      b1 = color (b1R,b1G,b1B);
      b2 = color (b2R,b2G,b2B);
    }

  }
}

function drawCross(){
  let WR = floor(map(DBestNumber,0,68614,50,300));
  imageMode(CENTER);
  image(img,width/2,height/2,WR,WR*1.2);
  WR = WR*0.5;
  //
}

