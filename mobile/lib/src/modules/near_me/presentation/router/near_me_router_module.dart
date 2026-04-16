import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/near_me/presentation/ui/screens/near_me_screen.dart';

part 'near_me_router_module.g.dart';

@TypedGoRoute<NearMeRoute>(path: AppRoutePath.nearMe)
class NearMeRoute extends GoRouteData with $NearMeRoute {
  const NearMeRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) =>
      const NearMeScreen();
}
