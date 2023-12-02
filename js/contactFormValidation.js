function validateForm(event) {
  event.preventDefault(); 
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();
  
  let errors = '';
  
  if (name.length < 5) {
    errors += 'Name should be more than 5 characters long.<br>';
  }
  
  if (!validateEmail(email)) {
    errors += 'Please enter a valid email address.<br>';
  }
  
  if (subject.length < 15) {
    errors += 'Subject should be more than 15 characters long.<br>';
  }
  
  if (message.length < 25) {
    errors += 'Message content should be more than 25 characters long.<br>';
  }
  
  const errorMessages = document.getElementById('errorMessages');
  errorMessages.innerHTML = errors;
  
  if (errors === '') {
    
    alert('Form submitted successfully!');
    document.getElementById('contactForm').reset(); 
  }
}

function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}