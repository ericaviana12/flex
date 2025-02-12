/**
 * Service worker
 * @author Erica Viana
 */

// Instalação (cache "armazenamento local / local storage")
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                cache.add('https://github.com/ericaviana12/flex/')
                cache.add('https://github.com/ericaviana12/flex/index.html')
                cache.add('https://github.com/ericaviana12/flex/style.css')
                cache.add('https://github.com/ericaviana12/flex/app.js')
                cache.add('https://github.com/ericaviana12/flex/img/flex.png')
                cache.add('https://github.com/ericaviana12/flex/img/calcflex.png')
                cache.add('https://github.com/ericaviana12/flex/img/etanol.png')
                cache.add('https://github.com/ericaviana12/flex/img/gasolina.png')
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