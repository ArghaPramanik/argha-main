



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

function displayImages(data){
    let out = "";

    for( let product of data){
        // console.log(product)

        out += `
               <div class='img-container' style="display: flex; flex-direction: column; border: 1px solid #ccc; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
               <img style="height: 450px; width: 300px; object-fit: cover" src = '${product.image_url}' >
                 <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; margin-bottom: 10px; " >
                    <p style="font-weight: bold;"> ${product.name} </P>
                    <p> ${product.specialty} </P>
                  </div>
               </div>
        `
        var container = document.getElementById('data-container');

        container.innerHTML = out;
    }
}

window.onload = imagesFromJSON;