get('area').onmousedown = function (e) {
    get('top').style.pointerEvents = 'none';
    get('colorPick').classList.add('colorHide');
    get('toolbox').classList.add('colorHide');
    if (e.which == 1 && readings.ctrlKey) {
        readings.move3D = true;
        readings.touchDraw = false;
        readings.startX = e.clientX * devicePixelRatio;
        readings.startY = e.clientY * devicePixelRatio;
        readings.startDegX = view.degX;
        readings.startDegY = view.degY;
    } else
    if (e.which == 1 && readings.drawTimeout) {
        readings.leftClick = true;
        brush[readings.pen][0]((e.clientX * devicePixelRatio), (e.clientY * devicePixelRatio));
    }
    if (e.which == 3) {
        readings.rightClick = true;
        readings.startViewX = view.x;
        readings.startViewY = view.y;
        readings.startX = (e.clientX * devicePixelRatio);
        readings.startY = (e.clientY * devicePixelRatio);
    }
    if (e.which == 2) { readings.middleClick = true
e.preventDefault();
    }
}