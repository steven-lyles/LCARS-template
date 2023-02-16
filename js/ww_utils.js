/*
 * ======================================================================================
 * Web Widgets
 * Copyright © Steven M. Lyles
 * https://github.com/steven-lyles/web-widgets
 * https://www.stevenlyles.net
 * ======================================================================================
 */

//=======================================================================================
// Detects the browser and OS
// Based on the detect-os package: https://www.npmjs.com/package/detect-os
class DetectOS {
    constructor() {
        this.browser = this.searchString(this.dataBrowser())
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion)
        this.OS = this.searchString(this.dataOS())
        if (this.OS == "macOS") {
            if (navigator.maxTouchPoints > 1) {
                this.OS = "iPad OS";
            }
        }
        this.mobile = this.mobile_os();
    }

    //===================================================================================
    searchString(data) {
        for (let i = 0; i < data.length; i++) {
            let
                dataString = data[i].string,
                dataProp = data[i].prop
            this.versionSearchString = data[i].versionSearch || data[i].identity
            if (dataString) {
                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity
                }
            } else if (dataProp) {
                return data[i].identity
            }
        }
    }

    //===================================================================================
    searchVersion(dataString) {
        let index = dataString.indexOf(this.versionSearchString)
        if (index === -1) return
        return parseFloat(dataString.substring(index+this.versionSearchString.length + 1))
    }

    //===================================================================================
    mobile_os() {
        let mobile = false;
        if (this.OS == "iPad OS" ||
            this.OS == "iOS" ||
            this.OS == "Android") {
            mobile = true;
        }
        return mobile;
    }

    //===================================================================================
    dataBrowser() {
        return [
            { /** Chrome */
                string: navigator.userAgent,
                subString: "Chrome",
                identity: "Chrome"
            },
            { /** Safari */
                string: navigator.vendor,
                subString: "Apple",
                identity: "Safari",
                versionSearch: "Version"
            },
            { /** For Older Opera (12.18-) */
                prop: window.opera,
                identity: "Opera",
                versionSearch: "Version"
            },
            { /** Internet Explorer 10 */
                string: navigator.userAgent,
                subString: "MSIE",
                identity: "IE10",
                versionSearch: "MSIE"
            },
            { /** Internet Explorer 11 */
                string: navigator.userAgent,
                subString: "Trident",
                identity: "IE11",
                versionSearch: "rv"
            },
            { /** Edge */
                string: navigator.userAgent,
                subString: "Edge",
                identity: "Edge",
                versionSearch: "Edge"
            },
            { /** Firefox */
                string: navigator.userAgent,
                subString: "Firefox",
                identity: "Firefox"
            },
            {
                string: navigator.userAgent,
                subString: "Gecko",
                identity: "Mozilla",
                versionSearch: "rv"
            },
            { /** For Older Netscapes (4-) */
                string: navigator.userAgent,
                subString: "Mozilla",
                identity: "Netscape",
                versionSearch: "Mozilla"
            },
            { /** or Newer Netscapes (6+) */
                string: navigator.userAgent,
                subString: "Netscape",
                identity: "Netscape"
            },
            { /** Other Browsers */
                string: navigator.userAgent,
                subString: "OmniWeb",
                versionSearch: "OmniWeb/",
                identity: "OmniWeb"
            },
            {
                string: navigator.vendor,
                subString: "iCab",
                identity: "iCab"
            },
            {
                string: navigator.vendor,
                subString: "KDE",
                identity: "Konqueror"
            },
            {
                string: navigator.vendor,
                subString: "Camino",
                identity: "Camino"
            }
        ]
    }

    //===================================================================================
    dataOS() {
        return [
            {
                string: navigator.platform,
                subString: 'Win',
                identity: 'Windows'
            },
            {
                string: navigator.platform,
                subString: 'Mac',
                identity: 'macOS'
            },
            {
                string: navigator.userAgent,
                subString: 'iPhone',
                identity: 'iOS'
            },
            {
                string: navigator.userAgent,
                subString: 'iPad',
                identity: 'iOS'
            },
            {
                string: navigator.userAgent,
                subString: 'iPod',
                identity: 'iOS'
            },
            {
                string: navigator.userAgent,
                subString: 'Android',
                identity: 'Android'
            },
            {
                string: navigator.platform,
                subString: 'Linux',
                identity: 'Linux'
            }
        ]
    }
} /* class DetectOS */

//=======================================================================================
// Collection of utility functions used by widget
class Utils {

    //===================================================================================
    // Generates a random hash based on a given string. This is used to create unique ids
    // to identify instances of the classes
    static gen_unique_id(str) {
        var hash = Math.random() * (10 - 0) + 0;
        var i = 0;
        var char = "";

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
    static get_os() {
        let detect = new DetectOS();
        return detect.OS;
    }

    //===================================================================================
    static get_browser() {
        let detect = new DetectOS();
        return detect.browser;
    }

} // class Utils