//Quelle: https://www.youtube.com/watch?v=L5GXOdt2uOc (Part I und II)

function visualization(statdict) {
    //Die Grösse des Kuchendiagramms + Legende wird festgelegt,sowie die Farbe
    var width = 750, height = 500;
    var color = d3.scaleOrdinal(d3.schemeDark2);
    //Ausklammern des div.
    var svg = d3.select("#my_dataviz").append("svg")
            .attr("width", width).attr("height", height)
            .style("backround", "pink");

    //Die Daten aus der Funktion showstatistics werden geholt und weiterverwendet        
    /*  var statisitk_test = function showstatistics(result) {
        var statdict = []
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
    }*/

    

    //Substat als Dictionary als Versuch
    //var substat = [{statname: result[i]["statname"], maincount: result[i]["maincount"]}, {statname: result[i]["statname"], maincount: result[i]["maincount"]}]


    //Wie es eigentlich aussehen soll, wenn es richtig wäre
    /* var statdict = [
        {statname: "Superspreader", maincount: 10}, 
        {statname: "Vorsichtige", maincount: 15} , 
        {statname: "Wellensurfer", maincount: 5} , 
        {statname: "Wiederwillige", maincount: 8} , 
        {statname: "Uninformierte", maincount: 7}, 
        {statname: "Kritiker_in", maincount: 4}, 
        {statname: "Naturheilpraktiker_in", maincount: 9}];*/

    //Die Daten für das Kuchendiagramm werden als data deklatiert. Mit dieser Funktion kann man auf die einzelnen Arrays aus dem dic zugreifen
    //var data = d3.pie().sort(null).value(function(d){return d.maincount})(statdict);

    var data = d3.pie().sort(null).value(function(d){return d.maincount})(statdict);
    var data = d3.pie().sort(null).value (function(d){return d.maincount})(statdict);
    console.log(data)

    /* //Versuch in Array
    var data = d3.pie().sort(null).value (function(d){
        return d.value
    })(statisitk_test);
    //})(substat);
    console.log(data) */

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