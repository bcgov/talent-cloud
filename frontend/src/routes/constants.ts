import Unauthenticated from "@/pages/Unauthenticated";

export default Object.freeze({
  // Public routes
  Unauthorized: '/unauthorized',
  Unauthenticated: '/forbidden',
  Login: '/login',
  Dashboard: '/dashboard',
  MemberProfile: '/profile',
  Profile: '/profile/:profileId',
  SupervisorDashboard: '/supervisor', 
  Root: '/',
  Home: '/home',
  NotFound: '*',
});
