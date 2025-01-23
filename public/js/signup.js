// Handle form submission
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page
  
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
  
    // Validate fields
    if (!name || !email || !phone || !password) {
      alert('Please fill in all fields!');
      return;
    }
  
    // Placeholder for actual signup logic
    alert(`Welcome, ${name}! Your signup is successful.`);
  });
  