'use strict';

console.log('gallery-control.js was loaded successfully');


//Global variables and Constants

//------------------------------------------------------------//
(function renderImgs() {
    let imgs = getImgs();
    var elContainer = document.querySelector('.img-container');
    imgs.forEach(({ id, url }) => {
        let strHTML =
            `<img onclick="openEditor(this,${id})" src="${url}" alt="image-${id}">`
        elContainer.innerHTML += strHTML;
    })
})();
// function init(){
// renderImgs();
// }

function openEditor(elTemplateImg, imgId) {
    let canvas = getCanvas()
    document.querySelector('.gallery').style.display = 'none';
    canvas.width = elTemplateImg.width;
    canvas.style.minWidth = `${elTemplateImg.width}px`;
    canvas.height = elTemplateImg.height;
    canvas.style.minHeight = `${elTemplateImg.height}px`;
    document.querySelector('.editor').style.display = 'flex';
    createMeme(imgId);
    renderMeme();
    renderTxtInput();
}
function renderMemes() {
    var elContainer = document.querySelector('.img-container');
    elContainer.innerHTML='';
    let memes = loadFromStorage(getMemesKey());
    memes.forEach((meme,idx)=>{
            // console.log(meme);
            var strHTML=`<img onclick="removeMeme(${idx})" src="${meme.dataURL}" alt="${niceCount(idx+1)}-meme">`;
            elContainer.innerHTML+=strHTML;  
    })
}
