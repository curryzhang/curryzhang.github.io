/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "88add210dc77fb18777f27c5699e72b6"
  },
  {
    "url": "assets/css/0.styles.cc2a2ebf.css",
    "revision": "6d079eb24adec22d599ddb69f525f6dd"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f51eadc5.js",
    "revision": "efa21523201e17d4bdcdbd4d63e1b2b8"
  },
  {
    "url": "assets/js/11.20250c41.js",
    "revision": "fa40e842d7bccb2bfdcd5911d6dd194a"
  },
  {
    "url": "assets/js/2.285762ea.js",
    "revision": "93afbd4e91ed17280e84a6930dc81b17"
  },
  {
    "url": "assets/js/3.6dda9b1b.js",
    "revision": "62743958309dab2c52ea9a790514ef3b"
  },
  {
    "url": "assets/js/4.50820c23.js",
    "revision": "1489cc62ab2da6e2f6df77feb85d2fc9"
  },
  {
    "url": "assets/js/5.d2129314.js",
    "revision": "e9d618238995c52f2ddcdd31b5a5dbc8"
  },
  {
    "url": "assets/js/6.bd736cf1.js",
    "revision": "5c4aec3ebd277a393f0e2a3251912ddd"
  },
  {
    "url": "assets/js/7.1609c5c7.js",
    "revision": "cdb7df85c36e93b4a51f355d0f9851ab"
  },
  {
    "url": "assets/js/8.308c8ee5.js",
    "revision": "856be82f82972d00772b91a70a8cdd47"
  },
  {
    "url": "assets/js/9.671f2a11.js",
    "revision": "3105ca35f6859957ed17a0b1708cb120"
  },
  {
    "url": "assets/js/app.86ff25f0.js",
    "revision": "02db3ac2035743555a281c05ceed3944"
  },
  {
    "url": "background.png",
    "revision": "ade62c3a43fa788eb65c532fb359653a"
  },
  {
    "url": "blog/DDD/index.html",
    "revision": "c0382ce51beb841b21625d043a17acf4"
  },
  {
    "url": "blog/DDD/写在开始之前.html",
    "revision": "bcf9417b1b9b07eb57e17c2365399dc9"
  },
  {
    "url": "blog/JavaScript/index.html",
    "revision": "0ceefef52e2cf6ae10df8c0cc2adf149"
  },
  {
    "url": "blog/JavaScript/Map和Set.html",
    "revision": "1b7aac93787db600735ea221339ad79a"
  },
  {
    "url": "blog/JavaScript/数据类型和变量.html",
    "revision": "8cb53b9cd3e735506b37d949b1553fa5"
  },
  {
    "url": "blog/Net/index.html",
    "revision": "1b3e2a297627793387109d530cd034d2"
  },
  {
    "url": "blog/Net/Lambda表达式.html",
    "revision": "d61c0935c9f3cc1cadf865049678d3af"
  },
  {
    "url": "hero.png",
    "revision": "d1fed5cb9d0a4c4269c3bcc4d74d9e64"
  },
  {
    "url": "index.html",
    "revision": "6fe2ce869ba35a3f8f8e455ae14c592e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
