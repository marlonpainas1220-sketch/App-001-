/* 🛡️ VITRIN III - ENGINE SOBERANA GOLD V1.1 */
(function() {
    const RSS_BRIDGE = "https://api.rss2json.com/v1/api.json?rss_url=";
    const GOOGLE_NEWS = encodeURIComponent("https://news.google.com/rss/search?q=fofoca+celebridades+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419");
    const IMG_PROXY = "https://images.weserv.nl/?url=";

    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        segurancaSinal() {
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            if (manual && (Date.now() - manual.timestamp > 14400000)) {
                localStorage.removeItem('noticia_manual');
            }
        },

        async capturarSinal() {
            try {
                const res = await fetch(RSS_BRIDGE + GOOGLE_NEWS);
                const data = await res.json();
                return data.status === 'ok' ? data.items : [];
            } catch (e) { return []; }
        },

        async cura() { this.abaSubs(); },

        async abaSubs() {
            this.setTabActive('btn-subs');
            this.segurancaSinal();
            const container = document.getElementById('app-content');
            container.innerHTML = `<div style="text-align:center; padding:100px 0; color:var(--gold); font-weight:900; letter-spacing:2px; animation: pulseLogo 1.5s infinite;">SINCRONIZANDO SINAL...</div>`;
            
            const noticias = await this.capturarSinal();
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            
            container.innerHTML = `<span class="feed-label">Intelligence Feed (Autônomo)</span>`;
            
            if(manual) {
                this.renderCard(container, manual, "URGENTE ADM");
            }

            noticias.slice(0, 15).forEach(n => {
                const cleanDesc = n.description.replace(/<[^>]*>?/gm, '').substring(0, 90) + "...";
                const img = n.thumbnail || n.enclosure?.link || "https://via.placeholder.com/600x400/1A1A1A/FFD700?text=VITRIN+III";
                this.renderCard(container, { titulo: n.title, desc: cleanDesc, img: img, link: n.link }, "CONFIRMADO");
            });
        },

        renderCard(target, data, badge) {
            const imgFinal = data.img.includes('http') ? IMG_PROXY + encodeURIComponent(data.img) + "&w=600&fit=cover" : data.img;
            target.innerHTML += `
                <div class="card-fofoca" onclick="window.open('${data.link}', '_blank')">
                    <span class="hype-badge">${badge}</span>
                    <div style="width:100%; height:220px; background:#000; overflow:hidden;">
                        <img src="${imgFinal}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;" onerror="this.src='https://via.placeholder.com/600x400/111/FFD700?text=SINAL+GOLD'">
                    </div>
                    <div style="padding:25px;">
                        <h3 style="font-size:18px; line-height:1.2; margin:0; font-weight:900;">${data.titulo}</h3>
                        <p style="font-size:12px; color:var(--text-dim); margin-top:12px; line-height:1.5;">${data.desc}</p>
                    </div>
                </div>`;
        },

        async abaCharts() {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            container.innerHTML = `<span class="feed-label">Métricas Sovereign</span>
                <div class="card-fofoca" style="padding:40px; border-top: 6px solid var(--gold);">
                    <small style="color:var(--gold); font-weight:900; letter-spacing:3px;">ONDA DE CALOR • PERFORMANCE</small>
                    <div style="display:flex; align-items:flex-end; height:120px; gap:15px; margin:30px 0;">
                        <div style="flex:1; background:#111; height:40%;"></div>
                        <div style="flex:2; background:linear-gradient(to top, #000, var(--gold)); height:100%; border-radius:6px; box-shadow:0 0 30px rgba(255,215,0,0.3);"></div>
                        <div style="flex:1; background:#111; height:60%;"></div>
                    </div>
                    <h3 style="font-size:22px;">Billboard & Spotify BR</h3>
                    <p style="font-size:13px; color:var(--text-dim); margin-top:15px;">Algoritmo Sovereign Gold operando em 95% de autonomia.</p>
                </div>`;
        }
    };
})();
