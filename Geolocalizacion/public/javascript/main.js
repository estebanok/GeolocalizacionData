function onDocumentReady(){
    //Conectamos socket con el servidor
    var socket = io.connect(window.location.href);
    //Seguimos los pasos de creacion de mapas
    var map = L.map('mimapa').setView([51.505, -0.09], 13);
    //Segun la pagina http://leafletjs.com/examples/quick-start.html
    var layer =L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    //Agregamos el layer al mapa
    layer.addTo(map);
    //Localizamos en el mapa la posicion
    map.locate({enableHighAccuracy:true,//Maxima precision, consume mas recursos y mas internet
                zoom:18,//El maximo zoom
                watch:true,//Mantenemos en constante envio de datos de coordenadas (latitud y longitud)
                setView:true//Lo vemos en el mapa
               });
    //Creamos el array donde almacenaremos la data de latitude y longitude
    var arraydata=[""];
    //Cuando nos localize nos enviara el evento locationfound y inicializara el metodo onLocationFound
    map.on('locationfound', onLocationFound);
    //Metodo onLocationFound
    function onLocationFound (position){
        //El objeto que nos envia es latlong(latitudlongitud) de nuestra position
        var mypos=position.latlng;
        //Creamos un string para enviarlo al array
        var string=String("latitude: "+mypos.lat+" longitude: "+mypos.lng);
        //Ingresamos la data (string) en el array
        arraydata.push(string);
        //Agregamos un marcador en la posicion
        var marker = L.marker([mypos.lat,mypos.lng]);
        marker.addTo(map);
        //Agregamos un circulo en la posicion donde estamos
        var circle = L.circle([mypos.lat,mypos.lng], 80, {
    color: 'blue',
    fillColor: '#f03',
    fillOpacity: 0.5
    });
        circle.addTo(map);
        //Imprimimos el array de las coordenadas para observar si se almacena
        //Tambien podemos enviar la data a una base de datos :D
        console.log(arraydata);
    }    
}
$(document).on('ready',onDocumentReady);