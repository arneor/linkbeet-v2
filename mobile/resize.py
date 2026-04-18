import sys
from Quartz import *
from Cocoa import *

def svg_to_png(svg_path, png_path, width):
    image = NSImage.alloc().initWithContentsOfFile_(svg_path)
    if not image: raise ValueError("Could not load SVG")
    size = image.size()
    aspect = size.height / size.width
    height = width * aspect

    new_size = NSMakeSize(width, height)
    rect = NSMakeRect(0, 0, width, height)
    
    out_image = NSImage.alloc().initWithSize_(new_size)
    out_image.lockFocus()
    
    NSGraphicsContext.currentContext().setImageInterpolation_(NSImageInterpolationHigh)
    image.drawInRect_fromRect_operation_fraction_(rect, NSZeroRect, NSCompositingOperationCopy, 1.0)
    
    rep = NSBitmapImageRep.alloc().initWithFocusedViewRect_(rect)
    out_image.unlockFocus()
    
    png_data = rep.representationUsingType_properties_(NSBitmapImageFileTypePNG, None)
    png_data.writeToFile_atomically_(png_path, True)

svg_to_png("assets/svg/linkbeet-text-logo.svg", "assets/images/text-logo.png", 900)
print("done")
