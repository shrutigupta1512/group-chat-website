document.getElementById('signup-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission from refreshing the page

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const password = document.getElementById('password').value.trim();

  if (name && email && phone && password) {
    // Create an object to send as JSON to the backend
    const userData = { name, email, phone, password };

    // Send a POST request to the backend
    fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert('Signup successful!');
          console.log(data); // Log the response from the server
          window.location.href = '/login.html'; // Redirect to login page
        } else {
          alert(`Error: ${data.error || 'Signup failed'}`);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during signup. Please try again later.');
      });
  } else {
    alert('Please fill in all fields');
  }
});
