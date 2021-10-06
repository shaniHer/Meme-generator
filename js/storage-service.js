'use strict';
function loadFromStorage(key) {
    var json = localStorage.getItem(key)
    var data = JSON.parse(json)
    return data;
}

function saveToStorage(data){
    var json = JSON.stringify(data);
    localStorage.setItem(KEY, json)
}

