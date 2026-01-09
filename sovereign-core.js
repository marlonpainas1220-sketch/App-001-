(function() {
    const RSS_BRIDGE = "https://api.rss2json.com/v1/api.json?rss_url=";
    const NEWS_FEED = encodeURIComponent("https://news.google.com/rss/search?q=fofoca+celebridades+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419");
    const TRENDING_X = encodeURIComponent("https://news.google.com/rss/search?q=trending+topics+twitter+brasil+fofoca&hl=pt-BR&gl=BR&ceid=BR:pt-419");
    const IMG_PROXY = "https://images.weserv.nl/?url=";

    window.Soberano = {
        async loadPrincipal() {
            this.setTabActive('Hype Feed');
            const container = document.getElementById('app-content');
            container.innerHTML = `<div style="text-align:center; padding:50px; color:var(--gold);">Carregando Hype Feed...</div>`;
            
            const res = await fetch(RSS_BRIDGE + NEWS_FEED);
            const data = await res.json();
            container.innerHTML = '';

            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            if(manual) {
                this.renderCard(container, manual, true);
            }

            if(data.items) {
                data.items.slice(0, 10).forEach(n => {
                    this.renderCard(container, { title: n.title, desc: n.description, img: n.thumbnail || n.enclosure?.link, link: n.link }, false);
                });
            }
        },

        async loadTrending() {
            this.setTabActive('Trending Topics');
            const container = document.getElementById('app-content');
            container.innerHTML = `<div style="text-align:center; padding:50px; color:var(--gold);">Sincronizando Trending Topics...</div>`;

            const res = await fetch(RSS_BRIDGE + TRENDING_X);
            const data = await res.json();
            container.innerHTML = '';

            if(data.items) {
                data.items.slice(0, 15).forEach(n => {
                    this.renderTrendingPost(container, { title: n.title, desc: n.description, img: n.thumbnail || n.enclosure?.link, link: n.link });
                });
            }
        },

        renderCard(target, data, isOfficial) {
            const cleanDesc = data.desc ? data.desc.replace(/<[^>]*>?/gm, '').substring(0, 120) + '...' : 'Descrição indisponível.';
            let mediaHtml = '';

            if (data.img && data.img.includes('tiktok.com')) {
                const videoId = data.img.split('/').pop().split('?')[0];
                mediaHtml = `<div class="tiktok-container"><blockquote class="tiktok-embed" data-video-id="${videoId}" style="max-width: 605px;min-width: 325px;"><section></section></blockquote></div>`;
            } else if (data.img) {
                mediaHtml = `<img src="${IMG_PROXY + encodeURIComponent(data.img)}&w=600&fit=cover" class="card-image" onerror="this.onerror=null;this.src='https://via.placeholder.com/600x200/111/FFD700?text=VITRIN+III'">`;
            }

            target.innerHTML += `
                <div class="news-card" onclick="window.open('${data.link || '#'}', '_blank')">
                    ${mediaHtml}
                    <div class="card-body">
                        <h3 class="card-title">${data.title}</h3>
                        <p class="card-desc">${cleanDesc}</p>
                        <div class="card-footer">
                            <div style="display:flex; align-items:center; gap:8px;">
                                <div class="card-persona-avatar" style="${isOfficial ? '' : 'filter:grayscale(100%); opacity:0.6;'}"></div>
                                ${isOfficial ? '<span class="verified-badge">⚡ VITRIN III</span>' : '<span>Sinal Verificado</span>'}
                            </div>
                            <span>${(Math.random() * 5 + 1).toFixed(1)}M Views</span>
                        </div>
                    </div>
                </div>`;
        },

        renderTrendingPost(target, data) {
            const cleanDesc = data.desc ? data.desc.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...' : 'Sem descrição.';
            const imgHtml = data.img ? `<img src="${IMG_PROXY + encodeURIComponent(data.img)}&w=100&h=100&fit=cover" style="width:100px; height:100px; border-radius:10px; flex-shrink:0;">` : '';
            target.innerHTML += `
                <div style="display:flex; gap:15px; padding:15px; border-bottom:1px solid var(--border);" onclick="window.open('${data.link}', '_blank')">
                    <div style="flex:1;">
                        <h4 style="font-size:16px; margin:0 0 5px 0;">${data.title}</h4>
                        <p style="font-size:12px; color:var(--text-dim); margin:0;">${cleanDesc}</p>
                        <div style="margin-top:10px; font-size:11px; color:var(--text-dim);">#Trending · ${(Math.random() * 100 + 10).toFixed(0)}k posts</div>
                    </div>
                    ${imgHtml}
                </div>`;
        },

        setTabActive(tabName) {
            document.querySelectorAll('.tab-menu-item').forEach(item => {
                if (item.textContent === tabName) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    };
})();
