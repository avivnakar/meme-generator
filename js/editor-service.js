'use strict';

console.log('editor-service.js was loaded successfully');


//Global variables and Constants
const KEY_SETTINGS = 'theKeyOfTheMemeSettingsFromTheLocalStorage';
const KEY_SAVED_MEMES = 'theKeyOfTheSavedMemesFromTheLocalStorage';
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
    gMeme.texts[0].pos.y = 40;
    gMeme.texts[1].pos.y = (getCanvas().height - 25);

}
function createTxt(txt) {
    let canvas = getCanvas();
    let ctx = gCtx;
    return {
        txt,
        size: gEditorSettings.size,
        align: gEditorSettings.align,
        fill: gEditorSettings.fill,
        stroke: gEditorSettings.stroke,
        font: gEditorSettings.font,
        pos: { x: (Math.floor(canvas.width / 2)), y: (Math.floor(canvas.height / 2)) }
    }

}

function _createSetting() {
    var settings = loadFromStorage(KEY_SETTINGS);
    console.log(settings);
    
    if (!settings||settings===undefined||settings===null) {
        settings = {
            size: 40,
            align: 'center',
            fill: 'white',
            stroke: 'black',
            font: 'impact'
        }
    }
    console.log(settings);
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

function setFont(font) {
    gMeme.texts[gMeme.currLineIdx].font = font;
    _setEditorAttr('font',font);
}

function setAlign(align) {
    gMeme.texts[gMeme.currLineIdx].align = align;
    _setEditorAttr('align',align);
}

function setFill(fill) {
    gMeme.texts[gMeme.currLineIdx].fill = fill;
    _setEditorAttr('fill',fill);
}

function setStroke(stroke) {
    gMeme.texts[gMeme.currLineIdx].stroke = stroke;
    _setEditorAttr('stroke',stroke);
}
function _setEditorAttr(attr,value) {
    gEditorSettings[attr]=value;
    _saveSettings();
}
function getEditorAttr(attr) {
    return gEditorSettings[attr]
}
function setSize(size) {
    gMeme.texts[gMeme.currLineIdx].size = size;
    _setEditorAttr('size',size);
}
function relocateText(x, y) {
    gMeme.texts[gMeme.currLineIdx].pos.x = x;
    gMeme.texts[gMeme.currLineIdx].pos.y = y;
}

function considerTextAlign(x, y) {
    let idx = gMeme.texts.findIndex(text => {
        return x > text.xStart &&
               x < text.xStart + text.width &&
               y > text.yStart &&
               y < text.yStart + text.height;
    });
    console.log(idx);
    if(idx>=0){
        // const temp = gMeme.texts.splice(idx,1);
        // gMeme.texts.push(temp);
        // gMeme.currLineIdx = (gMeme.texts.length - 1);
        gMeme.currLineIdx=idx;
    }
}
function addToSavedMemes(meme){
    let memes=getSavedMemes();
    memes=memes?memes:[];
    memes.push(meme);
    saveToStorage(KEY_SAVED_MEMES,memes);
}
function getSavedMemes() {
    return loadFromStorage(KEY_SAVED_MEMES);
}
function getMemesKey() {
    return KEY_SAVED_MEMES;
}
function removeFocus(){
    gMeme.currLineIdx=-1;
}