# Flip 3D SlideShow

Flip 3D SlideShow is a jQuery plugin for displaying images as a SlideShow on the browser.

This was an inspiration from the Flip 3D navigation present in the OS, Microsoft Windows Vista/7. 
Here, the images are lined up in 3D style and while navigating, there is animation and fading of the images in the background.
I created this to learn how to use the JavaScript framework, jQuery.

## Usage example

        // Call the method, `flip3d` from the container that has the images to be shown as slideshow.

        $(".container").flip3d();
		
        // You can also customize the animation and placement of the images by passing in the options.
        
        $('.container').flip3d({
            horOffset: 50,      // The horizontal offset of the image from previous image.(+ for moving images right, - for left)
            verOffset: -20,     // The vertical offset of the image from previous image.(+ for moving images bottom, - for top)
            imagesVisible: 8,   // Number of images visible at any one point
            speed: 500,         // Animation speed to slide the images
            fading: true        // Whether the images fade into the background
        });
        
        // For a complete example, check out the demo page.
        
## Developed by Venkata Giri Reddy :)
