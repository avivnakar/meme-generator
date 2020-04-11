'use strict';

console.log('editor-control.js was loaded successfully');


//Global variables and Constants
var gCanvas = document.querySelector('#meme');
var gCtx = gCanvas.getContext('2d');
var gIsMouseDown = false;
// var gFocusLineIdx = 0;
//------------------------------------------------------------//

function renderMeme() {
    let meme = getMeme();
    let img = getImageById(meme.templateId)
    img.onload = () => {
        gCanvas.width = img.width;
        gCanvas.height = img.height;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        // debugger
        meme.texts.forEach((text, idx) => {
            drawPseudoText(text);
            calculatBoundriesRect(text);
            // text.xStart=text.align==='center'?
            if (idx === meme.currLineIdx) {
                drawFocus(text);
            }
            drawText(text);
        });
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
        // drawRect(text)
    }


    // console.log(meme.templateId);
    // function renderMeme(imgId, isDownload = false) {
    //     const imgs = getImgs();
    //     const foundImg = imgs.find(img => {
    //         return imgId === img.id;
    //     })
    //     var img = new Image();
    //     img.src = foundImg.url;
    //     img.onload = () => {

    //         gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    //         let lines = getLines();

    //         lines.forEach((line, idx) => {
    //             setCanvasText(line.text, line.xPosition, line.yPosition, line.color, undefined, line.size);
    //             let measure = gCtx.measureText(line.text)
    //             setLineSize(idx, measure.width, measure.actualBoundingBoxAscent)
    //         })
    //         if (!isDownload) markLine();

    //     }
    // }


    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function drawPseudoText({ txt, size, align, fill, stroke, font, pos }) {
    drawText({ txt, size, align, fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)', font, pos });
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

function mouseIsDown() {
    gIsMouseDown = true;
}
function mouseIsUp() {
    gIsMouseDown = false;
}
function drag() {

}