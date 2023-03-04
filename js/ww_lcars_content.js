/*
 * ======================================================================================
 * Web Widgets: LCARS Content
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a LCARS page content section side panel, subject & page buttons, content area
class LcarsContent {
  constructor(container_id, config, colors, callback_subject, callback_page) {
    this.config = config;
    this.id = container_id;
    this.color_map = colors;

    this.gen_widget();
    this.gen_css();
  }

  //===================================================================================
  gen_css() {
    $("#content-header-panel").css("width", `${this.config.panel.width}px`);
    $("#content-header-panel").css("height", this.config.panel.header_height);
    $("#content-header-panel").css("background-color", this.color_map[this.config.panel.background_color].hex);
    $("#content-header-panel").css("border-radius", `${this.config.panel.width/2}px 0 0 0`);

    // $("#content-header-panel").css("")

    $("#subject-icon").css("height", "2.5em");
  }

  //===================================================================================
  gen_widget() {
    $(`#${this.id}`).append("<div id='content-row' class='container-row'></div>");
    // $("#content-row").append("<div id='content-panel' class='container-panel'></div>");

    // <div id="content-header-panel-corner" class="panel-corner-upper">
    //   <img id="subject-icon" class="subject-icon" src="./assets/ship.svg" alt="HOME"/>
    // </div>

    $("#content-row").append("<div id='content-header-panel' class='panel-corner-upper'></div>");
    $("#content-header-panel").append(`<img id='subject-icon' class='subject-icon' src='${this.config.panel.header_icon}' alt=''/>`);
  }

} /* class LcarsContent */