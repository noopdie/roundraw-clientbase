get('area').onmousemove = function (e) {
    var rect = readings.selRect;
    if (rect) {
        tc.style.cursor = (e.clientX > rect.left && e.clientY > rect.top && e.clientX < rect.right && e.clientY < rect.bottom) ? 'move' : 'default';
    }
    if (readings.leftClick) {
        if (brush[readings.pen][3] && readings.add) {
            brush[readings.pen][3]();
            readings.add = false;
        }
        brush[readings.pen][1]((e.clientX * devicePixelRatio), (e.clientY * devicePixelRatio));

    }
    readings.moveX = (e.clientX * devicePixelRatio);
    readings.moveY = (e.clientY * devicePixelRatio);
    if (readings.rightClick) {
        view.x = readings.startViewX + ((e.clientX * devicePixelRatio) - readings.startX);
        view.y = readings.startViewY + ((e.clientY * devicePixelRatio) - readings.startY);
        if (readings.select.length > 0 && readings.pen == 'select') showSel();
        var wb = transform(view.wb)
        draw(wb);
        if (readings.pen == 'cursor') {
            tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
            if (readings.selected >= 0) {
                var i = readings.selected;
            for (var l = 0; l < wb[i].segments.length; l++) {
                tctx.lineWidth = 2;
                tctx.fillStyle = 'rgba(0,0,0,0.5)';
                tctx.strokeStyle = 'rgba(255,255,255,0.5)';
                tctx.beginPath();
                tctx.arc(wb[i].x + wb[i].segments[l][0] + centerw, wb[i].y + wb[i].segments[l][1] + centerh, 10, 0, 2 * Math.PI, false);
                tctx.stroke();
                tctx.fill();
            }
        }
        }
        get('info').innerHTML = '<tspan x="0" dy="1.2em">x: ' + view.x + '</tspan><tspan x="0" dy="1.2em">y: ' + view.y + '</tspan><tspan x="0" dy="1.2em">deg: ' + view.deg + '</tspan><tspan x="0" dy="1.2em">zoom: ' + view.zoom + '</tspan><tspan x="0" dy="1.2em">z: ' + view.z +'</tspan><tspan x="0" dy="1.2em">degX: ' + view.degX + '</tspan><tspan x="0" dy="1.2em">degY: ' + view.degY + '</tspan>';    }
}