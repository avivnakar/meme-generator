'use strict';

console.log('gallery-service.js was loaded successfully');


//Global variables and Constants
var gKeywords;
var gImgs = _createImgs();
//------------------------------------------------------------//

function _createImgs() {
    var imgs = [];
    for (let i = 0; i < 25; i++) {
        imgs.push({
            id: i+1,
            url: `./template-imgs/${i}.jpg`,
            keywords: []
        })
    }
    return imgs;
}


function getImgs(){
    return gImgs;
}