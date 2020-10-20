import runtime from 'serviceworker-webpack-plugin/lib/runtime';

export default () => {

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.0/8 are considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    if (isLocalhost) {
        console.log('Localhost - Não registra ServiceWorker');
        return;
    }

    if ('serviceWorker' in navigator) {

        window.addEventListener('load', function() {
            const registration = runtime.register();
            registration.then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registro com sucesso: ', registration.scope);
                console.log(registration);

                // if existe um sw antigo atualize
                if (registration.waiting) {
                    console.info('existe uma atualização para sw ...');
                    registration.waiting.postMessage({ updateSw: true });
                }

                // if sw instalando
                // rastrei if instalado atualize
                if (registration.installing) {
                    registration.addEventListener('statechange', function(){
                        if (registration.installing.state === 'installed'){
                            console.info('atualiza sw...');
                            registration.installing.postMessage({ updateSw: true });
                        }
                    });
                }

                // caso contrário, ouça novos sw que estão chegando.
                // Se alguém chegar, acompanhe seu progresso.
                // Se ficar "installed", atualize
                registration.addEventListener('updatefound', function(){
                    let newServiceWorker = registration.installing;
                    newServiceWorker.addEventListener('statechange', function() {
                        if (newServiceWorker.state === 'installed') {
                            console.info('atualiza sw ...');
                            newServiceWorker.postMessage({ updateSw: true });
                        }
                    });
                });

            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registro failed: ', err);
            });

            navigator.serviceWorker.addEventListener('controllerchange', function() {
                window.location.reload();
            });
        });
    }
};

