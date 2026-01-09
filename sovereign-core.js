/* 🛡️ VITRIN III - NÚCLEO SOBERANO V.HIGH_END_2026 */
(function() {
    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // ABA 1: RADAR (Inteligência Social)
        async cura() {
            this.setTabActive('btn-radar');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <span class="feed-label">Radar de Inteligência</span>
                <div class="card-fofoca">
                    <span class="hype-badge">PICO DE SINAL</span>
                    <small style="color:var(--accent); font-weight:800;">TRENDING X BRASIL</small>
                    <h3 style="margin-top:10px;">BBB26: Formação de Paredão</h3>
                    <p>O algoritmo detectou volume crítico de menções (340k/hora). O engajamento sugere polarização imediata.</p>
                    <div style="margin-top:15px; font-size:10px; color:var(--accent); font-weight:900;">⚡ +145% VELOCIDADE</div>
                </div>
            `;
        },

        // ABA 2: SUBS BR (Layout de Revista)
        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            let feedManual = "";

            if(manual && (Date.now() - manual.timestamp < 3600000)) {
                feedManual = `
                    <div class="card-fofoca" style="border: 1px solid var(--accent); background: rgba(0, 255, 0, 0.03);">
                        <span class="hype-badge" style="background:var(--accent); color:#000;">🚨 EXCLUSIVO</span>
                        <small style="color:var(--accent); font-weight:800;">SINAL INJETADO (ADMIN)</small>
                        <h3 style="margin-top:10px;">${manual.titulo}</h3>
                        <p>${manual.desc}</p>
                    </div>`;
            }

            container.innerHTML = `
                <span class="feed-label">Círculo Íntimo & Bastidores</span>
                ${feedManual}
                <div class="card-fofoca">
                    <span class="hype-badge">HOT</span>
                    <small style="color:var(--text-dim); font-weight:700;">PRIVATE FEED</small>
                    <h3>Virgínia e Zé Felipe</h3>
                    <p>Bastidores da nova mansão: Detalhes sobre a segurança nível bunker e a repercussão no círculo das subs.</p>
                </div>
                <div class="card-fofoca">
                    <span class="hype-badge">ALERTA</span>
                    <small style="color:var(--text-dim); font-weight:700;">CONEXÃO SP</small>
                    <h3>Neymar Jr</h3>
                    <p>O sinal captou movimentação atípica em postagens recentes. Analistas sugerem nova fase de publicidade.</p>
                </div>
            `;
        },

        // ABA 3: CHARTS (Heatmap Dark)
        async abaCharts(genero = 'URBAN') {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            const base = {
                'URBAN': { tit: 'Trap & Funk', cor: '#00ff00', rank: ['MC IG - Novo Álbum', 'Veigh - Single', 'KayBlack - Collab'] },
                'POP': { tit: 'Pop Brasil', cor: '#ff00ff', rank: ['Luísa Sonza', 'Anitta - Global', 'Jão - Live'] },
                'SERTANEJO': { tit: 'Sertanejo', cor: '#ffcc00', rank: ['Ana Castela', 'Gusttavo Lima', 'Jorge & Mateus'] },
                'MPB': { tit: 'MPB / Alt', cor: '#00ccff', rank: ['Liniker', 'Lulu Santos', 'Silva'] }
            };
            const s = base[genero];
            
            container.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <span class="feed-label" style="margin:0;">Ondas de Calor</span>
                    <select onchange="Soberano.abaCharts(this.value)" style="background:#111; color:#fff; border:1px solid #222; padding:6px 12px; border-radius:12px; font-size:10px; font-weight:800; outline:none;">
                        <option value="URBAN" ${genero==='URBAN'?'selected':''}>URBAN</option>
                        <option value="POP" ${genero==='POP'?'selected':''}>POP</option>
                        <option value="SERTANEJO" ${genero==='SERTANEJO'?'selected':''}>SERTANEJO</option>
                        <option value="MPB" ${genero==='MPB'?'selected':''}>MPB</option>
                    </select>
                </div>

                <div class="card-fofoca" style="padding:25px; border-top: 4px solid ${s.cor};">
                    <small style="color:${s.cor}; font-weight:900; letter-spacing:1px;">CALOR • ${s.tit.toUpperCase()}</small>
                    
                    <div style="display:flex; align-items:flex-end; height:70px; gap:6px; margin:25px 0;">
                        <div style="flex:1; background:#1a1a1a; height:30%; border-radius:4px;"></div>
                        <div style="flex:1; background:#1a1a1a; height:60%; border-radius:4px;"></div>
                        <div style="flex:1; background:linear-gradient(to top, #111, ${s.cor}); height:100%; border-radius:4px; box-shadow:0 0 20px ${s.cor}33;"></div>
                        <div style="flex:1; background:#1a1a1a; height:45%; border-radius:4px;"></div>
                    </div>

                    <div style="font-size:13px; color:#eee;">
                        <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #1a1a1a;">
                            <span>1. ${s.rank[0]}</span> <span style="color:${s.cor}; font-weight:900;">🔥 TOP 1</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #1a1a1a;">
                            <span>2. ${s.rank[1]}</span> <span style="color:var(--text-dim);">VIBRANTE</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; padding:10px 0;">
                            <span>3. ${s.rank[2]}</span> <span style="color:var(--text-dim);">SUBINDO</span>
                        </div>
                    </div>
                </div>
            `;
        }
    };
})();
