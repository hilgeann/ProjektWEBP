/*
Einige Erläuterungen zum "neuen" Code.
Mein Ziel war es, dass die Beantwortung einer Quizfrage ein in sich geschlossener Prozess ist.
Da wir in WEBP ohne zwischenspeicher gearbeitet haben, hatten wir einen Salat aus Loops/Timeouts etc.
die miteinander kollidiert sind, einander gestört haben, "nodes" die nicht richtig zurückgesetzt wurden usw.usw.

Neu soll der Ablauf so sein:
1. Durch Seitenabruf entsteht auf API Server eine Identifikationsdatei, welche der Session einen einmaligen Schlüssel 
zuweist und eine Liste erstellt, welche die Antworten speichert.
2. Bei der Wahl der Antwort, wird die ganze Zeite auf einen neutralen Stand zurückgesetzt und die Identifikationsdatei 
wird neu eingelesen.
3. Aus der Identifikationsdatei ergibt sich, welche bisherigen Antworten gegeben wurden (der Path wird neu eingeblendet) 
und welche Frage an der Reihe ist (Quiz wird eingeblendet).
4. Beim laden der Antwort wieder von vorne...

Vorteil: Keine Loops/Aktualisierungen die endlos laufen, kein ewiges überschreiben bisheriger Strings (Quizbuttons etc.) 
weil jeder "Quiz-Schritt" einfach dasselbe macht: 
Bisherigen Path laden - Aktuelle Quizfrage anzeigen - Antwort abholen + speichern - Alles zurücksetzen.
*/

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

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

function drawdown(a1,a2,b1,b2,i){
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

function drawside(a1,a2,b1,b2,i){
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

// Path ist jetzt hier ein Beispielweg mit drei passierten Punkten

const path = [
    {a:150,b:100}, 
    {a:50,b:150}, 
    {a:200,b:300} 
]

//So habe ich die Funktionen getestet. Komischerweise funktioniert es aktuell nur wenn zuerst drawdown ausgeführt wird, warum weiss ich nicht (Spielt von der funktionalität her aber keine rolle aktuell)

drawdown(200,300,350,350,0);
loadlines(path);
