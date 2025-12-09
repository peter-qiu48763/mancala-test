const CACHE_NAME = "cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./icon-192.png",
  "./icon-512.png"
];

// 安裝（快取必需的文件）
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 請求攔截（離線時回傳快取）
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
