// Function to fetch and display the list of animal names
function fetchAnimalList() {
  fetch('http://localhost:3000/characters')
    .then(response => response.json())
    .then(data => {
      const animalList = document.getElementById('animal-list');
      if (Array.isArray(data)) {
        data.forEach(animal => {
          const listItem = document.createElement('li');
          listItem.textContent = animal.name;
          listItem.addEventListener('click', () => showAnimalDetails(animal.id));
          animalList.appendChild(listItem);
        });
      } else {
        console.error('Invalid data structure. Expected an array.');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch and display the details of a specific animal
function showAnimalDetails(animalId) {
  fetch(`http://localhost:3000/characters/${animalId}`)
    .then(response => response.json())
    .then(data => {
      const animalDetails = document.getElementById('animal-details');
      if (data && data.id) {
        animalDetails.innerHTML = `<h2>${data.id}</h2><img src="${data.image}" alt="${data.name}"/><p>Votes: ${data.votes}</p>`;
        const voteButton = document.createElement('button');
        voteButton.textContent = 'Vote';
        voteButton.addEventListener('click', () => addVote(animalId));
        animalDetails.appendChild(voteButton);
      } else {
        console.error('Invalid data structure for animal details.');
      }
    })
    .catch(error => console.error('Error while fetching animal details:', error));
}

// Function to add a vote for a specific animal
function addVote(animalId) {
  // Define the URL for the vote endpoint on your server
  const voteUrl = `http://localhost:3000/vote/${animalId}`;

  fetch(voteUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}) // You can add data if needed for your API
  })
    .then(response => response.json())
    .then(updatedData => {
      // Update the displayed votes
      const votesElement = document.querySelector('#animal-details p');
      const currentVotes = parseInt(votesElement.textContent.split(' ')[1]);
      const newVotes = currentVotes + 1;
      votesElement.textContent = `Votes: ${newVotes}`;
    })
    .catch(error => console.error('Error while voting:', error));
}
// Initial call to fetch and display the animal list
fetchAnimalList();