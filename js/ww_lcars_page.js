/*
 * ======================================================================================
 * Web Widgets: LCARS Page Object
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a LCARS subject panel
class LcarsPage {
  constructor(container_id, config, colors, callback) {
    this.config = config;
    this.id = container_id;
    this.color_map = colors;

    this.callback = callback;

    this.gen_widget();
    this.gen_css();
  }
  
  //===================================================================================
  gen_css() {
    $("#pages-panel").css("width", `${this.config.width}px`);
    $("#pages-panel").css("min-width", `${this.config.width}px`);
    $("#pages-panel").css("background-color", this.color_map[ this.config.background_color ].hex);

    $("#pages-content").css("width", "100%");
    $("#pages-content").css("overflow", "scroll");

    $("#page").css("width", "100%");
    $("#page").css("height", "100%");
    $("#page").css("overflow-y", "auto");
  }

  //===================================================================================
  gen_widget() {
    $(`#${this.id}`).append("<span id='pages-panel' class='container-panel'></span>");
    $("#pages-panel").append("<div id='pages-buttons'></div>");

    let button_stack_pages = new ButtonStack("pages-buttons", this.config.button_stack_pages[0], this.color_map, this.callback);

    $(`#${this.id}`).append("<span id='pages-content'></span>");
    $("#pages-content").append(`<iframe id='page' src='${this.config.page_src}' name='page' class='page' frameBorder='0'></iframe>`);
  }

} /* class LcarsPage */