class AuthManager {
  constructor() {
    this.token = localStorage.getItem('token');
    this.sessionToken = localStorage.getItem('sessionToken');
    this.user = this._loadUser();
  }

  // Safely parse user from localStorage
  _loadUser() {
    try {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      
      localStorage.removeItem('user');
      return null;
    }
  }


  isAuthenticated() {
    return !!this.token;
  }

  // Check if user is subscribed
  isSubscribed() {
    return this.user && this.user.isSubscribed === 1;
  }

  // Get current user
  getUser() {
    return this.user;
  }

  // Get session token
  getSessionToken() {
    return this.sessionToken;
  }

  // Save token and user data (called on login/register)
  setAuth(token, sessionToken, user) {
    this.token = token;
    this.sessionToken = sessionToken || null;
    this.user = user;
    localStorage.setItem('token', token);

    if (this.sessionToken) {
      localStorage.setItem('sessionToken', this.sessionToken);
    } else {
      localStorage.removeItem('sessionToken');
    }

    localStorage.setItem('user', JSON.stringify(user));
  }

  updateUser(userData) {
    this.user = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  // Clear authentication ( on logout)
  clearAuth() {
    this.token = null;
    this.sessionToken = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('user');
  }

  // Get authorization headers for API calls
  getAuthHeader() {
    const headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    };

    if (this.sessionToken) {
      headers['X-Session-Token'] = this.sessionToken;
    }

    return headers;
  }

  // Redirect if not authenticated 
  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  }
}

// Create global instance
const auth = new AuthManager();
