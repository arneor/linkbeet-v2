import 'package:flutter/material.dart';

/// The "Discover / Stories" stacked-card button fixed at top-right.
class DiscoverStoriesButton extends StatefulWidget {
  const DiscoverStoriesButton({super.key, this.onTap});

  final VoidCallback? onTap;

  @override
  State<DiscoverStoriesButton> createState() => _DiscoverStoriesButtonState();
}

class _DiscoverStoriesButtonState extends State<DiscoverStoriesButton> {
  bool _hovered = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      onTapDown: (_) => setState(() => _hovered = true),
      onTapUp: (_) => setState(() => _hovered = false),
      onTapCancel: () => setState(() => _hovered = false),
      child: SizedBox(
        width: 38,
        height: 38,
        child: Stack(
          clipBehavior: Clip.none,
          alignment: Alignment.center,
          children: [
            // Left card (image)
            // By specifying explicit width/height inside AnimatedPositioned,
            // we prevent any squishing deformation when using left/right offsets.
            AnimatedPositioned(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutBack,
              left: _hovered ? -7 : -4,
              top: _hovered ? -2 : 0,
              width: 38,
              height: 38,
              child: Transform.rotate(
                angle: _hovered ? -0.35 : -0.25, // Fanned out by default
                child: Container(
                  decoration: BoxDecoration(
                    color: const Color(0xFFE2E8F0),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white, width: 1.5),
                    image: const DecorationImage(
                      image: NetworkImage(
                        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=100&auto=format&fit=crop',
                      ),
                      fit: BoxFit.cover,
                      opacity: 0.9,
                    ),
                  ),
                ),
              ),
            ),
            // Right card (purple gradient)
            AnimatedPositioned(
              duration: const Duration(milliseconds: 300),
              curve: Curves.easeOutBack,
              left: _hovered ? 7 : 4,
              top: _hovered ? 5 : 3,
              width: 38,
              height: 38,
              child: Transform.rotate(
                angle: _hovered ? 0.35 : 0.25,
                child: Container(
                  decoration: BoxDecoration(
                    gradient: const LinearGradient(
                      begin: Alignment.topLeft,
                      end: Alignment.bottomRight,
                      colors: [Color(0xFF8B5CF6), Color(0xFFD946EF)], // Purple-to-pink gradient
                    ),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.white, width: 1.5),
                  ),
                ),
              ),
            ),
            // Front center card
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  color: const Color(0xFF0F172A), // Matches Tailwind slate-900 exactly
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: Colors.white, width: 2),
                  boxShadow: const [
                    BoxShadow(
                      color: Color(0x33000000),
                      blurRadius: 8,
                      offset: Offset(0, 2),
                    ),
                  ],
                ),
                child: Center(
                  child: SizedBox(
                    width: 18,
                    height: 18,
                    child: Stack(
                      clipBehavior: Clip.none,
                      children: [
                        // Custom painted send icon (so we perfectly match the web SVG dimensions)
                        Positioned.fill(
                          child: CustomPaint(
                            painter: _SendIconPainter(color: Colors.white),
                          ),
                        ),
                        // Dot perfectly aligned over the 'tip' of the custom icon
                        Positioned(
                          top: -2,
                          right: -2,
                          child: _PulsingDot(),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// Draws the exact Lucide/Feather "Send" polygon (3 11, 22 2, 13 21, 11 13, 3 11)
// Guaranteeing the tip is perfectly at the top-right.
class _SendIconPainter extends CustomPainter {
  final Color color;
  _SendIconPainter({required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..strokeWidth = 1.8
      ..style = PaintingStyle.stroke
      ..strokeJoin = StrokeJoin.round
      ..strokeCap = StrokeCap.round;

    final path = Path();
    final double sx = size.width / 24.0;
    final double sy = size.height / 24.0;

    path.moveTo(3 * sx, 11 * sy);
    path.lineTo(22 * sx, 2 * sy);
    path.lineTo(13 * sx, 21 * sy);
    path.lineTo(11 * sx, 13 * sy);
    path.close();

    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class _PulsingDot extends StatefulWidget {
  @override
  State<_PulsingDot> createState() => _PulsingDotState();
}

class _PulsingDotState extends State<_PulsingDot>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1200),
    )..repeat(reverse: true);
    // Smooth opacity pulse
    _anim = Tween<double>(begin: 0.5, end: 1.0).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _anim,
      child: Container(
        width: 8,
        height: 8,
        decoration: const BoxDecoration(
          color: Color(0xFF0F62FE), // Blue matching LinkBeet
          shape: BoxShape.circle,
        ),
      ),
    );
  }
}
