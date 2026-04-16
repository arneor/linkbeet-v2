import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/foundation/app/presentation/ui/screens/splash_screen.dart';

part 'app_router_module.g.dart';

@TypedGoRoute<SplashRoute>(path: AppRoutePath.splash)
class SplashRoute extends GoRouteData with $SplashRoute {
  const SplashRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) =>
      const SplashScreen();
}
