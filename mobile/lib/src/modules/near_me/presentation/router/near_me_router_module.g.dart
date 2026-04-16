// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'near_me_router_module.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [$nearMeRoute];

RouteBase get $nearMeRoute => GoRouteData.$route(
      path: '/near-me',
      factory: $NearMeRoute._fromState,
    );

mixin $NearMeRoute on GoRouteData {
  static NearMeRoute _fromState(GoRouterState state) => const NearMeRoute();

  @override
  String get location => GoRouteData.$location('/near-me');

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
