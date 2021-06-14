'use strict';

//service for general functions and globals

var gWindowClickPos;
var gCurrText = {};
var gIsEditing = false;
var gAlignment = 'center'
var gSize = 40;
var gFont = 'Impact'
var gMemeList;
var gClickPos;
var gFillColor = 'white';
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


var gKeywords = {
    'happy': 12,
    'funny': 1
}
var gImgs = [{
        id: 0,
        url: 'img/meme-imgs (square)/0.jpg',
        keywords: ['funny', 'outdoors']
    },
    {
        id: 1,
        url: 'img/meme-imgs (square)/1.jpg',
        keywords: ['funny', 'political', 'usa']
    },
    {
        id: 2,
        url: 'img/meme-imgs (square)/2.jpg',
        keywords: ['cute', 'outdoors', 'puppies', 'love', 'animals']
    },
    {
        id: 3,
        url: 'img/meme-imgs (square)/3.jpg',
        keywords: ['cute', 'puppies', 'baby', 'sleep', 'animal']
    },
    {
        id: 4,
        url: 'img/meme-imgs (square)/4.jpg',
        keywords: ['cute', 'cat', 'computer', 'sleeping']
    },
    {
        id: 5,
        url: 'img/meme-imgs (square)/5.jpg',
        keywords: ['inspiring', 'outdoors', 'beach', 'cute']
    },
    {
        id: 6,
        url: 'img/meme-imgs (square)/6.jpg',
        keywords: ['funny', 'old', 'stupid', 'funny']
    },
    {
        id: 7,
        url: 'img/meme-imgs (square)/7.jpg',
        keywords: ['baby', 'cute', 'funny', 'surprised']
    },
    {
        id: 8,
        url: 'img/meme-imgs (square)/8.jpg',
        keywords: ['old', 'movies']
    },
    {
        id: 9,
        url: 'img/meme-imgs (square)/9.jpg',
        keywords: ['funny', 'outdoors', 'baby']
    },
    {
        id: 10,
        url: 'img/meme-imgs (square)/10.jpg',
        keywords: ['funny', 'political']
    },
    {
        id: 11,
        url: 'img/meme-imgs (square)/11.jpg',
        keywords: ['funny', 'sports', 'basketball', 'gay', 'love']
    },
    {
        id: 12,
        url: 'img/meme-imgs (square)/12.jpg',
        keywords: ['israeli', 'pointing']
    },
    {
        id: 13,
        url: 'img/meme-imgs (square)/13.jpg',
        keywords: ['toast', 'pointing']
    },
    {
        id: 14,
        url: 'img/meme-imgs (square)/14.jpg',
        keywords: ['matrix', 'reflection', 'choice']
    },
    {
        id: 15,
        url: 'img/meme-imgs (square)/15.jpg',
        keywords: ['old']
    },
    {
        id: 16,
        url: 'img/meme-imgs (square)/16.jpg',
        keywords: ['funny', 'awkward']
    },
    {
        id: 17,
        url: 'img/meme-imgs (square)/17.jpg',
        keywords: ['political', 'pointing']
    },
    {
        id: 18,
        url: 'img/meme-imgs (square)/18.jpg',
        keywords: ['inspiring', 'outdoors']
    },


];


var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}


//navigation:--------------------------------------------------------
function showEditor() {
    var elEditor = document.querySelector('.editor-container');
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    elGallery.style.display = 'none';
    elEditor.style.display = 'grid'
    elMemeTab.style.display = 'none';
    gMeme.selectedLineIdx = 0;

}

function showGallery() {
    var elEditor = document.querySelector('.editor-container');
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    elGallery.style.display = 'grid';
    elEditor.style.display = 'none';
    elMemeTab.style.display = 'none';
    gMeme.selectedLineIdx = 0;
}

function moveToMemePage() {
    var elGallery = document.querySelector('.gallery-container');
    var elMemeTab = document.querySelector('.memes-container');
    var elEditor = document.querySelector('.editor-container');
    elGallery.style.display = 'none';
    elMemeTab.style.display = 'grid';
    elEditor.style.display = 'none';
    gMeme.selectedLineIdx = 0;
}

//---------------------------------------------------------------------

function getMemeList() {
    if (!loadFromStorage('memeList')) return gMemeList = []
    gMemeList = loadFromStorage('memeList')
    gMemeList.push(gCanvas.toDataURL())
    return gMemeList
}

function printWindowMousePos() {

}