
const knots = ["Platzhalter", 
"Corona-Pandemie ist...",
"Corna = Grippe",
"Hattest du Corona?",
"Bist du dennoch geimpft?",
"Bist du geimpft?",
"Bist du geimpft?",
"Ach, wen kümmert die Pandemie will einfach nach Mallorca",
"Trägst du Maske?",
"Impfungen sind...",
"Distance Learning ist...",
"dieses Wochenende...",
"Weisst du um welche Impfungen es überhaupt geht?",
"Mein Immunsystem ist sowieso besser als jede Impfung"
]

const options = [{a:"Platzhalter"},
{a:"Coro-was?", b:"Reine Panikmache!", c:"eine Viruspandemie"},
{a:"Nein", b:"Ja"},
{a:"Die Tests sind manipuliert!", b:"Ja, was solls?", c:"Ja, leider...", d:"Nein."},
{a:"Ja", b:"Nein"},
{a:"Ja", b:"Nein"},
{a:"Ja", b:"Nein"},
{a:"Ferien sind egal, will Pandemie-Ende!", b:"Genau!"},
{a:"Wozu?", b:"Ja, klar!"},
{a:"Von Reptioloiden eingeführt um Menschen zu unterwerfen", b:"Gift", c:"hä? worum gehts?"},
{a:"Ein riesen Quatsch!", b:"Eine Super Sache!"},
{a:"muss ich an eien Party", b:"bleibe ich daheim (wie immer)"},
{a:"Nein", b:"Ja, aber...."},
{a:"Ja", b:"Weiss auch nicht"},
]

const optnum = [0,3,2,4,2,2,2,2,2,3,2,2,2,2]

const redirection = [{a:"Platzhalter"},
{a:25, b:2, c:3},
{a:3, b:5},
{a:5, b:7, c:4, d:6},
{a:8, b:7},
{a:7, b:9},
{a:8, b:7},
{a:0, b:13},
{a:7, b:10},
{a:25, b:27, c:12},
{a:22, b:11},
{a:22, b:21},
{a:25, b:13},
{a:24, b:25},
]

const coordinates = [{a:"Platzhalter"},
{a:4, b:1},
{a:5, b:2},
{a:3, b:2},
{a:4, b:3},
{a:6, b:3},
{a:2, b:3},
{a:4, b:4},
{a:2, b:4},
{a:6, b:4},
{a:2, b:5},
{a:2, b:6},
{a:6, b:5},
{a:6, b:6},
{a:"Platzhalter"},
{a:"Platzhalter"},
{a:"Platzhalter"},
{a:"Platzhalter"},
{a:"Platzhalter"},
{a:"Platzhalter"},
{a:"Platzhalter"},
{a:2, b:7},
{a:1, b:6},
{a:3, b:6},
{a:6, b:7},
{a:7, b:6},
{a:5, b:6},
{a:4, b:6}]

const results = {
21: "Vorsichtige",
22: "Wellensurfer",
23: "Wiederwillige",
24: "Superspreader",
25: "Uninformierte",
26: "Kritikerin",
27: "Naturheilpraktikerin"
}


function choice(i,x) {
    if (x == 1) {
        var j = redirection[i].a}
    else if (x == 2) {
        var j = redirection[i].b}
    else if (x == 3) {
        var j = redirection[i].c;}
    else if (x == 4) {
        var j = redirection[i].d;}
    jump(i,j)
    loadquestion(j)
};
    
    
function start(){
    loadquestion(1)
    dots()
};

function loadquestion(i) {
    let k = optnum[i]
    document.getElementById("question").innerHTML = knots[i]
    if (k == 2) {
        document.getElementById("test").innerHTML = k;
	document.getElementById("opta").innerHTML = options[i].a;
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)});
        document.getElementById("optb").innerHTML = options[i].b;
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)});
        document.getElementById("linec").innerHTML = "";
        document.getElementById("lined").innerHTML = ""}
    else if (k == 3) {
        document.getElementById("test").innerHTML = k;
        document.getElementById("opta").innerHTML = options[i].a;
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)});
        document.getElementById("optb").innerHTML = options[i].b;
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)});
        document.getElementById("linec").innerHTML = "<button> <opt id=optc> </opt> </button>";
        document.getElementById("optc").innerHTML = options[i].c;
        document.getElementById("optc").addEventListener("click", function() {choice(i,3)});
        document.getElementById("lined").innerHTML = ""}
    else if (k == 4) {
	    document.getElementById("test").innerHTML = k;
        document.getElementById("opta").innerHTML = options[i].a;
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)});
        document.getElementById("optb").innerHTML = options[i].b;
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)});
        document.getElementById("linec").innerHTML = "<button> <opt id=optc> </opt> </button>";
        document.getElementById("optc").innerHTML = options[i].c;
        document.getElementById("optc").addEventListener("click", function() {choice(i,3)});
	    document.getElementById("lined").innerHTML = "<button> <opt id=optd> </opt> </button>";
        document.getElementById("optd").innerHTML = options[i].d;
        document.getElementById("optd").addEventListener("click", function() {choice(i,4)});}
}

function dots() {
    let size = 50    
    const canvas = document.querySelector('#canvas'); 
    const ctx = canvas.getContext('2d');
    for (let i = 1; i < 14; i++) {
        let a = (coordinates[i].a)*size    
        let b = (coordinates[i].b)*size  
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5; 
        ctx.beginPath();
        ctx.moveTo(000, 000);
        ctx.strokeRect(a,b,5,5);
    }
    for (let i = 21; i < 28; i++) {
        let a = (coordinates[i].a)*size    
        let b = (coordinates[i].b)*size  
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 5; 
        ctx.beginPath();
        ctx.moveTo(000, 000);
        ctx.strokeRect(a,b,5,5);
    }
}

function jump(i,j) {
    let size = 50
    let a = (coordinates[i].a)*size 
    let b = (coordinates[i].b)*size 
    let c = (coordinates[j].a)*size 
    let d = (coordinates[j].b)*size
    
    var canvas = document.querySelector('#canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(a, b);
        ctx.lineTo(c, d);
        ctx.stroke();
    }
} 

start()






