const registerForm = document.getElementById('registerForm');
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');

const setError = (element, message) => {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = message;
  errorElement.style.display = 'block';
  element.style.borderColor = '#f87171';
};

const clearError = (element) => {
  const errorElement = element.nextElementSibling;
  errorElement.innerText = '';
  errorElement.style.display = 'none';
  element.style.borderColor = 'transparent';
};

const validateRegister = () => {
  let isValid = true;

  if (registerUsername.value.trim().length < 3) {
    setError(registerUsername, 'El usuario debe tener al menos 3 caracteres');
    isValid = false;
  } else {
    clearError(registerUsername);
  }

  const emailVal = registerEmail.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  //RegEx para controlar ingreso de email
  if (!emailRegex.test(emailVal)){
    setError(registerEmail, 'Correo electrónico no válido');
    isValid = false;
  } else {
    clearError(registerEmail);
  }

  if (registerPassword.value.length < 6) {
    setError(registerPassword, 'La contraseña debe tener al menos 6 caracteres');
    isValid = false;
  } else {
    clearError(registerPassword);
  }

  if (registerConfirmPassword.value !== registerPassword.value || registerConfirmPassword.value === '') {
    setError(registerConfirmPassword, 'Las contraseñas no coinciden');
    isValid = false;
  } else {
    clearError(registerConfirmPassword);
  }

  return isValid;
};

registerForm.addEventListener('submit', e => {
  e.preventDefault();

  if (!validateRegister()) return;

  const userData = {
    username: registerUsername.value.trim(),
    email: registerEmail.value.trim(),
    password: registerPassword.value,
  };

  localStorage.setItem('user', JSON.stringify(userData));

  registerForm.reset();
 //alert('Registro exitoso, ya puedes iniciar sesión');

  Swal.fire("Registro exitoso");

  window.location.href = '../html/login.html';
});
