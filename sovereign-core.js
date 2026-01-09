/* 🛡️ VITRIN III - ENGINE SOBERANA V.4.0 */
(function() {
    window.Soberano = {
        setTabActive(id) {
            document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
            const btn = document.getElementById(id);
            if(btn) btn.classList.add('active');
        },

        // ABA 2: SUBS BR (Foco em Imagem e Impacto)
        async abaSubs() {
            this.setTabActive('btn-subs');
            const container = document.getElementById('app-content');
            const manual = JSON.parse(localStorage.getItem('noticia_manual'));
            let feedManual = "";

            if(manual && (Date.now() - manual.timestamp < 3600000)) {
                feedManual = `
                    <div class="card-fofoca" style="padding:0; overflow:hidden; border:1px solid var(--accent);">
                        <img src="${manual.img}" style="width:100%; height:220px; object-fit:cover;" onerror="this.src='https://via.placeholder.com/500x300/000/00ff00?text=VITRIN+III+SINAL'">
                        <div style="padding:20px;">
                            <span class="hype-badge" style="background:var(--accent); color:#000;">🚨 EXCLUSIVO</span>
                            <h3 style="margin-top:10px;">${manual.titulo}</h3>
                            <p>${manual.desc}</p>
                        </div>
                    </div>`;
            }

            container.innerHTML = `
                <span class="feed-label">Fluxo de Informação</span>
                ${feedManual}
                <div class="card-fofoca" style="padding:0; overflow:hidden; opacity:0.8;">
                    <div style="width:100%; height:180px; background:linear-gradient(45deg, #050505, #111); display:flex; align-items:center; justify-content:center; color:#222; font-weight:bold; font-size:24px;">VITRIN III</div>
                    <div style="padding:20px;">
                        <small style="color:var(--text-dim); font-weight:700;">BASTIDORES</small>
                        <h3>Monitoramento Ativo</h3>
                        <p>Aguardando novo sinal dos portais parceiros. O sistema está escaneando atualizações de subcelebridades.</p>
                    </div>
                </div>
            `;
        },

        async cura() { this.abaSubs(); }, // Inicia na Subs
        async abaCharts() { /* Mantenha o seu código de Charts aqui */ }
    };
})();
