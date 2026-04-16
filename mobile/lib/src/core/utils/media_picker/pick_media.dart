import 'package:linkbeet/src/core/utils/media_picker/media_picker.dart';

class PickMedia {
  PickMedia(this._mediaPicker);

  final MediaPicker _mediaPicker;

  Future<PickedMedia?> call({
    required MediaKind kind,
    required MediaSource source,
  }) {
    return _mediaPicker.pick(kind: kind, source: source);
  }
}
