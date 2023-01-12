/*
 * ======================================================================================
 * Web Widgets: Logo
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a widget for displaying a logo or pic with a given link
class Logo {
    constructor(container_id, config) {
        this.config = config;
        this.id = container_id;

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        // $(".panel-logo").css("display", "block");
        $(".panel-logo").css("height", this.config.height);
        $(".panel-logo").css("width", this.config.width);
        $(".panel-logo").css("background", this.config.background_color);
        $(".panel-logo").css("background-image", `url(${this.config.logo_image})`);
        $(".panel-logo").css("background-size", `${this.config.logo_size} ${this.config.logo_size}`);
        $(".panel-logo").css("background-repeat", "no-repeat");
        $(".panel-logo").css("background-position", "center center");

        $(".menu-spacer").css("height", this.config.spacer_size);
        $(".menu-spacer").css("width", this.config.width);
        $(".menu-spacer").css("background", this.config.spacer_color);
    }

    //===================================================================================
    gen_widget() {
        let logo = "<div id='panel-logo' class='panel-logo'>\n";
        logo +=    `  <a href='${this.config.url} target='_blank'></a>\n`;
        logo +=    "</div>"
        $(`#${this.id}`).append(logo);
        $(`#${this.id}`).append("<div id='menu-spacer' class='menu-spacer'></div>\n");
    }

} /* class Logo */