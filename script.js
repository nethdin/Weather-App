const cities = [
    { name: 'New York', key: 'nyc', timezone: 'America/New_York', color: '#FF6B6B' },
    { name: 'London', key: 'london', timezone: 'Europe/London', color: '#4ECDC4' },
    { name: 'Tokyo', key: 'tokyo', timezone: 'Asia/Tokyo', color: '#45B7D1' },
    { name: 'Sydney', key: 'sydney', timezone: 'Australia/Sydney', color: '#F7B731' },
    { name: 'Colombo', key: 'colombo', timezone: 'Asia/Colombo', color: '#6C5CE7' }
];

function createClockCard(city) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <div class="clock-header">
            <span class="city-name">${city.name}</span>
            <div class="color-indicator" style="background-color: ${city.color};"></div>
        </div>
        <div class="clock-time" style="color: ${city.color};" id="time-${city.key}"></div>
        <div class="clock-date" id="date-${city.key}"></div>
        <button class="comparison-button" onclick="toggleComparisons('${city.key}')">
            Show Comparisons
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </button>
        <div class="comparisons" id="comparisons-${city.key}" style="display: none;"></div>
    `;
    return card;
}

function updateTime() {
    const now = new Date();
    cities.forEach(city => {
        const cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.timezone }));
        document.getElementById(`time-${city.key}`).textContent = cityTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        document.getElementById(`date-${city.key}`).textContent = cityTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    });
}

function toggleComparisons(cityKey) {
    const comparisonsElement = document.getElementById(`comparisons-${cityKey}`);
    const button = comparisonsElement.previousElementSibling;
    
    if (comparisonsElement.style.display === 'none') {
        comparisonsElement.style.display = 'block';
        button.innerHTML = `
            Hide Comparisons
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
        `;
        updateComparisons(cityKey);
    } else {
        comparisonsElement.style.display = 'none';
        button.innerHTML = `
            Show Comparisons
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
        `;
    }
}

function updateComparisons(cityKey) {
    const comparisonsElement = document.getElementById(`comparisons-${cityKey}`);
    const cityTime = new Date(new Date().toLocaleString('en-US', { timeZone: cities.find(c => c.key === cityKey).timezone }));
    
    let comparisonsHTML = '';
    cities.forEach(otherCity => {
        if (otherCity.key !== cityKey) {
            const otherCityTime = new Date(new Date().toLocaleString('en-US', { timeZone: otherCity.timezone }));
            const timeDiff = (otherCityTime - cityTime) / (1000 * 60 * 60);
            comparisonsHTML += `
                <div class="comparison-item">
                    <span class="comparison-city">${otherCity.name}</span>
                    <span class="comparison-time" style="color: ${otherCity.color};">
                        ${timeDiff > 0 ? '+' : ''}${timeDiff.toFixed(1)} hours
                    </span>
                </div>
            `;
        }
    });
    
    comparisonsElement.innerHTML = comparisonsHTML;
}

function initializeClocks() {
    const container = document.getElementById('clock-container');
    cities.forEach(city => {
        container.appendChild(createClockCard(city));
    });
    updateTime();
    setInterval(updateTime, 1000);
}

document.addEventListener('DOMContentLoaded', initializeClocks);