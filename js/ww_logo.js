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
    constructor(container_id, config, colors) {
        this.config = config;
        this.id = container_id;
        this.colors = colors;

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    set_logo_to(logo_url) { $(".panel-logo").css("background-image", `url(${logo_url})`); }

    //===================================================================================
    gen_css() {
        // $(".panel-logo").css("display", "block");
        $(".panel-logo").css("height", this.config.height);
        $(".panel-logo").css("width", this.config.width);
        $(".panel-logo").css("background", this.colors[this.config.background_color].hex);
        $(".panel-logo").css("background-image", `url(${this.config.logo_image})`);
        $(".panel-logo").css("background-size", `${this.config.logo_size}`);
        $(".panel-logo").css("background-repeat", "no-repeat");
        $(".panel-logo").css("background-position", "center center");

        $(".menu-spacer").css("height", this.config.spacer_size);
        $(".menu-spacer").css("width", this.config.width);
        $(".menu-spacer").css("background", this.colors[this.config.spacer_color].hex);
    }

    //===================================================================================
    gen_widget() {
        $(`#${this.id}`).append(`<a id='logo-link' href='${this.config.url}' target='_blank'></a>`);
        $("#logo-link").append("<div id='panel-logo' class='panel-logo'></div>")
        $(`#${this.id}`).append("<div id='menu-spacer' class='menu-spacer'></div>\n");
    }

} /* class Logo */