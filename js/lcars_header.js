/*
 * ======================================================================================
 * Web Widgets: LCARS Header
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a LCARS page header with logo widget, now widget, banner, description, button
// group and panels
class LcarsHeader {
    constructor(container_id, config, colors, callback) {
        this.config = config;
        this.id = container_id;
        this.colors = colors;
        this.callback = callback; // callback for marquee nav buttons

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    // The marquee section size is flexible. This calculates it's size based on the height
    // of the header minus the other elements.
    marquee_size() {
        let h_header  = this.config.height;
        let h_banner  = this.config.banner.height;
        let h_desc    = parseInt( (this.config.msg.height).replace("px", "") );
        let h_corner  = this.config.corner.height;
        let h_divider = this.config.horz_bars_config.height;

        let h_marquee = h_header - h_banner - h_desc - h_corner - h_divider - 35; // 35 accounts for margins & padding
        return h_marquee;
    }

    //===================================================================================
    gen_css() {
        $(".header-height").css("height", `${this.config.height}px`);
        $(".header-left-panel-width").css("width", `${this.config.panel.width}px`);
        $(".header-left-panel-width").css("min-width", `${this.config.panel.width}px`);

        $(".container-frame-left-top").css("background-color", this.colors[this.config.panel.background_color].hex);
        $(".container-frame-left-top").css("border-radius", `0 0 0 ${this.config.panel.radius}px`);

        $(".container-header").css("flex", "0 1 auto");
        $(".container-header").css("margin-bottom", "5px");

        $(".banner").css("height", `${this.config.banner.height}px`);
        $(".banner").css("font-size", `${this.config.banner.height - (this.config.banner.height/3)}px`);
        $(".banner").css("color", `this.colors[${this.config.banner.font_color}].hex`);
        $(".banner").css("text-transform", "uppercase");
        $(".banner").css("text-align", "right");
        $(".banner").css("line-height", "1.1");
        $(".banner").css("font-weight", "350");
        $(".banner").css("padding-top", "15px");
        $(".banner").css("margin-right", "5px");

        $(".header-msg").css("height", this.config.msg.height);
        $(".header-msg").css("margin-left", "20px");
        $(".header-msg").css("margin-right", "5px");
        $(".header-msg").css("text-align", "right");
        $(".header-msg").css("color", this.config.msg.font_color);
        $(".header-msg").css("font", this.config.msg.font);

        $(".header-marquee").css("flex", "1");
        // $(".header-marquee").css("width", "99%");
        $(".header-marquee").css("height", `${this.marquee_size()}px`);
        $(".header-marquee").css("padding", "10px");

        $(".header-top-corner-bg").css("width", `${this.config.corner.width}px`);
        $(".header-top-corner-bg").css("height", `${this.config.corner.height}px`);
        $(".header-top-corner-bg").css("background-color", this.colors[this.config.corner.foreground_color].hex);

        $(".header-top-corner").css("width", `${this.config.corner.width}px`);
        $(".header-top-corner").css("height", `${this.config.corner.height}px`);
        $(".header-top-corner").css("background-color", this.colors[this.config.corner.background_color].hex);
        $(".header-top-corner").css("border-radius", this.config.corner.radius);

        $(".horz-bars-header").css("align-self", "flex-end");
    }

    //===================================================================================
    gen_widget() {
        $(`#${this.id}`).append("<div id='header' class='container-header header-height'></div>");
        $("#header").append("<div id='header-row' class='container-row'></div>");
        $("#header-row").append("<div id='header-frame-left-top' class='container-frame-left container-frame-left-top header-left-panel-width header-height'> </div>");

        this.config.panel.logo.width = `${this.config.panel.width}px`;
        let header_logo = new Logo("header-frame-left-top", this.config.panel.logo, this.colors);

        this.config.panel.now.font_size = Math.round(this.config.panel.width * 0.15);
        let header_time = new Now("header-frame-left-top", this.config.panel.now, this.colors);

        $("#header-row").append("<div id='header-frame-right-top' class='container-frame-right header-height'></div>");

        $("#header-frame-right-top").append("<div id='header-banner' class='banner'></div>");
        $("#header-banner").append(`<span id="title-main">${this.config.banner.title_primary}</span> &#149; <span id="title-secondary">${this.config.banner.title_secondary}</span>`);

        $("#header-frame-right-top").append(`<div class='header-msg'>${this.config.msg.text}</div>`);
        $("#header-frame-right-top").append("<div id='header-marquee' class='header-marquee'></div>");

        let button_group_marquee = new ButtonGroup("header-marquee", this.config.button_group_marquee_config, this.colors, this.callback);

        $("#header-frame-right-top").append("<div id='header-top-corner-bg' class='header-top-corner-bg'></div>");
        $("#header-top-corner-bg").append("<div class='header-top-corner'></div>");

        $("#header-frame-right-top").append("<div id='horz-bars-header' class='horz-bars-header'></div>");

        let horz_bars_header = new HorizontalBarsDivider("horz-bars-header", this.config.horz_bars_config, this.colors);
    }

} /* class LcarsHeader */