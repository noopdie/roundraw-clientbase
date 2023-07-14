get('area').addEventListener('touchstart', function (e) {
    get('colorPick').classList.add('colorHide');
    get('toolbox').classList.add('colorHide');

    if (e.touches[1]) {
        if (readings.touchDraw && brush[readings.pen][3] && readings.drawTimeout) {
            brush[readings.pen][3]();
            readings.touchDraw = true;
            readings.add = false;
            return;
        }
        readings.touchDraw = false;
        if (readings.pen != 'cursor') tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        readings.startX = ((e.touches[0].clientX * devicePixelRatio) + (e.touches[1].clientX * devicePixelRatio)) / 2;
        readings.startViewX = view.x;
        readings.startY = ((e.touches[0].clientY * devicePixelRatio) + (e.touches[1].clientY * devicePixelRatio)) / 2;
        readings.startX0 = (e.touches[0].clientX * devicePixelRatio);
        readings.startX1 = (e.touches[1].clientX * devicePixelRatio);
        readings.startViewY = view.y;
        readings.startDistance = Math.sqrt(Math.pow((e.touches[1].clientX * devicePixelRatio) - (e.touches[0].clientX * devicePixelRatio), 2) + Math.pow((e.touches[1].clientY * devicePixelRatio) - (e.touches[0].clientY * devicePixelRatio), 2));
        readings.startZoom = view.zoom;
        readings.startDeg = Math.atan2((e.touches[1].clientX * devicePixelRatio) - (e.touches[0].clientX * devicePixelRatio), (e.touches[1].clientY * devicePixelRatio) - (e.touches[0].clientY * devicePixelRatio)) * 180 / Math.PI;
        readings.deg = view.deg;
    } else if (e.touches[0]) {
        setTimeout(() => { readings.drawTimeout = true }, 200);
        readings.touchDraw = true;
        brush[readings.pen][0]((e.touches[0].clientX * devicePixelRatio), (e.touches[0].clientY * devicePixelRatio));
    }
    readings.drawTimeout = false;
});