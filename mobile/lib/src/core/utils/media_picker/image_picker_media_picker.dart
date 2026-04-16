import 'package:image_picker/image_picker.dart';
import 'package:linkbeet/src/core/utils/media_picker/media_picker.dart';

class ImagePickerMediaPicker implements MediaPicker {
  ImagePickerMediaPicker({ImagePicker? picker})
    : _picker = picker ?? ImagePicker();

  final ImagePicker _picker;

  @override
  Future<PickedMedia?> pick({
    required MediaKind kind,
    required MediaSource source,
  }) async {
    try {
      final imageSource = source == MediaSource.camera
          ? ImageSource.camera
          : ImageSource.gallery;

      final XFile? file;
      switch (kind) {
        case MediaKind.image:
          file = await _picker.pickImage(source: imageSource);
        case MediaKind.video:
          file = await _picker.pickVideo(source: imageSource);
      }

      if (file == null) return null;
      return PickedMedia(path: file.path, kind: kind);
    } catch (_) {
      return null;
    }
  }
}
