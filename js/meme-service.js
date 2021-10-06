'use strict';
const KEY = 'memes'
var gKeywords = { 'happy': 12, 'funny puk': 1 }
var gImgs = [];
var gStoredMemes = [];

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            idx: 0,
            pos: { x: 225, y: 70 },
            txt: 'your text',
            size: 60,
            align: 'center',
            color: 'black',
            font: 'impact'
        },
        {
            idx: 1,
            pos: { x: 225, y: 430 },
            txt: 'your text',
            size: 60,
            align: 'center',
            color: 'black',
            font: 'impact'
        }
    ]
}

function resetMeme() {
    gMeme.lines.forEach(function (line) {
        var pos = (line.idx === 0) ? { x: 225, y: 70 } : { x: 225, y: 430 }
        line.txt = 'your text';
        line.pos = pos;
        line.txt = 'your text';
        line.size = 60;
        line.align = 'center';
        line.color = 'black';
        line.font = 'impact';
    });
}

function createImg(idx) {
    var img = {
        id: idx + 1, url: `img/${idx + 1}.jpg`, keywords: ['happy']
    };
    return img;
}

function createImgs() {
    for (var i = 0; i < 18; i++) {
        var img = createImg(i);
        gImgs.push(img);
    }
}

function getImgs() {
    return gImgs;
}
function getStoredMemes() {
    return gStoredMemes;
}

function setImgId(id) {
    gMeme.selectedImgId = +id;
}

function getImgUrl() {
    var foundImg = gImgs.find(function (img) {
        return img.id === gMeme.selectedImgId;
    });
    return foundImg.url;
}

function getText(line) {
    return line.txt;
}

function getLinePos(line) {
    return line.pos;
}

function updateText(txt) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.txt = txt;
}

function setLineHeight(diff) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.pos.y += diff;
}

function setFontSize(diff) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.size += diff;
}

function setFontFamily(font) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.font = font;
}

function setStrokeColor(color) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.color = color;
}

function SetTextAlign(direction) {
    var line = gMeme.lines[gMeme.selectedLineIdx];
    line.align = direction;
}


function setSelectedLine() {
    var length = gMeme.lines.length;
    var currIdx = gMeme.selectedLineIdx;
    var nextIdx = (currIdx === length - 1) ? 0 : currIdx + 1;
    gMeme.selectedLineIdx = nextIdx;
    gMeme.lines[nextIdx].isActive = true;
    return nextIdx;
}

function getMemeLines() {
    return gMeme.lines;
}

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}

function saveMemes(meme) {
    if (!gStoredMemes) {
        gStoredMemes = [meme];
    } else {
        gStoredMemes.push(meme);
    }
    saveToStorage(gStoredMemes);
}

function getStoredMemes() {
    var memes = loadFromStorage(KEY);
    gStoredMemes = memes;
    return gStoredMemes;
}

function getInitialMemes() {
    return gInitialMemes;
}


