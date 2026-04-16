import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/modules/home/presentation/router/home_router_module.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    );

    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));

    _controller.forward();

    // Navigate to home screen after delay
    _navigateToNext();
  }

  Future<void> _navigateToNext() async {
    await Future.delayed(const Duration(seconds: 3));
    if (mounted) {
      const HomeRoute().go(context);
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF512DF1),
      body: Center(
        child: FadeTransition(
          opacity: _fadeAnimation,
          child: Hero(
            tag: 'logo',
            child: Image.asset(AppAssets.splashLogo, width: 288, height: 288),
          ),
        ),
      ),
    );
  }
}
