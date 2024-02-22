function imagesFromJSON() {
    var cachedData = localStorage.getItem('imageData');
    if (cachedData) {
        displayImages(JSON.parse(cachedData));
    } else {
        fetch('doctors.json')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('imageData', JSON.stringify(data));
                displayImages(data);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }
}

function lazyLoadImages() {
    var images = document.querySelectorAll('.lazy-load');
    images.forEach(img => {
        if (img.getBoundingClientRect().top < window.innerHeight + 100) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
        }
    });
}

function displayImages(data) {
    var container = document.getElementById('data-container');
    var out = '';

    data.forEach(doctor => {
        out += `
            <div class='img-container lazy-load' style="display: flex; flex-direction: column; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <img class="lazy-load" style="height: 450px; width: 300px; object-fit: cover" data-src="${doctor.image_url}" alt="${doctor.name}">
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; margin-bottom: 10px;">
                    <p style="font-weight: bold;">${doctor.name}</p>
                    <p>${doctor.specialty}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = out;
    lazyLoadImages();
}

window.addEventListener('scroll', lazyLoadImages);
window.addEventListener('DOMContentLoaded', imagesFromJSON);
