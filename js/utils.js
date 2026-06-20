// Show error message
function showError(message, elementId = 'error-message') {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.display = 'none';
    }, 5000);
  } else {
    alert(message);
  }
}

// Show success message
function showSuccess(message, elementId = 'success-message') {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = 'block';
    setTimeout(() => {
      element.style.display = 'none';
    }, 3000);
  }
}

// Show loading state
function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = '<div class="loading">Loading...</div>';
  }
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Format time ago for sessions
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}

// Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate password strength
function isStrongPassword(password) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return re.test(password);
}

// Update navbar with user info
function updateNavbar() {
  const user = auth.getUser();
  const userNameElement = document.getElementById('user-name');
  const subscriptionBadge = document.getElementById('subscription-badge');

  if (userNameElement && user) {
    userNameElement.textContent = user.fullName || user.email;
  }

  if (subscriptionBadge && user) {
    subscriptionBadge.textContent = user.isSubscribed ? 'Premium' : 'Free';
    subscriptionBadge.className = user.isSubscribed ? 'badge-premium' : 'badge-free';
  }
}

async function logout() {
  try {
    await API.logout();
  } catch (e) {
  }
  auth.clearAuth();
  window.location.href = 'index.html';
}
