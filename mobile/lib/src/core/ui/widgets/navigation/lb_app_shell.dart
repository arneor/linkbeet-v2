import 'package:flutter/material.dart';

import 'lb_app_bar.dart';
import 'lb_drawer.dart';

/// App shell wrapping all screens — drawer + app bar, NO bottom tab bar.
class LbAppShell extends StatelessWidget {
  final Widget child;

  const LbAppShell({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const LbAppBar(),
      drawer: const LbDrawer(),
      body: child,
    );
  }
}
