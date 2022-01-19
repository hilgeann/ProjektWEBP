/* ABSCHNITT 0: ARRAYS */

/* Es gibt 13 Fragen, so sind in allen Arrays Positionen 1 bis 13 fragenbezogene Daten
Positionen 14 bis 20 sind Platzhalter (übersichtlichkeitshalber)
Positionen 21 bis 27 sind resultatbezogene Daten. */

const knots = ["", 
"Corona-Pandemie ist...",
"Corona ist ja eine kleine Grippe..",
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
const options = [{a:""},
{a:"Coro-was?", b:"Reine Panikmache!", c:"eine Viruspandemie"},
{a:"Nein, bestimmt nicht!", b:"Ja, definitiv."},
{a:"Weiss nicht, diese Tests sind ohnehin manipuliert!", b:"Ja, was solls?", c:"Ja, leider...", d:"Nein."},
{a:"Ja", b:"Nein"},
{a:"Ja", b:"Nein"},
{a:"Ja", b:"Nein"},
{a:"Die Pandemie muss Enden, mit oder ohne Ferien", b:"Genau, wo sind meine Flipflops?"},
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
const redirection = [{a:""},
{a:25, b:2, c:3},
{a:3, b:5},
{a:5, b:7, c:4, d:6},
{a:8, b:7},
{a:7, b:9},
{a:8, b:7},
{a:23, b:13},
{a:7, b:10},
{a:26, b:27, c:12},
{a:22, b:11},
{a:22, b:21},
{a:25, b:13},
{a:24, b:25},
]

// Array mit den Koordinaten aller Antworten und Ergebnisse, also "knots" und "results" des Entscheidungsbaums.
const coordinates = [{a:2, b:1},
{a:3, b:1},
{a:6, b:2},
{a:2, b:2},
{a:4, b:2.5},
{a:7, b:3},
{a:1, b:3},
{a:4, b:4.5},
{a:1.5, b:4},
{a:6.5, b:4},
{a:2, b:5},
{a:2.5, b:6},
{a:6, b:5},
{a:5.5, b:6},
{a:""},
{a:""},
{a:""},
{a:""},
{a:""},
{a:""},
{a:""},
{a:2, b:7.5},
{a:1, b:7.5},
{a:3, b:7.5},
{a:4, b:7.5},
{a:5, b:7.5},
{a:6, b:7.5},
{a:7, b:7.5}
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
    a: "Wow! Du nimmst es genau. <br> Du bist der Typ, der immer Vorsicht walten lässt und das Wohl anderer über das Eigene stellt. <br> Super!",
    b: "Hut ab. <br> Obwohl du dir ein wenig Freiheiten gönnst und dein Leben möglichst normal weiter lebst, bist du vorsichtig, wenn es darauf ankommt. <br> Gut!",
    c: "Du trägst die Massnahmen zwar mehrheitlich mit, obwohl du keine Lust mehr hast. <br> Motivier dich noch ein wenig, denn wir sind im Endspurt.",
    d: "Vorsichtig ist anders, du kooperierst leider nicht. <br> Bitte halte dich an die geltenden Massnahmen, es zu deinem Wohl und zum Schutz deiner Mitmenschen!",
    e: "Du hast wohl nicht viel mitbekommen. <br> Informiere dich doch unter www.bag.admin.ch über die aktuelle Situation.",
    f: "Ups! Leider lebst du in einer anderen Realität, als die Mehrheit der Bevölkerung. <br> Wir empfehlen dir eine Social-Media-Diät.",
    g: "Wir stellen fest, dass du die Massnahmen missachtest und eine Grundabneigung gegen Wissenschaft sowie Schulmedizin hast. <br> Bitte informiere dich künftig nur bei offiziellen Stellen und überdenke deine Überzeugungen."
}

/* ABSCHNITT 1: QUIZ ABLAUF */

/* 
Choice übernimmt und verarbeitet die gewählte Antwort (Klick auf Button) aus der Funktion loadquestion. Je nach Antwort, die geklickt wurde, 
also je nach x, wird anhand der If-Abfrage, die Variable j ermittelt, welche dann in eine weitere If-Abfrage eingegeben wird
und darüber entscheidet, welche weiteren Funktionen ausgelöst werden. 
J wird als Parameter an die Funktion mover übergeben. 
I stammt als Parameter von der Funktion loadquestion bzw. mover und wird hier als Parameter an die Funktionen dot und mover übergeben.
Ausserdem wird die Funktion loading gestartet.
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
    loading();dot(i);mover(i,j)
};
    
/*
start() initialisiert das Quiz: Gameinfo wird eingeblendet, Hintergrundfarbe gesetzt, Dots im mittleren Canvas eingezeichnet,
waiter (Spielfigur wartet an der Stelle) und mover (weg von startpunkt zu frage 1) wird gestartet. (Stören einander bei der ausführung nicht)
am ende von mover() werden die Fragen und Antworten eingeblendet. 
*/

function start(){
    gameinfo("show")
    canvascolor("#fff0b4")
    dots();
    const waiter = setInterval(function() {drawonspot()}, 100)
    mover(0,1);
    loading();
};


/* 
Eine FadeIn FadeOut Funktion wird hier definiert, um sie beliebig für alle Arten von Text einsetzen zu können.
Als Parameter erhält sie jeweils den Namen des Strings, den String selbst und als Typ, ob es sich um ein In oder Out Fading handelt.
Das FadeIn und FadeOut erhöht/verkleinert die Durchsichtigkeit mit der selben Schrittzahl. Beide Intervalle werden nach 1.1 Sekunden abgebrochen. 
*/

function fade(stringid, stringtext, type) {
    if (type == "in") {
        document.getElementById(stringid).style.opacity = 0; 
	/*
	getElementById als Methode des document-Objekts, um auf den jeweiligen Elementknoten zu zugreifen,
	der ein eindeutiges id-Atrribut erhält. Hier wird der Schrift die Deckkraft Null vergeben, da sie zu Beginn unsichtbar ist. 
	*/
        document.getElementById(stringid).innerHTML = stringtext;
	/* Durch inner.HTML wird der Inhalt für das jeweiligen HTML-Element gelesen und gespeichert.
	*/
        var value1 = 0.1
        const fader1 = setInterval(function() {
            document.getElementById(stringid).style.opacity = value1; //wiederholt die Vergabe des neuen Opacity-Werts alle 100mS
            value1 = value1 + 0.1
            }, 100)
            setTimeout(function(){clearInterval(fader1)},1100) //bricht das obige Interval nach 1100mS ab
        }
    else if (type == "out") {
        document.getElementById(stringid).style.opacity = 1;
        var value2 = 1
        const fader2 = setInterval(function() {
            document.getElementById(stringid).style.opacity = value2;
            value2 = value2 - 0.1
            }, 100)
            setTimeout(function(){clearInterval(fader2)},1100)
            setTimeout(function(){document.getElementById(stringid).innerHTML = ""},1100)
    }
}


/* 
Funktion, mit der die Frage über das Array knots geladen wird und anhand der Variablen k 
über die If-Abfrage die (Anzahl) möglichen Antworten.
Zuvor findet eine weiter If-Abfrage statt, denn falls es sich um ein i grösser 20 handelt, würden nicht die Fragen, sondern Antworten geladen werden.
Es werden vier Variablen definiert, welche dann in der If-Abfrage dafür eingesetzt werden, die im 
vorherigen Durchlauf geklickten Antworten zurückzusetzen ("replacewith"). Mit dem Clone, wird das Element, also die Antwortoptionen zwar übernommen, aber ohne,
dass der Event Listener aus der Antwort zuvor übernommen wird.
Durch Klicken der Antwort-Buttons, werden die entsprechenden Parameter an die Choice-Funktion weitergegeben.
*/

function loadquestion(i) {
    reload(); // nach dem Klick auf eine Antwort, werden diese mit der Funktion reload wieder ausgeblendet, bis die neuen geladen wurden
    if (i > 20) {loadresult(i)}
    else {
    let k = optnum[i]
    var queststring = knots[i];
    fade("question", queststring, "in"); // FadeIn der neuen Frage
    var elema = document.getElementById("opta");
    var elemb = document.getElementById("optb");
    var elemc = document.getElementById("optc");
    var elemd = document.getElementById("optd");
    if (k == 2) {
	elema.innerHTML = options[i].a;
        elema.replaceWith(elema.cloneNode(true));
        document.getElementById("opta").addEventListener("click", function() {choice(i,1)},);
        elemb.innerHTML = options[i].b;
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
    canvascolor("orange") // beim Beenden des Spiels, ändert die Hintergrundfarbe des Canvas
    if (i == 21) {var type = results.a; var text = resultstring.a}
    else if (i == 22) {var type = results.b; var text = resultstring.b}
    else if (i == 23) {var type = results.c; var text = resultstring.c}
    else if (i == 24) {var type = results.d; var text = resultstring.d}
    else if (i == 25) {var type = results.e; var text = resultstring.e}
    else if (i == 26) {var type = results.f; var text = resultstring.f}
    else if (i == 27) {var type = results.g; var text = resultstring.g};
    reload();	
    document.getElementById("question").innerHTML = "";
    var astring = "<label class=r1>" + "Dein Typ ist:" + "</label>";
    var bstring = "<label class=r2>" + type + "</label>" ;
    var cstring = "<label class=r3>" + text + "</label>" ;
    var dstring = "<button id=restart> Nochmal spielen! </button>" ;
    fade("linea", astring, "in");
    fade("lineb", bstring, "in");
    fade("linec", cstring, "in");
    fade("lined", dstring, "in");
    document.getElementById("restart").addEventListener("click", function() {restart()},); // der Button für den Neustart wird eingeblendet
}

/* 
Nach erfolgtem Klick, verschwinden die Buttons, sie enthalten keinen Inhalt mehr. 
Wird ausgelöst durch loadquestion und loadresult.
*/

function reload() {
    document.getElementById("options").innerHTML =
	"<p id=linea> <button> <opt id=opta> </opt> </button> </p>
	<p id=lineb> <button> <opt id=optb> </opt> </button> </p>
	<p id=linec> <button> <opt id=optc> </opt> </button> </p>
	<p id=lined> <button> <opt id=optd> </opt> </button> </p>" 
}

/*
Wird ausgelöst über die Funktion start bzw. nach jedem Klick auf eine Antwort und blendet jeweils den Übergangstext ein und die Buttons aus.
*/
function loading() {
    var waitstring = "Wird geladen...";
    fade("question", waitstring, "in");
    document.getElementById("options").innerHTML = "" ; //MACHT DAS HIER NICHT DAS SELBE, WIE SCHON RELOAD OBEN?
}

/*
Alle drei Layer des Canvas werden bereinigt, das Spiel wird neu gestartet.
*/
function restart() {
    clear("canvas")
    clear("background")
    clear("dots")
    start()
}

/*
Klickbarer Button zum Ein- und Ausblenden einer Anleitung über die Funktion fade.
*/

function gameinfo(i) {
    eleminfo = document.getElementById("infobutton");
    eleminfo.replaceWith(eleminfo.cloneNode(true));
    if (i == "hide") {
        fade("infotext", infostring, "out")
        document.getElementById("infobutton").innerHTML = "Spielinfo anzeigen";
        document.getElementById("infobutton").addEventListener("click", function() {gameinfo("show")},)}
    else if (i == "show") {
        document.getElementById("infobutton").innerHTML = "Spielinfo ausblenden";
        var infostring = "Dieses Quiz eruiert auf spielerische Art Ihren Pandemietyp. <br> Die orangefarbenen Ringe stellen Fragen, die blauen Ringe stellen mögliche Resultate dar. <br> Abhängig von den gemachten Antworten können Sie bei einem der sieben Pandemietypen enden.";
        fade("infotext", infostring, "in")
        document.getElementById("infobutton").addEventListener("click", function() {gameinfo("hide")},)
    }
}

/* ABSCHNITT 2: CANVAS VISUALISIERUNG */

/* 
Die nachfolgenden Konstanten definieren gewisse repetitive Grössenverhältnisse in der Animation.
CONST size definiert gleichmässige Abstände zwischen allen Punkten, Linien, Animationen
CONST corra und corrb werden genutzt um mover(), vac() und mask() besser auszurichten.
0.8 und 0.2 beschreiben die Abstände, die addiert oder subtrahiert werden müssen, damit Linie/Spielfigur sich schön mittig befinden.
Grund dafür ist, dass Maske und Spritze ihren Ausgangspunkt am linken rand haben, corra/corrb legen sie mittig über die Linie.
*/
const size = 50;
const corra = size*0.8; 
const corrb = size*0.2;

/*
Zeichnet die Knoten, also Fragen (orange Kreise) und Antworten (blaue Kreise) des Entscheidungsbaums.
Hierzu wird eine 2D-Zeichenfläche, canvas, eingefügt, welcher ein Koordinatensystem hinterlegt ist.
Über zwei For-Schleifen werden die Punkte anhand ihrer Indizes im Array coordinates aufgerufen und als 
Rechtecke gezeichnet.
*/

function dots() {  
    var dotsize = size*0.4;
    const canvas = document.querySelector('#dots'); // das Layer mit den Dots, wird in der Konstante Canvas gespeichert
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

/*
Nachfolgend kommen einige Funktionen die für die Animation relevant sind.
animate() läuft in der eingestellten Rate (z.b. 50 frames pro Sekunde), zeichnet die Spielfigur und den Pfad.
Wird über die Funktion draw ausgelöst. Durch das clear zu Beginn, wird die Figur
immer wieder "ausgeblendet" und an neuer Stelle wieder eingeblendet. STIMMT DAS SO?
*/

function animate() {   
    clear("canvas"); // HIER BIN ICH NICHT SICHER, OB ICH DAS RICHTIG VERSTANDEN HABE?
    var checkBox = document.getElementById('toggleswitch'); // ermöglicht das Wechseln der Spilefigur auch während der Pfad gezeichnet wird.
    if(checkBox.checked == true) {mask()} 
    else {vac()}
    line();
}

/*
Bewegt die Spielfigur aufgrund der Berechnungen aus der Funktion mover in die entsprechende Richtung und zeichnet den Pfad.
Bzw. bleibt die Figur beim letzten Intervall innerhalb der If-Abfrage der Funktion mover vermeintlich an Ort stehen, bis die neue Frage geladen
bzw. die nächste Antwortoption geklickt wurde.
*/

function draw(direction) {
    if (direction == "right") {animate(); a += speed}
    else if (direction == "left") {animate(); a -= speed}
    else if (direction == "down") {animate(); b += speed}
    else {animate(); b += 0.000000000000000000001} // Distanz der Fortbewegung ist so klein gewählt, dass nicht wahrnehmbar
}

/*
Alle drei Layer des Spielfelds werden gelöscht.
*/

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

/* 
mover() berechnet den Weg vom aktuellen Punkt im Koordinatensystem zum nächsten Punkt im Koordinatensystem und startet die Animation als Intervall.
Wäre der Wert von distdown/distright NULL würde der Intervall abgebrochen. Durch die kleine Manipulation (0.00001) stellen wir sicher, dass eine
Strecke zurückzulegen ist, auch wennn diese vom blossen Auge nicht zu sehen ist, so kommt die Funktion mover() mit nur zwei Bedingungen aus: links oder rechts
*/


function mover(i,j) {
    a = (coordinates[i].a)*size-corra;
    b = (coordinates[i].b)*size-corrb;
    c = (coordinates[j].a)*size-corra;
    d = (coordinates[j].b)*size-corrb;
    distdown = (d - b)+0.000001; 
    distright = (c - a)+0.000001; 
    distleft = (a - c)+0.000001;
    rate = 100; // das Interval wiederholt sich alle 100mS
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

//vac() und mask() Visualisieren die Spielfiguren, werden mit canvas gezeichnet.

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

//canvascolour() bestimmt die Hintergrundfarbe des canvas (zeichnet auf "layer")

function canvascolor(colour) {   
    const background = document.querySelector('#background'); 
    const ctx = background.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = colour;
    ctx.fillRect(0,0,400,400);
}

/*
line() zeichnet zurückgelegte Linie auf die Ebene "Dots", damit dies nicht zurückgesetzt wird
durch die "clear()" Funktion in animate(), welche die Ebene "Canvas" pro Frame zurücksetzt.
*/

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

/*
Verändert die Farbe der Dots, nachdem diese im Spiel "überquert" wurden.
*/

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
