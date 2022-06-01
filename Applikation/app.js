/* VERZEICHNIS
TEIL 1: CANVAS VISUALISIERUNGEN
TEIL 2: INTERAKTIVITÄT
TEIL 3: GAMEPLAY
TEIL 4: SERVERKOMMUNIKATION
TEIL 5: DATENVISUALISIERUNG
*/

// ##### TEIL 1: CANVAS VISUALISIERUNGEN #####

// Die Folgenden Variablen und Funktionen generieren Canvas-Animationen.

const size = 50;
const corra = size*0.8; 
const corrb = size*0.2;
const linecolour = "grey";
const linewidth = 7;
const coordinates = [ 
    {a:2, b:1},  {a:3, b:1},  {a:6, b:2},  {a:2, b:2},   {a:4, b:2.5}, {a:7, b:3},  {a:1, b:3}, {a:4, b:4.5}, 
     {a:1.5, b:4},  {a:6.5, b:4},  {a:2, b:5},   {a:2.5, b:6},  {a:6, b:5},  {a:5.5, b:6},  {a:0, b:1}, //Nr 14: Startpunkt hinzugefügt
    {a:""},  {a:""},  {a:""},  {a:""}, {a:""}, {a:""}, {a:2, b:7.5}, {a:1, b:7.5},  {a:3, b:7.5},  {a:4, b:7.5}, {a:5, b:7.5},  {a:6, b:7.5},  {a:7, b:7.5}
]

function clear(layer) {
    var canvas = document.getElementById(layer)
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0,0,400,400);
    }
}

function vac(a,b) {
    var a = a - corra;
    var b = b - corrb;
    clear("front")
    var checkBox = document.getElementById("toggleswitch"); // ermöglicht das Wechseln der Spilefigur auch während der Pfad gezeichnet wird.
    if (checkBox.checked == true) {
        x = size*0.3;
        var canvas = document.getElementById("front");
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
    else {
        x = size*0.25;
        var canvas = document.getElementById("front");
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
}

function dots() {  
    let c = coordinates; let s = size;let a = (c[0].a)*s;let b = (c[0].b)*s; maindots(a,b,1);
    for (let i = 1; i < 14; i++) {
        let c = coordinates; let s = size;
        let a = (c[i].a)*s;let b = (c[i].b)*s;
        maindots(a,b,2);
    }
    for (let i = 21; i < 28; i++) {
        let c = coordinates; let s = size;
        let a = (c[i].a)*s;let b = (c[i].b)*s;
        maindots(a,b,3);
    }
}

function loadlines(knots){
    var start = [0];
    var knots = start.concat(knots);
    for (let i = 0; i < (knots.length)-2; i++) {
        let c = coordinates; let k = knots; let s = size; 
        var a1 = (c[k[i]].a)*s; a2 = (c[k[i]].b)*s; b1 = (c[k[i+1]].a)*s; b2 = (c[k[i+1]].b)*s;
        var a = a1; b = a2; c = a1; d = b2;        //start-/endpunkte vertikale linie
        line(a,b,c,d);                             //vertikale linie
        var a = a1; b = b2; c = b1; d = b2;        //start-/endpunkte horizontale linie
        line(a,b,c,d);
        maindots(c,d,1);
    }

}

function dot(a,b,dotsize,colour) {
    var canvas = document.getElementById("back");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(a, b, dotsize, 0, Math.PI*2);
        ctx.fillStyle = colour;
        ctx.fill();
        ctx.closePath();
    }
}

function line(a,b,c,d) {
    var canvas = document.getElementById("back");
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');   
        dot(a,b,linewidth*0.5,linecolour);
        ctx.beginPath();
        ctx.moveTo(a,b);
        ctx.stroke();
        ctx.lineTo(c,d);
        ctx.lineWidth = linewidth;
        ctx.strokeStyle = linecolour;
        ctx.stroke();
        dot(a,b,linewidth*0.4,linecolour);
    }
} 

function maindots(a,b,type) {             //type 1: durchquerte dots; type 2: offene dots; type 3: zieldots
    if (type == 1) {dot(a,b,20,"#d0bdfb"); dot(a,b,10,"#808080")}
    else if (type == 2) { dot(a,b,20,"#d7966d"); dot(a,b,10,"#598ebb") }
    else if (type == 3) { dot(a,b,20,"#598ebb"); dot(a,b,10,"#d7966d") }
}

//FUNKTION "DRAWDOWN()" UND "DRAWSIDE()": Drawdown zeichnet vertikale Linie, drawside zeichnet horizontale Linie.
//FOLGEN: DRAWSIDE() startet nach Ankunft Spielfigur im nächsten Punkt fetcher5 oder fetcher6 um Fragen resp. Resultate zu laden.

function drawdown(p1,p2,i,j){
    let c = coordinates; let s = size;
    var a1 = (c[p1].a)*s; a2 = (c[p1].b)*s; b1 = (c[p2].a)*s; b2 = (c[p2].b)*s;
    var a = a1; b = a2; c = a1; d = b2;            // Zuweisung Start und Endpunkte
    var disbd = d-b;                               // Abstände zwischen den Punkten
    var j = disbd*2;                               //j = Anzahl Aktualisierungen die nötig sind bei 2px/Aktualisierung
    var  movebd = disbd / j;                       //Abstand der Teilschritte damit bei verschiedenen Distanze gleichmässige Bewegung generiert wird
    if (i == j) {drawside(p1,p2,0)}
    else {
        var i = i + 1;
        const myTimeout = setTimeout(function() {
            line(a,b,a,b+(movebd*i));              // bei jeder wiederholung wird die gleiche linie gezeichnet von a1,a2 aus aber sie wird um (movebd+j) verlängert
            vac(a,b+(movebd*i));
            drawdown(p1,p2,i,j)                    //nach 10 millisekunden wird drawdown mit aktualisierte i neu gestartet
        }, 10);}
}

function drawside(p1,p2,i,j){
    let c = coordinates; let s = size;
    var a1 = (c[p1].a)*s; a2 = (c[p1].b)*s; b1 = (c[p2].a)*s; b2 = (c[p2].b)*s;    var a = a1; b = b2; c = b1; d = b2;            // Zuweisung Start und Endpunkte
    var disac = Math.sqrt((c-a)**2);               // Abstände zwischen den Punkten, zuerst quadriert + dann wurzel damit wert positiv
    var j = disac*2;                               //j = Anzahl Aktualisierungen die nötig sind bei 2px/Aktualisierung
    var moveac = disac / j;                        //Abstand der Teilschritte damit bei verschiedenen Distanze gleichmässige Bewegung generiert wird
    if (a > c) {                                   // a grösser als c: nach links gehen
        if (i == j) { 
            dot(a1,a2,10,linecolour); 
            if (p2 < 20) {fetcher(5,("fragen/"+p2),0)} else {fetcher(6,("results/"+p2),0)};
            { onspot = setInterval(function () {vac(b1,b2)}, 100)}}  //onspot interval aktualisiert die spielfigur im stillstand
        else {
            var i = i + 1;
            const myTimeout = setTimeout(function() {
                line(a,b,a-(moveac*i),b);
                vac(a-(moveac*i),b);              // bei jeder wiederholung wird die gleiche linie gezeichnet von a1,a2 aus aber sie wird um (moveac+j) verlängert
                drawside(p1,p2,i,j)                    //nach 10 millisekunden wird drawdown mit aktualisierte i neu gestartet
            }, 10);}
    }
    else if (c > a) {                                 // c grösser als a: nach rechts gehen
        if (i == j) {
            dot(a1,a2,10,linecolour);
            if (p2 < 20) {fetcher(5,("fragen/"+p2),0)} else {fetcher(6,("results/"+p2),0)};
             { onspot = setInterval(function () {vac(b1,b2)}, 100)}}  //onspot interval aktualisiert die spielfigur im stillstand
        else {
            var i = i + 1;
            const myTimeout = setTimeout(function() {
                line(a,b,a+(moveac*i),b),
                vac(a+(moveac*i),b);
                drawside(p1,p2,i,j)
            }, 10);}
    }
}

// ##### TEIL 2: INTERAKTIVITÄT #####

// Ein- und Ausblenden von Schaltflächen, laden der richtigen Ansicht

function gameinfo(i) {
    eleminfo = document.getElementById("infobutton");
    eleminfo.replaceWith(eleminfo.cloneNode(true));
    if (i == "hide") {
        fade("infotext","out")
        document.getElementById("infobutton").innerHTML = "Spielinfo anzeigen";
        document.getElementById("infobutton").addEventListener("click", function() {gameinfo("show")},)}
    else if (i == "show") {
        document.getElementById("infobutton").innerHTML = "Spielinfo ausblenden";
        fade("infotext","in")
        document.getElementById("infobutton").addEventListener("click", function() {gameinfo("hide")},)
    }
}

function fade(stringid, type) {
    var getstr = document.getElementById(stringid);
    if (type == "in") {
        getstr.style.display = "initial";
        getstr.style.opacity = 0; var value1 = 0.1
        const fader1 = setInterval(function() {getstr.style.opacity = value1; value1 = value1 + 0.1}, 100)
        setTimeout(function(){clearInterval(fader1)},1100)
        }
    else if (type == "out") {        
        getstr.style.opacity = 1;
        var value2 = 1
        const fader2 = setInterval(function() {getstr.style.opacity = value2;value2 = value2 - 0.1}, 100)
        setTimeout(function(){clearInterval(fader2)},1100)
        setTimeout(function(){getstr.style.display = "none"},1100)
    }
}

function loadsite(site) {
    var getinfo = document.getElementById("info");
    var getgame = document.getElementById("game");
    var getwelcome = document.getElementById("welcome");
    var getstats = document.getElementById("stats");
    var getresults = document.getElementById("result");
    var getrestart = document.getElementById("restartbutton");
    var getopt = document.getElementById("options");
    if (site == "welcome") {
        getinfo.style.display = "initial";
        getgame.style.display = "none";
        getwelcome.style.display = "initial";
        getstats.style.display = "none";
        getresults.style.display = "none";
        getrestart.style.display = "none";
        getopt.style.display = "none";
        document.getElementById("infotext").style.display = "none";
        fade("welcome","in")
        fade("info","in")
    }
    else if (site == "game") {
        getgame.style.display = "initial";
        getopt.style.display = "none";
        getresults.style.display = "none"
        getwelcome.style.display = "none";
        getstats.style.display = "none";
        getresults.style.display = "none";
        getrestart.style.display = "initial";
        fade("game","in")
    }
    else if (site == "stats") {
        getinfo.style.display = "none";
        getgame.style.display = "none";
        getopt.style.display = "none";
        getwelcome.style.display = "none";
        getstats.style.display = "initial";
        getresults.style.display = "none";
        getrestart.style.display = "initial";
        fade("stats","in")
    }
    else if (site == "result") {
        getgame.style.display = "initial";
        getopt.style.display = "none";
        getwelcome.style.display = "none";
        getstats.style.display = "none";
        getresults.style.display = "initial";
        getrestart.style.display = "initial";
        fade("result","in")
    }
}

// ##### TEIL 3: GAMEPLAY #####
const currentgame =  {"username":"","gamesid":"","trackrecord":""}

//FUNKTION "VALIDATE()": Prüft ob das Namensfeld befüllt wurde.
//FOLGEN: Sofern Name erfasst, mit fetcher() gameid abholen + neues Spiel starten.

function validate() {
    let name = document.getElementById("entername").value;
    if (name == "") {alert("Bitte Namen eingeben!")}
    else {fetcher(4, "statistik/1", 0)}
}

//FUNKTION "CHECKGAME()": Prüft ob im localstorage eine gameid hinterlegt wurde.
//FOLGEN: Falls gameid vorhanden wird das Spiel vom Server geladen, sonst zur Namenserfassung auf Welcomeseite weitergeleitet.

function checkGame() {
    gameinfo("hide");
    var status = localStorage.getItem("gamesid");
    if (status == null) {loadsite("welcome") }
    else {loadsite("game"); fetcher(1, ("games/"+status), 0);}
}

//FUNKTION "CREATEGAME()": Wird durch fetcher4 gestartet, speichert das Spiel in der lokalen Variabel (currentgame) + übermittelt via fetcher Spielstand + Spielstatistik.
//FOLGEN: 2 FETCHES (Games&StatistiK) + Initalise() wird gestartet.

function createGame(count) {
    let currid = parseInt(count)+1;
    let name = document.getElementById("entername").value;
    let data = {"gamesid":currid, "username":name, "trackrecord":[1]};
    currentgame["gamesid"] = currid; currentgame["trackrecord"] = [1]; currentgame["username"] = name;
    //localStorage.setItem("gamesid", currid);   // VOR ABGABE LÖSCHEN: das habe ich inaktiviert weil man sonst immer im selben spiel landet
    loadsite("game");
    fetcher(2,"games",currentgame);fetcher(3, "statistik/1", {"statid":"1","statname":"scount","maincount":currid})
    initialise();
}

//FUNKTION "RELOADGAME()": Von checkGame() aus wird via fetcher1 ein bestehendes Spiel vom Server geladen + reloadGame gestartet.
//FOLGEN: initalise() wird gestartet.

function reloadGame(result) {
    currentgame["gamesid"] = result["gamesid"]; 
    currentgame["trackrecord"] = result["trackrecord"]; 
    currentgame["username"] = result["username"];
    initialise()
}

//FUNKTION "INITIALISE()": Zeichnet die Punkte und den bereits zurückgelegten Weg ein.
//FOLGEN: Startet drawdown() und drawside()

function initialise() {
    dots();
    var path = currentgame["trackrecord"];
    var count = (path.length); 
    if (count == 1) { drawdown(0,1,0,0)}
    else {
        var start = path[count-2]; var end = path[count-1];
        loadlines(path); 
        drawdown(start,end,0,0);
    }
    document.getElementById("userid").innerHTML = currentgame["gamesid"];
    document.getElementById("username").innerHTML = currentgame["username"];
    document.getElementById("trec").innerHTML = currentgame["trackrecord"];
}

//FUNKTION "LOADQUESTION()": Wird durch fetcher5 gestartet, zeigt die Frage + Antwortbuttons an, fügt Eventhandler ein.
//FOLGEN: startet choice() bei klick.

function loadquestion(data) {
    reload(); // nach dem Klick auf eine Antwort, werden diese mit der Funktion reload wieder ausgeblendet, bis die neuen geladen wurden
    document.getElementById("optb").style.display = "initial";
    var i = data["frageid"];
    if (i > 20) {loadresult(i)}
    else {
        let k = data["optnum"] 
        var queststring = data["fragetext"] ;
        document.getElementById("question").innerHTML = queststring;
        var elema = document.getElementById("opta");
        var elemb = document.getElementById("optb");
        var elemc = document.getElementById("optc");
        var elemd = document.getElementById("optd");
        if (k == 2) {
            elema.innerHTML = data["opttexts"][0];
            elema.replaceWith(elema.cloneNode(true));
            document.getElementById("opta").addEventListener("click", function() {choice(data["redirections"][0])},);
            elemb.innerHTML = data["opttexts"][1];
            elemb.replaceWith(elemb.cloneNode(true));
            document.getElementById("optb").addEventListener("click", function() {choice(data["redirections"][1])},);
            document.getElementById("linec").style.display = "none";
            document.getElementById("lined").style.display = "none";
            fade("options","in"); }
        else if (k == 3) {
            elema.innerHTML = data["opttexts"][0];
            elema.replaceWith(elema.cloneNode(true));
            document.getElementById("opta").addEventListener("click", function() {choice(data["redirections"][0])},);
            elemb.innerHTML = data["opttexts"][1];
            elemb.replaceWith(elemb.cloneNode(true));
            document.getElementById("optb").addEventListener("click", function() {choice(data["redirections"][1])},);
            elemc.innerHTML = data["opttexts"][2];
            elemc.replaceWith(elemc.cloneNode(true));
            document.getElementById("optc").addEventListener("click", function() {choice(data["redirections"][2])},);
            document.getElementById("lined").style.display = "none";
            fade("options","in"); }
        else if (k == 4) {
            elema.innerHTML =data["opttexts"][0];
            elema.replaceWith(elema.cloneNode(true));
            document.getElementById("opta").addEventListener("click", function() {choice(data["redirections"][0])},);
            elemb.innerHTML = data["opttexts"][1];
            elemb.replaceWith(elemb.cloneNode(true));
            document.getElementById("optb").addEventListener("click", function() {choice(data["redirections"][1])},);
            elemc.innerHTML = data["opttexts"][2];
            elemc.replaceWith(elemc.cloneNode(true));
            document.getElementById("optc").addEventListener("click", function() {choice(data["redirections"][2])},);
            elemd.innerHTML = data["opttexts"][3];
            elemd.replaceWith(elemd.cloneNode(true));
            document.getElementById("optd").addEventListener("click", function() {choice(data["redirections"][3])},);
            fade("options","in"); }
    }
}

//FUNKTION "CHOICE()": Aktualisiert lokalen Spielverlauf currentgame + sendet ihn an server via fetcher3.
//FOLGEN: startet initialise()

function choice(x) {
    let cg = currentgame;
    clearInterval(onspot);
    fade("options","out");
    cg["trackrecord"].push(x);
    fetcher(3, ("games/"+cg["gamesid"]), cg);
    initialise();
};

//FUNKTION "RELOAD()": Setzt dritten + vierten Button zurück falls diese ausgeblendet wurden.

function reload() {
    document.getElementById("linec").style.display = "initial";
    document.getElementById("lined").style.display = "initial";
}

//FUNKTION "LOADRESULT()": Lädt die Resultatseite, Aktualisiert die Statistiken mittels fetcher8.

function loadresult(result) {
    let i = result["resultid"];
    let type = result["resultname"];
    let text = result["resulttext"];
    fetcher(8, ("statistik/"+i), 0);
    fetcher(8, "statistik/2", 0);
    document.getElementById("options").style.display = "none";
    loadsite("result")
    document.getElementById("resb").innerHTML = type;
    document.getElementById("resc").innerHTML = text;
    document.getElementById("restart").addEventListener("click", function() {
        document.getElementById("options").style.display = "initial";
        restart()
    },); // der Button für den Neustart wird eingeblendet
}

//FUNKTION "RESTART()": löscht localStorage Spielstand, setzt alles zurück, lädt Welcome-Seite neu.

function restart() {
    localStorage.removeItem("gamesid");
    clear("front"), clear("back");
    clearInterval(onspot);
    loadsite("welcome");
    checkGame()
}

// ##### TEIL 4: SERVERKOMMUNIKATION #####

/* FETCHER METHODS INFO:

1: Existierenden Spielstand laden
   Beispiel: fetcher(1, "games/5", 0)
   FOLGEN: startet reloadGame()

2: neues Spiel auf Server laden 
   Beispiel: fetcher(2, "games", {"username":"tester","gamesid":288,"trackrecord":[1,3,4]})
   Beispiel: fetcher(2, "games", data) // Array als Variabel Data

3: Eintrag aktualisieren (Game, Count)
   Beispiel Game Aktualisieren: fetcher(3, "games/5", {"username":"tester","gamesid":288,"trackrecord":[1,3,4]})
   Beispiel Count Aktualisieren: fetcher(3, "stastik/1", {statid: '1', statname: 'scount', maincount: 155})

4: scount abfragen + spiel starten
   Beispiel: fetcher(4, "statistik/1", 0) 
   FOLGEN: startet createGame()

5: Frage laden 
   Beispiel: fetcher(5, "fragen/1", 0)
   FOLGEN: startet loadquestion()

6: Resultat laden  
   Beispiel: fetcher(6, "results/21", 0)
   FOLGEN: loadresult()

7: Statistik starten
   Beispiel: fetcher(7, "statistik", 0)
   FOLGEN: showstatistics()

8: Statistischen Count aktualisieren (Abfrage + überschreiben)
    Beispiel: fetcher(8, "statistik/21", 0)
*/

async function fetcher(method, directory, data) {
    var link = "https://343505-26.web.fhgr.ch/api/covid/";
    var serverlink = link.concat(directory.toString());
    if (method == 1) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher1 successfull/Gamer recognized: ", result);reloadGame(result)})
        .catch (error => {console.log ("error: " + error); /*if (error.code = "blabla"){fetcher(1,serverlink,0} */  })
    }
    else if (method == 2) { 
        let response = await fetch (serverlink, {method:'POST',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        .then(response => response.json())
        .then(data => {console.log("Fetcher2 successfull/Game has been POST: ", data);})
        .catch (error => {console.log ("error: " + error);})
    }
    else if (method == 3) {
        let response = await fetch (serverlink,{method:'PUT',headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        .then(response => response.json())
        .then(data => {console.log ("Fetcher3 successfull/Game or Count has been PUT: ", data);})
        .catch (error => {console.log ("error: " + error);});
    }
    else if (method == 4) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher4 successfull/Gamescount loaded: ", result["maincount"]);createGame(result["maincount"])})
        .catch (error => {console.log ("error: " + error);})
    }
    else if (method == 5) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher5 successfull/Question loaded#" + result["frageid"]);loadquestion(result)})
        .catch (error => {console.log ("error: " + error);})
    }
    else if (method == 6) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher6 successfull/Result loaded#" + result["resultid"]);loadresult(result);})
        .catch (error => {console.log ("error: " + error);})
    }
    else if (method == 7) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher7 successfull/Statistics downloaded: ", result);visualization(result)})
        .catch (error => {console.log ("error: " + error);})
    }
    else if (method == 8) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher8 successfull/TypeCount loaded: ", result);
        fetcher(3, ("statistik/"+result["statid"]), {statid: result["statid"], statname: result["statname"], maincount: (result["maincount"]+1)})})
        .catch (error => {console.log ("error: " + error);})
    }
}

// ##### TEIL 5: DATENVISUALISIERUNG #####

/* Löschen sofern die untenstehende Funktion besser geht
function showstatistics(result) {
    var statdict = {}
    var dictstring = ""; //Löschen vor Abgabe, nur zum TEsten ob statistik richtig eingelesen wird
    for (let i = 0; i < (result.length); i++) {
        console.log(result[i]["statid"])
        var substat = {statname: result[i]["statname"], maincount: result[i]["maincount"]}
        statdict[result[i]["statid"]] = substat;
        let string = ( substat["statname"] + ": "+ substat["maincount"]); var dictstring = dictstring + "</br>"+ string; //Löschen vor Abgabe siehe oben
    }
    loadsite("stats")
    document.getElementById("statdata").innerHTML = dictstring;
}
*/

var statdict = []
function showstatistics(result) {
    //var statdict = []
    var dictstring = ""; //Löschen vor Abgabe, nur zum Testen ob statistik richtig eingelesen wird
    for (let i = 0; i < (result.length); i++) {
        console.log(result[i]["statid"])
        var substat = {statname: result[i]["statname"], maincount: result[i]["maincount"]}
        statdict.push(substat)
        let string = ( substat["statname"] + ": "+ substat["maincount"]); var dictstring = dictstring + "</br>"+ string; //Löschen vor Abgabe siehe oben
    }
    loadsite("stats")
    document.getElementById("statdata").innerHTML = dictstring;
    return statdict
}


function visualization(result) {
    statdict = [];
    for (let i = 0; i < (result.length);i++) {
        if (result[i]["statid"] == "21" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "22" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "23" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "24" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "25" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "26" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "27" ) {statdict.push(result[i])}
        else if (result[i]["statid"] == "28" ) {statdict.push(result[i])}
        console.log(result[i])
    }
    /* etwas schlänkere variante der else/if-geschichte hier obendran
    for (let i = 0; i < (result.length);i++) {
        for (let j = 21; j < 29;j++) {
            if (result[i]["statid"] == j) {statdict.push(result[i])}
            }
    }
    */
    //Die Grösse des Kuchendiagramms + Legende wird festgelegt,sowie die Farbe
    var width = 750, height = 500;
    var color = d3.scaleOrdinal(d3.schemeDark2);
    //Ausklammern des div.
    var svg = d3.select("#my_dataviz").append("svg")
            .attr("width", width).attr("height", height)
            .style("backround", "pink");

    var data = d3.pie().sort(null).value(function(d){return d.maincount})(statdict);
    var data = d3.pie().sort(null).value (function(d){return d.maincount})(statdict);
    console.log(data)

    //Die einzelnen "Scheiben" des Kuchendiagramms werden mit Radius und Winkel defniert
    var segments = d3.arc()
                .innerRadius(0)
                .outerRadius(200)
                .padAngle(.05)
                .padRadius(50);

    var sections = svg.append("g").attr("transform", "translate (250,250)")
        .selectAll("path").data(data);

    sections.enter().append("path").attr("d", segments).attr("fill",  //Die Daten für die grösse der Stücke werden von Maincount geholt
    function(d){return color(d.data.maincount);}); 

    //Die Scheiben werden mit den Bezeichnungen (in diesem Fall zahlen) beschriftet
    var content = d3.select("g").selectAll("text").data(data);
    content.enter().append("text").classed("inside", true).each(function(d){
        var center = segments.centroid(d);
        d3.select(this).attr("x", center[0]).attr("y", center[1])
            .text(d.data.maincount);
        
    })

    //Die Legende enthält nimmt die Pandemietypen und gibt sie in der passenden Farbe wieder aus
    var legends = svg.append("g").attr("transform", "translate(500,100)")
                .selectAll(".legends").data(data);

    var ledgend = legends.enter().append("g").classed("ledgends", true).attr("transform",
    function(_d,i){
        return "translate (0," + ( i + 1) * 30 + ")";
    } );

    ledgend.append("rect").attr("width", 20).attr("height", 20).attr("fill", function(d){
        return color(d.data.maincount);
    } );

    ledgend.append("text").text(function(d){
        return d.data.statname;
    })
        .attr("fill", function(d){
            return color(d.data.maincount);
        })
        .attr("x", 30)
        .attr("y", 20);
}

// ##### SPIELSTART #####

checkGame()
//fetcher(7,"statistik",0) // <- @THERESA: Mit dieser Funktion kommt man direkt auf die Statistik seite, einfach checkGame() deaktivieren.

/*
TO-DO-Liste:
- THERESA: Visualisierung d3.js
    #1 Verteilung der Typen 
    #2 Zustimmungswert
- ANNA: Dokumentation?
- KEINE PRIO:
  #Textcodierung Server (ae,oe,ue)
  #Kosmetik/CSS -> Darstellung
*/
