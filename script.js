document.addEventListener('DOMContentLoaded', () => {
    const services = [
        { name: "জাতীয় জরুরি সেবা", en: "National Emergency", number: "999", category: "সার্বজনীন", icon: "assets/emergency.png" },
        { name: "পুলিশ", en: "Police", number: "999", category: "পুলিশ", icon: "assets/police.png" },
        { name: "ফায়ার সার্ভিস", en: "Fire Service", number: "999", category: "ফায়ার", icon: "assets/fire-service.png" },
        { name: "অ্যাম্বুলেন্স", en: "Ambulance", number: "1994-999999", category: "স্বাস্থ্য", icon: "assets/ambulance.png" },
        { name: "নারী ও শিশু সহায়তা", en: "Women & Child Helpline", number: "109", category: "সহায়তা", icon: "assets/emergency.png" },
        { name: "দুদক", en: "Anti-Corruption", number: "106", category: "সরকারি", icon: "assets/emergency.png" },
        { name: "বিদ্যুৎ বিভ্রাট", en: "Electricity Outage", number: "16216", category: "বিদ্যুৎ", icon: "assets/emergency.png" },
        { name: "ব্র্যাক", en: "Brac", number: "16445", category: "এনজিও", icon: "assets/brac.png" },
        { name: "বাংলাদেশ রেলওয়ে", en: "Bangladesh Railway", number: "163", category: "পরিবহন", icon: "assets/Bangladesh-Railway.png" }
    ];

    const cardsContainer = document.getElementById('service-cards');
    const historyList = document.getElementById('history-list');
    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const copyCountEl = document.getElementById('copy-count');
    const clearHistoryBtn = document.getElementById('clear-history');

    let heartCount = 0;
    let coinCount = 100;
    let copyCount = 0;

    const renderCards = () => {
        cardsContainer.innerHTML = '';
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'card';
            // MODIFIED: Added SVG icons to buttons
            card.innerHTML = `
                <div class="card-header">
                    <div class="card-icon"><img src="${service.icon}" alt="${service.en}"></div>
                    <div class="heart-icon">♡</div>
                </div>
                <div class="card-body">
                    <h2>${service.name}</h2>
                    <p class="english-name">${service.en}</p>
                    <p class="number">${service.number}</p>
                    <p class="category">${service.category}</p>
                </div>
                <div class="card-buttons">
                    <button class="copy-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy
                    </button>
                    <button class="call-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                        Call
                    </button>
                </div>
            `;
            cardsContainer.appendChild(card);

            // Event Listeners for card buttons
            card.querySelector('.heart-icon').addEventListener('click', (e) => {
                heartCount++;
                heartCountEl.textContent = heartCount;
                e.target.textContent = '❤️'; 
                e.target.style.pointerEvents = 'none';
                e.target.style.cursor = 'default';
            });

         // Inside the .copy-btn event listener
card.querySelector('.copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(service.number).then(() => {
        alert(`Copied: ${service.number}`);
        copyCount++;
        // CORRECTED: This now correctly updates the number inside the span.
        document.getElementById('copy-count').textContent = copyCount;
    });
});
            card.querySelector('.call-btn').addEventListener('click', () => {
                if (coinCount >= 20) {
                    coinCount -= 20;
                    coinCountEl.textContent = coinCount;
                    alert(`Calling ${service.name} at ${service.number}`);
                    addToHistory(service.name, service.number);
                } else {
                    alert("Not enough coins to make a call!");
                }
            });
        });
    };

    const addToHistory = (name, number) => {
        const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div>
                <p><strong>${name}</strong></p>
                <p>${number}</p>
            </div>
            <span class="time">${time}</span>
        `;
        historyList.prepend(historyItem); // Using prepend to show latest call on top
    };

    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '';
    });
    
    document.getElementById('copy-count-btn').addEventListener('click', () => {
        const copyBtnText = document.getElementById('copy-count-btn');
        copyBtnText.innerHTML = `<span id="copy-count">${copyCount}</span> Copy`;
    });

    renderCards();
});