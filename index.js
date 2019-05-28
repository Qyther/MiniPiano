/*

MUSICS SHEETS'

USSR
w t w er 00 e w qw 889 90q qwe rty wu y ty rw t r er 00 e w qw 88 t r ew

WILHELMUS
w t t y uiyu yui u yty t  w t t y uiyu yui u yty t

ALL STAR
odaapo osaa  ppo odaappo  ouo odaappo  osaappo oda  apoopu

NEVER GONNA GIVE YOU UP
yuouaap yuouppo  yuouopIuy y po  yuouaap yuoudIoIuyu  ouopIuy y po

EPIC SAX GUY
d dddsdd dddsdd gds  sPoopPo d dddsdd  dddsdd gds  sPoopPo

TAKE ON ME
iiTEEYYYoo  OPOOOYtiii  YYiYiiTEEY  YYooOPOOOY  tiiiYYiY

SPOOKY SCARY SKELETONS
DDddoPo oDDddo  DDDddoPo  opPspPo DDddoPo  oDDddo  DDDddoPo  opPspPo

MEGALOVANIA
yydp Ooiyio  ttdp Ooiyio  rrdp Ooiyio  EEdp Ooiyio

FlAMINGO
OPsDgghgDsgD  oOPsDgghgDdP  ososP  oIiODiODODD

*/


log=a=>console.log(JSON.stringify(a));
var sheets = [
    ["USSR","w t w er 00 e w qw 889 90q qwe rty wu y ty rw t r er 00 e w qw 88 t r ew"],
    ["WILHELMUS","w t t y uiyu yui u yty t  w t t y uiyu yui u yty t"],
    ["ALL STAR","o d aa poo s aappo od aappoou o odaappoos aappood aap oop u"],
    ["NEVER GONNA GIVE YOU UP","yuouaap yuouppo  yuouopIuy y po  yuouaap yuoudIoIuyu  ouopIuy y po"],
    ["EPIC SAX GUY","d dddsdd dddsdd gds  sPoopPo d dddsdd  dddsdd gds  sPoopPo"],
    ["TAKE ON ME","iiTEEYYYoo  OPOOOYtiii  YYiYiiTEEY  YYooOPOOOY  tiiiYYiY"],
    ["SPOOKY SCARY SKELETONS","DDddoPo oDDddo  DDDddoPo  opPspPo DDddoPo  oDDddo  DDDddoPo  opPspPo"],
    ["MEGALOVANIA","yydp Ooiyio  ttdp Ooiyio  rrdp Ooiyio  EEdp Ooiyio"],
    ["FlAMINGO","OPsDgghgDsgD  oOPsDgghgDdP  ososP  oIiODiODODD"]
];
var last;
var gap = 0.5;
var size = [innerWidth/40,innerWidth/40*6];
var offset = [0,0];
function frame() {
    var now = Date.now();
    if(!last) last = now;
    c=document.querySelector("canvas");
    c.width=innerWidth;
    c.height=innerHeight;
    ctx=c.getContext("2d");
    //-=-//
    size = [innerWidth/40,innerWidth/40*6];
    gap = innerWidth/800;
    offset=[innerWidth/2-(size[0]+gap)/2*36,innerHeight/4];
    if(endnotes.length===0) playednotes=[];
    var anote = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
    for(var i=0;i<36;i++) {
        ctx.fillStyle="white";
        for(var j=0;j<playednotes.length;j++) {
            if(anote[i]===playednotes[j]) ctx.fillStyle="#ddd";
        }
        ctx.fillRect(i*(size[0]+gap)+offset[0],offset[1],size[0],size[1]);
    }
    var anote = new Array(36);
    for(var i=0;i<anote.length-1;i+=7) {
        anote[i]=1;
        anote[i+1]=1;
    }
    for(var i=3;i<anote.length;i+=7) {
        anote[i]=1;
        anote[i+1]=1;
        anote[i+2]=1;
    }
    var notea = "! @  $ % Dead  * (  Q W E  T Y  I O P  S D  G H J  L Z  C V B".split(" ");
    for(var i=0;i<anote.length;i++) {
        if(anote[i]===1) {
            ctx.fillStyle="#555";
            for(var j=0;j<playednotes.length;j++) {
                if(notea[i]===playednotes[j]) ctx.fillStyle="#333";
            }
            ctx.fillRect(i*(size[0]+gap)+offset[0]+size[0]/2,offset[1],size[0],size[1]/2);
        }
    }
    for(var i=0;i<endnotes.length;i++) {
        if(endnotes[i][1]<Date.now()) {
            for(var j=0;j<playednotes.length;j++) {
                if(endnotes[i][0]===playednotes[j]) playednotes.splice(j,1);
            }
            for(var j=0;j<endnotes.length;j++) {
                if(endnotes[i][0]===endnotes[j][0]) endnotes.splice(j,1);
            }
        }
    }
    ctx.textAlign="center";
    ctx.font=innerWidth/10+"px monospace";
    ctx.fillStyle="#555";
    ctx.fillText("Virtual Piano",innerWidth/2,innerHeight/6);
    ctx.font=innerWidth/20+"px monospace";
    ctx.fillStyle="#777";
    ctx.fillText("Mode: "+modes[mode],innerWidth/2,innerHeight/2);
    ctx.fillText("Sheets:",innerWidth/2,innerHeight/2+innerHeight/7.5);
    ctx.font=innerWidth/52+"px monospace";
    for(var i=0;i<sheets.length;i++) {
        ctx.fillText(sheets[i][0]+" - "+sheets[i][1],innerWidth/2,innerHeight/2+innerHeight/6+innerWidth/52*i);
    }
    if(playFlat) ctx.fillStyle="#555";
    ctx.translate(innerWidth/2,innerHeight/2+innerHeight/20);
    ctx.beginPath();
    ctx.moveTo(0,-innerHeight/40);
    ctx.lineTo(-innerWidth/40,0);
    ctx.lineTo(-innerWidth/80,0);
    ctx.lineTo(-innerWidth/80,innerHeight/40);
    
    ctx.lineTo(innerWidth/80,innerHeight/40);
    ctx.lineTo(innerWidth/80,0);
    ctx.lineTo(innerWidth/40,0);
    ctx.lineTo(0,-innerHeight/40);
    ctx.fill();
    ctx.closePath();
    
    last=now;
}
setInterval(frame);



var context=new AudioContext();
var o;
var g;
var modes=["sine","square","triangle","sawtooth"];
var mode=0;
var endnotes = [];
var playednotes = [];
var playFlat;
function playNote(a,b) {
    if(o||g)
        stopNote(0.04,a);
    o=context.createOscillator();
    g=context.createGain();
    o.type=modes[mode];
    o.frequency.value=a/2;
    o.connect(g);
    g.connect(context.destination);
    o.start(0);
    playednotes.push(b);
}
function stopNote(a,b) {
    g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+a);
    endnotes.push([b,Date.now()+a/8*1000]);
}
var notes = [
    ["1",130.8],
    ["2",146.8],
    ["3",164.8],
    ["4",174.6],
    ["5",196],
    ["6",220],
    ["7",246],
    
    ["8",261.6],
    ["9",293.7],
    ["0",329.6],
    ["q",349.2],
    ["w",392],
    ["e",440],
    ["r",493.9],
    
    ["t",523.3],
    ["y",587.3],
    ["u",659.3],
    ["i",698.5],
    ["o",784],
    ["p",880],
    ["a",987.8],
    
    ["s",1047],
    ["d",1175],
    ["f",1319],
    ["g",1397],
    ["h",1568],
    ["j",1760],
    ["k",1976],
    
    ["l",2093],
    ["z",2349],
    ["x",2637],
    ["c",2794],
    ["v",3136],
    ["b",3520],
    ["n",3951],
    
    ["m",4186],
    
    ["!",138.6],
    ["@",155.6],
    ["$",185],
    ["%",207.7],
    ["Dead",233.1],
    
    ["*",277.2],
    ["(",311.1],
    ["Q",370],
    ["W",415.3],
    ["E",466.2],
    
    //TYIOP SDGHJ LZCVB
	//TWFkZSBieSBCYXJvbiE
    ["T",554.4],
    ["Y",622.3],
    ["I",740],
    ["O",830.6],
    ["P",932.3],
    
    ["S",1109],
    ["D",1245],
    ["G",1480],
    ["H",1661],
    ["J",1865],
    
    ["L",2217],
    ["Z",2489],
    ["C",2960],
    ["V",3322],
    ["B",3729]
];
function collide(x,y,w,h,x0,y0,w0,h0) {
  return !(x0>(x+w)||(x0+w0)<x||y0>(y+h)||(y0+h0)<y);
}
//Baron
function checkNote(x,y) {
    var anote = new Array(36);
    for(var i=0;i<anote.length-1;i+=7) {
        anote[i]=1;
        anote[i+1]=1;
    }
    for(var i=3;i<anote.length;i+=7) {
        anote[i]=1;
        anote[i+1]=1;
        anote[i+2]=1;
    }
    var notea = "! @  $ % Dead  * (  Q W E  T Y  I O P  S D  G H J  L Z  C V B".split(" ");
    for(var i=0;i<anote.length;i++) {
        if(anote[i]===1) {
            if(collide(x,y,0,0,i*(size[0]+gap)+offset[0]+size[0]/2,offset[1],size[0],size[1]/2)) {
                for(var j=0;j<notes.length;j++) {
                    if(notes[j][0]===notea[i]) {
                        playNote(notes[j][1],notes[j][0]);
                        stopNote(3,notes[j][0]);
                        return;
                    }
                }
            }
        }
    }
    var anote = "1234567890qwertyuiopasdfghjklzxcvbnm".split("");
    for(var i=0;i<36;i++) {
        if(collide(x,y,0,0,i*(size[0]+gap)+offset[0],offset[1],size[0],size[1])) {
            for(var j=0;j<notes.length;j++) {
                if(notes[j][0]===anote[i]) {
                    playNote(notes[j][1],notes[j][0]);
                    stopNote(3,notes[j][0]);
                }
            }
        }
    }
}
if("ontouchstart" in document) {
    document.addEventListener("touchstart",e=>{
        if(e.changedTouches) e=e.changedTouches[0];
        checkNote(e.clientX,e.clientY);
    });
} else {
    document.addEventListener("mousedown",e=>{
        checkNote(e.clientX,e.clientY);
    });
}
document.addEventListener("keydown",e=>{
    if(e.key==="Shift") playFlat=true;
    if(e.key==="ArrowUp") {
        mode++;
        mode%=modes.length;
    }
    for(var i=0;i<notes.length;i++) {
        if(notes[i][0]===e.key) {
            playNote(notes[i][1],notes[i][0]);
            stopNote(3,notes[i][0]);
        }
    }
});
document.addEventListener("keyup",e=>{
    if(e.key==="Shift") playFlat=false;
});