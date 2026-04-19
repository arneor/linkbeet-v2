abstract class AppRouteName {
  static const home = 'home';
  static const search = 'search';
  static const nearMe = 'nearMe';
  static const signIn = 'signIn';
  static const signUp = 'signUp';
  static const industry = 'industry';
}

abstract class AppRoutePath {
  // Initial
  static const splash = '/';

  // Home
  static const home = '/home';

  // Search
  static const search = '/search';

  // Near Me
  static const nearMe = '/near-me';

  // Auth
  static const signIn = '/auth/signin';
  static const signUp = '/auth/signup';
  static const industry = '/auth/industry';
}
