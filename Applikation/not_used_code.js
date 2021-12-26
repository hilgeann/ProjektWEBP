var size = 50
var a = (coordinates[1].a)*size;
var b = (coordinates[1].b)*size;
var c = (coordinates[3].a)*size; 
var d = (coordinates[3].b)*size;

function calcway(a,b,c,d) {
    var distance = Math.sqrt((a-c)**2+(b-d)**2);
    var jumpamount = Math.floor(distance / 10);
    var lastjump = (distance/10) - jumpamount;
    if (a - c < 0) {jump1 = 10} else {jump1 = -10};
    if (b - d < 0) {jump2 = 10} else {jump2 = -10};
    for (let i = 0; i < jumpamount; i++) {
        line(a,b,c,d)
        var a = a + jump1;
        var b = b + jump2;
        var c = c + jump1;
        var d = d + jump2;
    }
    document.getElementById("test").innerHTML = document.write("// Output: " + lastjump);
}



function line(a,b,c,d) {  
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

var x = 10;
var y = 10;

function ball() {  
    var canvas = document.querySelector('#canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI*2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
} 

function draw() {
    ball()
    x += 1;
    y += 1;
}

function mover() {
    const repeater = setInterval(draw, 10);
    setTimeout(function(){clearInterval(repeater)},1000);
}
