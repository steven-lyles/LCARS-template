/*
 * ======================================================================================
 * Web Widgets: LCARS Footer
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a LCARS page footer info bar, panel and divider
class LcarsFooter {
  constructor(container_id, config, colors) {
    this.config = config;
    this.id = container_id;
    this.color_map = colors;

    this.gen_widget();
    this.gen_css();
  }

  //===================================================================================
  mixed_content_height() {
    let h = 0;
    h = this.config.height - this.config.corner.height - this.config.horz_divider_footer_config.height;
    return h;
  }

  //===================================================================================
  gen_css() {
    $("#footer-panel").css("width", `${this.config.panel.width}px`);
    $("#footer-panel").css("height", `${this.config.height}px`);
    $("#footer-panel").css("background-color", this.color_map[this.config.panel.background_color].hex);
    $("#footer-panel").css("border-radius", `0 0 0 ${this.config.panel.width/2}px`);

    $("#footer-mixed-row").css("display", "flex");
    $("#footer-mixed-row").css("flex-direction", "row");
    $("#footer-mixed-row").css("align-items", "center");
    $("#footer-mixed-row").css("justify-content", "right");
    $("#footer-mixed-row").css("gap", "10px");
    $("#footer-mixed-row").css("height", this.mixed_content_height());
    $("#footer-mixed-row").css("margin-left", "20px");
    $("#footer-mixed-row").css("margin-right", "10px");
    $("#footer-mixed-row").css("font-size", this.config.content.font_size);
    // $("#footer-mixed-row").css("background-color", "#A0C092");

    $(".footer-top-corner-bg").css("width", `${this.config.corner.width}px`);
    $(".footer-top-corner-bg").css("height", `${this.config.corner.height}px`);
    $(".footer-top-corner-bg").css("background-color", this.color_map[this.config.corner.foreground_color].hex);

    $(".footer-top-corner").css("width", `${this.config.corner.width}px`);
    $(".footer-top-corner").css("height", `${this.config.corner.height}px`);
    $(".footer-top-corner").css("background-color", this.color_map[this.config.corner.background_color].hex);
    $(".footer-top-corner").css("border-radius", this.config.corner.radius);
  }

  //===================================================================================
  gen_widget() {
    $(`#${this.id}`).append("<div id='footer-row' class='container-row'></div>");
    $("#footer-row").append("<div id='footer-panel' class='container-panel'></div>");

    $("#footer-row").append("<div id='footer-content' class='container-content'></div>");
    $("#footer-content").append("<div id='footer-mixed-row'></div>");

    $.each(this.config.content.items, function(index, item) {
      switch(item.type) {
        case "msg":
          $("#footer-mixed-row").append(`<div class='footer-msg'>${item.txt}</div>`);
          break;
        case "icon":
          $("#footer-mixed-row").append(`<a id='footer-icon-${item.txt}' href='${item.url}' target='_blank'></a>`);
          $(`#footer-icon-${item.txt}`).append(`<img class='footer-icon' src='${item.src}' alt='${item.txt}' width='${item.width}'>`);
          break;
        case "demarcation":
          $("#footer-mixed-row").append(`<div class='footer-demarcation'>${item.txt}</div>`);
          break;
        case "link":
          let rID = Utils.gen_unique_id(item.txt);
          $("#footer-mixed-row").append(`<a id='footer-link-${rID}' href='${item.url}' target='_blank'>${item.txt}</a>`);
          $(`#footer-link-${rID}`).css("font-size", item.font_size);
          break;
        default:
          break;
      }
    });

    $("#footer-content").append("<div id='footer-top-corner-bg' class='footer-top-corner-bg'></div>");
    $("#footer-top-corner-bg").append("<div class='footer-top-corner'></div>");

    $("#footer-content").append("<div id='horz-bars-footer' class='horz-bars-footer'></div>");
    let horz_bars_footer = new HorizontalBarsDivider("horz-bars-footer", this.config.horz_divider_footer_config, this.color_map);
  }

} /* class LcarsFooter */