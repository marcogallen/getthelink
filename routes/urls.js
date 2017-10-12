var express = require('express');

var admin = require("firebase-admin");

//var serviceAccount = require("./routes/get-the-url-firebase-adminsdk-jyrly-8094cbbfb3.json");

admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.cert({
    projectId: "get-the-url",
    "private_key_id": "8094cbbfb3ad2081a8746cd11bd1367a01df85b6",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnAoEULZbOu6vp\n1ZUYcQ3uPbKfRoU+nLz2sbjeMsPytUMCkWvliv9uVxLJ2pWu+RbK5m9fr0JTUL9a\nQ2mgSYBj9Bl65D8DF4FghxUR3eSwpLoRfaLRA3nM9EuxCzRgtydr4vrrgmeCIDBq\ntdW9ih+f6rizeIo2wMp9EuXku+cr78qc9RopzfWMDWlQJYfQTLX7S9704j4NJg04\nmll4gZmpv5KuC3Sd7UIHON3IF0f4n85qo9CdYuDE6ispQlj3/gBKLkxhx2NkbT0Z\nDBsU2TMH9xyXHYlHGv7HkcSIrVm06xtKAa4KPQhN9epv9zF7hzdAG+fPKI8dhQ27\neWbvMLr5AgMBAAECggEAM5x9gVvZWAf9R6Uej1AYywA8HCax9LiBWQdxJxGvJmlH\nzRpdqrE64MF95+1qBomptohh8ML7jz3L9LwSf1tXlwwPd7/jjTQNYmQ8aaoWC1TM\nv60AzPDzChiQ76STyjOvthKOEovZKwiBjeilpg5yWXwzGhttMyB/MwnNC9PZy+St\ns4dlABkg8w2t3wi0oeq54tIYHb/yzZyif+xAOOt4cabSdJuv9iRiZ+b3DD8PEH/7\n2Au+yS2YBHWM2HLUREm9FlvzCHBynGOxVi+VlVcABVjOSCenkEenKpjNQffuWfWW\nOEHKOlSghvEk7121n81PFPh5hFBolvTRkYLWCTWKVQKBgQDdS8nTlcGrWJH4ijxi\nqP/qg45gKwXmRJVmpBdqjFQLwzmupeOjGu75AQOIk+WemT37M/dhWOvyUN7+3Iay\nn2213sxAmWq5N/Q2KS1kWKW187rVz+tRSy9dCRVkmWDyVi/VvzTE+fQC8QWv/dlN\nE+Lb/N66iQeeyJQe+40HggQRawKBgQDBM1MV2DBtY4tn6n8cjOWHE+8oth215QMr\nKvHJAAbbvJepUCoWH9PLgSDurWYJy/9300Os87119FvZ2S5psn92RElkkxCydH4C\nwTDqUgRS5Qbgcb/35kpdHii/6fl+SbY52iEtA+mTzBMHLwcQdjeG1F2XsZILLL2O\nfbwRaULqKwKBgC/jRKuazqwroHruPx8Cf07aZSb+aGpqEQKDI+YUs+NPvd3DXD1h\niLEtvPwDNT9a3gTMPA4+1eA8C+WPBz8ELROcQQsBqAyoxRorUv1SCZoUQiwesEeJ\nQ5iYbJ62ajpG2Fci52JwzJMOYTKydiGt2fvM/s3S9Wkw8oy51sz3H7Y9AoGAbhUu\nfD3oqguUPSuyLbRifCrxlILgPuo0ef5IMj0fq0i0KbcRo/WSmlwDRbvrbh2cfMwV\nvZBMHc+UHnbPKU6ZreuO3g2l7+jMfAlUM89zwz/YQT7PIRNIv/IVSfSpQjoB6MjP\nKnUWPC6FkQxMvCZ/0QVkJrD5BAEEKRKffFQ72m0CgYEAp1HhcxllmRAjUMzXalkb\nFmKtidlYq7LVS4EZcRy0JugUL2WcQ0SVj2LC1SiaddKGZoVDd9f71DJTX/awzfPW\n9PO8SnC3tevsApo0cW6uqAd3K0ULnMenB3lW+3XdChV4hzXOqYMAFpRlcZxf6iV0\n7D69qN/gpu+E2X50J/zTrMQ=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-jyrly@get-the-url.iam.gserviceaccount.com"
  }),
  databaseURL: "https://get-the-url.firebaseio.com"
});
var router = express.Router();

/* GET urls. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.send("URL END POINT YEAH");

  var db = admin.database();
  var ref = db.ref("/links");

  // Attach an asynchronous callback to read the data at our posts reference
  ref.on("value", function(snapshot) {
    //console.log(snapshot.val());
    res.send(snapshot.val());
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });


});
router.post('/', function(req, res, next) {
  //res.render('urls', { title: 'Express' });
  /***
  10 Obtenemos el cuerpo del request
  20 Instanciamos la base datos
  30 Ponemos la referencia a la raiz de la db
  40 Creamos una instancia de la rama links
  50 Mandamos la nueva liga a la base de datos y validamos si hay o no errores
  55 TODO: Con la liga guardada mandamos los tags al listado de tags y su respectiva llave
  60 Respondemos con el mensaje y la llave del nuevo objeto para saber que si jalo
  ***/
  var link  = req.body;
  //console.log(req.body);
  var msg = "";
  var db = admin.database();
  var ref = db.ref("/");

  var linksRef = ref.child("links");
  var newLink = linksRef.push(link,function(error){
    if(error){
      msg = error;
    }
  }
);



  res.send(msg + " " + newLink.key);
  //res.send(link);
});

module.exports = router;
