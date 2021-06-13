'use strict';

function renderCanvas() {
    loadImgToCanvas()
    gCtx.save()
    setTimeout(() => {
        gMeme.lines.map(meme => {
            gCtx.lineWidth = 2
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = gFillColor
            gCtx.font = gSize + `px ${gFont}`
            gCtx.textAlign = gAlignment
            gCtx.fillText(meme.txt, meme.pos.x, meme.pos.y)
            gCtx.strokeText(meme.txt, meme.pos.x, meme.pos.y)
        })
    }, 0)
    gCtx.restore()
}

function saveCanvasToStorage() {
    saveToStorage('memeList', getMemeList())
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
    renderCanvas()
}

function loadImgToCanvas() {
    var image = _findImgById(gMeme.selectedImgId);
    drawImg(image.url);
}

function _findImgById(id) {
    return gImgs.find(image => image.id === id)
}

function drawImg(meme) {
    var img = new Image()
    img.src = meme;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gMeme.lines = []
    gCurrText = {}
}

//grab & drag

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isTextClicked(pos)) {
        var canvasClickPos = getTextBoxPos(ev)
        openModal(canvasClickPos)
        return
    }
    setTextDrag(true)
    gStartPos = pos
    document.querySelector('.canvas').style.cursor = 'grabbing';
}

function onMove(ev) {
    const text = gCurrText;
    if (text.isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveTextWithGrab(dx, dy)
        deleteCurrLine()
        gStartPos = pos;
        var newPos = {
            id: gCurrText.id,
            txt: gCurrText.txt,
            pos: {
                x: gCurrText.pos.x,
                y: gCurrText.pos.y
            },
            isDrag: true

        }
        gMeme.lines.push(newPos)
    }
}

function onUp() {
    setTextDrag(false)
    document.querySelector('.canvas').style.cursor = 'grab'
    renderCanvas()
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function isTextClicked(clickedPos) {
    var textWidth = gCtx.measureText(gCurrText.txt).width
    const { pos } = gCurrText
    if (clickedPos.x >= pos.x - textWidth / 2 && clickedPos.x <= pos.x + textWidth / 2 && clickedPos.y >= pos.y - gSize && clickedPos.y <= pos.y) {
        return true
    }
}

function setTextDrag(isDrag) {
    gCurrText.isDrag = isDrag
}

function moveTextWithGrab(dx, dy) {
    gCurrText.pos.x += dx
    gCurrText.pos.y += dy
}
//text box modal
function openModal(canvasClickPos) {
    //focus wont work here no matter what...
    // elModal.focus()
    var elModal = document.querySelector('.modal');
    elModal.style.display = 'block';
    elModal.style.left = canvasClickPos.x + 'px';
    elModal.style.top = canvasClickPos.y + 'px';
}

function closeModal() {
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none';
}

function getTextBoxPos(ev) {
    var pos = {
        x: ev.clientX - 400,
        y: ev.clientY - 170
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft - 40,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop - 120
        }
        gClickPos = {
            x: pos.x + 20,
            y: pos.y + 40
        };
        return pos
    }
    gClickPos = {
        x: pos.x,
        y: pos.y - 100
    };
    return pos
}