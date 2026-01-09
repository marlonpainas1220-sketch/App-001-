(function() {
    const BRIDGE = "https://api.rss2json.com/v1/api.json?rss_url=";
    const FEEDS = {
        HYPE: encodeURIComponent("https://news.google.com/rss/search?q=fofoca+celebridades+brasil&hl=pt-BR"),
        SUBS: encodeURIComponent("https://alfinetei.com.br/feed"),
        TREND: encodeURIComponent("https://news.google.com/rss/search?q=trending+topics+twitter+brasil&hl=pt-BR")
    };

    window.Soberano = {
        async abaHype() { this.renderizar('RADAR', FEEDS.HYPE, 't-hype', true); },
        async abaSubs() { this.renderizar('CELEBS', FEEDS.SUBS, 't-subs', true); },
        async abaTrend() { this.renderizar('TRENDS', FEEDS.TREND, 't-trend', false); },

        async renderizar(label, url, tabId, comManual) {
            document.querySelectorAll('.tab-item').forEach(i => i.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            const container = document.getElementById('app-content');
            container.innerHTML = `<div style="text-align:center; padding:100px 0; color:var(--yellow); font-weight:900; letter-spacing:2px; animation: pulse 1s infinite;">SINCRONIZANDO SINAL...</div>`;
            
            try {
                const res = await fetch(BRIDGE + url);
                const data = await res.json();
                container.innerHTML = '';

                if(comManual) {
                    const manual = JSON.parse(localStorage.getItem('noticia_manual'));
                    if(manual && (Date.now() - manual.timestamp < 14400000)) {
                        this.buildCard(container, manual, true);
                    }
                }

                if(data.items) {
                    data.items.slice(0, 15).forEach(n => {
                        this.buildCard(container, { title: n.title, desc: n.description, img: n.thumbnail || n.enclosure?.link, link: n.link }, false);
                    });
                }
            } catch (e) { container.innerHTML = '<div style="color:red; text-align:center;">ERRO DE SINAL</div>'; }
        },

        buildCard(target, data, isOfficial) {
            const cleanDesc = data.desc ? data.desc.replace(/<[^>]*>?/gm, '').substring(0, 130) + '...' : '';
            let media = data.img ? `<img src="https://images.weserv.nl/?url=${encodeURIComponent(data.img)}&w=800&fit=cover" class="card-img">` : '';
            
            if (data.img && data.img.includes('tiktok.com')) {
                const vid = data.img.split('/').pop().split('?')[0];
                media = `<div style="width:100%; border-radius:0; overflow:hidden;"><blockquote class="tiktok-embed" data-video-id="${vid}"><section></section></blockquote></div>`;
            }

            target.innerHTML += `
                <div class="news-card" onclick="window.open('${data.link || '#'}', '_blank')">
                    ${media}
                    <div class="card-body">
                        <div class="card-persona" style="${isOfficial ? '' : 'filter:grayscale(1); border-color:#222;'}"></div>
                        <h3 style="margin:0 0 15px 0; font-size:22px; line-height:1.1; font-weight:900;">${data.title}</h3>
                        <p style="font-size:14px; color:#666; line-height:1.5; margin:0;">${cleanDesc}</p>
                        <div style="margin-top:20px; font-size:10px; font-weight:900; color:var(--yellow); letter-spacing:2px;">
                            ${isOfficial ? 'VERIFICADO PELA PERSONA' : 'INTELIGÊNCIA REAL-TIME'}
                        </div>
                    </div>
                </div>`;
        }
    };
})();
