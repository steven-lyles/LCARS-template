
//========================================================================================
$(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('.scroll-top a').fadeIn();
    } else {
        $('.scroll-top a').fadeOut();
    }
});

//========================================================================================
function get_time_zone_acronym() {
    var zone = new Date().toTimeString().slice(18);
    zone = zone.replace(/[a-z]/g, '');
    zone = zone.replace(/ /g, "");
    zone = zone.replace(/[()]/g, "");
    return zone;
}

//========================================================================================
function set_datetime() {
    var x = new Date();
    var ampm = x.getHours() >= 12 ? ' PM' : ' AM';
    hours = x.getHours() % 12;
    hours = hours ? hours : 12;
    hours = hours.toString().length === 1 ? 0+hours.toString() : hours;

    var minutes = x.getMinutes().toString();
    minutes = minutes.length === 1 ? 0+minutes : minutes;

    var seconds = x.getSeconds().toString();
    seconds = seconds.length === 1 ? 0+seconds : seconds;

    var month = (x.getMonth() +1).toString();
    month = month.length === 1 ? 0+month : month;

    var dt = x.getDate().toString();
    dt = dt.length === 1 ? 0+dt : dt;

    var day = new Date().toLocaleString('en-us', {  weekday: 'long' });

    var d1 = day + " • " + x.getFullYear() + "." + month + "." + dt;
    var x1 = hours + ":" +  minutes + ":" +  seconds;

    $("#time").text(x1);
    $("#ampm").text(ampm);
    $("#date").text(d1);

    update_datetime();
}

//========================================================================================
function update_datetime() {
    var refresh=1000; // Refresh rate in milli seconds
    mytime = setTimeout('set_datetime()', refresh);
}

update_datetime();

//========================================================================================
$(document).ready(function() {

    $("#zone").text(get_time_zone_acronym());

    $(".button").click(function() {
        var txt = $(this).text();
        $("#subject-title").text(txt);
    });

    $("#button-home").click(function() {
        $("#subject-title").text("WELCOME");
    });
});