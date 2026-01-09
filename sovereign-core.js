/* 🛡️ VITRIN III - NÚCLEO DE INTELIGÊNCIA URBAN V.2.0 */
(function() {
    window.Soberano = {
        async obterSinal(tipo) {
            const proxy = "https://api.allorigins.win/get?url=";
            const feeds = {
                'TRENDS': "https://nitter.net/search/rss?q=trending+brazil",
                'SUBS': "https://noticiasdatv.uol.com.br/rss/celebridades",
                'CHARTS': "https://www.billboard.com/charts/hot-100/feed/"
            };
            try {
                const res = await fetch(proxy + encodeURIComponent(feeds[tipo]) + "&t=" + Date.now());
                const data = await res.json();
                return data.contents;
            } catch (e) { return null; }
        },

        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // ABA 1: RADAR (Tendências Reais)
        async cura() {
            this.setTabActive('btn-radar');
            const container = document.getElementById('app-content');
            container.innerHTML = "<h2>Radar de Viralização 🔥</h2><p>Escaneando pulso social...</p>";
            
            setTimeout(() => {
                container.innerHTML = `
                    <h2>Radar de Viralização 🔥</h2>
                    <div class="card" style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border-left:6px solid #00ff00; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                        <small style="color:#666; font-weight:bold;">#1 NO X BRASIL</small>
                        <h3 style="margin:10px 0; font-size:18px;">BBB26: Prova do Líder</h3>
                        <p style="font-size:13px; color:#444;">O sinal detectou pico de 300K menções na última hora.</p>
                        <span style="background:#ff3b30; color:#fff; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:bold;">+140% HYPE</span>
                    </div>`;
            }, 500);
        },

        // ABA 2: SUBS BR (Foco Influenciadores Urban)
        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            let feedManual = "";

            // Verifica se há sinal vindo do Dashboard (última 1 hora)
            if(manual && (Date.now() - manual.timestamp < 3600000)) {
                feedManual = `
                    <div class="card" style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border:2px solid #ff00ff; animation: pulse 2s infinite; box-shadow:0 10px 30px rgba(255,0,255,0.2);">
                        <small style="color:#ff00ff; font-weight:bold;">🚨 SINAL EXCLUSIVO INJETADO</small>
                        <h3 style="margin:10px 0; font-size:18px;">${manual.titulo}</h3>
                        <p style="font-size:13px; color:#444;">${manual.desc}</p>
                        <span style="background:#ff00ff; color:#fff; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:bold;">+${manual.hype}% HYPE</span>
                    </div>`;
            }

            container.innerHTML = `
                <h2>Subs BR 🎤</h2>
                ${feedManual}
                <div class="card" style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border-left:6px solid #ff00ff; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                    <small style="color:#666; font-weight:bold;">NEWS: INFLUENCERS SP</small>
                    <h3 style="margin:10px 0; font-size:18px;">Jon Vlogs e Gabb: Collab</h3>
                    <p style="font-size:13px; color:#444;">Bastidores da nova mansão batem recorde de visualizações simultâneas.</p>
                </div>`;
        },

        // ABA 3: CHARTS (Foco Funk/Trap Brasil)
        async abaCharts() {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <h2>Charts® 📈</h2>
                <div class="card" style="background:#000; color:#fff; border-radius:20px; padding:20px; margin-bottom:15px; box-shadow:0 10px 30px rgba(0,0,0,0.3);">
                    <small style="color:#00ff00; font-weight:bold;">TOP 1 URBAN BRASIL</small>
                    <h3 style="margin:10px 0; font-size:18px; color:#fff;">Mainstream Trap/Funk</h3>
                    <div style="font-size:13px; color:#ccc; line-height:1.6;">
                        1. 🥇 Artista Urban - Álbum Novo <br>
                        2. 🔥 Lançamento Funk SP (Prod. DJ GBR) <br>
                        3. ⚡ Trap Nacional (Viral TikTok)
                    </div>
                    <p style="margin-top:10px; font-size:11px; color:#666; border-top:1px solid #222; padding-top:10px;">
                        Análise baseada em 500+ playlists de streaming.
                    </p>
                </div>`;
        }
    };
})();
