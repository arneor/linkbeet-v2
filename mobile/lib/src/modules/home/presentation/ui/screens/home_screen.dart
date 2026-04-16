import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/constants/app_assets.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_appbar.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_search_input.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_trending_list.dart';
import 'package:linkbeet/src/core/ui/widgets/lb_drawer.dart';

// ── Trending data — mirrors web/src/app/page.tsx TRENDING array ───────────────
const _kTrending = [
  'Top-rated coffee shops near me',
  'Affordable salons open now',
  'Street food vendors around me',
  'Event photographers in the city',
  'Fitness trainers accepting clients',
  'Digital creators for brand promos',
  'Budget-friendly co-working spaces',
];

// ── HomeScreen ────────────────────────────────────────────────────────────────
class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchCtrl = TextEditingController();
  final FocusNode _searchFocus = FocusNode();
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    // Rebuild when text changes (to activate send button)
    _searchCtrl.addListener(() => setState(() {}));
    // Rebuild when focus changes (to update input border/shadow)
    _searchFocus.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      drawer: LbDrawer(
        currentPath: '/home',
        isLoggedIn: false,
        onClose: () => _scaffoldKey.currentState?.closeDrawer(),
      ),
      appBar: DsHomeAppBar(
        onMenuTap: () => _scaffoldKey.currentState?.openDrawer(),
      ),
      body: Column(
        children: [
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.only(
                top: 0,
                bottom: 40,
                left: 16,
                right: 16,
              ),
              child: Column(
                children: [
                  // Push hero area down slightly (~6vh equivalent)
                  const SizedBox(height: 24),
                  // ── Logo block ────────────────────────────────
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Hero(
                        tag: 'linkbeet-splash-logo',
                        child: Image.asset(
                          AppAssets.blackLogo,
                          width: 40,
                          height: 40,
                          fit: BoxFit.contain,
                        ),
                      ),
                      AppSpacing.horizontalGap12,
                      const Text(
                        'LinkBeet',
                        style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.w500,
                          color: AppColors.textPrimary,
                          letterSpacing: -0.5,
                          height: 1.0,
                        ),
                      ),
                    ],
                  ),
                  AppSpacing.verticalGap32,
                  // ── Search pill ───────────────────────────────
                  DsHomeSearchInput(
                    controller: _searchCtrl,
                    focusNode: _searchFocus,
                    isFocused: _searchFocus.hasFocus,
                  ),
                  AppSpacing.verticalGap24,
                  // ── Trending searches ─────────────────────────
                  DsHomeTrendingList(
                    items: _kTrending,
                    onItemTap: (label) {
                      _searchCtrl.text = label;
                      _searchFocus.unfocus();
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
