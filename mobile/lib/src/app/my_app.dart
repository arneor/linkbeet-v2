import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:linkbeet/src/core/router/app_router.dart';
import 'package:linkbeet/src/core/theme/app_theme.dart';
import 'package:linkbeet/flavors.dart';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const AppView();
  }
}

class AppView extends StatelessWidget {
  const AppView({super.key});

  @override
  Widget build(BuildContext context) {
    return ScreenUtilInit(
      designSize: const Size(375, 812), // Standard mobile design size
      minTextAdapt: true,
      splitScreenMode: true,
      builder: (_, child) {
        return MaterialApp.router(
          title: F.title,
          debugShowCheckedModeBanner: false,

          // Router
          routerConfig: appRouter,

          // Theme — light mode only (DESIGN.md §9: "No dark mode")
          theme: AppTheme.lightTheme,
          themeMode: ThemeMode.light,
        );
      },
    );
  }
}
