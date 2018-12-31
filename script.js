jQuery(document).ready(
    function() {
        //initialize variables for tracking event handlers
        var docclickhighlight = 0;
        var dockeydownhighlight = 0;
        var dockeyuphighlight = 0;
        var elclickselect = 0;
        var dockeydownselect = 0;

        //Turn on an event handler on the document if there is a click on keyboard, this will run
        jQuery(".keyboard").on("click.highlight", function(event) {
            docclickhighlight = 1;

            jQuery(document).on("keydown.highlight", function(event2) {
                dockeydownhighlight = 1;

                //stop a key from creating popups in browser
                event2.preventDefault();
                event2.stopPropagation();

                //get the key that has been pressed and the code for that key
                var keypressed = event2.key.toLowerCase();
                var keypressedcode = event2.keyCode;

                //get all of the keys on the keyboard
                var keys = jQuery(".letter");

                //loop through all of the keys on the layout, if the selected key is equal to the key id or the the key, then change background colors
                for(i = 0; i < keys.length; i++) {
                    //turn selected key to lowercase, grab the keyid and remove spaces from the key
                    var selectedkey = keys[i].innerHTML.toLowerCase();
                    var selectedkeyid = jQuery(keys[i]).attr("id");
                    selectedkey = selectedkey.replace(/\s/g, '');

                    //if the key id matches or the strings match
                    if ((selectedkeyid == keypressedcode) || (keypressed == selectedkey)) {
                        //highlight the key if it's white, or shade it if it's green
                        if(jQuery(keys[i]).parent().css("background-color") == "rgba(0, 0, 0, 0)") {
                            jQuery(keys[i]).parent().css("background-color","rgb(100, 181, 246)");
                        } else if(jQuery(keys[i]).parent().css("background-color") == "rgb(0, 150, 136)") {
                            jQuery(keys[i]).parent().css("background-color","rgba(0, 150, 136, 0.6)");
                        }
                    }
                }
            });

            //once the key is up, turn off the selected key (reverse background color changes)
            jQuery(document).on("keyup.highlight", function(event3) {
                dockeyuphighlight = 1;

                event3.preventDefault();
                event3.stopPropagation();

                var keys = jQuery(".letter");
                var keypressed = event3.key.toLowerCase();
                var keypressedcode = event3.keyCode;
                for(i = 0; i < keys.length; i++) {  
                    var selectedkey = keys[i].innerHTML.toLowerCase();
                    var selectedkeyid = jQuery(keys[i]).attr("id");
                    selectedkey = selectedkey.replace(/\s/g, '');
                    if ((selectedkeyid == keypressedcode) || (keypressed == selectedkey)) {
                        if(jQuery(keys[i]).parent().css("background-color") == "rgb(100, 181, 246)") {
                            jQuery(keys[i]).parent().css("background-color","rgba(0, 0, 0, 0)");
                        } else if(jQuery(keys[i]).parent().css("background-color") == "rgba(0, 150, 136, 0.6)") {
                            jQuery(keys[i]).parent().css("background-color","rgb(0, 150, 136)");
                        }
                    }
                }  
            });
        });

        //Turn on an event handler on the selection items, if there is click this will run.
        jQuery('[name="select"]').on("click.select",function(event) {

            event.stopPropagation();

            //turn off the event handlers from the keyboard layout
            jQuery(document).off("keyup.highlight");
            jQuery(document).off("keydown.highlight");
            var dockeydownhighlight = 0;
            var dockeyuphighlight = 0;
                
            //grab the keys in layout
            var keys = jQuery(".letter");

            //set styling for the clicked selection box
            var selectedelement = this;            
            jQuery(selectedelement).css("border","1px solid #E0E0E0").css("box-shadow","inset 0 0 1em white");

            //get the text in the current selection
            var currentselection = selectedelement.innerHTML;
            
            //if there is actually text in the selection, remove this one from the layout because it will be changed anyways
            if(currentselection != "") {
                for(i = 0; i < keys.length; i++) {
                    if(keys[i].innerHTML.toLowerCase() == currentselection) {
                        jQuery(keys[i]).parent().css("background-color","rgba(0, 0, 0, 0)");
                    }
                }
            }
            selectedelement.innerHTML = "";
            //attach an event handler to the document, if there is a keydown this will run
            jQuery(document).on("keydown.select", function (event2) {

                event2.preventDefault();
                event2.stopPropagation();

                var keypressed = event2.key.toLowerCase();

                //make the selection slot the key pressed
                jQuery(selectedelement).html(keypressed);

                //loop through keys in the layout
                for(j = 0; j < keys.length; j++) {
                    var selectedkey = keys[j].innerHTML.toLowerCase();
                    selectedkey = selectedkey.replace(/\s/g, '');

                    //if the selected key is equal to the one in the selection slot, change background color
                    if(selectedkey == keypressed) {
                        jQuery(keys[j]).parent().css("background-color","rgba(0, 150, 136, 1)");
                        //turn off the select hotkey to prevent others from being changed
                        jQuery(document).off("keydown.select");
                        var dockeydownselect = 0;
                    }
                }

                //grab the selection slots
                var selectionslots = jQuery("[name='select'");

                //
                for(i = 0; i < selectionslots.length; i++) {
                    if((selectionslots[i].innerHTML == keypressed) && (selectionslots[i] != selectedelement)) {
                        selectionslots[i].innerHTML = "";
                        jQuery(selectionslots[i]).css("border","1px solid black");
                    }
                }

                //reset the styling of the element
                jQuery(selectedelement).css("border","1px solid black").css("background-color","#616161").css("box-shadow","none").css("border-bottom","1px solid #E0E0E0"); 
            });

            //turn on a click handler on the document. if clicked, remove styling of the box
            jQuery(document).on("click.removehighlight", function(event3) {
                event3.stopPropagation();
                if (selectedelement.innerHTML == "") {
                    jQuery(selectedelement).css("border","1px solid black").css("background-color","#616161").css("box-shadow","none");
                }
            });
        });
    });