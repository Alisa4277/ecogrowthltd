/* =========================================================
   ECOGROWTH LTD — Projects data, rendering, filtering, modal
   Replace the PROJECTS array below with real project data.
   ========================================================= */
const PROJECTS = [
  {
    id: 1,
    title: 'Herb Farming',
    category: 'greenhouses',
    categoryLabel: 'Greenhouse',
    location: 'Rwanda',
    type: 'Herb Farming',
    dimensions: '',
    description: 'A greenhouse herb farming project built for fresh herb production and installation support.',
    image: 'https://alisa237685.github.io/project/hero.jpeg'
  },
  {
    id: 3,
    title: 'Herb Farming',
    category: 'installation',
    categoryLabel: 'Installation',
    location: 'Nanyuki',
    type: 'Herb Farming',
    dimensions: '',
    description: 'Installation work for a Nanyuki herb farming greenhouse project.',
    image: 'assets/images/nanyuki.jpeg'
  },
  {
    id: 4,
    title: 'Wooden Greenhouse',
    category: 'greenhouses',
    categoryLabel: 'Greenhouse',
    location: 'Nakuru',
    type: 'Wooden Greenhouse',
    dimensions: '',
    description: 'A wooden greenhouse project developed for protected crop production in Nakuru.',
    image: 'assets/images/wooden.jpeg'
  },
  {
    id: 5,
    title: 'Retail Farming',
    category: 'shade-net',
    categoryLabel: 'Shade Net',
    location: 'Nanyuki',
    type: 'Retail Farming',
    dimensions: '15m x 10m',
    description: 'A shade-net retail farming structure designed for protected crop production and customer-facing produce growth.',
    image: 'assets/images/SHADENET.jpeg'
  },
  {
    id: 6,
    title: 'Herb Farming',
    category: 'installation',
    categoryLabel: 'Installation',
    location: 'Nyeri',
    type: 'Herb Farming',
    dimensions: '',
    description: 'Installation project for a herb farming greenhouse operation in Nyeri.',
    image: 'assets/images/service.jpeg'
  }
];

document.addEventListener('DOMContentLoaded', function () {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;

  /* --- Render cards from PROJECTS --- */
  function renderProjects(list) {
    grid.innerHTML = list.map(p => `
      <div class="project-card reveal in-view" data-id="${p.id}" data-category="${p.category}">
        <div class="project-card__media">
          <img src="${p.image}" alt="${p.title}">
        </div>
        <div class="project-card__body">
          <div class="project-card__tag">${p.categoryLabel}</div>
          <h3>${p.title}</h3>
          <div class="project-card__meta">${p.location} · ${p.dimensions}</div>
          <div class="project-card__link">View Project →</div>
        </div>
      </div>
    `).join('');
    attachCardHandlers();
  }

  /* --- Filtering --- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);
      renderProjects(filtered);
    });
  });

  /* --- Modal --- */
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalDescription = document.getElementById('modalDescription');
  const modalLocation = document.getElementById('modalLocation');
  const modalType = document.getElementById('modalType');
  const modalDimensions = document.getElementById('modalDimensions');

  function openModal(project) {
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.type;
    modalDescription.textContent = project.description;
    modalLocation.textContent = project.location;
    modalType.textContent = project.type;
    modalDimensions.textContent = project.dimensions;
    modal.classList.add('open');
  }

  function attachCardHandlers() {
    grid.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const project = PROJECTS.find(p => p.id === Number(card.dataset.id));
        if (project) openModal(project);
      });
    });
  }

  if (modalClose) modalClose.addEventListener('click', () => modal.classList.remove('open'));
  if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

  renderProjects(PROJECTS);
});
