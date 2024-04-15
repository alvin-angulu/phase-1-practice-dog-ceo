console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const imageContainer = document.getElementById('dog-image-container');
  
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(imageUrl => {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.style.width = '200px';
          img.style.height = '200px';
          img.alt = 'Dog image';
          imageContainer.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
  
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const breedsList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');
  
    let breeds = {};
  
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        breeds = data.message;
        displayBreeds(breeds);
      })
      .catch(error => console.error('Error fetching breeds:', error));
  
    function displayBreeds(breeds) {
      breedsList.textContent = ''; // Clear existing breeds
      Object.keys(breeds).forEach(breed => {
        const li = document.createElement('li');
        li.textContent = breed;
        breedsList.appendChild(li);
      });
    }
  
    breedDropdown.addEventListener('change', (event) => {
      const selectedLetter = event.target.value;
      const filteredBreeds = Object.keys(breeds).filter(breed => breed.startsWith(selectedLetter));
      displayBreeds(filteredBreeds.reduce((obj, key) => ({...obj, [key]: breeds[key]}), {}));
    });
  });
  