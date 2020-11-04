var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BICkhYIdR2ohz6e3F1w0yvL7vacXAkj6s8-dsNf8Ur9aA3AlhyOtPB3zbfyPlPAw2OCiapI0_ebMNrmvfbHc3zA",
   "privateKey": "LANtUaxfKHscLPkJQZ6z3C0eG-Fg8dTEHzS6P41X5_E"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dia4Qp4AgcE:APA91bFyrcDUeZCeyWW-2VAHWjCz_OHc4B6Cl7CQWg_I0G4ur6ehhjCkOxY-o0kXhrLn8PRwDim_w3aBYgQjO1JfVsxQB0lSnc5Y5fEqq60zX85xx-U7nqyo21JhbuAf4UfEF7naypLC",
   "keys": {
       "p256dh": "BNU6ZKQHbuKTrUVfR0Os+Y0HGCYlcp1GEys1Ta8WjGJtaCcy45IGNj3JEfmZxz4DM7+QD4iH9nPDIZtHT8EnFcI=",
       "auth": "5rKuI9PZY8IZim+E91JVYg=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '992735611060',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);