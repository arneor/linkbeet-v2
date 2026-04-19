import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:linkbeet/src/core/router/app_routes.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/screens/industry_screen.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/screens/sign_in_screen.dart';
import 'package:linkbeet/src/modules/auth/presentation/ui/screens/sign_up_screen.dart';

part 'auth_router_module.g.dart';

@TypedGoRoute<SignInRoute>(path: AppRoutePath.signIn)
class SignInRoute extends GoRouteData with $SignInRoute {
  const SignInRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) => const SignInScreen();
}

@TypedGoRoute<SignUpRoute>(path: AppRoutePath.signUp)
class SignUpRoute extends GoRouteData with $SignUpRoute {
  const SignUpRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) => const SignUpScreen();
}

@TypedGoRoute<IndustryRoute>(path: AppRoutePath.industry)
class IndustryRoute extends GoRouteData with $IndustryRoute {
  const IndustryRoute();

  @override
  Widget build(BuildContext context, GoRouterState state) => const IndustryScreen();
}
