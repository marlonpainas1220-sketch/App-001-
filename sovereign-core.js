 /* 🛡️ VITRIN III - NÚCLEO AUTÔNOMO V.GOLD_2026 */
(function() {
    const PROXY = "https://api.allorigins.win/get?url=";
    const IMG_PROXY = "https://images.weserv.nl/?url=";
    
    // Canais de Inteligência (Fontes)
    const FEEDS = {
        SUBS: "https://noticiasdatv.uol.com.br/rss/celebridades",
        RADAR: "https://g1.globo.com/rss/g1/pop-arte/"
    };

    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // Função para buscar e limpar notícias reais
        async buscarNoticias(url) {
            try {
                const response = await fetch(PROXY + encodeURIComponent(url));
                const data = await response.json();
                const parser = new DOMParser();
                const xml = parser.parseFromString(data.contents, "text/xml");
                const items = xml.querySelectorAll("item");
                
                return Array.from(items).map(item => ({
                    titulo: item.querySelector("title").textContent,
                    desc: item.querySelector("description").textContent.replace(/<[^>]*>?/gm, '').substring(0, 100) + "...",
                    link: item.querySelector("link").textContent,
                    img: item.querySelector("enclosure")?.getAttribute("url") || 
                         item.querySelector("content")?.getAttribute("url") || 
                         "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600"
                }));
            } catch (e) {
                console.error("Falha no Sinal:", e);
                return null;
            }
        },

        async cura() {
            this.setTabActive('btn-radar');
            const container = document.getElementById('app-content');
            container.innerHTML = `<div class="status-pill" style="text-align:center; color:var(--gold);">ESCANEANDO RADAR GLOBAL...</div>`;
            
            const noticias = await this.buscarNoticias(FEEDS.RADAR);
            this.renderizar(noticias, "Radar de Viralização", "TRENDING");
        },

        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            container.innerHTML = `<div class="status-pill" style="text-align:center; color:var(--gold);">SINCRONIZANDO FOFOCAS REAIS...</div>`;
            
            const noticias = await this.buscarNoticias(FEEDS.SUBS);
            
            // Injeção Manual (Sinal do ADM) tem prioridade
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            if(manual && (Date.now() - manual.timestamp < 3600000)) {
                noticias.unshift({
                    titulo: "🚨 " + manual.titulo,
                    desc: manual.desc,
                    img: manual.img,
                    badge: "EXCLUSIVO"
                });
            }
            
            this.renderizar(noticias, "Feed de Celebridades", "PRIVATE");
        },

        renderizar(noticias, label, badgeDefault) {
            const container = document.getElementById('app-content');
            if(!noticias) {
                container.innerHTML = `<p style="text-align:center; color:#555;">Sinal instável. Tente novamente em 60s.</p>`;
                return;
            }

            container.innerHTML = `<span class="feed-label">${label}</span>`;
            noticias.slice(0, 6).forEach(n => {
                container.innerHTML += `
                    <div class="card-fofoca" onclick="window.open('${n.link}', '_blank')">
                        <span class="hype-badge">${n.badge || badgeDefault}</span>
                        <img src="${IMG_PROXY + encodeURIComponent(n.img)}&w=600&fit=cover" style="width:100%; height:200px; object-fit:cover;">
                        <div style="padding:20px;">
                            <h3>${n.titulo}</h3>
                            <p style="font-size:13px; color:var(--text-dim); margin-top:10px;">${n.desc}</p>
                        </div>
                    </div>`;
            });
        },

        async abaCharts() {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <span class="feed-label">Métricas de Sucesso</span>
                <div class="card-fofoca" style="padding:30px; border-top: 5px solid var(--gold);">
                    <small style="color:var(--gold); font-weight:900;">ONDA DE CALOR • TOP GLOBAL</small>
                    <div style="display:flex; align-items:flex-end; height:80px; gap:10px; margin:25px 0;">
                        <div style="flex:1; background:#333; height:40%;"></div>
                        <div style="flex:2; background:linear-gradient(to top, #000, var(--gold)); height:100%; border-radius:4px;"></div>
                        <div style="flex:1; background:#333; height:60%;"></div>
                    </div>
                    <h3>Top Viral: Billboard & Spotify</h3>
                    <p style="font-size:12px; color:var(--text-dim);">Sincronizado com os servidores mundiais.</p>
                </div>`;
        }
    };
})();
