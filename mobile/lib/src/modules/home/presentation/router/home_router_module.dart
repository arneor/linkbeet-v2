import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/screens/home_screen.dart';

part 'home_router_module.g.dart';

@TypedGoRoute<HomeRoute>(path: AppRoutePath.home)
class HomeRoute extends GoRouteData with $HomeRoute {
  const HomeRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) => const HomeScreen();
}
