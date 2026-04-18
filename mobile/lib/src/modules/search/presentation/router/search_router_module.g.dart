// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_router_module.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [$searchRoute];

RouteBase get $searchRoute =>
    GoRouteData.$route(path: '/search', factory: $SearchRoute._fromState);

mixin $SearchRoute on GoRouteData {
  // ignore: unused_element
  static SearchRoute _fromState(GoRouterState state) =>
      SearchRoute(q: state.uri.queryParameters['q'] ?? '');

  String get q => ''; // overridden by concrete class

  @override
  String get location => GoRouteData.$location('/search', queryParams: {'q': q});

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
