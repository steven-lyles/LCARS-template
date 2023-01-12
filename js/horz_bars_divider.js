/*
 * ======================================================================================
 * Web Widgets: Horizontal Bars Divider
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Collection of utility functions used by widget
class Utils {

    //===================================================================================
    // Generates a random hash based on a given string. This is used to create unique ids
    // to identify instances of the classes
    static gen_unique_id_from(str) {
        var hash = Math.random() * (10 - 0) + 0;
        var i = 0;
        var char = "";

        if (str.length !== 0) {
            for (i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
        }
        return Math.abs(hash);
    }
} // class Utils

//=======================================================================================
// Creates a widget for displaying an LCARS style horizontal bar line
class HorizontalBarsDivider {
    constructor(container_id, config) {
        this.config = config;
        this.id = container_id;
        this.widget_id = Utils.gen_unique_id_from(container_id);

        // Load the color map
        let json = $.getJSON({'url': "../config/color_map.json", 'async': false});
        this.color = JSON.parse(json.responseText);

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        let local_config = this.config;
        let local_color = this.color;
        let id = this.widget_id;

        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("height", this.config.height);

        $.each(this.config.bars, function(index, bar) {

            if (bar.flex) {
                $(`#bar-${id}-${index}`).css("flex", "1");
                $(`#bar-${id}-${index}`).css("transition", "width 1s");
            }
            if (bar.half) {
                $(`#bar-${id}-${index}`).css("height", `${local_config.height/2}px`);
            }
            $(`#bar-${id}-${index}`).css("width", bar.width);
            $(`#bar-${id}-${index}`).css("background", `#${local_color[bar.color].hex}`);
            $(`#bar-${id}-${index}`).css("border-right", `${local_config.gap_size}px solid #${local_color[local_config.gap_color].hex}`);
        });
    }

    //===================================================================================
    gen_widget() {
        let id = this.id;
        let local_widget_id = this.widget_id;
        $.each(this.config.bars, function(index, value) {
            $(`#${id}`).append(`<div id='bar-${local_widget_id}-${index}'></div>`);
        });
    }


} /* class HorizontalDivider  */
