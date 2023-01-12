/*
 * ======================================================================================
 * Web Widgets: Now
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */
'use strict';

//=======================================================================================
// Creates a widget for displaying time and date based on the local machine
class Now {
    constructor(container_id, config) {
        this.config = config;
        this.id = container_id;

        this.gen_widget();
        this.gen_css();
    }

    //===================================================================================
    gen_css() {
        $("#time-panel").css("font", `400 ${this.config.font_size}px/1.5 "Roboto", sans-serif`);
        $("#time-panel").css("background-color", this.config.background_color);
        $("#time-panel").css("color", this.config.font_color);
        $("#time-panel").css("padding", "10px 0px 10px 0px");
        $("#time-panel").css("width", this.config.width);
        $("#time-panel").css("height", "auto");
        $("#time-panel").css("text-align", "center");
        $("#time-panel").css("border-radius", `${this.config.border_radius}px`);

        $("#time-info").css("font-size", "0.3em");
        $("#time-info").css("display", "inline-block");
        $("#time-info").css("margin-left", "5px");

        $("#date").css("font-size", "0.45em");
        $("#date").css("margin", "auto");
        $("#date").css("text-align", "center");
    }

    //===================================================================================
    gen_widget() {
        $("#" + this.id).append("<div id='time-panel' class='time-panel'></div>");

        $("#time-panel").append("<span id='time'></span>");
        $("#time-panel").append("<div id='time-info' class='time-info'></div>");
        $("#time-info").append("<div id='ampm'></div>");
        let zone = this.get_time_zone_acronym();
        $("#time-info").append(`<div id='zone'>${zone}</div>`);
        $("#time-panel").append("<div id='date'></div>");
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

    $("#time").text(x1);
    $("#ampm").text(ampm);
    $("#date").text(d1);

    update_datetime();
}

//========================================================================================
function update_datetime() {
    let refresh=1000; // Refresh rate in milli seconds
    let mytime = setTimeout('set_datetime()', refresh);
}

update_datetime();