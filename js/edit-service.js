'use strict';

function submitText(ev, input) {
    if (ev.keyCode === 13) {
        ev.preventDefault();
        if (!gIsEditing) {
            drawText(input.value);
            closeModal()
            gMeme.selectedLineIdx++;
        } else {
            editText(input.value)
            gIsEditing = false;
        }
        input.value = '';
    }
}

function drawText(text, x = gCanvas.width / 2, y) {
    var elModal = document.querySelector('.modal');
    if (elModal.style.display === 'block') {
        x = gClickPos.x;
        y = gClickPos.y
    }
    if (!y) {
        switch (gMeme.selectedLineIdx) {
            case 0:
                y = gCanvas.height / 4;
                break;
            case 1:
                y = gCanvas.height - 50;
                break;
            case 2:
                y = gCanvas.height / 2;
                break;
            default:
                y = gCanvas.height - 100;
                break;
        }
    }
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = gFillColor
    gCtx.font = gSize + `px ${gFont}`
    gCtx.textAlign = gAlignment
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
    gMeme.lines.push({
        id: gMeme.selectedLineIdx,
        txt: text,
        size: gSize,
        align: 'left',
        color: 'red',
        pos: { x: x, y: y }
    })
    gCurrText = {
        id: gMeme.selectedLineIdx,
        txt: text,
        pos: {
            x: x,
            y: y,
        },
        isDrag: false
    }
}

function deleteLine() {
    gMeme.lines.splice((gMeme.lines.length - 1), 1)
    gMeme.selectedLineIdx -= 1;
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 3
    renderCanvas()
}

function deleteCurrLine() {
    gMeme.lines.splice((gCurrText.id), 1)
    console.log(gMeme.lines);
    gMeme.selectedLineIdx -= 1;
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = 3
    renderCanvas()
}


function changeSize(elSize) {
    if (elSize > 0) {
        if (gSize > 70) return
        gSize += 5;
    } else {
        if (gSize <= 30) return
        gSize -= 5
    }
    renderCanvas()
}
//move is +1
function switchLine(move) {
    if (!gMeme.lines.length) return
    gIsEditing = false;
    renderCanvas()
        //catch the pos of the relavent line and draw a rectangle
        // also, render whole canvas and add rectangle. dont save previous rectangles.
    var currLine = gMeme.lines.find(line => {
        return line.id === gMeme.selectedLineIdx - 1;
    })
    if (!currLine) currLine = gMeme.lines[gMeme.lines.length - 1];
    console.log(currLine);
    setTimeout(() => {
        gCtx.strokeRect(currLine.pos.x - 175, currLine.pos.y - 50, 350, 70);
    }, 0);
    gMeme.selectedLineIdx -= move;
    if (gMeme.selectedLineIdx - 1 < 0) gMeme.selectedLineIdx = gMeme.lines.length;
    //for the editing function:
    gCurrText = currLine;
    //---
    var input = document.querySelector('.meme-text');
    input.value = currLine.txt;
    // when i render again delete current line and rewrite it with new text (done on the drawText function)
    renderCanvas()
}

function moveText(value) {
    //BUG:this deletes previous lines
    // deleteLine()
    gIsEditing = false
    deleteCurrLine()
    setTimeout(() => {
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = gFillColor
        gCtx.font = gSize + `px ${gFont}`
        gCtx.textAlign = gAlignment
        gCtx.fillText(gCurrText.txt, gCurrText.pos.x, +gCurrText.pos.y + +value)
        gCtx.strokeText(gCurrText.txt, gCurrText.pos.x, +gCurrText.pos.y + +value)

        gCurrText.pos.y = +gCurrText.pos.y + +value;
        gMeme.lines.push(gCurrText)

    }, 1)
}

function editText(text) {
    gMeme.lines[gCurrText.id].txt = text
    renderCanvas()
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = Date.now() + '-meme'
}

function setFont(elFont) {
    gFont = elFont;
    renderCanvas()
    resizeCanvas()
}

function getDirection(elDirection) {
    gAlignment = elDirection
    renderCanvas()
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        drawImg(img.src)
        resizeCanvas()
    }
    reader.readAsDataURL(ev.target.files[0])
}

function closeShareModal() {
    var elShareModal = document.querySelector('.share-modal');
    elShareModal.style.display = 'none'
}

function openShareModal() {
    var elShareModal = document.querySelector('.share-modal');
    elShareModal.style.display = 'flex'
}

function setStrokeColor(elColor) {
    var elColorBtn = document.querySelector('.color')
    elColorBtn.style.border = `3px solid ${gFillColor}`
    gFillColor = elColor;
    renderCanvas()
}

function setUserText(text) {
    gCurrText.txt = text
}