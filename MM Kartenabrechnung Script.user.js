// ==UserScript==
// @name         Miles and More Kartenabrechnung Script
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically load the different pages of the Miles and More Kartenabrechnung and copy the content to the clipboard so it can easily be pasted into Excel
// @author       ajaxgaier@gmail.com
// @license      MIT; https://opensource.org/licenses/MIT
// @match        https://www.miles-and-more.kartenabrechnung.de/*
// @grant        GM_setClipboard
// @grant        XXGM.setValue
// @grant        XXGM.getValue
// @grant        XXGM_listValues
// ==/UserScript==

// Usage
// 1. Einloggen bei MM unter https://www.miles-and-more.kartenabrechnung.de/mam/Home/content/FinancialStatus.xhtml (gffls. mit F12 die Console in den DevTools öffnen, um den Fortschritt zu beobachten)
// 2. Auf "alle Umsätze" clicken
// 3. Abwarten bis das Skript alle aktuellen Umsätze gesammelt hat und in das Clipboard geschrieben hat
// 4a. In Excel (in einem neuen Sheet) die Umsätze pasten (das Skript geht davon aus, dass das Komma das Dezmal-Trennzeichen ist)
// 4b. Einen anderen Zeitraum wählen und auf "Umsätze zeigen" clicken -> 3.

var retimeout=1000;
var clipb = "";

(function() {
    // 'use strict';
    // alert("high");
    // clipb = GM.getValue('clipb', "");
    clipb = localStorage.getItem('clipb', "");
    console.log("initial clibp: " + clipb);
    var r=jQuery("[name='pageSize']").val("50").trigger("change");
    setTimeout(f_clean, retimeout);
    // Your code here...
})();

function  f_clean () {
    console.log("Started ...");
    // console.log(GM_listValues());
    jQuery(".meilenFaehig").remove();
    jQuery(".nichtMeilenFaehig").remove();
    jQuery(".banking-buttongroup").remove();
    jQuery("body").html(jQuery("body").html().replace(/ EUR/g,''));
    // get the data
    // str=jQuery("#CreditCardTransactionOverview_0").html();
    // GM_setClipboard (str);
    t=jQuery("#CreditCardTransactionOverview")
    t2=t.children()[1];
    len=t2.childElementCount;
    t3=t2.firstElementChild;
    str2="";
    for (i=0; i < len; i++) {
      str2+=t3.children[0].innerText + "\t" + t3.children[1].innerText + "\t" + t3.children[2].innerText + "\n";
      t3=t3.nextSibling;
      t3=t3.nextSibling;
    }
    if (clipb == "") {
        str=str2;
    } else {
        str=clipb+str2;
    }
    GM_setClipboard(str);
    // GM.setValue("clipb", str);
    localStorage.setItem("clipb", str);
    console.log("setting clipboard to "+str);
    // jump to next page
    u=jQuery(".pagination")[0].firstChild;
    ch=jQuery(".pagination")[0].children;
    ch1=ch[0]; idx=0; found=0;
    while (found == 0 || idx < ch.length) {
        console.log ("indxs " + idx + " " + ch.length + " " + found);
        idx++;
        if (ch1 == undefined) break;
        if (ch1.classList[0] == "current" && idx < ch.length ) {
            found=1;
            if (idx == 1) {
                // initialize var
                console.log(" Resetting localstorage ...");
                // GM.setValue("clipb", str);
                localStorage.setItem("clipb", str2);   // reset
                GM_setClipboard(str2);
            }
            ch1=ch1.nextSibling;
            console.log("clicking on next page ...");
            ch1.firstElementChild.click();
        }
        ch1=ch1.nextSibling;
    }
    // console.log(GM_listValues());
}