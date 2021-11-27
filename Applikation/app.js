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

const redirections = [{a:"Platzhalter"},
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

const results = {
    21: "Vorsichtige",
    22: "Wellensurfer",
    23: "Wiederwillige",
    24: "Superspreader",
    25: "Uninformierte",
    26: "Kritikerin",
    27: "Naturheilpraktikerin"
}

function check(i) {
    if (i < 20) {loadquestion(i)}
    else {loadresult(i)}   
}  

function loadquestion(i) {
    let j = optnum[i]
    document.getElementById("question").innerHTML = knots[i]
    if (j == 2) {
        document.getElementById("opta").innerHTML = options[i].a;
        document.getElementById("optb").innerHTML = options[i].b
        document.getElementById("linec").innerHTML = "";
        document.getElementById("lined").innerHTML = ""}
    else if (j == 3) {
        document.getElementById("opta").innerHTML = options[i].a;
        document.getElementById("optb").innerHTML = options[i].b;
        document.getElementById("optc").innerHTML = options[i].c;
        document.getElementById("lined").innerHTML = ""}
    else if (j == 4) {
        document.getElementById("opta").innerHTML = options[i].a;
        document.getElementById("optb").innerHTML = options[i].b;
        document.getElementById("optc").innerHTML = options[i].c;
        document.getElementById("optd").innerHTML = options[i].d}
}

function loadresult(i) {
    document.write(results.i)
}