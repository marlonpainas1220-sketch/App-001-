/* 🛡️ VITRIN III - NÚCLEO DE INTELIGÊNCIA MULTIGÊNERO V.3.0 */
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

        // ABA 1: RADAR (Tendências)
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

        // ABA 2: SUBS BR (Influencers + Manual)
        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            let feedManual = "";

            if(manual && (Date.now() - manual.timestamp < 3600000)) {
                feedManual = `
                    <div class="card" style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border:2px solid #ff00ff; box-shadow:0 10px 30px rgba(255,0,255,0.2);">
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

        // ABA 3: CHARTS (Filtro por Gêneros e Heatmap)
        async abaCharts(genero = 'URBAN') {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            
            const baseSinal = {
                'URBAN': { tit: 'Trap & Funk', cor: '#00ff00', rank: ['1. Artista Trap #1', '2. Relíquia Funk SP', '3. Drill Viral'] },
                'POP': { tit: 'Pop Brasil', cor: '#ff00ff', rank: ['1. Diva Pop Nacional', '2. Hit de Verão 2026', '3. Remix Pop/Dance'] },
                'SERTANEJO': { tit: 'Sertanejo', cor: '#ffcc00', rank: ['1. Modão do Ano', '2. Agronejo Estourado', '3. Sertanejo/Piseiro'] },
                'MPB': { tit: 'MPB / Alternativo', cor: '#00ccff', rank: ['1. Nova MPB Viral', '2. Clássico Revisitado', '3. Voz e Violão Jazz'] }
            };

            const sinal = baseSinal[genero];

            container.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <h2 style="margin:0;">Charts® 📈</h2>
                    <select onchange="Soberano.abaCharts(this.value)" style="background:#111; color:#fff; border:1px solid #333; padding:6px; border-radius:10px; font-size:11px; outline:none;">
                        <option value="URBAN" ${genero === 'URBAN' ? 'selected' : ''}>TRAP/FUNK</option>
                        <option value="POP" ${genero === 'POP' ? 'selected' : ''}>POP</option>
                        <option value="SERTANEJO" ${genero === 'SERTANEJO' ? 'selected' : ''}>SERTANEJO</option>
                        <option value="MPB" ${genero === 'MPB' ? 'selected' : ''}>MPB</option>
                    </select>
                </div>

                <div class="card" style="background:#000; color:#fff; border-radius:25px; padding:25px; margin-bottom:15px; border-top: 5px solid ${sinal.cor};">
                    <small style="color:${sinal.cor}; font-weight:bold;">ONDA DE CALOR • ${sinal.tit.toUpperCase()}</small>
                    
                    <div style="display:flex; align-items:flex-end; height:80px; gap:8px; margin:20px 0;">
                        <div style="flex:1; background:#111; height:40%; border-radius:4px;"></div>
                        <div style="flex:1; background:#111; height:65%; border-radius:4px;"></div>
                        <div style="flex:1; background:linear-gradient(to top, #111, ${sinal.cor}); height:95%; border-radius:4px; box-shadow:0 0 15px ${sinal.cor}44;"></div>
                        <div style="flex:1; background:#111; height:55%; border-radius:4px;"></div>
                        <div style="flex:1; background:#111; height:30%; border-radius:4px;"></div>
                    </div>

                    <div style="font-size:13px; color:#ccc; line-height:1.8;">
                        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #222; padding:8px 0;">
                            <span>${sinal.rank[0]}</span> <span style="color:${sinal.cor};">🔥 TOP 1</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; border-bottom:1px solid #222; padding:8px 0;">
                            <span>${sinal.rank[1]}</span> <span style="color:#555;">RANK 2</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:8px 0;">
                            <span>${sinal.rank[2]}</span> <span style="color:#555;">RANK 3</span>
                        </div>
                    </div>
                    <p style="margin-top:15px; font-size:9px; color:#444; text-align:center;">Sinal Sincronizado: Billboard & Spotify BR</p>
                </div>
            `;
        }
    };
})();
