<!doctype html>

<html lang="de">

<head> 
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <!-- Einbinden des CSS-Stylsheets -->
</head>


<body>
<canvas width="400" height="400" id="background" style="position:absolute"></canvas>
</body>

<script>

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

const size = 50;
const corra = size*0.8; 
const corrb = size*0.2;

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

const games = [
    {userid:"001", username:"Martha", path:[1,2,5]},
    {userid:"002", username:"Theodor", path:[1,3,7]},
    {userid:"003", username:"Damiana", path:[1,3,4,8]}
]

// Circle und Line habe ich hier in meinem Beispielfile definiert und Benutzt 

function circle(a,b){
    ctx.beginPath();
    ctx.arc(a,b, 3, 0, Math.PI*2);
    ctx.stroke();
}

function line(a,b,c,d) {
    ctx.beginPath();
    ctx.moveTo(a,b);
    ctx.lineTo(c,d);
    ctx.stroke();
} 

// Drawdown bewegt die Spielfigur auf die korrekte vertikale höhe und löst drawside aus

function drawdown(p1,p2,i){
    var a1 = (coordinates[p1].a)*size-corra;
    var a2 = (coordinates[p1].b)*size-corrb;
    var b1 = (coordinates[p2].a)*size-corra;
    var b2 = (coordinates[p2].b)*size-corrb;
    var a = a1; b = a2; c = a1; d = b2;            // Zuweisung Start und Endpunkte
    var disbd = d-b;                               // Abstände zwischen den Punkten
    var j = disbd*2;                               //j = Anzahl Aktualisierungen die nötig sind bei 2px/Aktualisierung
    var  movebd = disbd / j;                       //Abstand der Teilschritte damit bei verschiedenen Distanze gleichmässige Bewegung generiert wird
    circle(a,b);
    if (i == j) {drawside(a1,a2,b1,b2,0)}
    else {var i = i + 1;
        const myTimeout = setTimeout(function() {
            line(a,b,a,b+(movebd*i)),              // bei jeder wiederholung wird die gleiche linie gezeichnet von a1,a2 aus aber sie wird um (movebd+j) verlängert
            drawdown(a1,a2,b1,b2,i,j)              //nach 10 millisekunden wird drawdown mit aktualisierte i neu gestartet
        }, 10);}
}

function drawside(p1,p2,i){
    var a1 = (coordinates[p1].a)*size-corra;
    var a2 = (coordinates[p1].b)*size-corrb;
    var b1 = (coordinates[p2].a)*size-corra;
    var b2 = (coordinates[p2].b)*size-corrb;
    var a = a1; b = b2; c = b1; d = b2;            // Zuweisung Start und Endpunkte
    var disac = Math.sqrt((c-a)**2);               // Abstände zwischen den Punkten, zuerst quadriert + dann wurzel damit wert positiv
    var j = disac*2;                               //j = Anzahl Aktualisierungen die nötig sind bei 2px/Aktualisierung
    var moveac = disac / j;                        //Abstand der Teilschritte damit bei verschiedenen Distanze gleichmässige Bewegung generiert wird
    if (a > c) {                                   // a grösser als c: nach links gehen
        if (i == j) {circle(c,d)}
        else {
            var i = i + 1;
            const myTimeout = setTimeout(function() {
                line(a,b,a-(moveac*i),b),              // bei jeder wiederholung wird die gleiche linie gezeichnet von a1,a2 aus aber sie wird um (moveac+j) verlängert
                drawside(a1,a2,b1,b2,i,j)              //nach 10 millisekunden wird drawdown mit aktualisierte i neu gestartet
            }, 10);}
    }
    else if (c > a) {                                 // c grösser als a: nach rechts gehen
        if (i == j) {circle(c,d)}
        else {
            var i = i + 1;
            const myTimeout = setTimeout(function() {
                line(a,b,a+(moveac*i),b),
                drawside(a1,a2,b1,b2,i,j)
            }, 10);}
    };
}

// Loadlines liest die bisherigen Punkte als Array ein und generiert eine Line die alle passierten Punkte auf einmal einblendet

function loadlines(knots){
    for (let i = 0; i < knots.length; i++) {
        var a1 = knots[i]["a"]; a2 = knots[i]["b"]; b1 = knots[i+1]["a"]; b2 = knots[i+1]["b"];
        var a = a1; b = a2; c = a1; d = b2;        //start-/endpunkte vertikale linie
        circle(a,b);
        line(a,b,c,d);                             //vertikale linie
        var a = a1; b = b2; c = b1; d = b2;        //start-/endpunkte horizontale linie
        line(a,b,c,d);                             // horizontale linie
    }
}

//So habe ich die Funktionen getestet. Komischerweise funktioniert es aktuell nur wenn zuerst drawdown ausgeführt wird, 
//warum weiss ich nicht (Spielt von der funktionalität her aber keine rolle aktuell)

drawdown(1,2,0);
</script>