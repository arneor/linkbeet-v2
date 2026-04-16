part of 'injection_container.dart';

/// [DI] is a service locator that provides a way to register and fetch instances of services and dependencies.
///
/// It is a wrapper around the GetIt package that provides a way to register and fetch instances of services and dependencies.
///

class DI {
  // The global service locator instance
  static final GetIt _locator = GetIt.instance;

  /// Access the service locator for advanced operations (like reset)
  static GetIt get locator => _locator;

  /// Fetch an instance of T
  static T fetch<T extends Object>() => _locator<T>();

  /// Register a synchronous instance of type T
  static void registerInstance<T extends Object>(T instance) {
    if (!_locator.isRegistered<T>()) {
      _locator.registerSingleton<T>(instance);
      if (kDebugMode) {
        print('Instance Type $T: ===> $instance created');
      }
    }
  }

  /// Register a lazy instance (factory on first call) of type T
  static void registerLazyInstance<T extends Object>(
    T Function() instanceFactory,
  ) {
    if (!_locator.isRegistered<T>()) {
      _locator.registerLazySingleton<T>(instanceFactory);
      if (kDebugMode) {
        print('Lazy Instance Type $T: ===> registered');
      }
    }
  }

  /// Unregister a previously registered instance of T
  static void unRegisterInstance<T extends Object>() {
    if (_locator.isRegistered<T>()) {
      _locator.unregister<T>();
      if (kDebugMode) {
        print('Instance $T has been removed.');
      }
    }
  }

  // Update Instance
  static void updateInstance<T extends Object>(T instance) {
    unRegisterInstance<T>();
    registerInstance<T>(instance);
  }

  // Reset the service locator
  static void reset() => _locator.reset();

  /// Registers the Firebase services with the service locator.
  ///
  /// This should be called in the main function of your app.
  ///
  /// The following services are registered:
  ///
  /// - [FirebaseAuth]
  /// - [FirebaseFirestore]

  ///
  /// The services are registered lazily, meaning the first time they are retrieved
  /// through [fetch], the instance will be created.
  static Future<void> registerFirebaseInstance() async {}

  /// [RegisterEnvConfiguration]
  ///
  /// Register all environment variables and configurations
  ///
  static Future<void> registerEnvConfiguration() async {}

  /// [RegisterAppStorage]
  ///
  /// Register all app storage
  static Future<void> registerAppStorage() async {
    // Register SharedPreferences
    final SharedPreferences sharedPreferences =
        await SharedPreferences.getInstance();
    registerInstance<SharedPreferences>(sharedPreferences);

    // Secure storage with Android and iOS options
    AndroidOptions getAndroidOptions() => const AndroidOptions();
    const IOSOptions iosOptions = IOSOptions(
      accessibility: KeychainAccessibility.first_unlock,
    );
    final FlutterSecureStorage secureStorage = FlutterSecureStorage(
      aOptions: getAndroidOptions(),
      iOptions: iosOptions,
    );
    registerInstance<FlutterSecureStorage>(secureStorage);
  }

  // Initialize all dependencies
  static Future<void> init() async {
    // Register Media Picker
    registerLazyInstance<MediaPicker>(() => ImagePickerMediaPicker());
    registerLazyInstance<PickMedia>(() => PickMedia(DI.fetch<MediaPicker>()));

    /// -------- > App DATA SOURCE < -------- ///

    /// --------> APP REPOSITORY < -------- ///

    /// --------> APP USE CASES < -------- ///

    /// --------> APP BLOC < -------- ///
  }

  // Dispose
  void dispose() => _locator.reset();
}
