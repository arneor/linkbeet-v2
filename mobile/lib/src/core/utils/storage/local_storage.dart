import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:shared_preferences/shared_preferences.dart';

/// [LocalStorage] is a generic class that provides a way to store and retrieve data from the local storage.
/// It uses the shared preferences package to store and retrieve data.
class LocalStorage<T> {
  LocalStorage(this.sharedPreferences, {required this.key});

  /// The shared preferences instance.
  final SharedPreferences sharedPreferences;

  /// The key to store the data.
  final String key;

  /// Set the value of a key in the local data source.
  Future<bool> set(T value) async {
    if (value is String) {
      return sharedPreferences.setString(key, value);
    } else if (value is int) {
      return sharedPreferences.setInt(key, value);
    } else if (value is double) {
      return sharedPreferences.setDouble(key, value);
    } else if (value is bool) {
      return sharedPreferences.setBool(key, value);
    } else if (value is List<String>) {
      return sharedPreferences.setStringList(key, value);
    } else {
      throw Exception('Type not supported');
    }
  }

  T? get() {
    if (T == String) {
      return sharedPreferences.getString(key) as T?;
    } else if (T == int) {
      return sharedPreferences.getInt(key) as T?;
    } else if (T == double) {
      return sharedPreferences.getDouble(key) as T?;
    } else if (T == bool) {
      return sharedPreferences.getBool(key) as T?;
    } else if (T == List<String>) {
      return sharedPreferences.getStringList(key) as T?;
    } else {
      throw Exception('Type not supported');
    }
  }

  /// Remove the value of a key in the local data source.
  Future<bool> remove() async {
    return sharedPreferences.remove(key);
  }
}

// FLutterSecureStorage
class LocalSecureStorage {
  LocalSecureStorage(this._secureStorage, {required this.key});

  final String key;
  final FlutterSecureStorage _secureStorage;

  // Write
  Future<void> write(String value) async {
    await _secureStorage.write(key: key, value: value);
  }

  // Read
  Future<String?> read() async {
    return _secureStorage.read(key: key);
  }

  // Delete
  Future<void> delete() async {
    await _secureStorage.delete(key: key);
  }
}
