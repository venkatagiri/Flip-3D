(function($){
$.fn.flip3d = function(options) {
   
    var defaults = {
        horOffset: 50,
        verOffset: -20,
        imagesVisible: 5,   // Number of images are visible in the browser
        fading: true,       // Images fade into the background
        speed: 500          // Animation speed
    }, o = $.extend(defaults, options);
   
    var container = this,
        images = $('img', container), 
        imagesTotal = images.size(),
        imgFirst = $('img:first', container).index(),
        imgLast = $('img:last', container).index()
        animationQueue = [], 
        isAnimating = 0,
        opacityInc = (o.fading)? 1/o.imagesVisible : 0,
        current = false;
   
    if(container.css('position') == "static")container.css('position', 'relative');
    
    return this.each(function() {
        // Set the initial positions for the images.
        images.each(function() {
            var $img = $(this), index = parseInt($img.index());
            (index == 0)? $img.addClass('current') : $img.addClass('visible');
            var op = 1-(index*opacityInc);
            
            $img.css({
                position: 'absolute',
                opacity: op,
                left: index*o.horOffset,
                top: index*o.verOffset,
                zIndex: imagesTotal-index
            });
        });
        
        // Controls to navigate through images
        var controls = $('<div />').css({position:'absolute',width:'200px','text-align':'center',top:'101%',left:'50%',marginLeft:'-100px',zIndex:30,backgroundColor: 'rgba(0,0,0,.5)'}),
            ctrl = $('<span />').css({cursor:'pointer',padding:'3px',margin:'0 5px', color: '#DDD'}),
            prev = ctrl.clone().html("PREV"),
            counter = ctrl.clone().html("1/"+imagesTotal),
            next = ctrl.clone().html("NEXT");
        controls.append(prev).append(counter).append(next);
        container.append(controls);
        
        // Add click listeners for the navigation buttons.
        prev.click(function() { animationQueue.push(1); });
        next.click(function() { animationQueue.push(-1); });
        images.click(function() {
            var $img = $(this);
            if($img.css('opacity') == 0) return; // If invisible images are clicked, don't slide to them.
            var i = current.index()-$img.index();
            while(i != 0) {
                animationQueue.push(-1);
                i++;
            }
        });
        
        $(window).keydown(function(e) {
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 37) animationQueue.push(1); // 37 is keyCode for LEFT arrow. 39 is for RIGHT.
            else if(code == 39) animationQueue.push(-1);
        });
        
        // slide function takes direction of moving images as argument. +1 for left and -1 for right.
        var slide = function(dir) {
            // Move all images left or right depending on the direction.
            var props = {left: '+='+(o.horOffset*dir), top: '+='+(o.verOffset*dir)},
                isNext = (dir<0)?true:false;
            images.each(function() {
                var $img = $(this);
                if($img.is('.current') || $img.next().is('.current')) {
                    // This image is either being hidden or being shown.
                    props.opacity = (isNext)?0:1;
                }
                else if($img.is('.visible')) {
                    // If opacity is enabled, we increase or decrease the opacity of the image.
                    props.opacity = '-='+(opacityInc*dir);
                }
                $img.animate(props, o.speed, function() {
                    isAnimating--;
                });
            });
            if(isNext) current.removeClass('current').next().attr('class', 'current');
            else current.attr('class', 'visible').prev().addClass('current');
        };
        
        // Every 50ms, we check the animationQueue. If it is not empty, we shift one element from the queue and slide in that direction.
        setInterval(function() {
            current = $('.current', container);
            
             // Update the counter in controls to show the current image(eg. 3/12)
            counter.html((parseInt(current.index())+1)+"/"+imagesTotal);

            // If we are sliding the images or if the animationQueue is empty, we just return.
            if(isAnimating > 0 || animationQueue.length == 0) return;

            var dir = animationQueue.shift();
            if(dir == 1 && current.index() == imgFirst) return; // We've reached the first image. So, stop sliding.
            if(dir == -1 && current.index() == imgLast) return; // We've reached the last image. So, stop sliding.

            slide(dir);
            isAnimating = imagesTotal; 
        }, 50);
   });
};
})(jQuery);