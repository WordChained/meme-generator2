'use strict';
var gCanvas;
var gCtx;
var gStartPos

function onInit() {
    renderImgsToGallery(gImgs)
    renderKeywords()
    addAttributeToImgs()
    gCanvas = document.querySelector('.canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
    window.addEventListener('resize', function() {
        gCanvas.width = window.innerWidth
        gCanvas.height = window.innerHeight
        resizeCanvas()
        loadImgToCanvas();
    })
    addListeners()
    loadImgToCanvas();
    resizeCanvas()
    openModal({
        x: gCanvas.width / 2,
        y: gCanvas.height / 4
    })
}

function OnTextPick(ev) {
    var x = ev.offsetX
    var y = ev.offsetY
}

// when we type
function onTextInput(text) {
    setUserText(text)
}

//when we hit enter
function onSubmitText(ev, input, ) {
    submitText(ev, input)

}

function onSizeChange(elSize) {
    changeSize(elSize)
}

function onImgClick(elImg) {
    getImg(elImg)
    renderCanvas();
    showEditor();
    resizeCanvas()
}

function onClearCanvas() {
    if (!confirm('are you sure you want to delete everything?')) return
    clearCanvas()
    loadImgToCanvas()
    gMeme.selectedLineIdx = 0;
}

function onSwitchLine(elMove) {
    switchLine(elMove)
}

function onMoveText(value) {
    if (gIsEditing) return
    moveText(value)
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
    document.querySelector('.btn-menu').classList.toggle('close')
}

function onGalleryClick() {
    //reseting the lines
    gMeme.lines = []
        // clearing the canvas
    clearCanvas()
        // showing gallery
    showGallery()
}

function onFontSelect(elFont) {
    console.log('elFont', elFont)
    setFont(elFont)
}

function onColorChange(elColor) {
    setStrokeColor(elColor)
}

function onAlign(elDirection) {
    getDirection(elDirection)
}

function onDelete() {
    deleteLine()
}

function onStickerPick() {

}

function onDownloadCanvas(elFile) {
    saveCanvasToStorage()
    downloadCanvas(elFile)
}

function onMemeTabClick() {
    var memes = loadMemes()
    moveToMemePage()
    renderMemes(memes)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function onSearch(elKeyword) {
    console.log(elKeyword)
    searchKeywords(elKeyword)
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}

function onShowMore(elBtn) {
    toggleKeywords(elBtn)
}