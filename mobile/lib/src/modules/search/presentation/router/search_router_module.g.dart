// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'search_router_module.dart';

// **************************************************************************
// GoRouterGenerator
// **************************************************************************

List<RouteBase> get $appRoutes => [$searchResultsRoute];

RouteBase get $searchResultsRoute => GoRouteData.$route(
      path: '/search',
      factory: $SearchResultsRoute._fromState,
    );

mixin $SearchResultsRoute on GoRouteData {
  String get query; // abstract — provided by SearchResultsRoute

  static SearchResultsRoute _fromState(GoRouterState state) =>
      SearchResultsRoute(
        query: state.uri.queryParameters['query'] ?? '',
      );

  @override
  String get location => GoRouteData.$location(
        '/search',
        queryParams: <String, String>{'query': query},
      );

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
