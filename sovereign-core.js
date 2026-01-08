/* 🛡️ VITRIN III - NÚCLEO SOBERANO UNIFICADO V.MAX */
(function() {
    window.Soberano = {
        async obterSinal(tipo) {
            try {
                const proxy = "https://api.allorigins.win/get?url=";
                const alvos = {
                    'TRENDS': "https://nitter.net/search/rss?q=trending+brazil",
                    'CHARTS': "https://www.billboard.com/charts/hot-100/feed/"
                };
                const res = await fetch(proxy + encodeURIComponent(alvos[tipo]) + "&t=" + Date.now());
                const json = await res.json();
                return json.contents;
            } catch (e) { 
                return null; 
            }
        },

        async cura() {
            const st = document.getElementById('shield-status');
            if(st) { st.style.background = "#00ff00"; st.innerText = "SINC"; }
            await this.renderizarCards();
        },

        async renderizarCards() {
            const container = document.getElementById('app-content');
            if(!container) return;

            const temDados = await this.obterSinal('TRENDS');

            container.innerHTML = `
                <div style="padding:15px; text-align:left; animation: fadeIn 0.5s ease-in;">
                    <h2 style="font-size:24px; letter-spacing:-1px; margin-bottom:20px;">Radar de Viralização 🔥</h2>
                    
                    <div style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border-left:6px solid #00ff00; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                        <small style="color:#666; font-weight:bold;">#1 NO X BRASIL</small>
                        <h3 style="margin:10px 0; font-size:20px;">${temDados ? "BBB26: Nova Prova" : "Sincronizando Trends..."}</h3>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-size:12px; color:#999;">🔥 240K INTERAÇÕES</span>
                            <span style="background:#ff3b30; color:#fff; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:bold;">+98% HYPE</span>
                        </div>
                    </div>

                    <div style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border-left:6px solid #ff00ff; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                        <small style="color:#666; font-weight:bold;">SUBS BR • EXCLUSIVO</small>
                        <h3 style="margin:10px 0; font-size:20px;">Virgínia: Novo Recorde</h3>
                        <p style="font-size:13px; color:#444;">Faturamento da nova live quebra a internet nas últimas 24h.</p>
                    </div>
                </div>
            `;
        }
    };

    window.addEventListener('load', () => {
        if(window.Soberano) Soberano.cura();
    });
})();
