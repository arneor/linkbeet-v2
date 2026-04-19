// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auth_router_module.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [$signInRoute, $signUpRoute, $industryRoute];

RouteBase get $signInRoute =>
    GoRouteData.$route(path: '/auth/signin', factory: $SignInRoute._fromState);

RouteBase get $signUpRoute =>
    GoRouteData.$route(path: '/auth/signup', factory: $SignUpRoute._fromState);

RouteBase get $industryRoute => GoRouteData.$route(
      path: '/auth/industry',
      factory: $IndustryRoute._fromState,
    );

mixin $SignInRoute on GoRouteData {
  static SignInRoute _fromState(GoRouterState state) => const SignInRoute();

  @override
  String get location => GoRouteData.$location('/auth/signin');

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

mixin $SignUpRoute on GoRouteData {
  static SignUpRoute _fromState(GoRouterState state) => const SignUpRoute();

  @override
  String get location => GoRouteData.$location('/auth/signup');

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}

mixin $IndustryRoute on GoRouteData {
  static IndustryRoute _fromState(GoRouterState state) => const IndustryRoute();

  @override
  String get location => GoRouteData.$location('/auth/industry');

  @override
  void go(BuildContext context) => context.go(location);

  @override
  Future<T?> push<T>(BuildContext context) => context.push<T>(location);

  @override
  void pushReplacement(BuildContext context) =>
      context.pushReplacement(location);

  @override
  void replace(BuildContext context) => context.replace(location);
}
