let versao = 1

let arquivos = [
"/",
"css/theme.min.css",
"js/theme.min.js",
"img/logo-tray-commerce.svg"
]

self.addEventListener("install", function(){
    console.log("Instalou")
})

self.addEventListener("activate", function(){
    caches.open("tray-" + versao).then(cache => {
        cache.addAll(arquivos)
            .then(function(){
                caches.delete("tray-" + (versao - 1 ))   
                caches.delete("tray")   
            })
        
    })
})


self.addEventListener("fetch", function(event){

    let pedido = event.request
    let promiseResposta = caches.match(pedido).then(respostaCache => {
        let resposta = respostaCache ? respostaCache : fetch(pedido)
        return resposta
    })

    event.respondWith(promiseResposta)

})

