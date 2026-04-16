enum MediaKind { image, video }

enum MediaSource { gallery, camera }

class PickedMedia {
  const PickedMedia({required this.path, required this.kind});

  final String path;
  final MediaKind kind;
}

abstract class MediaPicker {
  Future<PickedMedia?> pick({
    required MediaKind kind,
    required MediaSource source,
  });
}
