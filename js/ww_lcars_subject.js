/*
 * ======================================================================================
 * Web Widgets: LCARS Subject Panel
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a LCARS subject panel
class LcarsSubject {
  constructor(container_id, config, colors, callback) {
    this.config = config;
    this.id = container_id;
    this.color_map = colors;
    this.widget_id = this.gen_unique_id_from(container_id);

    this.callback = callback;

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
  set_title_to(str) {
    $("#subjects-title").text(str);
  }

  //===================================================================================
  set_icon_to(icon_path) {
    $("#subjects-icon").attr("src", icon_path);
  }

  //===================================================================================
  gen_css() {
    $("#subjects-panel").css("width", `${this.config.panel.width}px`);
    $("#subjects-panel").css("min-width", `${this.config.panel.width}px`);
    $("#subjects-panel").css("height", `${this.config.height}px`);
    $("#subjects-panel").css("background-color", this.color_map[this.config.panel.background_color].hex);
    $("#subjects-panel").css("justify-content", "center");

    $("#subjects-icon").css("height", `${this.config.height*0.6}px`);

    $(".subjects-panel-corner-bg").css("width", `${this.config.corner.width}px`);
    $(".subjects-panel-corner-bg").css("height", `${this.config.corner.height}px`);
    $(".subjects-panel-corner-bg").css("background-color", this.color_map[this.config.corner.foreground_color].hex);

    $(".subjects-panel-corner").css("width", `${this.config.corner.width}px`);
    $(".subjects-panel-corner").css("height", `${this.config.corner.height}px`);
    $(".subjects-panel-corner").css("background-color", this.color_map[this.config.corner.background_color].hex);
    $(".subjects-panel-corner").css("border-radius", `${this.config.corner.width}px 0 0 0`);

    $("#subjects-control").css("height", "42px");
    $("#subjects-control").css("width", "100%");

    $(".subject-title").css("font", this.config.title.font);
    $(".subject-title").css("font-weight", "lighter");
    $(".subject-title").css("margin-right", "20px");
    $(".subject-title").css("position", "relative");
    $(".subject-title").css("height", "auto");
    $(".subject-title").css("padding-bottom", "10px");
    $(".subject-title").css("align-self", "center");
    $(".subject-title").css("text-transform", "uppercase");
  }

  //===================================================================================
  gen_widget() {

    $(`#${this.id}`).append("<div id='subjects-panel' class='container-panel'></div>");
    $("#subjects-panel").append(`<img id='subjects-icon' class='subjects-icon' src='${this.config.panel.icon}' alt=''/>`);

    $(`#${this.id}`).append("<div id='subjects-content' class='container-content'></div>");
    $("#subjects-content").append("<div id='subjects-div'></div>");

    let content_horz_div = new HorizontalBarsDivider("subjects-div", this.config.horz_bars_div, this.color_map);

    $("#subjects-content").append("<div id='subjects-panel-corner-bg' class='subjects-panel-corner-bg'></div>");
    $("#subjects-panel-corner-bg").append("<div class='subjects-panel-corner'></div>");

    $("#subjects-content").append("<div id='subjects-control' class='row subject-row'></div>");
    $("#subjects-control").append("<div id='subjects-buttons'></div>");

    let subject_buttons = new ButtonGroup("subjects-buttons", this.config.buttons[0], this.color_map, this.callback);

    $("#subjects-control").append("<div id='subjects-title' class='subject-title'></div>");
    $("#subjects-title").append(`<span id='title-subject'>${this.config.title.page}</span>`);

  }

} /* class LcarsSubject */