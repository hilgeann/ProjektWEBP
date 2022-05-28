const size = 50;
const corra = size*0.8; 
const corrb = size*0.2;

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

const coordinates = [ {a:2, b:1},  {a:3, b:1},  {a:6, b:2},  {a:2, b:2},   {a:4, b:2.5}, {a:7, b:3},  {a:1, b:3}, {a:4, b:4.5}, 
     {a:1.5, b:4},  {a:6.5, b:4},  {a:2, b:5},   {a:2.5, b:6},  {a:6, b:5},  {a:5.5, b:6},  {a:0, b:1}, //Nr 14: Startpunkt hinzugefügt
    {a:""},  {a:""},  {a:""},  {a:""}, {a:""}, {a:""}, {a:2, b:7.5}, {a:1, b:7.5},  {a:3, b:7.5},  {a:4, b:7.5}, {a:5, b:7.5},  {a:6, b:7.5},  {a:7, b:7.5}]

const linecolour = "grey";
const linewidth = 7;

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
// Drawdown bewegt die Spielfigur auf die korrekte vertikale höhe und löst drawside aus

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

// Loadlines liest die bisherigen Punkte als Array ein und generiert eine Line die alle passierten Punkte auf einmal einblendet

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

//So habe ich die Funktionen getestet. Komischerweise funktioniert es aktuell nur wenn zuerst drawdown ausgeführt wird, 
//warum weiss ich nicht (Spielt von der funktionalität her aber keine rolle aktuell)

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

function reload() {
    document.getElementById("linec").style.display = "initial";
    document.getElementById("lined").style.display = "initial";
}

function loadresult(result) {
    let i = result["resultid"];
    let type = result["resultname"];
    let text = result["resulttext"];
    document.getElementById("options").style.display = "none";
    loadsite("result")
    document.getElementById("resb").innerHTML = type;
    document.getElementById("resc").innerHTML = text;
    document.getElementById("restart").addEventListener("click", function() {
        document.getElementById("options").style.display = "initial";
        restart()
    },); // der Button für den Neustart wird eingeblendet
}

function restart() {
    localStorage.removeItem("gamesid");
    clear("front"), clear("back");
    clearInterval(onspot);
    loadsite("welcome");
    checkGame()
}

function choice(x) {
    let cg = currentgame;
    clearInterval(onspot);
    fade("options","out");
    cg["trackrecord"].push(x);
    fetcher(3, ("games/"+cg["gamesid"]), cg);
    initialise();
};


function loadquestion(data) {
    reload(); // nach dem Klick auf eine Antwort, werden diese mit der Funktion reload wieder ausgeblendet, bis die neuen geladen wurden
    fade("options","in"); 
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
            document.getElementById("lined").style.display = "none";}
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
            document.getElementById("lined").style.display = "none";}
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
            document.getElementById("optd").addEventListener("click", function() {choice(data["redirections"][3])},);}
    }
}

function initialise() {
    dots();
    var path = currentgame["trackrecord"];
    var count = (path.length); 
    if (count == 1) { drawdown(0,1,0,0); fetcher(5,"fragen/1",0)}
    else {
        var start = path[count-2]; var end = path[count-1];
        loadlines(path); 
        drawdown(start,end,0,0);
    }
    document.getElementById("userid").innerHTML = currentgame["gamesid"];
    document.getElementById("username").innerHTML = currentgame["username"];
    document.getElementById("trec").innerHTML = currentgame["trackrecord"];
}

const currentgame =  {"username":"","gamesid":"","trackrecord":""}

function validate() {
    let name = document.getElementById("entername").value;
    if (name == "") {alert("Bitte Namen eingeben!")}
    else {fetcher(4,0,0)}
}

function checkGame() {
    gameinfo("hide");
    var status = localStorage.getItem("gamesid");
    if (status == null) {loadsite("welcome")}
    else {loadsite("game"); fetcher(1, ("games/"+status), 0);}
}

function loadsite(site) {
    var getgame = document.getElementById("game");
    var getwelcome = document.getElementById("welcome");
    var getstats = document.getElementById("stats");
    var getresults = document.getElementById("result");
    if (site == "welcome") {
        getgame.style.display = "none";
        getwelcome.style.display = "initial";
        getstats.style.display = "none";
        getresults.style.display = "none";
        document.getElementById("infotext").style.display = "none";
        fade("welcome","in")
    }
    else if (site == "game") {
        getgame.style.display = "initial";
        getresults.style.display = "none"
        getwelcome.style.display = "none";
        getstats.style.display = "none";
        getresults.style.display = "none";
        fade("game","in")
    }
    else if (site == "stats") {
        getgame.style.display = "none";
        getwelcome.style.display = "none";
        getstats.style.display = "initial";
        getresults.style.display = "none";
        fade("stats","in")
    }
    else if (site == "result") {
        getgame.style.display = "initial";
        getwelcome.style.display = "none";
        getstats.style.display = "none";
        getresults.style.display = "initial";
        fade("result","in")
    }
}

function createGame(count) {
    let currid = parseInt(count)+1;
    let name = document.getElementById("entername").value;
    let data = {"gamesid":currid, "username":name, "trackrecord":[1]};
    currentgame["gamesid"] = currid; currentgame["trackrecord"] = [1]; currentgame["username"] = name;
    var cdata = {"username":"gcount","gamesid":"scount","trackrecord":currid};
    //localStorage.setItem("gamesid", currid);
    loadsite("game");
    fetcher(2,"games",currentgame);fetcher(3, "games/scount", cdata);
    initialise();
}

function reloadGame(result) {
    currentgame["gamesid"] = result["gamesid"]; 
    currentgame["trackrecord"] = result["trackrecord"]; 
    currentgame["username"] = result["username"];
    initialise()
}

/*
Fetcher methods info:
1: existierenden Spielstand laden
   Beispiel: fetcher(1, "games/5", 0)
2: neues Spiel auf Server laden 
   Beispiel: fetcher(2, "games", {"username":"tester","gamesid":288,"trackrecord":[1,3,4]})
   Beispiel: fetcher(2, "games", data) // Array als Variabel Data
3: neuen Trackrecord an Server
   Beispiel: fetcher(3, "games/5", {"username":"tester","gamesid":288,"trackrecord":[1,3,4]})
4: scount abfragen
   Beispiel: fetcher(4, 0, 0) 
5: Frage laden 
   Beispiel: fetcher(5, "fragen/1", 0)
6: Resultat laden  
   Beispiel: fetcher(6, "results/21", 0)
7: etc... 
*/
async function fetcher(method, directory, data) {
    var link = "https://343505-26.web.fhgr.ch/api/covid/";
    var serverlink = link.concat(directory.toString());
    if (method == 1) {
        let response = await fetch (serverlink, {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher1 successfull/Gamer recognized: ", result);reloadGame(result)})
        .catch (error => {console.log ("error: " + error);})
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
        .then(data => {console.log ("Fetcher3 successfull/Game has been PUT: ", data);})
        .catch (error => {console.log ("error: " + error);});
    }
    else if (method == 4) {
        let response = await fetch ("https://343505-26.web.fhgr.ch/api/covid/games/scount", {method:'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(result => {console.log("Fetcher4 successfull/Gamescount loaded: ", result["trackrecord"]);createGame(result["trackrecord"])})
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
}

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

checkGame()

/*
TO-DO-Liste:
- Statistik Fetch Befehle
- Statistiken: 
    #statid: 1 gestartete Spiele
    #statid: 2 beendete Spiele
    #statid: 3 laufende Spiele
    #statid: 21-28 Pandemietypen
- Visualisierung d3.js
    #1 Verteilung der Typen 
    #2 Zustimmungswert
- Textcodierung Server (ae,oe,ue)
- Abbruch-Button (-> localstorage entleeren + neues Spiel starten)
- Online-User Anzeigen
*/