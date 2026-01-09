/* 🛡️ VITRIN III - NÚCLEO AUTÔNOMO BLINDADO V.GOLD_ULTRA */
(function() {
    // Ponte de dados estável para evitar bloqueios
    const BRIDGE = "https://api.rss2json.com/v1/api.json?rss_url=";
    const IMG_PROXY = "https://images.weserv.nl/?url=";
    
    const FONTES = [
        "https://noticiasdatv.uol.com.br/rss/celebridades",
        "https://www.metropoles.com/colunas/leo-dias/feed",
        "https://entretenimento.r7.com/famosos-e-tv/feed.xml"
    ];

    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        async capturarSinal() {
            let noticias = [];
            for (let url of FONTES) {
                try {
                    const res = await fetch(BRIDGE + encodeURIComponent(url));
                    const data = await res.json();
                    if (data.status === 'ok') {
                        data.items.forEach(item => {
                            noticias.push({
                                titulo: item.title,
                                desc: item.description.replace(/<[^>]*>?/gm, '').substring(0, 80) + "...",
                                link: item.link,
                                img: item.thumbnail || item.enclosure?.link || this.pegarImgTexto(item.description),
                                data: new Date(item.pubDate)
                            });
                        });
                    }
                } catch (e) { console.warn("Falha em fonte isolada."); }
            }
            return noticias.sort((a, b) => b.data - a.data);
        },

        pegarImgTexto(html) {
            const m = html.match(/src="([^"]+)"/);
            return m ? m[1] : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600';
        },

        async cura() { this.abaSubs(); },

        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            container.innerHTML = `<div style="text-align:center; padding:100px 0; color:var(--gold); font-weight:900; letter-spacing:3px; animation: pulseLogo 1s infinite;">CONECTANDO SINAL...</div>`;
            
            let noticias = await this.capturarSinal();
            
            // Se falhar tudo, carregar banco de dados de segurança
            if (noticias.length === 0) {
                noticias = [{
                    titulo: "Sinal Offline: Reconfigurando...",
                    desc: "Tente atualizar o app ou verificar sua conexão de rede.",
                    img: "", badge: "SISTEMA"
                }];
            }

            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            if(manual && (Date.now() - manual.timestamp < 7200000)) {
                noticias.unshift({ ...manual, badge: "URGENTE ADM", link: "#" });
            }

            this.renderizar(noticias);
        },

        renderizar(noticias) {
            const container = document.getElementById('app-content');
            container.innerHTML = `<span class="feed-label">Intelligence Feed (Real-Time)</span>`;
            
            noticias.slice(0, 12).forEach(n => {
                const imgFinal = n.img.includes('http') ? IMG_PROXY + encodeURIComponent(n.img) + "&w=600&fit=cover" : n.img;
                container.innerHTML += `
                    <div class="card-fofoca" onclick="window.open('${n.link}', '_blank')">
                        <span class="hype-badge">${n.badge || 'ESTÁVEL'}</span>
                        <div style="width:100%; height:200px; background:#111;">
                            <img src="${imgFinal}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/600x400/111/FFD700?text=VITRIN+III'">
                        </div>
                        <div style="padding:20px;">
                            <h3 style="font-size:18px; line-height:1.2; margin:0;">${n.titulo}</h3>
                            <p style="font-size:12px; color:var(--text-dim); margin-top:10px;">${n.desc}</p>
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
                    <small style="color:var(--gold); font-weight:900; letter-spacing:2px;">CALOR • GLOBAL</small>
                    <div style="display:flex; align-items:flex-end; height:100px; gap:12px; margin:20px 0;">
                        <div style="flex:1; background:#111; height:45%;"></div>
                        <div style="flex:2; background:linear-gradient(to top, #000, var(--gold)); height:100%; border-radius:4px;"></div>
                        <div style="flex:1; background:#111; height:65%;"></div>
                    </div>
                    <h3>Top Viral: Billboard & Spotify</h3>
                    <p style="font-size:12px; color:var(--text-dim);">Sincronizado com os servidores mundiais.</p>
                </div>`;
        }
    };
})();
