(function() {
    const BRIDGE = "https://api.rss2json.com/v1/api.json?rss_url=";
    const TRENDS = encodeURIComponent("https://news.google.com/rss/search?q=celebridades+viral+brasil&hl=pt-BR");
    const IMG_PROXY = "https://images.weserv.nl/?url=";

    window.Soberano = {
        async cura() {
            const container = document.getElementById('app-content');
            container.innerHTML = `<p style="padding:20px; color:#555;">Carregando sinal...</p>`;
            
            const res = await fetch(BRIDGE + TRENDS);
            const data = await res.json();
            container.innerHTML = '';

            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            if(manual) {
                this.renderPost(container, { title: manual.titulo, desc: manual.desc, img: manual.img, user: 'VITRIN_OFFICIAL' }, true);
            }

            if(data.items) {
                data.items.slice(0, 15).forEach(n => {
                    this.renderPost(container, { title: n.title, desc: n.description, img: n.thumbnail, user: 'Trending_Sinal' }, false);
                });
            }
        },

        renderPost(target, data, verified) {
            const cleanDesc = data.desc.replace(/<[^>]*>?/gm, '').substring(0, 140);
            target.innerHTML += `
                <div class="x-post">
                    <div class="avatar-v3" style="${verified ? '' : 'filter: grayscale(1); opacity: 0.5;'}"></div>
                    <div class="post-body">
                        <div class="post-header">
                            ${data.user} ${verified ? '<span class="verified">✔</span>' : ''}
                            <span style="color:#555; font-weight:400; font-size:14px;">@${data.user.toLowerCase()} · agora</span>
                        </div>
                        <div class="post-content"><strong>${data.title}</strong><br>${cleanDesc}</div>
                        ${data.img ? `<img src="${IMG_PROXY + encodeURIComponent(data.img)}" class="post-media">` : ''}
                        <div style="margin-top:12px; display:flex; justify-content:space-between; color:#555; font-size:13px; max-width:200px;">
                            <span>🗨 42</span> <span>🔁 158</span> <span>❤ 1.4k</span>
                        </div>
                    </div>
                </div>`;
        }
    };
})();
