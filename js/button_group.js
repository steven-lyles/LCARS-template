/*
 * ======================================================================================
 * Web Widgets: Button Group
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

let global_config = {};

//=======================================================================================
// Creates a widget for displaying a wrapping group array of buttons with callback action
class ButtonGroup {
    constructor(container_id, config, color, callback) {
        config["color_map"] = color;
        this.widget_id = this.gen_unique_id_from(container_id);
        this.config = config;
        global_config[this.widget_id] = this.config;
        global_config[this.widget_id]["callback"] = callback;
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
        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("flex-direction", "row");
        $(`#${this.id}`).css("align-items", "center");
        $(`#${this.id}`).css("justify-content", "right");
        $(`#${this.id}`).css("flex-wrap", "wrap");

        $(".button-group").css("margin-left", "10px");
        $(".button-group").css("display", "flex");
        $(".button-group").css("flex-direction", "row");
        $(".button-group").css("align-items", "center");
        $(".button-group").css("justify-content", "right");
        $(".button-group").css("padding-right", "20px");

        $(`.button-group-${this.widget_id}`).css("font", this.config.font);
        $(`.button-group-${this.widget_id}`).css("font-size", this.config.font_size);
        $(`.button-group-${this.widget_id}`).css("width", this.config.width);
        $(`.button-group-${this.widget_id}`).css("height", this.config.height );
        $(`.button-group-${this.widget_id}`).css("border-radius", this.config.border_radius);
        $(`.button-group-${this.widget_id}`).css("color", this.config.font_color);

        let bg_color = global_config[this.widget_id]["color_map"][this.config.background_color].hex;
        let active_color = global_config[this.widget_id]["color_map"] [this.config.active_color].hex;
        let inactive_color = global_config[this.widget_id]["color_map"] [this.config.inactive_color].hex;
        let global_id = this.widget_id;

        $.each(this.config.buttons, function(index, button) {
            if (index == global_config[global_id].selected_index) {
                $(`#button-group-${index}-${global_id}`).css("background-color", active_color);
                $(`#button-group-${index}-${global_id}`).css("font-weight", "bold");
            } else {
                $(`#button-group-${index}-${global_id}`).css("background-color", bg_color);
                $(`#button-group-${index}-${global_id}`).css("font-weight", "normal");
            }
            if (!button.active) {
                $(`#button-group-${index}-${global_id}`).css("background-color", inactive_color);
                $(`#button-group-${index}-${global_id}`).css("font-weight", "normal");
                $(`#button-group-${index}-${global_id}`).css("color", "#666688");
            }
        });
    }

    //===================================================================================
    // Generate the HTML in the container element
    gen_widget() {
        let default_index = this.config.default_index;
        let widget_id = this.widget_id
        let id = this.id;
        let config = this.config;
        $.each(this.config.buttons, function(index, value) {
            $(`#${id}`).append(`  <div id='button-group-${index}-${widget_id}' class='button-group-${widget_id} button-group'>${value.txt}</div>\n`);
        });
    }

    //===================================================================================
    // Activates the button at index if not already enabled
    activate_button(index) {
        if (!this.config.buttons[index].active) {
            let button_id = `#button-group-${index}-${this.widget_id}`;
            this.config.buttons[index].active = true;
            console.log();
            $(button_id).css("background-color", `${this.config.color_map[this.config.background_color].hex}`);
            $(button_id).css("box-shadow", `0px 0px 0px 3px ${this.config.color_map[this.config.background_color].hex} inset`);
            $(button_id).css("color", `${this.config.color_map[this.config.font_color].hex} `);
        }
    }

    //===================================================================================
    // Disables button at index if not already disabled
    deactivate_button(index) {
        if (this.config.buttons[index].active) {
            let button_id = `#button-group-${index}-${this.widget_id}`;
            if (this.config.selected_index == index) {
                alert(`${this.config.buttons[index].txt} is active!\nUnable to deactivate a selected button.\nPlease select another choice before deactivating`);
            } else {
                this.config.buttons[index].active = false;
                $(button_id).css("background-color", `${this.config.color_map[this.config.inactive_color].hex}`);
                $(button_id).css("box-shadow", `0px 0px 0px 3px ${this.config.color_map[this.config.inactive_color].hex} inset`);
                $(button_id).css("color", "#666688");
            }
        }
    }

    //===================================================================================
    // Returns the index of the currently selected button (there can be only one)
    get_selected_button_index() {
        return this.config.selected_index;
    }

} /* class ButtonGroup */

//=======================================================================================
// Callbacks for user events
$(document).ready(function() {

    //--------------------------
    // Handle hover over buttons
    $(".button-group").hover( function() {
        let id = `${this.id}`.split("-")[3]
        $(`#${this.id}`).css("cursor", "pointer");
        $(`#${this.id}`).css("background-color", `${global_config[id]["color_map"][global_config[id].hover_color].hex}`);
        $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px ${global_config[id]["color_map"][global_config[id].hover_outline].hex} inset`);
    }, function() {
        let id = `${this.id}`.split("-")[3]
        $(`#${this.id}`).css("cursor", "default");
        let index = parseInt(this.id.split("-")[2]);
        if (global_config[id].selected_index == index) {
            $(`#${this.id}`).css("background-color", `${global_config[id]["color_map"][global_config[id].active_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px ${global_config[id]["color_map"][global_config[id].active_color].hex} inset`);
        } else if (!global_config[id].buttons[index].active) {
            $(`#${this.id}`).css("background-color", `${global_config[id]["color_map"][global_config[id].inactive_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px ${global_config[id]["color_map"][global_config[id].inactive_color].hex} inset`);
        } else {
            $(`#${this.id}`).css("background-color", `${global_config[id]["color_map"][global_config[id].background_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px ${global_config[id]["color_map"][global_config[id].background_color].hex} inset`);
        }
    });

    //------------------------------------
    // Handle callback when button clicked
    $(".button-group").click( function() {
        let index = parseInt(`${this.id}`.split("-")[2]);
        let id = `${this.id}`.split("-")[3]
        if (global_config[id].buttons[index].active) {
            let old_selected_button_id = `#button-group-${global_config[id].selected_index}-${id}`
            $(old_selected_button_id).css("background-color", `${global_config[id]["color_map"][global_config[id].background_color].hex}`);
            $(old_selected_button_id).css("box-shadow", `0px 0px 0px 3px ${global_config[id]["color_map"][global_config[id].background_color].hex} inset`);
            $(old_selected_button_id).css("font-weight", "normal");
            global_config[id].selected_index = index;
            $(`#${this.id}`).css("background-color", `#${global_config[id]["color_map"][global_config[id].active_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px ${global_config[id]["color_map"][global_config[id].active_color].hex} inset`);
            $(`#${this.id}`).css("font-weight", "bold");

            global_config[id].callback.apply(this, [index]);
        } else {
            console.log(`${global_config[id].buttons[index].txt} is not active.`);
        }

    });
});