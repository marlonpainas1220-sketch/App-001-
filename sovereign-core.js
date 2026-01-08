/* 🛡️ VITRIN III - SINAL DESTRAVADO V.999 */
(function() {
    window.Soberano = {
        async obterSinal(tipo) {
            // Túnel que o iPhone não bloqueia
            const proxy = "https://api.allorigins.win/get?url=";
            const alvos = {
                'TRENDS': "https://nitter.net/search/rss?q=trending+brazil",
                'CHARTS': "https://www.billboard.com/charts/hot-100/feed/",
                'GOSSIP': "https://api.rss2json.com/v1/api.json?rss_url=https://g1.globo.com/dynamo/pop-arte/rss2.xml"
            };

            try {
                const res = await fetch(proxy + encodeURIComponent(alvos[tipo]) + "&t=" + Date.now());
                const json = await res.json();
                const data = json.contents || json.items;
                
                // Salva no cache do iPhone para economia de cota
                localStorage.setItem(`v3_${tipo}`, JSON.stringify({t: Date.now(), d: data}));
                return data;
            } catch (e) {
                const cache = JSON.parse(localStorage.getItem(`v3_${tipo}`));
                return cache ? cache.d : null;
            }
        },
        async cura() {
            const st = document.getElementById('shield-status');
            if(st) { st.style.background = "#00ff00"; st.innerText = "SINC"; }
        }
    };
})();
