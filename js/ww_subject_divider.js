/*
 * ======================================================================================
 * Web Widgets: Subject Divider
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a widget for displaying an LCARS style horizontal bar line
class SubjectDivider {
    constructor(container_id, config, color) {
        this.config = config;
        this.config["color_map"] = color;
        this.id = container_id;
        this.widget_id = Utils.gen_unique_id(container_id);

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        // $(`#${this.id}`).css("width", "100%");
        $(`#${this.id}`).css("height", `${this.config.height}px`);
        $(`#${this.id}`).css("display", "flex");
        $(`#${this.id}`).css("flex-direction", "row");
        $(`#${this.id}`).css("align-items", "flex-end");
        $(`#${this.id}`).css("justify-content", "flex-start");

        $(`.horz-divider-subject-spacer-${this.widget_id}`).css("background-color", this.config["color_map"][this.config.color].hex);
        $(`.horz-divider-subject-spacer-${this.widget_id}`).css("height", `${this.config.height}px`);
        $(`.horz-divider-subject-spacer-${this.widget_id}`).css("flex", "1");

        $(`.horz-divider-subject-text-${this.widget_id}`).css("font", `400 ${this.config.height-4}px/1.5 ${this.config.font}, sans-serif`);
        $(`.horz-divider-subject-text-${this.widget_id}`).css("color", this.config["color_map"][this.config.font_color].hex);
        $(`.horz-divider-subject-text-${this.widget_id}`).css("align-self", "center");
        $(`.horz-divider-subject-text-${this.widget_id}`).css("padding-left", "20px");
        $(`.horz-divider-subject-text-${this.widget_id}`).css("padding-right", "20px");
        $(`.horz-divider-subject-text-${this.widget_id}`).css("width", "auto");
        $(`.horz-divider-subject-text-${this.widget_id}`).css("margin-bottom", "5px");

        $(`.horz-divider-subject-ender-${this.widget_id}`).css("border-radius", `0px ${this.config.height/2}px ${this.config.height/2}px 0px`);
        $(`.horz-divider-subject-ender-${this.widget_id}`).css("background-color", this.config["color_map"][this.config.color].hex);
        $(`.horz-divider-subject-ender-${this.widget_id}`).css("height", `${this.config.height}px`);
        $(`.horz-divider-subject-ender-${this.widget_id}`).css("width", `${this.config.height}px`);
    }

    //===================================================================================
    gen_widget() {
        $(`#${this.id}`).append(`<div class="horz-divider-subject-spacer-${this.widget_id}"></div>`);
        $(`#${this.id}`).append(`<div class="horz-divider-subject-text-${this.widget_id}">${this.config.txt_primary} • ${this.config.txt_secondary}</div>`);
        $(`#${this.id}`).append(`<div class="horz-divider-subject-ender-${this.widget_id}"></div>`);
    }


} /* class HorizontalDivider  */

