get('area').onmouseup = function (e) {
    if (readings.rightClick) { 
        readings.rightClick = false;
        get('info').innerHTML = ''
    }
    if (readings.middleClick) readings.middleClick = false;
    if (readings.leftClick) {
        brush[readings.pen][2]();
        readings.leftClick = false;
    }
    if (readings.move3D) readings.move3D = false;
    get('top').style.pointerEvents = 'all';
}