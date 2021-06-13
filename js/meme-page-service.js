'use strict';

function loadMemes() {
    var memes = []
    var memeList = loadFromStorage('memeList')
    if (!memeList) return;
    memeList.map(meme => {
        var img = new Image;
        img.src = meme;
        memes.push(img)
    })
    return memes
}

function renderMemes(memes) {
    if (!memes) return
    var elMemeContainer = document.querySelector('.memes-container')
    elMemeContainer.innerHTML = ''
    memes.map((meme, idx) => {

        var str = `<img class="saved-meme" src="${meme.src}" id="${idx}">`
        elMemeContainer.innerHTML += str;
    })
}