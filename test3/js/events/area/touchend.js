get('area').addEventListener('touchend', function (e) {
    if (!e.touches[1]) {
        get('info').innerText = '';
        if (readings.touchDraw && e.touches.length == 0) {
            brush[readings.pen][2]();
            readings.touchDraw = false;
        }
    }
});