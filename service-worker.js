importScripts('/workbox-sw.js');

const state = '1';

workbox.precaching.precacheAndRoute([
  { url: '/', revision: state },
  { url: '/nav.html', revision: state },
  { url: '/back-detail.html', revision: state },
  { url: '/index.html', revision: state },
  { url: '/klasemen.html', revision: state },
  { url: '/pages/saved.html', revision: state },
  { url: '/pages/klasemen-liga.html', revision: state },
  { url: '/css/materialize.min.css', revision: state },
  { url: '/css/loading.css', revision: state },
  { url: '/js/materialize.min.js', revision: state },
  { url: '/manifest.json', revision: state },
  { url: '/js/nav.js', revision: state },
  { url: '/js/back-detail.js', revision: state },
  { url: '/js/api.js', revision: state },
  { url: '/js/db.js', revision: state },
  { url: '/js/idb.js', revision: state },
  { url: '/assets/icons/icon-72x72.png', revision: state },
  { url: '/assets/icons/icon-96x96.png', revision: state },
  { url: '/assets/icons/icon-128x128.png', revision: state },
  { url: '/assets/icons/icon-144x144.png', revision: state },
  { url: '/assets/icons/icon-192x192.png', revision: state },
  { url: '/assets/icons/icon-256x256.png', revision: state },
  { url: '/assets/icons/icon-384x384.png', revision: state },
  { url: '/assets/icons/icon-512x512.png', revision: state },
  { url: '/assets/icons/maskable_icon-192x192.png', revision: state }
],
{
  ignoreURLParametersMatching: [/.*/]
});

// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'dynamic-football',
  })
);

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (!event.action) {
    // Penguna menyentuh area notifikasi diluar action
    console.log('Notification Click.');
    return;
  }
  switch (event.action) {
    case 'yes-action':
      console.log('Pengguna memilih action yes.');
      // buka tab baru
      clients.openWindow('https://google.com');
      break;
    case 'no-action':
      console.log('Pengguna memilih action no');
      break;
    default:
      console.log(`Action yang dipilih tidak dikenal: '${event.action}'`);
      break;
  }
});

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: '/assets/icons/icon-256x256.png',
    badge: '/assets/icons/icon-256x256.png',
    actions: [
        {
            'action': 'ack-action',
            'title': 'Acknowledge',
        },
        {
            'action': 'ack-all-action',
            'title': 'Acknowledge All',
        }
    ],
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('ALARM ACTIVE !', options)
  );
});