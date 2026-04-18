import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/foundation/app/presentation/router/app_router_module.dart'
    as splash_router;
import 'package:linkbeet/src/modules/home/presentation/router/home_router_module.dart'
    as home_router;
import 'package:linkbeet/src/modules/search/presentation/router/search_router_module.dart'
    as search_router;
import 'package:linkbeet/src/modules/near_me/presentation/router/near_me_router_module.dart'
    as near_me_router;

// This GlobalKey is used for the root navigator (e.g. for simple dialogs on top of everything)
final GlobalKey<NavigatorState> rootNavigatorKey = GlobalKey<NavigatorState>();

final GoRouter appRouter = GoRouter(
  navigatorKey: rootNavigatorKey,
  initialLocation: AppRoutePath.splash,
  debugLogDiagnostics: true,
  routes: [
    // splash screen
    ...splash_router.$appRoutes,

    // home / discovery screen
    ...home_router.$appRoutes,

    // search results screen
    ...search_router.$appRoutes,

    // near me screen
    ...near_me_router.$appRoutes,
  ],
  errorBuilder: (context, state) =>
      Scaffold(body: Center(child: Text('Error: ${state.error}'))),
);
