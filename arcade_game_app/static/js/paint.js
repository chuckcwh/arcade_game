$(document).ready(function(){
    // We name this variable with a dollar sign to indicate that it represents a jQuery object
    var $canvas = $('canvas');
    // .getContext('2d') is required to modify the canvas element
    var context = document.getElementsByTagName('canvas')[0].getContext("2d");
    var painting = false;
    var clickX = [];
    var clickY = [];
    var clickDrag = [];
    var definedColors = [
        "#000000", // black
        "#0000FF", // blue
        "#FFFF00", // yellow
        "#FF0000" // red
    ];
    var currentColor = definedColors[0];
    var clickColor = [];

    var addColorBox = function(color){
        $('#colors').append(
            '<div class="color_choice" style="background-color:' + color + '"></div>'
        );
    };

    var prepCanvas = function(){
        for (var i=0; i<definedColors.length; i++) {
            // Add each pre-defined color to the page
            addColorBox(definedColors[i]);
        };
    };

    var addCustomColor = function(){
        $('button#add_color').on('click', function(){
            addColorBox($('#color_field').val());
        });
    };

    var selectColor = function(){
        // This is a different way of creating a click handler
        // Because this code runs when the document is ready, 
        // we can't do $('color_choice').on('click')
        // Why? Because when the document is ready, some of the
        // potential color boxes have not yet loaded (e.g.,
        // the custom color boxes added by the user).
        // Instead, we can add a click listener on the body element,
        // which further specifies which descendants trigger the 
        // event.
        $('body').on('click', '.color_choice', function(e){
            // We can't use `this` here to specify which box we clicked
            // on because right now `this` would be $('body'), NOT
            // the specific item clicked. However, event handlers
            // can be passed an event argument, which has a `target`
            // attribute specifying what triggered the event
            currentColor = $(e.target).css('background-color');
        });
    };

    var reset = function(){
        // To reset or clear a canvas element, all you need to do is set the width or height attribute
        canvas.width = canvas.width;
    };

    var addClick = function(x, y, dragging){
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        clickColor.push(currentColor);
    };

    var paint = function(){
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i=0; i < clickX.length; i++) {
            context.beginPath();
            // If a line was drawn, start from the spot before this
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i-1], clickY[i-1]);
            } 
            // Else if a single point was drawn, start from one pixel to the left
            // This is a bit of hack. Canvas expects you to draw a line, so we
            // are drawing a 1px line to represent a point
            else {
                context.moveTo(clickX[i]-1, clickY[i]);
            }
            // Draw until the current spot
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        };
    };

//    color picker
    $('.css').click(function()
	{
		/*
			we have given jquiCSS id to link tag inside head section
			below code replace old css with selected css.
		*/
        $('#jquiCSS').attr('href','http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/'+this.innerHTML+'/jquery-ui.css');
    });

	// Events demo

	// Instanciate colorpickers
	$('#cpBoth').colorpicker();

    $('#cpFocus').colorpicker(
	{
		/*
			showOn (String) default : both
			Have the colorpicker appear automatically
			when the field receives focus ("focus"),
		*/
		showOn:'focus'
	});

    $('#cpButton').colorpicker(
	{
		/*
			showOn (String) default : both
			appear only when a button is clicked ("button"),
		*/
		showOn:'button'
	});

	$('#cpDiv').colorpicker(
	{
		/*
			Used to set the default color value.
		*/
		color:'#31859b'
	});

	$('#getVal').click(function()
	{
		/*
			.colorpicker("val");
			User to get or set the currently selected color value
			(as a string, ie. "#d0d0d0").
		*/
		alert($('#cpDiv').colorpicker("val"));
	});

    $("#mycolor").colorpicker({color: "#ffffff"});



    prepCanvas();
    addCustomColor();
    selectColor();

    // This represents the start of someone drawing
    $canvas.on('mousedown', function(e){
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;
              
        painting = true;
        addClick(mouseX, mouseY);
        paint();
    });

    // This is while someone is drawing
    $canvas.on('mousemove', function(e){
        if (painting) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            paint();
        }
    });

    // When someone stops drawing
    $canvas.on('mouseup', function(e){
        painting = false;
    });

});