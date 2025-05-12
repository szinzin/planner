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
