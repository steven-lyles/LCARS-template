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
        // json = $.getJSON({'url': "./config/color_map.json", 'async': false});
        this.colors = this.config.colors;
        this.container_id = container_id;

        console.log(this.colors["deep_woods"].hex);

        if (this.config.header) {
            this.gen_header();
            this.gen_header_css();
        } else {
            console.log("No header configured");
        }

        if (this.config.content) {
            console.log("Configuring Content");
        } else {
            console.log("No content configured");
        }

        let os = Utils.get_os();
        console.log(os);

    }

    // set_css_container_main() {
    //     $(`#${this.container_id}`).css("display", "flex");
    //     $(`#${this.container_id}`).css("flex-direction", "column");
    //     $(`#${this.container_id}`).css("height", "100%");
    //     $(`#${this.container_id}`).css("background", "pink");
    // }

    //===================================================================================
    gen_header() {
        $(`#${this.container_id}`).append("<div id='container-header' class='container-header'>");
        $(`#container-header`).append(`<div id='container-row-header' class='container-row'></div>`);
        $(`#container-row-header`).append(`<div id='frame-left-top' class='container-frame-left container-frame-left-top'>`)
        let logo = new Logo("frame-left-top", this.config.header.logo, this.colors);
        let time = new Now("frame-left-top", this.config.header.now, this.colors);
        $("#container-row-header").append("<div id='frame-right-top' class='container-frame-right'></div>");
        $("#frame-right-top").append("<div id='horz-divider-header'></div>");
        let horz_divider_header = new HorizontalBarsDivider("horz-divider-header", this.config.header.horz_divider_header, this.colors);

    }

    //===================================================================================
    gen_header_css() {

    }
} /* class Lcars */




//=======================================================================================
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