// js/app.js

// Seletores principais
const btnCreatePalette = document.getElementById('btn-create-palette');
const btnSavePalette = document.getElementById('btn-save-palette');
const paletteContainer = document.getElementById('palette-container');
const librarySection = document.getElementById('library');
const savedPalettesDiv = document.getElementById('saved-palettes');

// Função para criar cores aleatórias
function generateRandomColor() {
  const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return randomColor;
}

// Função para criar uma nova paleta
function createPalette() {
  paletteContainer.innerHTML = ''; // Limpar paleta existente
  for (let i = 0; i < 5; i++) {
    const color = generateRandomColor();
    const colorBox = document.createElement('div');
    colorBox.className = 'color-box';
    colorBox.style.backgroundColor = color;
    colorBox.innerHTML = `
      <span>${color}</span>
      <span class="copy-icon" onclick="copyToClipboard('${color}')">📋</span>
    `;
    paletteContainer.appendChild(colorBox);
  }
}

// Função para salvar a paleta
function savePalette() {
  const palette = Array.from(paletteContainer.children).map(box => box.style.backgroundColor);
  const paletteName = prompt('Digite um nome para a paleta:');
  if (paletteName) {
    const savedPalettes = JSON.parse(localStorage.getItem('palettes') || '[]');
    savedPalettes.push({ name: paletteName, colors: palette });
    localStorage.setItem('palettes', JSON.stringify(savedPalettes));
    alert('Paleta salva com sucesso!');
    loadPalettes();
  }
}

// Função para carregar paletas da biblioteca
function loadPalettes() {
  savedPalettesDiv.innerHTML = '';
  const savedPalettes = JSON.parse(localStorage.getItem('palettes') || '[]');
  savedPalettes.forEach(palette => {
    const paletteDiv = document.createElement('div');
    paletteDiv.className = 'palette';
    paletteDiv.innerHTML = `
      <h3>${palette.name}</h3>
      <div>${palette.colors.map(color => `<span class="color-box" style="background-color: ${color};"></span>`).join('')}</div>
    `;
    savedPalettesDiv.appendChild(paletteDiv);
  });
}

// Função para copiar cor para a área de transferência
function copyToClipboard(color) {
  navigator.clipboard.writeText(color).then(() => {
    alert(`Cor ${color} copiada para a área de transferência!`);
  });
}

// Event Listeners
btnCreatePalette.addEventListener('click', createPalette);
btnSavePalette.addEventListener('click', savePalette);

// Inicializar biblioteca
loadPalettes();
