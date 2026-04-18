import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/core/theme/app_spacing.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_appbar.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_logo_header.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_search_input.dart';
import 'package:linkbeet/src/modules/home/presentation/ui/widgets/ds_home_trending_list.dart';
import 'package:linkbeet/src/core/ui/widgets/lb_drawer.dart';
import 'package:linkbeet/src/modules/search/presentation/router/search_router_module.dart';

// Mirrors web/src/app/page.tsx TRENDING array
const _kTrending = [
  'Top-rated coffee shops near me',
  'Affordable salons open now',
  'Street food vendors around me',
  'Event photographers in the city',
  'Fitness trainers accepting clients',
  'Digital creators for brand promos',
  'Budget-friendly co-working spaces',
];

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
    _searchCtrl.addListener(() => setState(() {}));
    _searchFocus.addListener(() => setState(() {}));
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    _searchFocus.dispose();
    super.dispose();
  }

  void _handleSearch([String? query]) {
    final q = query ?? _searchCtrl.text;
    if (q.trim().isNotEmpty) {
      _searchFocus.unfocus();
      SearchRoute(q: q).push(context);
    }
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
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(
          AppSizes.md,
          0,
          AppSizes.md,
          AppSizes.xxl,
        ),
        child: Column(
          children: [
            AppSpacing.verticalGap24,
            const DsHomeLogoHeader(),
            AppSpacing.verticalGap32,
            DsHomeSearchInput(
              controller: _searchCtrl,
              focusNode: _searchFocus,
              isFocused: _searchFocus.hasFocus,
              onSearch: () => _handleSearch(),
            ),
            AppSpacing.verticalGap24,
            DsHomeTrendingList(
              items: _kTrending,
              onItemTap: (label) {
                _searchCtrl.text = label;
                _handleSearch(label);
              },
            ),
          ],
        ),
      ),
    );
  }
}
