// ==UserScript==
// @name         WME Force Verified Speedlimit
// @namespace    WazeDev
// @version      2019.03.07.02
// @author       JustinS83, Dude495
// @description  Force the Verify Speedlimit Button to function despite WME Breaking it
// @include      /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/?.*$/
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var UpdateObject;
    function VerifySL() {
        let i;
        for (i = 0; i < W.selectionManager.getSelectedFeatures().length; i++){
            let selected = W.selectionManager.getSelectedFeatures()[i].model;
            W.model.actionManager.add(new UpdateObject(selected,{fwdMaxSpeedUnverified: false, revMaxSpeedUnverified:false}));
        }
    }
    function init() {
        if (WazeWrap.hasSegmentSelected()) {
            var SLFwd = $('#segment-edit-general > form > div.hide-walking-trail > div.form-group.speed-limits > div > div.speed-limit-fwd > div.verify-buttons > button.verify-btn.waze-btn.waze-btn-green.waze-btn-small')
            var SLRev = $('#segment-edit-general > form > div.hide-walking-trail > div.form-group.speed-limits > div > div.speed-limit-rev > div.verify-buttons > button.verify-btn.waze-btn.waze-btn-green.waze-btn-small')
            SLFwd[0].onclick = function() {
                VerifySL();
            }
            SLRev[0].onclick = function() {
                VerifySL();
            }
        }
    }
    function bootstrap() {
        if (W && W.loginManager && W.loginManager.user && WazeWrap.Ready) {
            UpdateObject = require("Waze/Action/UpdateObject");
            init();
            console.log(GM_info.script.name, 'Initialized');
            WazeWrap.Events.register("selectionchanged", null, init);
        } else {
            console.log(GM_info.script.name, 'Bootstrap failed.  Trying again...');
            window.setTimeout(() => bootstrap(), 500);
        }
    }
    bootstrap();
})();
