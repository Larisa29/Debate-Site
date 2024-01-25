function dataCurenta(){  
    var curDate=new Date();
   	document.getElementById("showDate").innerHTML = "Data de azi: " + curDate.toString() + "\n";
}

function URL(){  
    let loc = window.location.href;
    document.getElementById("locationURL").innerHTML = "Locatie:" + loc;
}

function locatie()
{  
    if (navigator.geolocation) 
    {
      var x = document.getElementById("loca");
      navigator.geolocation.getCurrentPosition(showPosition);
    }
    else 
    { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) 
{
  document.getElementById("loca").innerHTML = "Latitude: " + position.coords.latitude + "<br>" + "Longitude: " + position.coords.longitude;
}


function numeBrowser()
{
    document.getElementById("nume_browser").innerHTML = "Browser:" + navigator.appName ;   
}

function showVersion()
{
    document.getElementById("versiune").innerHTML = "Version:" + navigator.appVersion;
}

function getInfo()
{
  dataCurenta();
  URL();
  numeBrowser();
  showVersion();  
  showPosition();

}

var x,y; 
var ok = 0; 

function display(event){ 
    if(ok == 0)
    { 
        x = event.offsetX; 
        y = event.offsetY;
        ok = 1; 
    }
    else 
    { 
        ok = 0; 
        x1 = event.offsetX; 
        y1 = event.offsetY;

        var canv = document.getElementById("primul_canvas"); 
        var cont = canv.getContext("2d");

        cont.lineWidth = "2";
        cont.moveTo(x,y); 
        cont.lineTo(x,y1); 
        cont.lineTo(x1,y1);
        cont.lineTo(x1,y);
        cont.lineTo(x,y);
        cont.strokeStyle =  document.getElementById("colorpicker_border").value;
        cont.stroke();
        cont.beginPath(); 

        cont.rect(x,y,x1-x,y1-y); 
        cont.fillStyle = document.getElementById("colorpicker_interior").value; 
        cont.fill(); 
        cont.stroke();

    }
  }

function addRow() {
  let table = document.getElementById("tabelL5");
  try 
  {
    var ncols = table.rows[0].cells.length;
  } 
  catch (e) 
  {
    ncols = 0;
  }
  let nrows = table.rows.length;

  let pos = document.getElementById("pozitie").value;
  if (pos == null) 
  {
    pos = 0;
  } 
  else if (pos > nrows) 
  {
    pos = nrows;
  }

  let color = document.getElementById("colorpicker_celula").value;

  let newRow = table.insertRow(pos);
  newRow.style.background = color;
  let i=0;
  for (i = 0; i < ncols; i++) {
      newRow.insertCell(i);
  }

}

function addColumn() 
{
  let table = document.getElementById("tabelL5");
  try 
  {
    var ncols = table.rows[0].cells.length;
  }
  catch (e) 
  {
    insertLine();
    ncols = table.rows[0].cells.length
  }
  let nrows = table.rows.length;

  let pos = document.getElementById("pozitie").value;
  if (pos == null) 
  {
    pos = 0;
  }
  else if (pos > ncols) 
  {
    pos = ncols;
  }

  let color = document.getElementById("colorpicker_celula").value;

  let rows = table.rows;
  let i = 0;
  for (i = 0; i < nrows; i++) 
  {
    let newCell = rows[i].insertCell(pos);
    newCell.style.background = color
  }
}

function deleteRow() 
{
  let table = document.getElementById("tabelL5");
  let nrows = table.rows.length;
  if (nrows == 0) {
    alert("Tabel gol! Nu am ce sa șterg!");
    return;
  }
  let pos = document.getElementById("pozitie").value;
  if (pos == null) 
  {
    pos = 0;
  } 
  else if (pos >= nrows) 
  {
    pos = nrows - 1;
  }
  table.deleteRow(pos);
}

function deleteColumn() 
{
  let table = document.getElementById("tabelL5");
  let nrows = table.rows.length;
  if (nrows == 0)
  {
    alert("Tabel fără coloane! Nu am ce sa șterg!");
    return;
  }
  let ncols = table.rows[0].cells.length;
  if (ncols == 0) {
      alert("Nu exista coloane");
      return;
  }
  let pos = document.getElementById("pozitie").value;
  if (pos == null) {
      pos = 0;
  } else if (pos >= ncols) {
      pos = ncols - 1;
  }
  let rows = table.rows;
  let i = 0;
  for (i = 0; i < nrows; i++) {
      rows[i].deleteCell(pos);
  }
}

function schimbaContinut(resursa, jsFisier, jsFunctie) {
    var xhttp;
    if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
      /* onreadystatechange, onload, onerror */
      xhttp.onreadystatechange =
        function () {
          if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("continut").innerHTML = xhttp.responseText;
            if (jsFisier) {
              var elementScript = document.createElement('script');
              elementScript.onload = function () {
                console.log("hello");
                if (jsFunctie) {
                  window[jsFunctie]();
                }
              };
              elementScript.src = jsFisier;
              document.head.appendChild(elementScript);
            } else {
              if (jsFunctie) {
                window[jsFunctie]();
              }
            }
          }
        }
      xhttp.open("GET", resursa + '.html', true);
      xhttp.send();
    }
}

function autentificare() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) 
    {
      user = document.getElementById("utilizator_input").value;
      pw = document.getElementById("parola_input").value;
      users = JSON.parse(xmlhttp.responseText);
      validUserAndPw = false;
      for (let i  = 0; i < users.length; i++) 
      {
        if((user == users[i].utilizator && pw == users[i].parola) == true)
        {
          validUserAndPw = true;
          break;
        }
      }
      if(validUserAndPw)
      {
        alert("Cont identificat corect!!!");
      }
      else
      {
        alert("Nume sau parola greșite");
        return;
      }
    }
  };
  xmlhttp.open("GET", "resurse/utilizatori.json", true);
  xmlhttp.send();
}
      
      
