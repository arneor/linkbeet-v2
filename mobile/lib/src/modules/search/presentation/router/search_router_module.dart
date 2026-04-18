import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/screens/search_result_screen.dart';

part 'search_router_module.g.dart';

@TypedGoRoute<SearchRoute>(path: AppRoutePath.search)
class SearchRoute extends GoRouteData with $SearchRoute {
  const SearchRoute({this.q = ''});

  @override
  final String q;

  @override
  Widget build(BuildContext context, GoRouterState state) =>
      SearchResultScreen(query: q);
}
