(function() {
    window.Soberano = {
        async cura() {
            const st = document.getElementById('shield-status');
            const container = document.getElementById('app-content');
            
            if(st) { st.style.background = "#00ff00"; st.innerText = "SINC"; }
            
            // FORÇA A ESCRITA IMEDIATA DOS CARDS
            if(container) {
                container.innerHTML = `
                    <div style="text-align:left; animation: fadeIn 0.5s ease-in;">
                        <h2 style="font-size:24px; letter-spacing:-1px; margin-bottom:20px;">Radar de Viralização 🔥</h2>
                        
                        <div style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border-left:6px solid #00ff00; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                            <small style="color:#666; font-weight:bold;">#1 NO X BRASIL</small>
                            <h3 style="margin:10px 0; font-size:20px;">BBB26: Nova Prova</h3>
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span style="font-size:12px; color:#999;">🔥 240K INTERAÇÕES</span>
                                <span style="background:#ff3b30; color:#fff; padding:4px 10px; border-radius:12px; font-size:10px; font-weight:bold;">+98% HYPE</span>
                            </div>
                        </div>

                        <div style="background:#fff; border-radius:20px; padding:20px; margin-bottom:15px; border-left:6px solid #ff00ff; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
                            <small style="color:#666; font-weight:bold;">SUBS BR • EXCLUSIVO</small>
                            <h3 style="margin:10px 0; font-size:20px;">Virgínia: Novo Recorde</h3>
                            <p style="font-size:13px; color:#444;">Faturamento da nova live quebra a internet nas últimas 24h.</p>
                        </div>
                    </div>
                `;
            }
        }
    };
})();
