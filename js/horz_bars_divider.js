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
// Creates a widget for displaying an LCARS style horizontal bar line
class HorizontalBarsDivider {
    constructor(container_id, config, color) {
        this.config = config;
        this.config["color_map"] = color;
        this.id = container_id;
        this.widget_id = this.gen_unique_id_from(container_id);

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    // Creates a unique hash id for this widget instance based on the container id
    gen_unique_id_from(str) {
        let hash = Math.random() * (10 - 0) + 0;
        let i = 0;
        let char = "";

        if (str.length !== 0) {
            for (i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
        }
        return Math.abs(hash);
    }

    //===================================================================================
    gen_css() {
        let local_config = this.config;
        let local_color = this.config.color_map;
        let id = this.widget_id;

        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("height", this.config.height);

        $(".bar-half").css("display", "flex");
        $(".bar-half").css("flex-direction", "row");
        $(".bar-half").css("justify-content", "flex-start");

        $.each(this.config.bars, function(index, bar) {

            if (bar.flex) {
                $(`#bar-${id}-${index}`).css("flex", "1");
                $(`#bar-${id}-${index}`).css("transition", "width 1s");
            }
            if (bar.half) {
                $(`#bar-${id}-${index}`).css("height", `${local_config.height/2}px`);
                if (bar.location == "bottom") {
                    $(`#bar-${id}-${index}`).css("align-self", "flex-end"); // over-ride default of top (flex-start)
                }

            }
            $(`#bar-${id}-${index}`).css("width", bar.width);
            $(`#bar-${id}-${index}`).css("background", `${local_color[bar.color].hex}`);
            $(`#bar-${id}-${index}`).css("border-right", `${local_config.gap_size}px solid ${local_color[local_config.gap_color].hex}`);
        });
    }

    //===================================================================================
    gen_widget() {
        let id = this.id;
        let local_widget_id = this.widget_id;
        $.each(this.config.bars, function(index, value) {

            if (value.half) {
                $(`#${id}`).append(`<div id='bar-half${local_widget_id}-${index}' class='bar-half'></div>`);
                $(`#bar-half${local_widget_id}-${index}`).append(`<div id='bar-${local_widget_id}-${index}'></div>`);
            } else {
                $(`#${id}`).append(`<div id='bar-${local_widget_id}-${index}'></div>`);
            }
        });
    }


} /* class HorizontalDivider  */

