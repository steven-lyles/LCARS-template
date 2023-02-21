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
        this.colors = colors;

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        // $(`#${this.id}`).css("background-color", "#444a77");
        $(`#${this.id}`).css("border-radius", "80px 0 0 0");
        $(`#${this.id}`).css("height", "300px");

        $(`#${this.id}`).css("flex", "1 1 auto");
        $(`#${this.id}`).css("margin-bottom", "5px");

        $(".container-frame-left-middle").css("display", "flex");
        $(".container-frame-left-middle").css("flex-direction", "column");
        $(".container-frame-left-middle").css("width", "160px");
        $(".container-frame-left-middle").css("height", "100%");


        $(".panel-home").css("height", `${this.config.panel_home.height}px`);
        $(".panel-home").css("align-self", "flex-start");
        $(".panel-home").css("background-color", this.colors[ this.config.panel_home.background_color ].hex);
        $(".panel-home").css("border-radius", `${this.config.panel_home.radius} 0 0 0`);
        $(".panel-home").css("position", "relative");

        $(".button-content-container").css("width", "180px");
        $(".button-content-container").css("height", "70px");
        $(".button-content-container").css("position", "absolute");
        $(".button-content-container").css("bottom:", "0");
        $(".button-content-container").css("display", "flex");
        $(".button-content-container").css("flex-direction", "row");
        $(".button-content-container").css("align-items", "center");
        $(".button-content-container").css("justify-content", "right");


        $(".menu-text").css("text-align", "right");
        $(".menu-text").css("font-size", "20px");
        $(".menu-text").css("font-weight", "700");
        $(".menu-text").css("color", "#000000");
        $(".menu-text").css("margin-right", "15px");

        $(".menu-icon").css("height", "1.4em");
        $(".menu-icon").css("margin-right", "15px");
    // .menu-icon {
    //         height: 1.4em;
    //         /*margin-bottom: 5px;*/
    //         margin-right: 15px;
    //     }

    }

    //===================================================================================
    gen_widget() {
        $(`#${this.id}`).append("<div id='container-content' class='container-row'></div>")
        $("#container-content").append("<div id='panel-left-middle' class='container-frame-left-middle'></div>");

        $(`#panel-left-middle`).append("<div id='panel-home' class='panel-home left-column-width'></div>");

        // <div id='button-home' class='button-content-container'>
        //     <span id='menu-home-txt' class='menu-text'>HOME</span>
        //     <img id='menu-home-icon' class='menu-icon' src='./assets/home.svg' alt='HOME'/>
        // </div>
        $("#panel-home").append("<div id='button-home' class='button-content-container'></div>");
        $("#button-home").append("<span id='menu-home-txt' class='menu-text'>HOME</span>");
        $("#button-home").append("<img id='menu-home-icon' class='menu-icon' src='./assets/home.svg' alt='HOME'/>");
    }

} /* class LcarsContent */