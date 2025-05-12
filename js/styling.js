/* ==========  Script qui remonte tous les jalons en fin de liste  ========== */

/* Déplace tous les jalons (g.task ayant un <polygon>) en fin de liste
   pour qu’ils passent visuellement AU-DESSUS des barres. */
document.addEventListener('DOMContentLoaded', () => {
  const moveMilestones = () => {
    const svg = document.querySelector('.chart svg');
    if (!svg) return;

    /* Parent contenant toutes les barres/tasks (varie selon la version) */
    const tasksGroup =
      svg.querySelector('g[id="tasks"]')     ||   // v10.x
      svg.querySelector('g.tasks')           ||   // fallback
      svg;                                        // dernier recours

    /* Tous les groupes <g> qui possèdent un losange (<polygon>) */
    const milestones = Array.from(
      svg.querySelectorAll('g.task')
    ).filter(g => g.querySelector('polygon'));

    /* On les remet à la fin ⇒ dessinés au premier plan */
    milestones.forEach(g => tasksGroup.appendChild(g));
  };

  /* Laisse le temps à Mermaid de générer le SVG (500 ms suffisent) */
  setTimeout(moveMilestones, 500);
});