/* js/styling.js
   → Remonte tous les <rect class="milestone"> et leurs textes associés
     en fin du parent pour qu’ils soient dessinés au premier plan. */

(function() {
  let attempts = 0;
  const maxAttempts = 20;
  const delay       = 300; // ms entre chaque vérification

  const timer = setInterval(() => {
    attempts++;
    // 1️⃣ Récupérer le SVG Mermaid
    const svg = document.querySelector('.chart svg');
    if (!svg) {
      if (attempts >= maxAttempts) clearInterval(timer);
      return;
    }

    // 2️⃣ Lister tous les rectangles jalons
    const rects = Array.from(svg.querySelectorAll('rect.milestone'));
    if (rects.length === 0) {
      if (attempts >= maxAttempts) clearInterval(timer);
      return;
    }

    // 3️⃣ Pour chaque milestone, déplacer le rect ET son texte associé
    rects.forEach(rect => {
      const parent = rect.parentNode;
      parent.appendChild(rect);

      const text = svg.querySelector(`text#${rect.id}-text`);
      if (text) parent.appendChild(text);
    });

    // 4️⃣ Tout est déplacé → on arrête le polling
    clearInterval(timer);
  }, delay);
})();


/* js/removePipeMilestoneText.js */
(function() {
  const maxTries = 20;
  let tries = 0;

  const timer = setInterval(() => {
    tries++;
    const svg = document.querySelector('.chart svg') || document.querySelector('svg.mermaid');
    if (!svg) {
      if (tries >= maxTries) clearInterval(timer);
      return;
    }

    // Une fois le SVG prêt, on peut arrêter de poller
    clearInterval(timer);

    // 1️⃣ Sélectionne tous les <text class="milestoneText"> dans le SVG
    const nodes = svg.querySelectorAll('text.milestoneText');
    nodes.forEach(node => {
      const txt = node.textContent.trim();
      // 2️⃣ Si le contenu commence par '|', on vide
      if (txt.startsWith('|')) {
        console.log('remove ▶', txt);
        node.innerHTML = '';
      }
    });

  }, 250);
})();