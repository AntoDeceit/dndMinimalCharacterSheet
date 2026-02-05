const STORAGE_KEY = "dndCharacterSheet";

const form = document.getElementById("character-form");
const clearBtn = document.getElementById("clear-btn");

// Charger les données au démarrage
function loadCharacter() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    Array.from(form.elements).forEach(el => {
      if (!el.name) return;
      if (data[el.name] !== undefined) {
        el.value = data[el.name];
      }
    });
  } catch (e) {
    console.error("Erreur de lecture du localStorage", e);
  }
}

// Sauvegarder les données
function saveCharacter() {
  const data = {};
  Array.from(form.elements).forEach(el => {
    if (!el.name) return;
    data[el.name] = el.value;
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Effacer la fiche
function clearCharacter() {
  if (!confirm("Effacer complètement la fiche ?")) return;
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

// Sauvegarde automatique à chaque changement
form.addEventListener("input", saveCharacter);
clearBtn.addEventListener("click", clearCharacter);

// Initialisation
loadCharacter();
