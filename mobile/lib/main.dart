import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:linkbeet/firebase/firebase_options.dart';
import 'package:linkbeet/src/app/my_app.dart';

// flutter run --flavor dev -t lib/main_dev.dart
// flutter run --flavor prod -t lib/main_prod.dart
// flutter run --flavor stage -t lib/main_stage.dart
Future<void> main() async {
  // Ensure binding is initialized if this is run directly (though flavor files do it too)
  WidgetsFlutterBinding.ensureInitialized();

  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  // Set preferred orientations
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  runApp(const MyApp());
}
