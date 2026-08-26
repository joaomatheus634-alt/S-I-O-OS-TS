// Copiar IP
function copyIP(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const original = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Copiado!
        `;
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = original;
        }, 2000);
    }).catch(() => {
        alert('Não foi possível copiar. Copie manualmente: ' + text);
    });
}

// Menu mobile
const menuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}

// Status real do servidor (usando mcsrvstat.us)
async function updateServerStatus() {
    const playerEl = document.getElementById('player-count');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    if (!playerEl) return;

    try {
        const res = await fetch('https://api.mcsrvstat.us/3/sd-br6.blazebr.com:26002');
        const data = await res.json();

        if (data.online) {
            const online = data.players?.online ?? 0;
            const max = data.players?.max ?? 100;
            playerEl.textContent = `${online} / ${max} jogadores`;
            if (statusText) statusText.textContent = 'Online';
            if (statusDot) {
                statusDot.style.background = '#00e676';
                statusDot.style.boxShadow = '0 0 10px #00e676';
            }
        } else {
            playerEl.textContent = 'Servidor offline';
            if (statusText) statusText.textContent = 'Offline';
            if (statusDot) {
                statusDot.style.background = '#ff5252';
                statusDot.style.boxShadow = '0 0 10px #ff5252';
            }
        }
    } catch (err) {
        playerEl.textContent = 'Não foi possível verificar';
        if (statusText) statusText.textContent = '—';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateServerStatus();
    // Atualiza a cada 60 segundos
    setInterval(updateServerStatus, 60000);
});
