import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:linkbeet_mobile/main.dart';

void main() {
  testWidgets('LinkBeetApp smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const LinkBeetApp());
    expect(find.byType(MaterialApp), findsOneWidget);
  });
}
