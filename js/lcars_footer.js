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
        this.colors = colors;

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        // $(".container-frame-left-bottom").css("min-width", this.config.left_panel_width);
        $(".container-frame-left-bottom").css("height", `${this.config.height}px`);
        $(".container-frame-left-bottom").css("width", `${this.config.panel.width}px`);
        $(".container-frame-left-bottom").css("min-width", `${this.config.panel.width}px`);

        $(".container-frame-left-bottom").css("background-color", this.colors[ this.config.panel.background_color ].hex);
        $(".container-frame-left-bottom").css("border-radius", `0 0 0 ${this.config.panel.radius}px`);

        $(".container-footer").css("height", `${this.config.height}px`);
        $(".container-footer").css("flex", `0 1 ${this.config.height}px`);
        $(".container-footer").css("margin-bottom", "15px");
        // $(".container-footer").css("overflow", "hidden");

        $(".footer-content").css("display", "flex");
        $(".footer-content").css("flex-direction", "row");
        $(".footer-content").css("align-items", "center");
        $(".footer-content").css("justify-content", "right");
        $(".footer-content").css("height", this.config.content.height);
        $(".footer-content").css("margin-left", "20px");
        $(".footer-content").css("font-size", this.config.content.font_size);
        // $(".footer-content").css("width", "100%");
        // $(".footer-content").css("background-color", "#A0C092");
        $(".footer-container").css("flex", "1");


        $(".footer-msg").css("text-align", "auto");
        $(".footer-msg").css("padding-left", "10px");
        $(".footer-msg").css("padding-right", "10px");
        $(".footer-msg").css("font", `400 ${this.config.content.font_size}/1.5  "Avenir Next Condensed", sans-serif;`);

        $(".footer-icon").css("margin-right", "15px");

        $(".footer-demarcation").css("font-size", "25px");
        $(".footer-demarcation").css("margin-right", "15px");

        $(".footer-corner-bg").css("width", `${this.config.corner.width}px`);
        $(".footer-corner-bg").css("height", `${this.config.corner.height}px`);
        $(".footer-corner-bg").css("background-color", this.colors[this.config.corner.foreground_color].hex);

        $(".footer-corner").css("width", `${this.config.corner.width}px`);
        $(".footer-corner").css("height", `${this.config.corner.height}px`);
        $(".footer-corner").css("background-color", this.colors[this.config.corner.background_color].hex);
        $(".footer-corner").css("border-radius", this.config.corner.radius);


    }

    //===================================================================================
    gen_widget() {
        $(`#${this.id}`).append("<div id='footer' class='container-footer'></div>");
        $("#footer").append("<div id='footer-row' class='container-row'></div>");

        $("#footer-row").append("<div class='container-frame-left container-frame-left-bottom left-panel-width'></div>");

        $("#footer-row").append("<div id='container-frame-right-footer' class='container-frame-right'></div>");

        $("#container-frame-right-footer").append("<div id='footer-content' class='footer-content'></div>");

        $.each(this.config.content.items, function(index, item) {
            switch(item.type) {
                case "msg":
                    $("#footer-content").append(`<div class='footer-msg'>${item.txt}</div>`);
                    break;
                case "icon":
                    $("#footer-content").append(`<a id='footer-icon-${item.txt}' href='${item.url}' target='_blank'></a>`);
                    $(`#footer-icon-${item.txt}`).append(`<img class='footer-icon' src='${item.src}' alt='${item.txt}' width='${item.width}'>`);
                    break;
                case "demarcation":
                    $("#footer-content").append(`<div class='footer-demarcation'>${item.txt}</div>`);
                    break;
                case "link":
                    let rID = Utils.gen_unique_id(item.txt);
                    $("#footer-content").append(`<a id='footer-link-${rID}' href='${item.url}' target='_blank'>${item.txt}</a>`);
                    $(`#footer-link-${rID}`).css("font-size", item.font_size);
                    break;
                default:
                    break;
            }
        });


        $("#container-frame-right-footer").append("<div id='footer-corner-bg' class='footer-corner-bg'></div>");
        $("#footer-corner-bg").append("<div class='footer-corner'></div>");

        $("#container-frame-right-footer").append("<div id='horz-bars-footer' class='horz-bars-footer'></div>");

        let horz_bars_footer = new HorizontalBarsDivider("horz-bars-footer", this.config.horz_divider_footer_config, this.colors);

    }

} /* class LcarsFooter */