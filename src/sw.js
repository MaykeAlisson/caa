const versao = 1;
const cacheName = 'caa_cache_v';
const cacheAtual = cacheName + versao;
const swScriptUrl = new URL(self.location);

// arquivos a ser salvo no cache
const resourceToPrecache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/main.js',
    '/main.bundle.js',
    '/vendors.bundle.js'
];

// escuta instalação sw apos instalado salva cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName + versao)
            .then(cache => (
                cache.addAll(resourceToPrecache)
                    .then(() => console.log(`CRIADO CACHE: ${cacheAtual}`))
            )),
    );
});

// Clear cache on activate
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith('caa_cache_v')))
                    .filter(cacheName => (cacheName !== cacheAtual))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});

// escuta refrech pagina e retorna dados do cache
    self.addEventListener('fetch', (event) => {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    return response || fetch(event.request);
                })
                .catch(() => {
//                 return caches.match('/offline/index.html');
                    console.log("Sw Pagina solicitada nao encontrada")
                })
        )
    });
// escuta messages
self.addEventListener('message', function(e) {
    if (e.data.updateSw){ //nova version sistema faz refrech da aplicação
        self.skipWaiting();
    }
});