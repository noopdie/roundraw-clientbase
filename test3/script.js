const http = new XMLHttpRequest();
if (wbid) {
    http.open('GET', 'http://noopdie.com/wb_' + wbid)
    http.send()
    http.onload = () => {
        if (http.status != 404) {
            try {
                socket = new WebSocket('ws://noopdie.com/wb_' + wbid);
                view.wb = JSON.parse(http.responseText);
                view.wb_ = JSON.parse(http.responseText);
                socket.onmessage = socketOnMessage;
                draw(view.wb);
            } catch (err) { alert(err) }
        } else false;
    }
} else {
    socket = { send: () => { } }
    view.wb = (localStorage.wb) ? JSON.parse(localStorage.wb) : [];
    view.wb_ = (localStorage.wb) ? JSON.parse(localStorage.wb) : [];
    draw(view.wb);
}

window.onbeforeunload = function () {
    if (!wbid) {
        localStorage.wb = JSON.stringify(view.wb)
    }
}
get('area').oncontextmenu = function (e) {
    e.preventDefault();
}
get('range1').onmousedown = function (e) {
    readings.range1Move = true;
}
get('range2').onmousedown = function (e) {
    readings.range2Move = true;
}
get('range1').addEventListener('touchstart', function (e) {
    readings.range1Move = true;
});
get('range2').addEventListener('touchstart', function (e) {
    readings.range2Move = true;
});

document.body.onmouseup = function (e) {
    if (readings.range1Move) readings.range1Move = false;
    if (readings.range2Move) readings.range2Move = false;
}
document.body.addEventListener('touchend', function (e) {
    if (readings.range1Move) readings.range1Move = false;
    if (readings.range2Move) readings.range2Move = false;
});
get('pen').onmousedown = function () {
    if (readings.pen == 'pencil') {
        readings.pen = 'eraser';
        get('pen').style.backgroundImage = 'url(img/eraser.svg)';
        get('iw').value = ls.eraserWidth;
        get('width').value = ls.eraserWidth;
        get('width').max = 300;
    }
    else {
        readings.pen = 'pencil';
        get('pen').style.backgroundImage = 'url(img/pencil.svg)';
        get('iw').value = ls.pencilWidth;
        get('width').value = ls.pencilWidth;
        get('width').max = 300;
    }
    tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
    readings.selected = [];
    readings.selRect = false;
}
get('width').oninput = function () {
    if (readings.pen == 'eraser') ls.eraserWidth = get('width').value;
    if (readings.pen == 'pencil') ls.pencilWidth = get('width').value;
    get('iw').value = get('width').value;
}
get('iw').onchange = function () {
    if (readings.pen == 'eraser') ls.eraserWidth = get('iw').value;
    if (readings.pen == 'pencil') ls.pencilWidth = get('iw').value;
    get('width').value = get('iw').value;
}
get('opacity').oninput = function () {
    ls.opacity = get('opacity').value;
    var rgba = JSON.parse(ls.rgba);
    ls.color = "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ", " + ls.opacity + ")";
    get('color').style.backgroundColor = ls.color;
}
var brush = {
    background: [
        function () { }, function () { }, function () { },
    ]
}

get('hide').onclick = function () {
    get('panel').classList.toggle('hidden');
    get('hide').classList.toggle('flip');
}
get('color').onclick = function () {
    get('colorPick').classList.toggle('colorHide');
    get('toolbox').classList.add('colorHide');
}
get('tools').onclick = function () {
    get('toolbox').classList.toggle('colorHide');
    get('colorPick').classList.add('colorHide');
}
document.onselectstart = function () {
    return false
};
initColorPicker();

function save() {
    get('save').href = c.toDataURL()
}
function openArch() {
    get('range').classList.toggle('hideArch');
}
function select() {
    readings.pen = 'select';
    get('pen').style.backgroundImage = 'url(img/select.svg)';
}

setBrush = function (pen) {

    readings.pen = pen;
    get('pen').style.backgroundImage = 'url(img/' + pen + '.svg)';

}
var numInput = document.querySelectorAll('input[type="number"]');
for (var i = 0; i < numInput.length; i++) {
    // Listen for input event on numInput.
    numInput[i].onfocus = function () {
        readings.input = !0;
    }
    numInput[i].onblur = function () {
        readings.input = !1;
    }
}
