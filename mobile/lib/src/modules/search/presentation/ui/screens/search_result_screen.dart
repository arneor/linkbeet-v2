import 'package:flutter/material.dart';
import 'package:linkbeet/src/core/theme/app_colors.dart';
import 'package:linkbeet/src/core/theme/app_sizes.dart';
import 'package:linkbeet/src/modules/search/data/search_mock_data.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/widgets/sr_app_bar.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/widgets/sr_filter_bar.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/widgets/sr_location_chip.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/widgets/sr_map_preview.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/widgets/sr_result_card.dart';
import 'package:linkbeet/src/modules/search/presentation/ui/widgets/sr_suggestions_section.dart';

class SearchResultScreen extends StatefulWidget {
  const SearchResultScreen({super.key, this.query = ''});

  final String query;

  @override
  State<SearchResultScreen> createState() => _SearchResultScreenState();
}

class _SearchResultScreenState extends State<SearchResultScreen> {
  late final TextEditingController _searchCtrl;
  int _activeFilter = 0;

  @override
  void initState() {
    super.initState();
    _searchCtrl = TextEditingController(
      text: widget.query.isNotEmpty ? widget.query : 'saloon near me',
    );
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.pageBg,
      appBar: SearchResultAppBar(controller: _searchCtrl),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SearchResultLocationChip(),
          SearchResultFilterBar(
            resultCount: kSearchResults.length,
            activeIndex: _activeFilter,
            onFilterTap: (i) => setState(() => _activeFilter = i),
          ),
          Expanded(
            child: CustomScrollView(
              slivers: [
                SliverToBoxAdapter(
                  child: SearchResultMapPreview(onExpandTap: () {}),
                ),
                SliverPadding(
                  padding: const EdgeInsets.only(top: AppSizes.xs),
                  sliver: SliverList(
                    delegate: SliverChildBuilderDelegate((context, index) {
                      if (index.isOdd) {
                        return const Divider(
                          height: 1,
                          color: AppColors.border,
                          indent: AppSizes.md,
                          endIndent: AppSizes.md,
                        );
                      }
                      return SearchResultCard(item: kSearchResults[index ~/ 2]);
                    }, childCount: (kSearchResults.length * 2) - 1),
                  ),
                ),
                const SliverToBoxAdapter(
                  child: SearchResultSuggestionsSection(),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
