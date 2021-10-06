'use strict';
var gCanvas;
var gCtx;

function onInit() {
    createImgs();
    renderImgsGallery();
    renderMemesGallery();
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
}

function renderImgsGallery() {
    var imgs = getImgs();
    var strHTMLs = imgs.map(function (img) {
        return `<img class="img" id="${img.id}" src="${img.url}" onclick="onGotoEditor(this.id)">`
    })
    document.querySelector('.gallery-container').innerHTML = strHTMLs.join('');
}
function renderMemesGallery() {
    var memes = getStoredMemes();
    if (!memes || !memes.length) {
        console.log('no memes');
        renderInitialMemes();
        return
    }
    var strHTMLs = memes.map(function (meme) {
        return `<img src="${meme}">`
    })
    document.querySelector('.memes-container').innerHTML = strHTMLs.join('');
}

function renderInitialMemes(){
  var strHTML = `<img src="memes/my-meme1.jpg"><img src="memes/my-meme2.jpg"><img src="memes/my-meme3.jpg">`;
  document.querySelector('.memes-container').innerHTML = strHTML;
}

function onGotoGallery() {
    document.querySelector('.gallery').classList.remove('hidden');
    document.querySelector('.editor').classList.add('hidden');
    document.querySelector('.stored-memes').classList.add('hidden');
    document.querySelector('.gallery-link').classList.add('active');
    document.querySelector('.memes-link').classList.remove('active');
    clearCanvas();
    resetMeme();
}
function onGotoMemes() {
    renderMemesGallery();
    document.querySelector('.stored-memes').classList.remove('hidden');
    document.querySelector('.editor').classList.add('hidden');
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.gallery-link').classList.remove('active');
    document.querySelector('.memes-link').classList.add('active');
    clearCanvas();
    resetMeme();
}

function onSetTextAlign(direction) {
    SetTextAlign(direction);
    onDrawMeme();
}

function onGotoEditor(id) {
    setImgId(id);
    document.querySelector('.editor').classList.remove('hidden');
    document.querySelector('.gallery').classList.add('hidden');
    document.querySelector('.stored-memes').classList.add('hidden');
    onDrawMeme();
}

function onDrawMeme() {
    var img = new Image()
    img.src = getImgUrl();
    img.onload = () => {
        gCtx.save()
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        onDrawText();
        gCtx.restore();
    }
}
function onDrawMemeNoFocus() {
    var img = new Image()
    img.src = getImgUrl();
    img.onload = () => {
        gCtx.save()
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        onDrawText();
        gCtx.restore();
    }
}

function onDrawText() {
    var memeLines = getMemeLines();
    var selectedIdx = getSelectedLineIdx();
    memeLines.forEach(function (line) {
        drawText(line);
        if (line.idx === selectedIdx) drawFocus(line);
    });
}

function drawText(line) {
    gCtx.strokeStyle = line.color;
    gCtx.lineWidth = '2';
    gCtx.fillStyle = 'white';
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.textAlign = `${line.align}`;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
}


function onEditText(input) {
    updateText(input);
    onDrawMeme();
}

function onMoveLine(step) {
    var diff = (step === 'up') ? -3 : 3;
    setLineHeight(diff);
    onDrawMeme();
}
function onScaleFont(step) {
    var diff = (step === 'up') ? 1 : -1;
    setFontSize(diff);
    onDrawMeme();
}

function onSetFont(font) {
    setFontFamily(font);
    onDrawMeme();
}

function onSetColor(color) {
    setStrokeColor(color);
    onDrawMeme();
}

function onSwitchLine() {
    var idx = setSelectedLine();
    var lines = getMemeLines()
    var elInput = document.querySelector('.text-input');
    elInput.value = lines[idx].txt;
    onDrawMeme();
}


function drawFocus(line) {
    var measure = gCtx.measureText(line.txt);
    gCtx.beginPath()
    var y = line.pos.y - measure.fontBoundingBoxAscent;
    var h = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
    gCtx.rect(25, y, 400, h);
    gCtx.strokeStyle = 'orange'
    gCtx.stroke();
}

function onDownloadImg(elLink) {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent;
}

function onSaveMeme() {
    var imgContent = gCanvas.toDataURL('image/jpeg');
    saveMemes(imgContent);
    onGotoMemes()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}


