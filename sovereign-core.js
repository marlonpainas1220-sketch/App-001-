/* 🛡️ VITRIN III - SINAL REVERSO V.1000 */
(function() {
    console.log("%c 🛡️ NÚCLEO SOBERANO ATIVADO ", "background: #000; color: #00ff00; font-size: 20px;");

    window.Soberano = {
        async obterSinal(tipo) {
            try {
                // Túnel de Blindagem (Proxy) para ignorar bloqueios do Safari
                const proxy = "https://api.allorigins.win/get?url=";
                const alvos = {
                    'TRENDS': "https://nitter.net/search/rss?q=trending+brazil",
                    'CHARTS': "https://www.billboard.com/charts/hot-100/feed/"
                };

                const res = await fetch(proxy + encodeURIComponent(alvos[tipo]) + "&t=" + Date.now());
                const json = await res.json();
                
                // Salva localmente para o app nunca ficar vazio
                localStorage.setItem(`v3_${tipo}`, JSON.stringify({t: Date.now(), d: json.contents}));
                return json.contents;
            } catch (e) {
                console.warn("⚠️ Usando cache de emergência.");
                const cache = localStorage.getItem(`v3_${tipo}`);
                return cache ? JSON.parse(cache).d : null;
            }
        },

        async cura() {
            const st = document.getElementById('shield-status');
            if(st) { 
                st.style.background = "#00ff00"; 
                st.innerText = "SINC"; 
                console.log("✅ Sistema Sincronizado.");
            }
        }
    };
})();

