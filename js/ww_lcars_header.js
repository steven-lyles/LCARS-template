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
    this.color_map = colors;
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
    let h_desc    = this.config.msg.height;
    let h_corner  = this.config.corner.height;
    let h_divider = this.config.horz_bars_config.height;

    let h_marquee = h_header - h_banner - h_desc - h_corner - h_divider - 35; // 35 accounts for margins & padding
    return h_marquee;
  }

  //===================================================================================
  // API Methods
  set_title_primary_to(title) { $("#title-primary").text(title); }
  set_title_secondary_to(title) { $("#title-secondary").text(title); }
  set_header_msg_to(msg) { $("#header-msg").text(msg); }
  set_header_logo_to(logo_url) { header_logo.set_logo_to(logo_url) };

  //===================================================================================
  gen_css() {
    $("#header-panel").css("width", `${this.config.panel.width}px`);
    $("#header-panel").css("height", `${this.config.height}px`);
    $("#header-panel").css("background-color", this.color_map[this.config.panel.background_color].hex);
    $("#header-panel").css("border-radius", `0 0 0 ${this.config.panel.width/2}px`);

    let h = this.config.banner.height;
    $("#header-banner").css("height", `${h}px`);
    $("#header-banner").css("font-size", `${h - (h/3)}px`);
    $("#header-banner").css("color", `this.config.color_map[${this.config.banner.font_color}].hex`);
    $("#header-banner").css("font", this.config.banner.font);

    $(".header-msg").css("height", `${this.config.msg.height}px`);
    $(".header-msg").css("margin-left", "20px");
    $(".header-msg").css("margin-right", "5px");
    $(".header-msg").css("text-align", "right");
    $(".header-msg").css("color", this.config.msg.font_color);
    $(".header-msg").css("font", this.config.msg.font);

    $(".header-marquee").css("flex", "1");
    $(".header-marquee").css("height", `${this.marquee_size()}px`);
    $(".header-marquee").css("padding", "10px");

    $(".header-panel-corner-bg").css("width", `${this.config.corner.width}px`);
    $(".header-panel-corner-bg").css("height", `${this.config.corner.height}px`);
    $(".header-panel-corner-bg").css("background-color", this.color_map[this.config.corner.foreground_color].hex);

    $(".header-panel-corner").css("width", `${this.config.corner.width}px`);
    $(".header-panel-corner").css("height", `${this.config.corner.height}px`);
    $(".header-panel-corner").css("background-color", this.color_map[this.config.corner.background_color].hex);
    $(".header-panel-corner").css("border-radius", `0 0 0 ${this.config.corner.width}px`);
  }

  //===================================================================================
  gen_widget() {

    $(`#${this.id}`).append("<div id='header-row' class='row container-row'></div>");

    $("#header-row").append("<div id='header-panel' class='container-panel'></div>");
    this.config.panel.logo.width = `${this.config.panel.width}px`;
    let header_logo = new Logo("header-panel", this.config.panel.logo, this.color_map);

    this.config.panel.now.font_size = Math.round(this.config.panel.width * 0.15);
    let header_time = new Now("header-panel", this.config.panel.now, this.color_map);

    $("#header-row").append("<div id='header-content' class='container-content'></div>");
    $("#header-content").append("<div id='header-banner' class='banner'></div>");
    $("#header-banner").append(`<span id='title-primary'>${this.config.banner.title_primary}</span> &#149; <span id='title-secondary'>${this.config.banner.title_secondary}</span>`);
    $("#header-content").append(`<div id='header-msg' class='header-msg'>${this.config.msg.text}</div>`);

    $("#header-content").append("<div id='header-marquee' class='header-marquee'></div>");
    let button_group_marquee = new ButtonGroup("header-marquee", this.config.button_group_marquee_config, this.color_map, this.callback);

    $("#header-content").append("<div id='header-panel-corner-bg' class='header-panel-corner-bg'></div>");
    $("#header-panel-corner-bg").append("<div class='header-panel-corner'></div>");

    $("#header-content").append("<div id='horz-bars-header'></div>");
    let horz_bars_header = new HorizontalBarsDivider("horz-bars-header", this.config.horz_bars_config, this.color_map);
  }

} /* class LcarsHeader */