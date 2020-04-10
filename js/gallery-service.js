'use strict';

console.log('gallery-service.js was loaded successfully');


//Global variables and Constants
var gKeywords;
var gImgs = _createImgs();
//------------------------------------------------------------//

function _createImgs() {
    var imgs = [];
    for (let i = 1; i < 19; i++) {
        imgs.push({
            id: i,
            url: `/meme-imgs (square)/${i}.jpg`,
            keywords: []
        })
    }
    return imgs;
}
function getImageById(id) {
    var image = gImgs.find(img => {
        if (img.id === id) return img
    })
    // console.log(image.url);
    var img = new Image();
    img.src = '.'+image.url;
    // img.onload = (onImageReady.bind(null, img))
    return img;
}
function getImgs(){
    return gImgs;
}