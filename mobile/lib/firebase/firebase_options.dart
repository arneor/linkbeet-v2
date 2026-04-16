import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:linkbeet/firebase/firebase_options_dev.dart';
import 'package:linkbeet/firebase/firebase_options_prod.dart';
import 'package:linkbeet/firebase/firebase_options_stage.dart';
import 'package:linkbeet/flavors.dart';

class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    switch (F.appFlavor) {
      case Flavor.dev:
        return DevFirebaseOptions.currentPlatform;
      case Flavor.stage:
        return StageFirebaseOptions.currentPlatform;
      case Flavor.prod:
        return ProdFirebaseOptions.currentPlatform;
    }
  }
}
