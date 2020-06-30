import config from '../../config.json';

export const useAuth0 = () => ({
  loading: false,
  user: { sub: config.auth0.testUserId },
  loginWithRedirect: () => true,
  isAuthenticated: true,
  logout: () => true,
});
