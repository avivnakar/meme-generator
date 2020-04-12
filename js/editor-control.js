'use strict';

console.log('editor-control.js was loaded successfully');


//Global variables and Constants
const gCanvas = document.querySelector('#meme');
const gCtx = gCanvas.getContext('2d');
var gIntervalDrag;
var gIsMouseDown = false;
var gFeelsLikeADrag = false;
var gAsyncCheat = undefined;
//------------------------------------------------------------//
function renderMeme() {
    
    let meme = getMeme();
    
    let img = getImageById(meme.templateId)
    img.onload = () => {
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        meme.texts.forEach((text, idx) => {
            drawPseudoText(text);
            calculatBoundriesRect(text);
            // console.log(gIsExporting)
            if (gAsyncCheat===undefined&&idx === meme.currLineIdx) {
                console.log('FUCK U')
                drawFocus(text);
            }
            drawText(text);
            if(gAsyncCheat!==undefined)gAsyncCheat();
        });
    }
    renderTxtInput()
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

function drawPseudoText({ txt, size, align, fill, stroke, font, pos }) {
    drawText({ txt, size: size * 1.1, align, fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)', font, pos });
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
    // drawText(text);
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
        // gIntervalDrag=setInterval(() => {
        // }, 600);
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
function onSave(destination, type) {
    if(gAsyncCheat===undefined){
        gAsyncCheat=()=>{
            onSave(destination,type)
        }
        renderMeme();
    }else{
        const meme = {};
    meme.dataURL = gCanvas.toDataURL(`image/${type}`);
    addToSavedMemes(meme);
    gAsyncCheat=undefined;
    }
    
    // switch (destination) {

    //     case 'localStorage':
    //     default:


    //         break;
    // }
}