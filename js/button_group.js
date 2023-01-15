/*
 * ======================================================================================
 * Web Widgets: Button Stack
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

let global_config = {};
let global_id = 0;
let button_group_json = $.getJSON({'url': "../config/color_map.json", 'async': false});
let button_group_color = JSON.parse(button_group_json.responseText);

//=======================================================================================
// Creates a widget for displaying a wrapping group array of buttons with actions
class ButtonGroup {
    constructor(container_id, config, callback) {
        this.config = config;
        global_config = config;
        this.id = container_id;
        this.widget_id = this.gen_unique_id_from(container_id);
        global_id = this.widget_id;
        global_config["callback"] = callback;

        this.gen_widget();
        this.gen_css();
    }

    gen_unique_id_from(str) {
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

    //===================================================================================
    gen_css() {
        $(`#${this.id}`).css("flex-wrap", "wrap");
        $(`.button-group-${this.widget_id}`).css("font", this.config.font);
        $(`.button-group-${this.widget_id}`).css("font-size", this.config.font_size);
        $(`.button-group-${this.widget_id}`).css("width", this.config.width);
        $(`.button-group-${this.widget_id}`).css("height", this.config.height );
        $(`.button-group-${this.widget_id}`).css("margin-left", "10px");
        $(`.button-group-${this.widget_id}`).css("border-radius", this.config.border_radius);
        $(`.button-group-${this.widget_id}`).css("display", "flex");
        $(`.button-group-${this.widget_id}`).css("flex-direction", "row");
        $(`.button-group-${this.widget_id}`).css("align-items", "center");
        $(`.button-group-${this.widget_id}`).css("justify-content", "right");
        $(`.button-group-${this.widget_id}`).css("color", this.config.font_color);
        $(`.button-group-${this.widget_id}`).css("padding-right", "20px");

        let bg_color = button_group_color[this.config.background_color].hex;
        let active_color = button_group_color[this.config.active_color].hex;
        let inactive_color = button_group_color[this.config.inactive_color].hex;

        $.each(this.config.buttons, function(index, button) {
            if (index == global_config.selected_index) {
                $(`#button-group-${index}-${global_id}`).css("background-color", `#${active_color}`);
                $(`#button-group-${index}-${global_id}`).css("font-weight", "bold");
            } else {
                $(`#button-group-${index}-${global_id}`).css("background-color", `#${bg_color}`);
                $(`#button-group-${index}-${global_id}`).css("font-weight", "normal");
            }
            if (!button.active) {
                $(`#button-group-${index}-${global_id}`).css("background-color", `#${inactive_color}`);
                $(`#button-group-${index}-${global_id}`).css("font-weight", "normal");
                $(`#button-group-${index}-${global_id}`).css("color", `#${button_group_color["battleship"].hex}`);
            }
        });
    }

    //===================================================================================
    gen_widget() {
        let default_index = this.config.default_index;
        let widget_id = this.widget_id
        let id = this.id;
        let config = this.config;
        $.each(this.config.buttons, function(index, value) {
            $(`#${id}`).append(`  <div id='button-group-${index}-${widget_id}' class='button-group-${widget_id}'>${value.txt}</div>\n`);
        });
    }

    activate_button(index) {
        if (!this.config.buttons[index].active) {
            let button_id = `#button-group-${index}-${this.widget_id}`;
            this.config.buttons[index].active = true;
            console.log();
            $(button_id).css("background-color", `#${button_group_color[this.config.background_color].hex}`);
            $(button_id).css("box-shadow", `0px 0px 0px 3px #${button_group_color[this.config.background_color].hex} inset`);
            $(button_id).css("color", `#${button_group_color[this.config.font_color].hex} `);
        }
    }

    deactivate_button(index) {
        if (this.config.buttons[index].active) {
            let button_id = `#button-group-${index}-${this.widget_id}`;
            if (this.config.selected_index == index) {
                alert(`${this.config.buttons[index].txt} is active!\nUnable to deactivate a selected button.\nPlease select another choice before deactivating`);
            } else {
                this.config.buttons[index].active = false;
                $(button_id).css("background-color", `#${button_group_color[this.config.inactive_color].hex}`);
                $(button_id).css("box-shadow", `0px 0px 0px 3px #${button_group_color[this.config.inactive_color].hex} inset`);
                $(button_id).css("color", `#${button_group_color["battleship"].hex}`);
            }
        }
    }

} /* class Now */

//=======================================================================================
// Callbacks for user events
$(document).ready(function() {

    //--------------------------
    // Handle hover over buttons
    $(`.button-group-${global_id}`).hover( function() {
        $(`#${this.id}`).css("cursor", "pointer");
        $(`#${this.id}`).css("background-color", `#${button_group_color[global_config.hover_color].hex}`);
        $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px #${color[global_config.hover_outline].hex} inset`);
    }, function() {
        $(`#${this.id}`).css("cursor", "default");
        let index = parseInt(this.id.split("-")[2]);
        if (global_config.selected_index == index) {
            $(`#${this.id}`).css("background-color", `#${button_group_color[global_config.active_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px #${color[global_config.active_color].hex} inset`);
        } else if (!global_config.buttons[index].active) {
            $(`#${this.id}`).css("background-color", `#${button_group_color[global_config.inactive_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px #${color[global_config.inactive_color].hex} inset`);
        } else {
            $(`#${this.id}`).css("background-color", `#${button_group_color[global_config.background_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px #${color[global_config.background_color].hex} inset`);
        }
    });

    //------------------------------------
    // Handle callback when button clicked
    $(`.button-group-${global_id}`).click( function() {
        let index = parseInt(`${this.id}`.split("-")[2]);
        if (global_config.buttons[index].active) {
            let old_selected_button_id = `#button-group-${global_config.selected_index}-${global_id}`
            $(old_selected_button_id).css("background-color", `#${button_group_color[global_config.background_color].hex}`);
            $(old_selected_button_id).css("box-shadow", `0px 0px 0px 3px #${color[global_config.background_color].hex} inset`);
            $(old_selected_button_id).css("font-weight", "normal");
            global_config.selected_index = index;
            $(`#${this.id}`).css("background-color", `#${button_group_color[global_config.active_color].hex}`);
            $(`#${this.id}`).css("box-shadow", `0px 0px 0px 3px #${color[global_config.active_color].hex} inset`);
            $(`#${this.id}`).css("font-weight", "bold");
            global_config.callback.apply(this, [index]);
        } else {
            console.log(`${global_config.buttons[index].txt} is not active.`);
        }

    });
});