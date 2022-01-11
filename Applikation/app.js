// Array aller Fragen des Entscheidungsbaums
/* Wie in den folgenden Arrays ist an Indexposition 0 ein "Platzhalter" eingefügt, 
damit das "Ansprechen" der Elemente mit 1 beginnen kann.
*/

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

// Array gibt an, wie viele Antwortmöglichkeiten pro Frage zur Auswahl stehen.
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

// Array mit den Koordinaten aller Antworten und Ergebnisse, also "knots" und "results" des Entscheidungsbaums.
const coordinates = [{a:2, b:1},
{a:4, b:1},
{a:5, b:2},
{a:3, b:2},
{a:4, b:3},
{a:5, b:3},
{a:3, b:3},
{a:4, b:5},
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
{a:4, b:6}
]

// Array mit den Ergebnissen bzw. Pandemietypen.
const results = {
a: "Vorsichtige",
b: "Wellensurfer",
c: "Wiederwillige",
d: "Superspreader",
e: "Uninformierte",
f: "Kritikerin",
g: "Naturheilpraktikerin"
}

// Array mit den Beschreibungen der Pandemietypen.
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
Choice übernimmt und verarbeitet die gewählte Antwort (Klick auf Button) aus der Funktion loadquestion. Je nach gewählter
Antwort, also je nach x, wird anhand der If-Schleife, die Variable j ermittelt, welche dann als Parameter 
an die Funktionen jump und loadquestion bzw. loadresult übergeben wird.
Ist das daraus resultierende j kleiner als 20 wird die Funktion loadquestion und somit eine neue Frage 
aus dem knots und dem options Array zusammengestellt.
Ist j grösser als 21 wird der Pandemietyp aus dem results und dem resultstring Array zusammengestellt.
Die Parameter i und j werden zusammen an die Funktion jump übergeben, damit die Verbindung zum nächsten Knoten
im Entscheidungsbaum hergestellt wird. 
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
    if (j < 20) {loading();dot(i);mover(i,j)}
    else if (j > 21) {loading();dot(i);mover(i,j)}
};
    
// Startet das Quiz, indem die Knoten des Entscheidungsbaums gezeichnet werden und die erste Frage geladen wird.
// Die beiden Funktionen loadquestion und dots werden weiter bei ihrer Definition genauer beschrieben.  

function start(){
    canvascolor("#fff0b4")
    dots();
    const waiter = setInterval(function() {drawonspot()}, 100)
    mover(0,1);
    loading();
};

/* 
Funktion, mit der die Frage über das Array knots geladen wird und anhand der Variablen k 
über die If-Abfrage die (Anzahl) möglichen Antworten.
Es werden vier Variablen definiert, welche dann in der If-Abfrage dafür eingesetzt werden, die im 
vorherigen Durchlauf geklickten Antworten zurückzusetzen ("replacewith").
Durch Klicken der Antwort-Buttons, werden die entsprechenden Parameter an die Choice-Funktion weitergegeben.
*/
function loadquestion(i) {
    reload();
    if (i > 20) {loadresult(i)}
    else {
    let k = optnum[i]
    //let k = options[i].length
    document.getElementById("question").innerHTML = knots[i] 
    var elema = document.getElementById("opta");
    var elemb = document.getElementById("optb");
    var elemc = document.getElementById("optc");
    var elemd = document.getElementById("optd");
    if (k == 2) {
	    document.getElementById("opta").innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        document.getElementById("optb").innerHTML = options[i].b;
        elemb.replaceWith(elemb.cloneNode(true));
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)},);
        document.getElementById("linec").innerHTML = "";
        document.getElementById("lined").innerHTML = ""}
    else if (k == 3) {
        elema.innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        elemb.innerHTML = options[i].b;
        elemb.replaceWith(elemb.cloneNode(true));
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)},);
        elemc.innerHTML = options[i].c;
        elemc.replaceWith(elemc.cloneNode(true));
        document.getElementById("optc").addEventListener("click", function() {choice(i,3)},);
        document.getElementById("lined").innerHTML = ""}
    else if (k == 4) {
        elema.innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        elemb.innerHTML = options[i].b;
        elemb.replaceWith(elemb.cloneNode(true));
        document.getElementById("optb").addEventListener("click", function() {choice(i,2)},);
        elemc.innerHTML = options[i].c;
        elemc.replaceWith(elemc.cloneNode(true));
        document.getElementById("optc").addEventListener("click", function() {choice(i,3)},);
        elemd.innerHTML = options[i].d;
        elemd.replaceWith(elemd.cloneNode(true));
        document.getElementById("optd").addEventListener("click", function() {choice(i,4)},);
    }
}
}

/* Der Parameter wird von der choice Funktion übergeben.
Über die If-Abfrage wird dann der entsprechende Typ, also das Ergebnis des Entscheidungsbaumes,
und der zum Typ gehörige Text ermittelt, welche beide über den entsprechenden Index innerhalb der Arrays 
results und resultstring abgerufen werden können.
Der gesamte Text wird dann wiederum über die Eigenschafft innerHTML gelesen und gespeichert.
Ausserdem wird ein neuer Button für den Neustart des Spiels eingebaut.
*/
function loadresult(i) {
    canvascolor("orange")
    if (i == 21) {var type = results.a; var text = resultstring.a}
    else if (i == 22) {var type = results.b; var text = resultstring.b}
    else if (i == 23) {var type = results.c; var text = resultstring.c}
    else if (i == 24) {var type = results.d; var text = resultstring.d}
    else if (i == 25) {var type = results.e; var text = resultstring.e}
    else if (i == 26) {var type = results.f; var text = resultstring.f}
    else if (i == 27) {var type = results.g; var text = resultstring.g};
    reload();
    document.getElementById("question").innerHTML = "";
    document.getElementById("linea").innerHTML = "<r1>" + "Dein Typ ist:" + "</r1>";
    document.getElementById("lineb").innerHTML = "<r2>" + type + "</r2>" ;
    document.getElementById("linec").innerHTML = "<r3>" + text + "</r3>" ;
    document.getElementById("lined").innerHTML = "<button id=restart> Nochmal spielen! </button>" ;
    document.getElementById("restart").addEventListener("click", function() {restart()},);
}

/* Diese Funktion setzt die Frage, sowie die Antwortbuttons wieder zurück, so dass sie keinen Text enthalten.
Ausserdem wird das Canvas, in welchem der Entscheidungsbaum angezeigt wird, ebenfalls zurückgesetzt.
Am Ende wird das Spiel über die Start Funktion neu geladen.
*/

function reload() {
    document.getElementById("options").innerHTML = " <p id=linea> <button> <opt id=opta> </opt> </button> </p>  <p id=lineb> <button> <opt id=optb> </opt> </button> </p>  <p id=linec> <button> <opt id=optc> </opt> </button> </p> <p id=lined> <button> <opt id=optd> </opt> </button> </p> " ;
}

function loading() {
    document.getElementById("question").innerHTML = "Frage wird geladen...";
    document.getElementById("options").innerHTML = "" ;
}

function restart() {
    clear("canvas")
    clear("background")
    clear("dots")
    start()
}


/* die nachfolgenden CONST definieren gewisse repetitive Grössenverhältnisse in der Animation */
/* CONST size defineirt gleichmässige Abstände zwischen allen Punkten, Linien, Animationen*/
/* CONST corra und corrb werden genutzt um mover(), vac() und mask() besser auszurichten*/
const size = 50;
const corra = size*0.8; 
const corrb = size*0.2;


// Zeichnet die Knoten, also Fragen (rot) und Antworten (blau) des Entscheidungsbaums.
/* Hierzu wird eine 2D-Zeichenfläche, canvas, eingefügt, welcher ein Koordinatensystem hinterlegt ist.
Über zwei For-Schleifen werden die Punkte anhand ihrer Indizes im Array coordinates aufgerufen und als 
Rechtecke gezeichnet.
*/

function dots() {  
    var dotsize = size*0.4;
    const canvas = document.querySelector('#dots'); 
    const ctx = canvas.getContext('2d');
    dot(0);
    for (let i = 1; i < 14; i++) {
        let a = (coordinates[i].a)*size    
        let b = (coordinates[i].b)*size  
        ctx.beginPath();
        ctx.arc(a, b, dotsize, 0, Math.PI*2);
        ctx.fillStyle = "#d7966d";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(a, b, dotsize/2, 0, Math.PI*2);
        ctx.fillStyle = "#598ebb";
        ctx.fill();
        ctx.closePath();
    }
    for (let i = 21; i < 28; i++) {
        let a = (coordinates[i].a)*size    
        let b = (coordinates[i].b)*size  
        ctx.beginPath();
        ctx.arc(a, b, dotsize, 0, Math.PI*2);
        ctx.fillStyle = "#598ebb";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(a, b, dotsize/2, 0, Math.PI*2);
        ctx.fillStyle = "#d7966d";
        ctx.fill();
        ctx.closePath();
    }
}

// Nachfolgend kommen einige Funktionen die für die Animation relevant sind.
// animate() läuft in der eingestellten rate (z.b. 50 frames pro Sekunde), zeichnet die spielfigur und linie


function animate() {   
    clear("canvas");
    var checkBox = document.getElementById('toggleswitch');
    if(checkBox.checked == true) {mask()} 
    else {vac()}
    line();
}

function draw(direction) {
    if (direction == "right") {animate(); a += speed}
    else if (direction == "left") {animate(); a -= speed}
    else if (direction == "down") {animate(); b += speed}
    else {animate(); b += 0.000000000000000000001}
}


function clear(layer) {
    if (layer == "canvas") {
        var canvas = document.querySelector('#canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,400,400);}
        }
    else if (layer == "background") {
        var canvas = document.querySelector('#background');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,400,400);}
        }   
    else if (layer == "dots") {
        var canvas = document.querySelector('#dots');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,400,400);}
        }  
}



// mover() berechnet den weg vom aktuellen punkt im koordinatensystem zum nächsten punkt im koordinatensystem und startet die animation als intervall
//wäre der wert von distdown/distright NULL würde der intervall abgebrochen durch die kleine manipulation (0.00001) stellen wir sicher, dass eine
//strecke zurückzulegen ist, auch wennn diese vom blossen auge nicht zu sehen ist, so kommt die funktion mover() mit nur zwei bedingungen aus: links oder rechts


function mover(i,j) {
    a = (coordinates[i].a)*size-corra;
    b = (coordinates[i].b)*size-corrb;
    c = (coordinates[j].a)*size-corra;
    d = (coordinates[j].b)*size-corrb;
    distdown = (d - b)+0.0001; 
    distright = (c - a)+0.0001; 
    distleft = (a - c);
    rate = 100;
    speed = 100/size;
    if (a > c) {
        const repeater1 = setInterval(function() {draw("down")}, rate);
        setTimeout(function(){clearInterval(repeater1)},distdown*size);
        setTimeout(function(){
        const repeater2 = setInterval(function() {draw("left")}, rate);
        setTimeout(function(){clearInterval(repeater2)},distleft*size);
        }, distdown*size)
        setTimeout(function(){
        const waiter = setInterval(function() {draw("onspot")}, rate);loadquestion(j);
        }, (distdown+distleft)*size)   
    }
    else {
        const repeater1 = setInterval(function() {draw("down")}, rate);
        setTimeout(function(){clearInterval(repeater1)},distdown*size);
        setTimeout(function(){
        const repeater2 = setInterval(function() {draw("right")}, rate);
        setTimeout(function(){clearInterval(repeater2)},distright*size);
        }, distdown*size)
        setTimeout(function(){
        const waiter = setInterval(function() {draw("onspot")}, rate);loadquestion(j);
        }, (distdown+distright)*size)  
    }
}


//vac() und maask() visualisieren die spielfiguren

function vac() {  
    x = size*0.25;
    var canvas = document.querySelector('#canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(a+1*x, b+0, 4*x, 1.5*x);
        ctx.fillRect(a+0, b+0.6*x, 1*x, 0.25*x);
        
        ax = a+2*x;
        bx = b+0;
        for (let i = 0; i < 7; i++) {
            ctx.beginPath();
            ctx.lineWidth = x/20;
            ctx.strokeStyle = "black";

            ctx.moveTo(ax, bx);
            ctx.lineTo(ax, bx+0.8*x);
            ctx.stroke();
            ax = ax + 0.4*x;
        }
        
        ctx.beginPath();
        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(a+1*x, b+0, 1*x, 1.5*x)

        ctx.beginPath();
        ctx.lineWidth = x/8;
        ctx.strokeStyle = "black";
        ctx.rect(a+1*x, b+0, 4*x, 1.5*x);
        ctx.stroke();
        ctx.rect(a+0, b+0.6*x, 1*x, 0.25*x);
        ctx.stroke();
        ctx.rect(a+0, b+0.47*x, 0.05*x, 0.5*x);
        ctx.stroke();
        ctx.rect(a+5*x, b+0.7*x, 1.2*x, 0.01*x);
        ctx.stroke();
    }
} 

function mask() { 
    x = size*0.3;
    var canvas = document.querySelector('#canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(a+1.5*x,b+0.1*x, 2.5*x, 1.4*x);
        
        ctx.beginPath();
        ctx.lineWidth = 0.1*x;
        ctx.strokeStyle = "black";
        ctx.moveTo(a+1.5*x,b+0.1*x)
        ctx.quadraticCurveTo(a+0.2*x, b+0.3*x, a+1.5*x,b+1.5*x);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 0.1*x;
        ctx.strokeStyle = "black";
        ctx.moveTo(a+4*x,b+0.1*x)
        ctx.quadraticCurveTo(a+5.3*x, b+0.3*x, a+4*x,b+1.5*x);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = 0.1*x;
        ctx.strokeStyle = "black";
        ctx.rect(a+1.5*x,b+0.1*x, 2.5*x, 1.4*x);
        ctx.stroke();

        ax = a+1.7*x;
        bx = b+0.35*x;
        for (let i = 0; i < 3; i++) {
            shadow = 0.1*x
            ctx.beginPath();
            ctx.lineWidth = shadow;
            ctx.strokeStyle = "#DCdCdC";
            ctx.moveTo(ax, bx+shadow);
            ctx.lineTo(ax+2*x, bx+shadow);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 0.1*x;
            ctx.strokeStyle = "black";
            ctx.moveTo(ax, bx);
            ctx.lineTo(ax+2*x, bx);
            ctx.stroke();
            bx = bx + 0.4*x;
        }
    }
} 

//canvascolour() bestimmt die hintergrundfarbe des canvas (zeichnet auf "layer")

function canvascolor(colour) {   
    const background = document.querySelector('#background'); 
    const ctx = background.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = colour;
    ctx.fillRect(0,0,400,400);
}

//line() zeichnet zurückgelegte linie auf die ebene "layer", damit dies nicht zurückgesetzt wird
//durch die "clear()" funktion in animate(), welche die ebene "canvas" pro frame zurücksetzt

function line() { 
    const background = document.querySelector('#dots'); 
    if (background.getContext) {
        var ctx = background.getContext('2d');
        ctx.beginPath();
        ctx.arc(a+corra, b+corrb, 3, 0, Math.PI*2);
        ctx.fillStyle = "grey";
        ctx.fill();
        ctx.closePath();
    }
}

function dot(i) {  
    const canvas = document.querySelector('#dots'); 
    const ctx = canvas.getContext('2d');
    let a = (coordinates[i].a)*size;
    let b = (coordinates[i].b)*size;

    ctx.beginPath();
    ctx.arc(a, b, size*0.4, 0, Math.PI*2);
    ctx.fillStyle = "#D0BDFF";
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(a, b, size*0.2, 0, Math.PI*2);
    ctx.fillStyle = "grey";
    ctx.fill();
    ctx.closePath();
}

start()

