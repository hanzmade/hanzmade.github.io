var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BPQsKVarex_-F6gZVcySD1Z9hjeA0gg2EuFN_87G1F3-74jKH6tG95rHnQRm4LRuU6wRzdcUrpwhWk1rAGwp2H8",
   "privateKey": "vE_7mhcvQtqrwPFXLJLTOEpAXJ5IC8X422IZtlSXois"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dRxpsy-X9as:APA91bERPDrjIXduMx3p8VdmV2DePV5FGaZlKM6RCRNWs4pkdOSU4nlUBVJA6T1rwB6BzDa5m-5NmIuJ2j_R7iM1uXn-_l03Y-BBFZp8bYx9UrUOOy7lLosvi4e0eIGN31M0qjFZOA4J",
   "keys": {
       "p256dh": "BDj9IkXi52aobKelmXLr7Jej3/H+aOEo0x78tq0sn/t8qMKhLQgC34WWDyR+2n0F9TGgxUh5ajbj3Dvj5s+p8PA=",
       "auth": "7pOLFyBdNeHsJUOSODCdCA=="
   }
};
var payload = 'PLC 1 Shutdown !!!';
 
var options = {
   gcmAPIKey: '819670997792',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);