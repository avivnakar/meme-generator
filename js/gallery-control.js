'use strict';

console.log('gallery-control.js was loaded successfully');


//Global variables and Constants

//------------------------------------------------------------//
function init(){
renderImgs();
}

function openEditor(elTemplateImg, imgId) {
    let canvas=getCanvas()
    document.querySelector('.gallery').style.display = "none";
    canvas.width = elTemplateImg.width;
    canvas.height = elTemplateImg.height;
    createMeme(imgId);
    renderMeme();
    document.querySelector('.editor').style.display = "flex";
}
function renderImgs(){
    let imgs=getImgs();
    var elContainer=document.querySelector('.img-container');
    imgs.forEach(({id,url})=>{
        let strHTML=
        `<img onclick="openEditor(this,${id})" src="${url}" alt="image-${id}">`
        elContainer.innerHTML+=strHTML;
    })
}