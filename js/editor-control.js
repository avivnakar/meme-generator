'use strict';

console.log('editor-control.js was loaded successfully');


//Global variables and Constants
var gCanvas = document.querySelector('#meme');
var gCtx = gCanvas.getContext('2d');
// var gFocusLineIdx = 0;
//------------------------------------------------------------//

function renderMeme() {
    let meme = getMeme();
    let img = getImageById(meme.templateId)
    // console.log(meme.templateId);

    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0);
    meme.texts.forEach(text => {
        drawText(text)
    });
    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function drawText({ txt, size, align, fill, stroke, font, pos }) {
    // gCtx.lineWidth = '2'
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
}

function onTextAlignChange(alignClass) {
    var elList = document.querySelector('.text-align');
    elList.classList.remove(`align-${gEditorSettings.align}`);//TODO:Function
    elList.classList.add(`align-${alignClass}`); X
}

function getCanvas() {
    return gCanvas
}

function onTextChange(txt) {
    changeTxt(txt);
    renderMeme();
}

function onFocusPrevTxt() {
    focusPrevTxt();
    renderTxtInput()
}

function onFocusNextTxt() {
    focusNextTxt();
    renderTxtInput()
}

function changeInputValue(value) {
    document.querySelector('.control input[type="text"]').value = value;
}

function onRemoveLayer() {
    removeLayer();
    renderMeme();
    renderTxtInput()
}
function renderTxtInput() {
    let meme = getMeme();
    if (meme.texts.length === 0) changeInputValue('');
    else changeInputValue(meme.texts[meme.currLineIdx].txt);
}