/* 🛡️ VITRIN III - NÚCLEO AUTÔNOMO MULTI-FONTE V.GOLD_MAX */
(function() {
    const PROXY = "https://api.allorigins.win/get?url=";
    const IMG_PROXY = "https://images.weserv.nl/?url=";
    
    // Malha de Captura de Sinais (Fontes Confiáveis)
    const FONTES = [
        "https://noticiasdatv.uol.com.br/rss/celebridades",
        "https://hugogloss.uol.com.br/feed/",
        "https://www.metropoles.com/colunas/leo-dias/feed",
        "https://entretenimento.r7.com/famosos-e-tv/feed.xml"
    ];

    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // Busca consolidada de todas as fontes
        async capturarSinal() {
            let noticiasConsolidadas = [];
            
            for (let url of FONTES) {
                try {
                    const response = await fetch(PROXY + encodeURIComponent(url));
                    const data = await response.json();
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(data.contents, "text/xml");
                    const items = xml.querySelectorAll("item");
                    
                    items.forEach(item => {
                        noticiasConsolidadas.push({
                            titulo: item.querySelector("title")?.textContent || "",
                            desc: item.querySelector("description")?.textContent.replace(/<[^>]*>?/gm, '').substring(0, 90) + "...",
                            link: item.querySelector("link")?.textContent || "#",
                            img: this.extrairImg(item),
                            data: new Date(item.querySelector("pubDate")?.textContent || Date.now())
                        });
                    });
                } catch (e) { console.warn("Fonte instável, pulando..."); }
            }

            // Ordenar por data (mais recentes primeiro)
            return noticiasConsolidadas.sort((a, b) => b.data - a.data);
        },

        extrairImg(item) {
            // Tenta achar imagem em enclosure, media:content ou no próprio body
            let img = item.querySelector("enclosure")?.getAttribute("url") || 
                      item.querySelector("content")?.getAttribute("url") ||
                      item.querySelector("thumbnail")?.getAttribute("url");
            
            if (!img) {
                const content = item.querySelector("description")?.textContent || "";
                const match = content.match(/src="([^"]+)"/);
                img = match ? match[1] : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=600";
            }
            return img;
        },

        async cura() { this.abaSubs(); }, // Redireciona Radar para o Feed Principal

        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            container.innerHTML = `<div style="text-align:center; padding:50px; color:var(--gold);">
                <div class="logo-anim" style="font-size:14px;">ESCANEANDO PORTAIS...</div>
            </div>`;
            
            const noticias = await this.capturarSinal();
            
            // Prioridade: Injeção Manual do ADM
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            if(manual && (Date.now() - manual.timestamp < 7200000)) { // 2 horas de vida
                noticias.unshift({
                    titulo: "🚨 " + manual.titulo,
                    desc: manual.desc,
                    img: manual.img,
                    badge: "EXCLUSIVO ADM"
                });
            }

            this.renderizar(noticias);
        },

        renderizar(noticias) {
            const container = document.getElementById('app-content');
            container.innerHTML = `<span class="feed-label">Intelligence Feed (Real-Time)</span>`;
            
            noticias.slice(0, 15).forEach(n => {
                const imgFinal = n.img.startsWith('http') ? IMG_PROXY + encodeURIComponent(n.img) + "&w=600&fit=cover" : n.img;
                
                container.innerHTML += `
                    <div class="card-fofoca" onclick="window.open('${n.link}', '_blank')">
                        <span class="hype-badge">${n.badge || 'CONFIRMADO'}</span>
                        <div style="width:100%; height:200px; background:#111; overflow:hidden;">
                            <img src="${imgFinal}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/600x400/1a1a1a/FFD700?text=VITRIN+III'">
                        </div>
                        <div style="padding:20px;">
                            <h3 style="font-size:18px; line-height:1.2; margin:0;">${n.titulo}</h3>
                            <p style="font-size:13px; color:var(--text-dim); margin-top:10px;">${n.desc}</p>
                        </div>
                    </div>`;
            });
        },

        async abaCharts() {
            this.setTabActive('btn-charts');
            const container = document.getElementById('app-content');
            container.innerHTML = `
                <span class="feed-label">Charts & Performance</span>
                <div class="card-fofoca" style="padding:30px; border-top: 5px solid var(--gold); background:linear-gradient(145deg, #252525, #1a1a1a);">
                    <small style="color:var(--gold); font-weight:900;">ONDA DE CALOR • GLOBAL SINAL</small>
                    <div style="display:flex; align-items:flex-end; height:100px; gap:12px; margin:30px 0;">
                        <div style="flex:1; background:#111; height:45%; border-radius:4px;"></div>
                        <div style="flex:2; background:linear-gradient(to top, #000, var(--gold)); height:100%; border-radius:4px; box-shadow:0 0 20px rgba(255,215,0,0.2);"></div>
                        <div style="flex:1; background:#111; height:65%; border-radius:4px;"></div>
                    </div>
                    <h3 style="color:#fff;">Billboard & Spotify BR</h3>
                    <p style="font-size:12px; color:var(--text-dim); margin-top:10px;">Algoritmo atualizado: Sincronização direta com paradas de sucesso.</p>
                </div>`;
        }
    };
})();
