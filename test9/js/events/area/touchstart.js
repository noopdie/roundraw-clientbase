get('area').addEventListener('touchstart', function (e) {
    get('colorPick').classList.add('colorHide');
    get('toolbox').classList.add('colorHide');
    if (e.touches[2]) {
        readings.touch3D = true;
        readings.touchDraw = false;
        readings.startX = ((e.touches[0].clientX * devicePixelRatio) + (e.touches[1].clientX * devicePixelRatio) + (e.touches[2].clientX * devicePixelRatio)) / 3;
        readings.startY = ((e.touches[0].clientY * devicePixelRatio) + (e.touches[1].clientY * devicePixelRatio) + (e.touches[2].clientY * devicePixelRatio)) / 3;
        readings.startDegX = view.degX;
        readings.startDegY = view.degY;
        var dis1 = Math.sqrt(Math.pow((e.touches[1].clientX * devicePixelRatio) - (e.touches[0].clientX * devicePixelRatio), 2) + Math.pow((e.touches[1].clientY * devicePixelRatio) - (e.touches[0].clientY * devicePixelRatio), 2));
        var dis2 = Math.sqrt(Math.pow((e.touches[1].clientX * devicePixelRatio) - (e.touches[2].clientX * devicePixelRatio), 2) + Math.pow((e.touches[1].clientY * devicePixelRatio) - (e.touches[2].clientY * devicePixelRatio), 2));
        var dis3 = Math.sqrt(Math.pow((e.touches[2].clientX * devicePixelRatio) - (e.touches[0].clientX * devicePixelRatio), 2) + Math.pow((e.touches[2].clientY * devicePixelRatio) - (e.touches[0].clientY * devicePixelRatio), 2));
        var dis4 = (dis1 > dis2) ? dis1 : dis2;
        var dis = (dis3 > dis4) ? dis3 : dis4;
        readings.startArea = dis;
        readings.startZ = view.z;
    } else if (e.touches[1]) {
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