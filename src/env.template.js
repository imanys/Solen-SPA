(function (window) {
  window.__env = window.__env || {};

  window.__env.apiUrl = 'http://localhost:5000/api';
  window.__env.isSigningUpEnabled = true;
  window.__env.wsEventsUrl = 'http://localhost:5000/ws/events';
  window.__env.whitelistedDomains = ['localhost:5000'];
  window.__env.blacklistedRoutes = [];
}(this));
