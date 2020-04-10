'use strict';

console.log('editor-service.js was loaded successfully');


//Global variables and Constants
const KEY_SETTINGS = 'theKeyOfTheMemeSettingsFromTheLocalStorage';
var gEditorSettings = _createSetting();

var gMeme;
//------------------------------------------------------------//

function createMeme(templateId) {
    gMeme = {
        templateId,
        currLineIdx: 0,
        texts: [
            createTxt('Top Text'),
            createTxt('Bottom Text')
        ]
    }
    gMeme.texts[0].pos.y = 25;
    gMeme.texts[1].pos.y = (getCanvas().height - 20);

}
function createTxt(txt) {
    let canvas = getCanvas();

    return {
        txt,
        size: gEditorSettings.size,
        align: gEditorSettings.align,
        fill: gEditorSettings.fill,
        stroke: gEditorSettings.stroke,
        font: 'impact',
        pos: { x: (Math.floor(canvas.width / 2)), y: (Math.floor(canvas.height / 2)) }
    }

}

function _createSetting() {
    var settings = loadFromStorage(KEY_SETTINGS);
    if (!(settings && settings.length)) {
        settings = {
            size: 20,
            align: 'center',
            fill: 'white',
            stroke: 'black',
            font: 'impact'
        }
    }
    return settings;
}
function _saveSettings() {
    saveToStorage(KEY_SETTINGS, gEditorSettings);
}
function getMeme() {
    return gMeme;
}

function changeTxt(txt) {
    let idx = gMeme.currLineIdx;
    if (gMeme.texts.length === 0) {
        addText(txt);
    } else gMeme.texts[idx].txt = txt;
}
function addText(txt) {
    gMeme.texts.push(createTxt(txt));
    gMeme.currLineIdx = (gMeme.texts.length - 1);

}
function focusNextTxt() {
    if (gMeme.currLineIdx + 1 === gMeme.texts.length) gMeme.currLineIdx = 0;
    else gMeme.currLineIdx++;
}

function focusPrevTxt() {
    if (gMeme.currLineIdx === 0) gMeme.currLineIdx = gMeme.texts.length - 1;
    else gMeme.currLineIdx--;
}

function removeLayer() {
    gMeme.texts.splice(gMeme.currLineIdx, 1);
    focusPrevTxt();
}

// var imgContent = gCanvas.toDataURL('image/jpeg');
// elLink.href = imgContent


// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
// function onImgInput(ev) {
//     loadImageFromInput(ev, renderCanvas)
// }
// function loadImageFromInput(ev, onImageReady) {
//     document.querySelector('.share-container').innerHTML = ''
//     var reader = new FileReader();

//     reader.onload = function (event) {
//         var img = new Image();
//         img.onload = onImageReady.bind(null, img)
//         img.src = event.target.result;
//     }
//     reader.readAsDataURL(ev.target.files[0]);
// }
/** TEXT RENDERING
 * gCtx.direction = ltr,rtl,inherit
 * gCtx.textBaseline = top, hanging , middle, alphabetic, ideographicm bottom
 * gCtx.textAlign= start, end, left, right, center
 * gCtx.font = 10px sans-serif
 *
 * TEXT FILL\STROKE
 * gCtx.fillStyle = #000
 * gCtx.strokeStyle = #000
 * gCtx.scale()
 *
 */