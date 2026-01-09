/* 🛡️ VITRIN III - CORE SOBERANO MASTER V1 */
(function() {
    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // RADAR - TENDÊNCIAS X/TV
        async cura() {
            this.setTabActive('btn-radar');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <span class="feed-label">Radar de Viralização</span>
                <div class="card-fofoca">
                    <img src="https://s2-g1.glbimg.com/lM_0X3x_K_oU_V4Y9Y9Y9Y9Y9Y9=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c1284ef8973b110c211C1d/internal_photos/bs/2024/G/U/An7B3mSgA6Y8Y8Y8Y8Y8/bbb24.jpg" style="width:100%; height:200px; object-fit:cover; opacity:0.7;">
                    <div style="padding:20px;">
                        <span class="hype-badge">TRENDING</span>
                        <h3 style="margin:0;">BBB26: Nova Prova do Líder</h3>
                        <p style="font-size:13px; color:#888; margin-top:10px;">Pico de menções detectado no X (Brasil). A casa está em estado de alerta.</p>
                    </div>
                </div>`;
        },

        // SUBS BR - CELEBRIDADES & INFLUENCERS
        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            let feedManual = "";

            if(manual && (Date.now() - manual.timestamp < 3600000)) {
                feedManual = `
                    <div class="card-fofoca" style="border:1px solid #00ff00; background:rgba(0,255,0,0.02);">
                        <img src="${manual.img}" style="width:100%; height:220px; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000'">
                        <div style="padding:20px;">
                            <span class="hype-badge" style="background:#00ff00; color:#000;">🚨 EXCLUSIVO</span>
                            <h3 style="margin:0;">${manual.titulo}</h3>
                            <p style="font-size:13px; color:#888; margin-top:10px;">${manual.desc}</p>
                        </div>
                    </div>`;
            }

            container.innerHTML = `
                <span class="feed-label">Fluxo Subcelebridades</span>
                ${feedManual}
                <div class="card-fofoca">
                    <img src="https://cdn.moneytimes.com.br/upload/2023/07/virginia-fonseca-ze-felipe-mansao.png" style="width:100%; height:220px; object-fit:cover;">
                    <div style="padding:20px;">
                        <span class="hype-badge">MANSÃO</span>
                        <h3 style="margin:0;">Virgínia e Zé Felipe</h3>
                        <p style="font-size:13px; color:#888; margin-top:10px;">Novos detalhes da segurança da mansão viralizam. "Bunker de luxo", dizem seguidores.</p>
                    </div>
                </div>
                <div class="card-fofoca">
                    <img src="https://p2.trrsf.com/image/fget/cf/1200/675/middle/images.terra.com/2023/11/13/1131976077-ney.jpg" style="width:100%; height:220px; object-fit:cover;">
                    <div style="padding:20px;">
                        <span class="hype-badge">PRIVATE</span>
                        <h3 style="margin:0;">Neymar Jr: Bastidores</h3>
                        <p style="font-size:13px; color:#888; margin-top:10px;">O craque foi visto em evento restrito. O sinal aponta para novos anúncios de carreira.</p>
                    </div>
                </div>`;
        },

        // CHARTS - ONDAS DE CALOR
        async abaCharts(genero = 'URBAN') {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            const base = {
                'URBAN': { tit: 'Trap & Funk', cor: '#00ff00', rank: 'MC IG - Novo Hit' },
                'POP': { tit: 'Pop Brasil', cor: '#ff00ff', rank: 'Luísa Sonza - Tour' },
                'SERTANEJO': { tit: 'Sertanejo', cor: '#ffcc00', rank: 'Ana Castela' },
                'MPB': { tit: 'MPB / Alt', cor: '#00ccff', rank: 'Liniker' }
            };
            const s = base[genero];
            container.innerHTML = `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                    <span class="feed-label">Charts Music</span>
                    <select onchange="Soberano.abaCharts(this.value)" style="background:#111; color:#fff; border:1px solid #333; padding:5px; border-radius:10px; font-size:10px;">
                        <option value="URBAN" ${genero==='URBAN'?'selected':''}>URBAN</option>
                        <option value="POP" ${genero==='POP'?'selected':''}>POP</option>
                        <option value="SERTANEJO" ${genero==='SERTANEJO'?'selected':''}>SERTANEJO</option>
                        <option value="MPB" ${genero==='MPB'?'selected':''}>MPB</option>
                    </select>
                </div>
                <div class="card-fofoca" style="padding:25px; border-top:4px solid ${s.cor};">
                    <small style="color:${s.cor}; font-weight:900;">CALOR • ${s.tit.toUpperCase()}</small>
                    <div style="display:flex; align-items:flex-end; height:70px; gap:8px; margin:20px 0;">
                        <div style="flex:1; background:#1a1a1a; height:30%;"></div>
                        <div style="flex:2; background:linear-gradient(to top, #000, ${s.cor}); height:95%; border-radius:4px;"></div>
                        <div style="flex:1; background:#1a1a1a; height:50%;"></div>
                    </div>
                    <h3 style="margin:0;">${s.rank}</h3>
                    <p style="font-size:12px; color:#555; margin-top:10px;">DOMÍNIO ABSOLUTO NO SPOTIFY BR</p>
                </div>`;
        }
    };
})();
