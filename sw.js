/**
 * Service worker
 * @author Erica Viana
 */

// Instalação (cache "armazenamento local / local storage")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('./flex/')
                cache.add('./flex/index.html')
                cache.add('./flex/style.css')
                cache.add('./flex/app.js')
                cache.add('./flex/img/flex.png')
                cache.add('./flex/img/calcflex.png')
                cache.add('./flex/img/etanol.png')
                cache.add('./flex/img/gasolina.png')
            })
    )
})

// Ativação
self.addEventListener('activate', (event) => {
    console.log("Ativando o service worker...", event)
    return self.clients.claim()
})

// Interceptação (solicitações https servindo em cache quando off-line)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                }
            })
    )
})