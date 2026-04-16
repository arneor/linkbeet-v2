import 'package:flutter/material.dart';

/// Placeholder Search results page — will be replaced in Plan 03.
class SearchResultsPage extends StatelessWidget {
  final String query;

  const SearchResultsPage({super.key, required this.query});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text('Search results for: $query'),
    );
  }
}
