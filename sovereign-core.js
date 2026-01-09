/* 🛡️ VITRIN III - NÚCLEO SOBERANO V.MEDIA_2026 */
(function() {
    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // ABA 1: RADAR (Foco em Eventos/TV)
        async cura() {
            this.setTabActive('btn-radar');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <span class="feed-label">Radar de Inteligência</span>
                <div class="card-fofoca" style="padding:0; overflow:hidden;">
                    <img src="[attachment_2](attachment)" style="width:100%; height:180px; object-fit:cover;">
                    <div style="padding:20px;">
                        <span class="hype-badge">AO VIVO</span>
                        <small style="color:var(--accent); font-weight:800;">BIG BROTHER BRASIL</small>
                        <h3 style="margin-top:10px;">BBB26: Nova Prova do Líder agita a casa</h3>
                        <p>Acompanhe em tempo real o pico de engajamento no X e as primeiras polêmicas do novo ciclo.</p>
                    </div>
                </div>
            `;
        },

        // ABA 2: SUBS BR (Celebridades)
        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <span class="feed-label">Círculo Íntimo</span>
                
                <div class="card-fofoca" style="padding:0; overflow:hidden;">
                    <img src="[attachment_0](attachment)" style="width:100%; height:200px; object-fit:cover;">
                    <div style="padding:20px;">
                        <span class="hype-badge">LUXO</span>
                        <small style="color:var(--text-dim); font-weight:700;">PRIVATE VIEW</small>
                        <h3>Virgínia e Zé Felipe: Tour pela Mansão</h3>
                        <p>O sinal captou detalhes exclusivos da nova área de lazer que parou a internet hoje.</p>
                    </div>
                </div>

                <div class="card-fofoca" style="padding:0; overflow:hidden; margin-top:20px;">
                    <img src="[attachment_1](attachment)" style="width:100%; height:200px; object-fit:cover;">
                    <div style="padding:20px;">
                        <span class="hype-badge">ALERTA</span>
                        <small style="color:var(--text-dim); font-weight:700;">CONEXÃO BR/SA</small>
                        <h3>Neymar Jr: Bastidores do Evento</h3>
                        <p>Novas imagens do craque em evento de gala geram especulações sobre seu próximo passo na carreira.</p>
                    </div>
                </div>
            `;
        },

        // ABA 3: CHARTS (Artistas)
        async abaCharts(genero = 'URBAN') {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            const imgG = {
                'URBAN': '[attachment_3](attachment)',
                'POP': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=500',
                'SERTANEJO': 'https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=500',
                'MPB': 'https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=500'
            };
            
            container.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <span class="feed-label">Sinal de Música</span>
                    <select onchange="Soberano.abaCharts(this.value)" style="background:#111; color:#fff; border:1px solid #222; padding:6px; border-radius:12px; font-size:10px;">
                        <option value="URBAN">URBAN</option>
                        <option value="POP">POP</option>
                        <option value="SERTANEJO">SERTANEJO</option>
                        <option value="MPB">MPB</option>
                    </select>
                </div>

                <div class="card-fofoca" style="padding:0; overflow:hidden;">
                    <img src="${imgG[genero]}" style="width:100%; height:150px; object-fit:cover; filter: grayscale(0.5);">
                    <div style="padding:20px;">
                        <small style="color:var(--accent); font-weight:900;">ONDAS DE CALOR ATIVAS</small>
                        <h3 style="margin-top:5px;">Top Artistas: ${genero}</h3>
                        <div style="margin-top:15px; background:rgba(255,255,255,0.03); border-radius:10px; padding:10px;">
                            <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                <span>1. Mainstream Artist</span><span style="color:var(--accent);">🔥 100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    };
})();
