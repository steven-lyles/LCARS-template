/*
 * ======================================================================================
 * Web Widgets: Now
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

let compact = false;

//=======================================================================================
// Creates a widget for displaying time and date based on the local machine
class Now {
    constructor(container_id, config, colors) {
        this.config = config;
        this.id = container_id;
        this.colors = colors;

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        if (this.config.compact) {
            // $(".now-compact").css("", "");

            $(".now-compact").css("width", "160px");
            $(".now-compact").css("min-width", "160px");
            $(".now-compact").css("height", "100px");
            // $(".now-compact").css("background-color", "#444a77");
            $(".now-compact").css("display", "flex");
            $(".now-compact").css("flex-direction", "column");
            $(".now-compact").css("gap", "2px");
            $(".now-compact").css("align-items", "center");
            $(".now-compact").css("justify-content", "flex-start");
            $(".now-compact").css("color", "black");
            $(".now-compact").css("font", "400 14px/1 'Roboto', sans-serif");
            $(".now-compact").css("padding-top", "10px");

            $(".now-compact-row").css("display", "flex");
            $(".now-compact-row").css("flex-direction", "row");
            $(".now-compact-row").css("align-items", "flex-end");
            $(".now-compact-row").css("gap", "5px");
            $(".now-compact-row").css("margin-right", "10px");

            $(".now-compact-txt-row").css("font-size", "0.8em");

            $(".time").css("font-weight", "bold");

        } else {
            $("#time-panel").css("font", `400 ${this.config.font_size}px/1.5 "Roboto", sans-serif`);
            $("#time-panel").css("color", this.colors[this.config.font_color].hex);
            $("#time-panel").css("padding", "10px 0px 5px 0px");

            $("#time-panel").css("height", "auto");
            $("#time-panel").css("text-align", "center");

            $("#time-info").css("font-size", "0.3em");
            $("#time-info").css("display", "inline-block");
            $("#time-info").css("margin-left", "5px");

            $("#date").css("font-size", "0.45em");
            $("#date").css("margin", "auto");
            $("#date").css("text-align", "center");
        }
    }

    //===================================================================================
    gen_widget() {
        if (this.config.compact) {
            compact = true;
            $("#" + this.id).append("<div id='now-compact' class='now-compact'></div>");

            $("#now-compact").append("<div id='now-compact-row-meridian-zone' class='now-compact-row now-compact-txt-row'></div>");
            $("#now-compact-row-meridian-zone").append("<div id='ampm'></div>");
            $("#now-compact-row-meridian-zone").append("<div class='now-compact-spacer'> </div>");
            let zone = this.get_time_zone_acronym();
            $("#now-compact-row-meridian-zone").append(`<div id='now-compact-zone'>${zone}</div>`);

            $("#now-compact").append("<div id='now-compact-row-hour-year' class='now-compact-row'></div>");
            $("#now-compact-row-hour-year").append("<div id='now-compact-hour' class='time'></div>");
            $("#now-compact-row-hour-year").append("<div class='now-compact-spacer'> </div>");
            $("#now-compact-row-hour-year").append(`<div id='now-compact-year'></div>`);

            $("#now-compact").append("<div id='now-compact-row-min-month' class='now-compact-row'></div>");
            $("#now-compact-row-min-month").append("<div id='now-compact-min' class='time'></div>");
            $("#now-compact-row-min-month").append("<div class='now-compact-spacer'> </div>");
            $("#now-compact-row-min-month").append(`<div id='now-compact-month'></div>`);

            $("#now-compact").append("<div id='now-compact-row-sec-day' class='now-compact-row'></div>");
            $("#now-compact-row-sec-day").append("<div id='now-compact-sec' class='time'></div>");
            $("#now-compact-row-sec-day").append("<div class='now-compact-spacer'> </div>");
            $("#now-compact-row-sec-day").append(`<div id='now-compact-day'></div>`);

            $("#now-compact").append("<div id='now-compact-row--day-txt' class='now-compact-row now-compact-txt-row'></div>");
            $("#now-compact-row--day-txt").append("<div id='now-compact-day-txt'>Thursday</div>");

        } else {
            $("#" + this.id).append("<div id='time-panel' class='time-panel'></div>");

            $("#time-panel").append("<span id='time'></span>");
            $("#time-panel").append("<div id='time-info' class='time-info'></div>");
            $("#time-info").append("<div id='ampm'></div>");
            let zone = this.get_time_zone_acronym();
            $("#time-info").append(`<div id='zone'>${zone}</div>`);
            $("#time-panel").append("<div id='date'></div>");
        }
    }

    //========================================================================================
    get_time_zone_acronym() {
        let zone = new Date().toTimeString().slice(18);
        zone = zone.replace(/[a-z]/g, '');
        zone = zone.replace(/ /g, "");
        zone = zone.replace(/[()]/g, "");
        return zone;
    }

} /* class Now */

//========================================================================================
function set_datetime() {
    let x = new Date();
    let ampm = x.getHours() >= 12 ? ' PM' : ' AM';
    let hours = x.getHours() % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().length === 1 ? 0+hours.toString() : hours;

    let minutes = x.getMinutes().toString();
    minutes = minutes.length === 1 ? 0+minutes : minutes;

    let seconds = x.getSeconds().toString();
    seconds = seconds.length === 1 ? 0+seconds : seconds;

    let month = (x.getMonth() +1).toString();
    month = month.length === 1 ? 0+month : month;

    let dt = x.getDate().toString();
    dt = dt.length === 1 ? 0+dt : dt;

    let day = new Date().toLocaleString('en-us', {  weekday: 'long' });

    let d1 = day + " • " + x.getFullYear() + "." + month + "." + dt;
    let x1 = hours + ":" +  minutes + ":" +  seconds;

    if (compact) {
        $("#ampm").text(ampm);
        $("#now-compact-hour").text(hours);
        $("#now-compact-year").text(x.getFullYear().toString().substr(-2));
        $("#now-compact-min").text(minutes);
        $("#now-compact-month").text(month);
        $("#now-compact-sec").text(seconds);
        $("#now-compact-day").text(dt);
        $("#now-compact-day-txt").text(day);
    } else {
        $("#time").text(x1);
        $("#ampm").text(ampm);
        $("#date").text(d1);
    }

    update_datetime();
}

//========================================================================================
function update_datetime() {
    let refresh=1000; // Refresh rate in milli seconds
    let mytime = setTimeout('set_datetime()', refresh);
}

update_datetime();