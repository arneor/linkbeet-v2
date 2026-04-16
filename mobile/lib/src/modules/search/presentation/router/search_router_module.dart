import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/screens/search_results_screen.dart';

part 'search_router_module.g.dart';

@TypedGoRoute<SearchResultsRoute>(path: AppRoutePath.search)
class SearchResultsRoute extends GoRouteData with $SearchResultsRoute {
  const SearchResultsRoute({this.query = ''});

  @override
  final String query;

  @override
  Widget build(BuildContext context, GoRouterState state) =>
      SearchResultsScreen(query: query);
}
