const galleries = {
  'playbook': { count: 20, ext: 'jpg' },
  'progress': { count: 9, ext: 'png' }, // use lowercase for data-gallery
  'taol': { count: 14, ext: 'jpg' }
};

const galleryModal = document.createElement('div');
galleryModal.className = 'gallery-modal';
galleryModal.innerHTML = `
  <span class="close">&times;</span>
  <img class="modal-img" src="" alt="Project Image">
  <div class="nav">
    <span class="prev">&#10094;</span>
    <span class="next">&#10095;</span>
  </div>
`;
document.body.appendChild(galleryModal);

const modalImg = galleryModal.querySelector('.modal-img');
const closeBtn = galleryModal.querySelector('.close');
const prevBtn = galleryModal.querySelector('.prev');
const nextBtn = galleryModal.querySelector('.next');

let currentGallery = '';
let currentIndex = 0;
let currentCount = 0;
let currentExt = '';

function showImage(index) {
  modalImg.src = `Images/${currentGallery}/${index + 1}.${currentExt}`;
}

document.querySelectorAll('.gallery-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    currentGallery = btn.dataset.gallery.toLowerCase(); // ensure lowercase
    const gallery = galleries[currentGallery];
    currentCount = gallery.count;
    currentExt = gallery.ext;
    currentIndex = 0;
    showImage(currentIndex);
    galleryModal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => galleryModal.style.display = 'none');

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentCount;
  showImage(currentIndex);
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentCount) % currentCount;
  showImage(currentIndex);
});

galleryModal.addEventListener('click', e => {
  if (e.target === galleryModal) galleryModal.style.display = 'none';
});

document.addEventListener('keydown', e => {
  if (galleryModal.style.display === 'flex') {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'Escape') closeBtn.click();
  }
});