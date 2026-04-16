import 'package:go_router/go_router.dart';

import '../../modules/discovery/presentation/ui/pages/discovery_page.dart';
import '../../modules/discovery/presentation/ui/pages/near_me_page.dart';
import '../../modules/discovery/presentation/ui/pages/search_results_page.dart';
import '../ui/widgets/navigation/lb_app_shell.dart';

/// App-level router configuration.
/// Navigation pattern: Drawer (hamburger) + Avatar dropdown + Contextual FAB.
/// NO bottom tab bar (confirmed per PRD).
final GoRouter appRouter = GoRouter(
  initialLocation: '/',
  routes: [
    ShellRoute(
      builder: (context, state, child) => LbAppShell(child: child),
      routes: [
        GoRoute(
          path: '/',
          name: 'discovery',
          builder: (context, state) => const DiscoveryPage(),
        ),
        GoRoute(
          path: '/search',
          name: 'search',
          builder: (context, state) {
            final query = state.uri.queryParameters['q'] ?? '';
            return SearchResultsPage(query: query);
          },
        ),
        GoRoute(
          path: '/near-me',
          name: 'nearMe',
          builder: (context, state) => const NearMePage(),
        ),
      ],
    ),
  ],
);
