const portfolio = document.getElementById('portfolio');

// Load all artworks from the JSON file
async function loadArtworks() {
    console.log("Loading artworks from images.json");

    try {
        const response = await fetch('images.json'); // Fetch the JSON file
        const data = await response.json();
        
        for (const folder in data) {
            const images = data[folder];
            if (images.length > 0) {
                displayArtwork(folder, images);
            } else {
                console.warn(`No images found for folder: ${folder}`);
            }
        }
    } catch (error) {
        console.error("Error loading images.json:", error);
    }
}

function displayArtwork(title, images) {
    console.log(`Displaying artwork: ${title}`);
    
    const artworkDiv = document.createElement('div');
    artworkDiv.classList.add('artwork');
    
    // Main image container
    const mainImageContainer = document.createElement('div');
    mainImageContainer.classList.add('main-image-container');
    
    // Main image
    const mainImage = document.createElement('img');
    mainImage.src = images[0]; // Display the first image initially
    mainImage.alt = `${title} Main Image`;
    mainImage.classList.add('main-image');

    // Arrow controls
    const leftArrow = document.createElement('div');
    leftArrow.classList.add('arrow');
    leftArrow.id = 'left-arrow';
    leftArrow.innerHTML = '&#9664;';
    
    const rightArrow = document.createElement('div');
    rightArrow.classList.add('arrow');
    rightArrow.id = 'right-arrow';
    rightArrow.innerHTML = '&#9654;';
    
    // Image navigation logic
    let currentImageIndex = 0;

    rightArrow.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        mainImage.src = images[currentImageIndex];
    });

    leftArrow.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        mainImage.src = images[currentImageIndex];
    });

    // Assemble the artwork item
    mainImageContainer.appendChild(leftArrow);
    mainImageContainer.appendChild(mainImage);
    mainImageContainer.appendChild(rightArrow);
    artworkDiv.appendChild(mainImageContainer);
    
    // Append to portfolio
    portfolio.appendChild(artworkDiv);
}

// Load the artworks on page load
loadArtworks();
