import 'dart:io';
import 'package:image/image.dart' as img;

// Generates a white-background, centered-logo splash image sized for
// Android 12+ splash circular mask (~40% content area within 1024px canvas).
void main() {
  final logoPath = 'assets/images/true-black-logo.png';
  final outPath = 'assets/images/native-splash-logo.png';

  final src = img.decodeImage(File(logoPath).readAsBytesSync())!;

  const canvasSize = 1024;
  const logoSize = 360;

  final canvas = img.Image(width: canvasSize, height: canvasSize, numChannels: 4);
  img.fill(canvas, color: img.ColorRgba8(255, 255, 255, 255));

  final resized = img.copyResize(src, width: logoSize, height: logoSize);
  img.compositeImage(
    canvas,
    resized,
    dstX: (canvasSize - logoSize) ~/ 2,
    dstY: (canvasSize - logoSize) ~/ 2,
  );

  File(outPath).writeAsBytesSync(img.encodePng(canvas));
  stdout.writeln('wrote $outPath (${canvasSize}x$canvasSize, logo=$logoSize)');
}
