//your code here
document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  const h = document.createElement('h3');
  const para = document.createElement('p');
  const resetButton = document.createElement('button');
  const verifyButton = document.createElement('button');

  let selectedImages = [];
  let images = [];
  let duplicateIndex = Math.floor(Math.random() * 5); // Randomly select an index for the duplicate

  // Create and append h3 tag
  h.id = 'h';
  h.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  main.appendChild(h);

  // Create and append reset button
  resetButton.id = 'reset';
  resetButton.textContent = 'Reset';
  resetButton.style.display = 'none'; // Hide by default
  resetButton.addEventListener('click', reset);
  main.appendChild(resetButton);

  // Create and append verify button
  verifyButton.id = 'verify';
  verifyButton.textContent = 'Verify';
  verifyButton.style.display = 'none'; // Hide by default
  verifyButton.addEventListener('click', verify);
  main.appendChild(verifyButton);

  // Function to generate random images with one duplicate
  function generateImages() {
    images = ['img1', 'img2', 'img3', 'img4', 'img5'];
    const duplicateImage = images[duplicateIndex];
    const shuffledImages = [...images, duplicateImage].sort(() => Math.random() - 0.5);
    shuffledImages.forEach((imgClass, index) => {
      const img = document.createElement('img');
      img.className = imgClass;
      img.dataset.index = index;
      img.addEventListener('click', handleImageClick);
      main.appendChild(img);
    });
  }

  // Function to handle image click
  function handleImageClick(e) {
    const img = e.target;
    if (selectedImages.includes(img)) return; // Prevent selecting the same image twice

    img.classList.add('selected');
    selectedImages.push(img);

    if (selectedImages.length === 2) {
      verifyButton.style.display = 'block';
    }

    resetButton.style.display = 'block';
  }

  // Function to reset the state
  function reset() {
    selectedImages.forEach(img => img.classList.remove('selected'));
    selectedImages = [];
    verifyButton.style.display = 'none';
    h.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
    para.remove();
  }

  // Function to verify the selected images
  function verify() {
    if (selectedImages[0].className === selectedImages[1].className) {
      para.id = 'para';
      para.textContent = 'You are a human. Congratulations!';
    } else {
      para.id = 'para';
      para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
    }
    main.appendChild(para);
    verifyButton.style.display = 'none';
  }

  // Initialize the images
  generateImages();
});

