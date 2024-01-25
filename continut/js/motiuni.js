//În fișierul persoane.js va exista funcția incarcaPersoane care conține logica prin care se face o cerere la server folosind AJAX pentru fișierul persoane.xml.
function incarcaMotiuni(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myFunction(this);
        }
        };
    xhttp.open("GET", "/resurse/motiuni.xml", true);
    xhttp.send();

}

function myFunction(xml) {
    
    var xmlDoc = xml.responseXML;
    var table="<table><tr><th>Titlu</th><th>Topic</th><th>Turneu</th><th>Localitate</th><th>Telefon</th><th>Județ</th><th>Țara</th></tr>";
    var x = xmlDoc.getElementsByTagName("motiune");
    for (var i = 0; i < x.length; i++) { 
        table +=  "<tr><td>"  + x[i].getElementsByTagName("titlu")[0].childNodes[0].nodeValue +
                  "</td><td>" + x[i].getElementsByTagName("topic")[0].childNodes[0].nodeValue +
                  "</td><td>" + x[i].getElementsByTagName("turneu")[0].childNodes[0].nodeValue +
                  "</td><td>" + x[i].getElementsByTagName("localitate")[0].childNodes[0].nodeValue +
                  "</td><td>" + x[i].getElementsByTagName("telefon")[0].childNodes[0].nodeValue +
                  "</td><td>" + x[i].getElementsByTagName("judet")[0].childNodes[0].nodeValue +
                  "</td><td>" + x[i].getElementsByTagName("tara")[0].childNodes[0].nodeValue +
                  "</td></tr>";
    }
    document.getElementById("continut").innerHTML = table + "</table>";
  }