enum Flavor { dev, stage, prod }

class F {
  static late final Flavor appFlavor;

  static String get name => appFlavor.name;

  static String get title {
    switch (appFlavor) {
      case Flavor.dev:
        return 'LinkBeet Dev';
      case Flavor.stage:
        return 'LinkBeet Stage';
      case Flavor.prod:
        return 'LinkBeet';
    }
  }
}
