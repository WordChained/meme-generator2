'use strict';

function renderImgsToGallery(imgs) {
    var elImgGrid = document.querySelector('.image-grid')
    elImgGrid.innerHTML = ''
    imgs.map(img => {

        var strHTMLs = `<img id="${img.id}" class="meme" src="img/meme-imgs (square)/${img.id}.jpg">`
        elImgGrid.innerHTML += strHTMLs
    })
}

function addAttributeToImgs() {
    var elMemes = [...document.querySelectorAll('.meme')]
    return elMemes.map(meme => meme.setAttribute('onclick', 'onImgClick(this)'))
}

function getImg(elImg) {
    var memeId = gImgs.find(img => img.id === +elImg.id)
    gMeme.selectedImgId = memeId.id;
}

function searchKeywords(keyword) {
    var filteredImgs = gImgs.filter(img => {
        for (var i = 0; i < img.keywords.length; i++) {
            if (img.keywords[i] === keyword) inflateKeyword(keyword);
            if (img.keywords[i].includes(keyword)) return true
        }
    })
    renderImgsToGallery(filteredImgs)
    addAttributeToImgs()
}

function renderKeywords() {
    var elKeywordsContainer = document.querySelector('.keywords-container')
    var sortedKeywords = []
    for (var j = 0; j < gImgs.length; j++) {
        var img = gImgs[j]
        for (var i = 0; i < img.keywords.length; i++) {
            sortedKeywords.push(img.keywords[i])
        }
    }
    var unique = [...new Set(sortedKeywords)];
    unique.map(keyword => {
        elKeywordsContainer.innerHTML += `<article class = "keyword ${keyword}" onclick="inflateKeyword(this.innerText)" style="font-size: ${getRandomInt(16, 32)}px"> ${keyword}</article>`
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//set size of each keyword
function inflateKeyword(keyword) {
    var elKeyword = document.querySelector(`.keyword.${keyword}`)
    var style = window.getComputedStyle(elKeyword, null).getPropertyValue('font-size');
    var currentSize = parseFloat(style);
    elKeyword.style.fontSize = (currentSize + 1) + 'px';
    // renderKeywords()
}

function toggleKeywords(elBtn) {
    var elKeywordsContainer = document.querySelector('.keywords-container');
    elKeywordsContainer.classList.toggle('overflow');
    if (elKeywordsContainer.classList.contains('overflow')) {
        elBtn.innerText = 'Less'
    } else {
        elBtn.innerText = 'More'
    }
}