/*
 * ======================================================================================
 * Web Widgets: Button Stack
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

let global_button_stack_config = {};

//=======================================================================================
// Creates a widget for displaying a stack of buttons for left control columns
class ButtonStack {
    constructor(container_id, config, color, callback) {
        config["color_map"] = color;
        this.widget_id = this.gen_unique_id_from(container_id);
        this.config = config;
        global_button_stack_config[this.widget_id] = this.config;
        global_button_stack_config[this.widget_id]["callback"] = callback;
        this.id = container_id;

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
    // Generate CSS for this instance based on config attributes
    gen_css() {
        $(`#${this.id}`).css("font", `400 ${this.config.font_size}px/1.5 "Antonio", "Arial Narrow", "Avenir Next Condensed", sans-serif`);
        $(`.button-stack-${this.widget_id}`).css("width", `${this.config.width}px`);
        $(`.button-stack-${this.widget_id}`).css("height", `${this.config.height}px`);
        $(`.button-stack-${this.widget_id}`).css("margin-top", "5px");
        $(`.button-stack-${this.widget_id}`).css("border-radius", this.config.border_radius);
        $(`.button-stack-${this.widget_id}`).css("display", "flex");
        $(`.button-stack-${this.widget_id}`).css("flex-direction", "row");
        $(`.button-stack-${this.widget_id}`).css("align-items", "center");
        $(`.button-stack-${this.widget_id}`).css("justify-content", "flex-end");

        $(`.menu-text-${this.widget_id}`).css("text-align", "right");
        $(`.menu-text-${this.widget_id}`).css("font-weight", "700");
        $(`.menu-text-${this.widget_id}`).css("color", this.config.font_color);
        $(`.menu-text-${this.widget_id}`).css("margin-right", "15px");

        $(`.menu-icon-${this.widget_id}`).css("margin-right", "15px");
        let h = (this.config.font_size/15.5).toFixed(1);
        $(`.menu-icon-${this.widget_id}`).css("height", `${h}em`);

        let widget_id = this.widget_id;
        let config = this.config;
        $.each(this.config.button, function(index, button) {
            $(`#button-stack-${index}-${widget_id}`).css("background-color", config.color_map[button.color].hex);
        });
    }

    //===================================================================================
    // Generate the HTML in the container element
    gen_widget() {
        let id = this.id;
        let config = this.config;
        let widget_id = this.widget_id;
        $.each(this.config.button, function(index, button) {
            $(`#${id}`).append(`  <div id='button-stack-${index}-${widget_id}' class='button-stack-${widget_id} button-stack'></div>\n`);
            $(`#button-stack-${index}-${widget_id}`).append(`    <span id="menu-station-txt-${index}-${widget_id}" class="menu-text-${widget_id}">${button.txt}</span>\n`);
            $(`#button-stack-${index}-${widget_id}`).append(`    <img id="menu-station-icon-${index}-${widget_id}" class="menu-icon-${widget_id}" src="${button.icon}" alt="${button.txt}"/>\n`);
        });
    }

    //===================================================================================
    // Returns the index of the currently selected button (there can be only one)
    get_selected_button_index() {
        return this.config.selected_index;
    }

} /* class ButtonStack */

$(document).ready(function() {

    //--------------------------
    // Handle hover over buttons
    $(".button-stack").hover(function () {
        let id = this.id.split("-")[3];
        let index = this.id.split("-")[2];
        $(`#${this.id}`).css("cursor", "pointer");
        $(`#${this.id}`).css("background-color", global_button_stack_config[id].color_map[global_button_stack_config[id].hover_color].hex);
    }, function() {
        let id = this.id.split("-")[3];
        let index = this.id.split("-")[2];
        $(`#${this.id}`).css("cursor", "default");
        $(`#${this.id}`).css("background-color", global_button_stack_config[id].color_map[global_button_stack_config[id].button[index].color].hex);
    });

    //------------------------------------
    // Handle callback when button clicked
    $(".button-stack").click( function() {
        let index = parseInt(`${this.id}`.split("-")[2]);
        let id = `${this.id}`.split("-")[3]
        global_button_stack_config[id].callback.apply(this, [index]);
    });

});
