'use strict';

console.log('editor-control.js was loaded successfully');


//Global variables and Constants
const gCanvas = document.querySelector('#meme');
const gCtx = gCanvas.getContext('2d');
var gIsMouseDown = false;
var gFeelsLikeADrag = false;
var gAsyncCheat = undefined;
var gElImg
//------------------------------------------------------------//
function renderMeme(meme = getMeme()) {

    gCanvas.width = gElImg.width;
    gCanvas.height = gElImg.height;
    gCtx.drawImage(gElImg, 0, 0, gCanvas.width, gCanvas.height);
    meme.texts.forEach((text, idx) => {
        calculatBoundriesRect(text);
        drawText(text,idx === meme.currLineIdx);
    });
    if(meme.currLineIdx>=0)renderTxtInput()
}
function calculatBoundriesRect(text) {
    text.width = gCtx.measureText(text.txt).width * 1.02;
    text.height = gCtx.measureText(text.txt).actualBoundingBoxAscent * 1.2;
    text.yStart = text.pos.y - text.height / 1.1;
    switch (text.align) {
        case 'right':
            text.xStart = text.pos.x - (text.width);
            break;

        case 'left':
            text.xStart = text.pos.x;
            break;

        case 'center':
            text.xStart = text.pos.x - (text.width / 2);
            break;
    }
}


function drawText(text,isFocused) {
    let { txt, size, align, fill, stroke, font, pos } = text;
    // gCtx.lineWidth = '2'
    gCtx.font = `${size}px ${font}`;
    gCtx.textAlign = align;
    calculatBoundriesRect(text);
    if(isFocused)drawFocus(text);
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = fill;
    gCtx.fillText(txt, pos.x, pos.y)
    gCtx.strokeText(txt, pos.x, pos.y)
}

function onTextAlignChange(align) {
    // var elList = document.querySelector('.text-align');
    // elList.classList.remove(`align-${gEditorSettings.align}`);//TODO:Function
    // elList.classList.add(`align-${alignClass}`); 
    setAlign(align);
    renderMeme();
}

function getCanvas() {
    return gCanvas;
}

function onTextChange(txt) {
    changeTxt(txt);
    renderMeme();
}

function onFocusPrevTxt() {
    focusPrevTxt();
    renderTxtInput();
    renderMeme();
}

function onFocusNextTxt() {
    focusNextTxt();
    renderTxtInput();
    renderMeme();
}

function changeInputValue(elInput, value) {
    elInput.value = value;
}

function renderTxtInput() {
    let meme = getMeme();
    let elInput = document.querySelector('.control input[type="text"]')
    if (meme.texts.length === 0) changeInputValue(elInput, '');
    else changeInputValue(elInput, meme.texts[meme.currLineIdx].txt);
    elInput.style.fontFamily = getEditorAttr('font');
}

function onRemoveLayer() {
    removeLayer();
    renderMeme();
    renderTxtInput()
}

function onAddText() {
    addText('');
    renderMeme();
    renderTxtInput();
}

function onFontChange(font) {
    setFont(font);
    renderMeme();
}
function drawRect({ xStart, yStart, width, height }) {
    gCtx.beginPath();
    gCtx.strokeStyle = 'black';
    gCtx.rect(xStart, yStart, width, height);
    gCtx.stroke();
    gCtx.fillStyle = 'rgba(9,9,9,0.5)';
    gCtx.fillRect(xStart, yStart, width, height);
    gCtx.closePath();
}
function drawFocus(text) {
    drawRect(text);
}

function mouseIsDown(ev) {
    gIsMouseDown = true;
    considerTextAlign(ev.offsetX, ev.offsetY);
    setTimeout(() => {
        if (gIsMouseDown) gFeelsLikeADrag = true;
    }, 200);
    renderMeme();
}
function mouseIsUp() {
    gIsMouseDown = false;
    gFeelsLikeADrag = false;
    // clearInterval(gIntervalDrag);
}
function drag(ev) {
    if (gIsMouseDown && gFeelsLikeADrag) {
        relocateText(ev.offsetX, ev.offsetY);
        renderMeme();

    }
}

function onSetFill(value) {
    setFill(value);
    renderMeme();
}

function onSetStroke(value) {
    setStroke(value);
    renderMeme();
}
function onSetSize(el) {
    setSize(el.value);
    renderMeme();
}
function renderSize() {
    document.querySelector('[name="font-size"]').value = getEditorAttr['size']
}
function toggleNav() {
    document.querySelector('nav-list').style.display = 'block'
}

function renderSavedMemes() {
    let memes = getSavedMemes();
    memes.forEach((meme, idx) => {
        console.log(`${nicecount(idx)} meme:`, meme);
    });
}
function onSave(destination, type, el) {
    removeFocus();
    renderMeme();
    const meme = {};
    meme.dataURL = gCanvas.toDataURL(`image/${type}`);

    switch (destination) {
        case 'download':
            el.href = meme.dataURL;
            break;
        case 'localStorage':
        default:
            addToSavedMemes(meme);
            break;
    }
}

function downloadImg(elLink) {
    var imgContent = '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';
    elLink.href = 'data:image/gif;base64,' + imgContent
}

function setElImg(elImg) {
    gElImg = elImg;
}