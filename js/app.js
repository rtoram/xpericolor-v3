// app.js
const svg = document.getElementById('color-wheel');
const result = document.getElementById('result');
let baseColor = '#ff0000'; // Cor inicial

// Desenhar a roda de cores
function drawColorWheel() {
    const radius = 50;
    const center = 50;
    for (let i = 0; i < 360; i++) {
        const angle = (i * Math.PI) / 180;
        const x1 = center + radius * Math.cos(angle);
        const y1 = center + radius * Math.sin(angle);
        const x2 = center + (radius - 5) * Math.cos(angle);
        const y2 = center + (radius - 5) * Math.sin(angle);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M${center},${center} L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`);
        path.setAttribute('fill', `hsl(${i}, 100%, 50%)`);
        svg.appendChild(path);
    }
}

// Selecionar cor
svg.addEventListener('click', (e) => {
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left - 50;
    const y = e.clientY - rect.top - 50;
    const angle = Math.atan2(y, x) * (180 / Math.PI) + 180;
    baseColor = chroma.hsl(angle, 1, 0.5).hex();
    updateResult();
});

drawColorWheel();
