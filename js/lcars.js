/*
 * ======================================================================================
 * LCARS object
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/LCARS-template
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';



//=======================================================================================
// Encapsulates the LCARS template
class Lcars {
    constructor(container_id, configuration) {
        let json = $.getJSON({'url': configuration, 'async': false});
        this.config = JSON.parse(json.responseText);
        json = $.getJSON({'url': "./config/color_map.json", 'async': false});
        this.color = JSON.parse(json.responseText);
        this.container_id = container_id;

        console.log(this.config.container_main.background);
        console.log(this.color.deepwoods.hex);

        // this.set_css_container_main();
    }

    // set_css_container_main() {
    //     $(`#${this.container_id}`).css("display", "flex");
    //     $(`#${this.container_id}`).css("flex-direction", "column");
    //     $(`#${this.container_id}`).css("height", "100%");
    //     $(`#${this.container_id}`).css("background", "pink");
    // }
} /* class Lcars */

//========================================================================================
// $(window).scroll(function() {
//     var height = $(window).scrollTop();
//     if (height > 100) {
//         $('.scroll-top a').fadeIn();
//     } else {
//         $('.scroll-top a').fadeOut();
//     }
// });



//========================================================================================
$(document).ready(function() {

    // $(".button").click(function() {
    //     var txt = $(this).text();
    //     $("#subject-title").text(txt);
    // });
    //
    // $("#button-home").click(function() {
    //     $("#subject-title").text("WELCOME");
    // });
});