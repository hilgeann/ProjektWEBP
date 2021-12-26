// Array aller Fragen des Entscheidungsbaums
const knots = ["Platzhalter", 
"Corona-Pandemie ist...",
"Corona = Grippe",
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

// Array mit den möglichen Antworten pro Frage
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

// Array gibt an, wie viele Antwortmöglichkeiten pro Frage zur Auswahl stehen
const optnum = [0,3,2,4,2,2,2,2,2,3,2,2,2,2]

// Array gibt an, welche Antwort aus "options" zu welcher Frage "knots" bzw. am Ende zu welchem Ergebnis "result" führt.
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

// Array mit den Koordinaten aller Antworten und Ergebnisse, also 2knots" und "results" des Entscheidungsbaums
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

// Array mit den Ergebnissen bzw. Pandemietypen
const results = {
a: "Vorsichtige",
b: "Wellensurfer",
c: "Wiederwillige",
d: "Superspreader",
e: "Uninformierte",
f: "Kritikerin",
g: "Naturheilpraktikerin"
}

const resultstring = {
    a: "Wow! Du nimmst es genau. Du bist der Typ, der immer Vorsicht walten lässt und das Wohl anderer über das Eigene stellt. Super!",
    b: "Hut ab. Obwohl du dir ein wenig Freiheiten gönnst und dein Leben möglichst normal weiter lebst, bist du vorsichtig, wenn es darauf ankommt. Gut!",
    c: "Du trägst die Massnahmen zwar mehrheitlich mit, obwohl du keine Lust mehr hast. Motivier dich noch ein wenig, denn wir sind im Endspurt.",
    d: "Vorsichtig ist anders, du kooperierst leider nicht. Bitte halte dich an die geltenden Massnahmen, es zu deinem Wohl und zum Schutz deiner Mitmenschen!",
    e: "Du hast wohl nicht viel mitbekommen. Informiere dich doch unter www.bag.admin.ch über die aktuelle Situation.",
    f: "Ups! Leider lebst du in einer anderen Realität, als die Mehrheit der Bevölkerung. Wir empfehlen dir eine Social-Media-Diät.",
    g: "Wir stellen fest, dass du die Massnahmen missachtest und eine Grundabneigung gegen Wissenschaft sowie Schulmedizin hast. Bitte informiere dich künftig nur bei offiziellen Stellen und überdenke deine Überzeugungen."
}

/* 
Übernimmt und verarbeitet die gewählte Antwort (Klick auf Button) aus der Funktion loadquestion
und ermittelt daraus die Variable j, welche als Parameter an die Funktion loadquestion übergeben wird und
gemeinsam mit dem Parameter i an die Funktion jump übergeben wird.
*/
function choice(i,x) {
    if (x == 1) {
        var j = redirection[i].a}
    else if (x == 2) {
        var j = redirection[i].b}
    else if (x == 3) {
        var j = redirection[i].c;}
    else if (x == 4) {
        var j = redirection[i].d;}
    if (j < 20) {jump(i,j); loadquestion(j)}
    else if (j > 21) {jump(i,j); loadresult(j)}
};
    
// Startet das Quiz, indem die Knoten des Entscheidungsbaums gezeichnet werden und die erste Frage geladen wird.    
function start(){
    loadquestion(1)
    dots()
};

/* 
Funktion, mit der die Frage geladen wird und anhand der Variablen k die (Anzal) möglichen Antworten.
"Test" zum Anzeigen, ob korrektes k ermittelt wird.
Durch Klicken der Antwort-Buttons, werden die entsprechenden Parameter an die Choice-Funktion weitergegeben.
*/
function loadquestion(i) {
    let k = optnum[i]
    document.getElementById("question").innerHTML = knots[i]
    var elema = document.getElementById("opta");
    var elemb = document.getElementById("optb");
    var elemc = document.getElementById("optc");
    var elemd = document.getElementById("optd");
    //elem.replaceWith(elem.cloneNode(true));
    if (k == 2) {
        document.getElementById("test").innerHTML = k;
	    document.getElementById("opta").innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        document.getElementById("optb").innerHTML = options[i].b;
        elemb.replaceWith(elemb.cloneNode(true));
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)},);
        document.getElementById("linec").innerHTML = "";
        document.getElementById("lined").innerHTML = ""}
    else if (k == 3) {
        document.getElementById("test").innerHTML = k;
        document.getElementById("opta").innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        document.getElementById("optb").innerHTML = options[i].b;
        elemb.replaceWith(elemb.cloneNode(true));
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)},);
        document.getElementById("linec").innerHTML = "<button> <opt id=optc> </opt> </button>";
        document.getElementById("optc").innerHTML = options[i].c;
        elemc.replaceWith(elemc.cloneNode(true));
        document.getElementById("optc").addEventListener("click", function() {choice(i,3)},);
        document.getElementById("lined").innerHTML = ""}
    else if (k == 4) {
	    document.getElementById("test").innerHTML = k;
        document.getElementById("opta").innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        document.getElementById("optb").innerHTML = options[i].b;
        elemb.replaceWith(elemb.cloneNode(true));
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)},);
        document.getElementById("linec").innerHTML = "<button> <opt id=optc> </opt> </button>";
        document.getElementById("optc").innerHTML = options[i].c;
        elemc.replaceWith(elemc.cloneNode(true));
        document.getElementById("optc").addEventListener("click", function() {choice(i,3)},);
	    document.getElementById("lined").innerHTML = "<button> <opt id=optd> </opt> </button>";
        document.getElementById("optd").innerHTML = options[i].d;
        elemd.replaceWith(elemd.cloneNode(true));
        document.getElementById("optd").addEventListener("click", function() {choice(i,4)},);
    }
}

function loadresult(i) {
    if (i == 21) {var type = results.a; var text = resultstring.a}
    else if (i == 22) {var type = results.b; var text = resultstring.b}
    else if (i == 23) {var type = results.c; var text = resultstring.c}
    else if (i == 24) {var type = results.d; var text = resultstring.d}
    else if (i == 25) {var type = results.e; var text = resultstring.e}
    else if (i == 26) {var type = results.f; var text = resultstring.f}
    else if (i == 27) {var type = results.g; var text = resultstring.g}
    document.getElementById("question").innerHTML = "";
    document.getElementById("linea").innerHTML = "<r1>" + "Dein Typ ist:" + "</r1>";
    document.getElementById("lineb").innerHTML = "<r2>" + type + "</r2>" ;
    document.getElementById("linec").innerHTML = "<r3>" + text + "</r3>" ;
    document.getElementById("lined").innerHTML = "<button id=restart> Nochmal spielen! </button>" ;
    document.getElementById("restart").addEventListener("click", function() {restart()},);
}

function restart() {
    document.getElementById("question").innerHTML = "";
    document.getElementById("linea").innerHTML = "<button> <opt id=opta> </opt> </button>";
    document.getElementById("lineb").innerHTML = "<button> <opt id=optb> </opt> </button>" ;
    document.getElementById("linec").innerHTML = "<button> <opt id=optc> </opt> </button>" ;
    document.getElementById("lined").innerHTML = "<button> <opt id=optd> </opt> </button>" ;
    const canvas = document.querySelector('#canvas'); 
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    start()
}

// Zeichnet die Knoten, also Fragen (rot) und Antworten (blau) des Entscheidungsbaums.
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

/*
Funktion, welche die Verbindungen/Pfade zwischen den Knoten zeichnet.
Parameter werden aus der Choice-Funktion übernommen.
Anhand der Koordinaten wird mit a,b der aktuelle Knoten und mit c,d der neue Zielknoten ermittelt.
Beim nächsten Durchlauf wird dann der Punkt c,d zum Neuen a,b usw.
*/


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