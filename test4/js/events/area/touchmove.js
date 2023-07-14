get('area').addEventListener('touchmove', function (e) {
    if (e.touches[2] && !readings.touchDraw) {
        var x = ((e.touches[0].clientX * devicePixelRatio) + (e.touches[1].clientX * devicePixelRatio) + (e.touches[2].clientX * devicePixelRatio)) / 3;
        var y = ((e.touches[0].clientY * devicePixelRatio) + (e.touches[1].clientY * devicePixelRatio) + (e.touches[2].clientY * devicePixelRatio)) / 3;
        view.degX = ((readings.startDegX/360) + (x - readings.startX) / ((innerWidth * devicePixelRatio))) * 360;
        if (view.degX < 0) view.degX += 360;
        if (view.degX > 360) view.degX -= 360;
        view.degY = ((readings.startDegY/360) + (y - readings.startY) / ((innerHeight * devicePixelRatio))) * 360;
        if (view.degY < 0) view.degY += 360;
        if (view.degY > 360) view.degY -= 360;
        var wb = transform(view.wb)
        draw(wb);
        get('info').innerHTML = '<tspan x="0" dy="1.2em">x: ' + view.x + '</tspan><tspan x="0" dy="1.2em">y: ' + view.y + '</tspan><tspan x="0" dy="1.2em">deg: ' + view.deg + '</tspan><tspan x="0" dy="1.2em">zoom: ' + view.zoom + '</tspan><tspan x="0" dy="1.2em">z: ' + view.z +'</tspan><tspan x="0" dy="1.2em">degX: ' + view.degX + '</tspan><tspan x="0" dy="1.2em">degY: ' + view.degY + '</tspan>';
    } else if (e.touches[1] && !readings.touchDraw && !readings.touch3D) {
        var distance = Math.sqrt(Math.pow((e.touches[1].clientX * devicePixelRatio) - (e.touches[0].clientX * devicePixelRatio), 2) + Math.pow((e.touches[1].clientY * devicePixelRatio) - (e.touches[0].clientY * devicePixelRatio), 2));
        view.zoom = readings.startZoom * (distance / readings.startDistance);
        readings.moveX = ((e.touches[0].clientX * devicePixelRatio) + (e.touches[1].clientX * devicePixelRatio)) / 2;
        view.x = readings.startViewX + (readings.moveX - readings.startX);
        view.x += (view.x + (innerWidth * devicePixelRatio) / 2 - readings.moveX) * view.zoom / readings.startZoom - (view.x + (innerWidth * devicePixelRatio) / 2 - readings.moveX);
        readings.moveY = ((e.touches[0].clientY * devicePixelRatio) + (e.touches[1].clientY * devicePixelRatio)) / 2;
        view.y = readings.startViewY + (readings.moveY - readings.startY);
        view.y += (view.y + (innerHeight * devicePixelRatio) / 2 - readings.moveY) * view.zoom / readings.startZoom - (view.y + (innerHeight * devicePixelRatio) / 2 - readings.moveY);
        var moveDeg = Math.atan2((e.touches[1].clientX * devicePixelRatio) - (e.touches[0].clientX * devicePixelRatio), (e.touches[1].clientY * devicePixelRatio) - (e.touches[0].clientY * devicePixelRatio)) * 180 / Math.PI;
        var deg = readings.startDeg - moveDeg;
        view.deg = readings.deg + deg;
        var angle = deg * Math.PI / 180;
        var x = (view.x + (innerWidth * devicePixelRatio) / 2 - readings.moveX) * Math.cos(angle) - (view.y + (innerHeight * devicePixelRatio) / 2 - readings.moveY) * Math.sin(angle);
        var y = (view.x + (innerWidth * devicePixelRatio) / 2 - readings.moveX) * Math.sin(angle) + (view.y + (innerHeight * devicePixelRatio) / 2 - readings.moveY) * Math.cos(angle);
        view.x = x + readings.moveX - (innerWidth * devicePixelRatio) / 2;
        view.y = y + readings.moveY - (innerHeight * devicePixelRatio) / 2;
        if (view.deg > 360) view.deg -= 360;
        if (view.deg < 0) view.deg += 360;
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
        get('info').innerHTML = '<tspan x="0" dy="1.2em">x: ' + view.x + '</tspan><tspan x="0" dy="1.2em">y: ' + view.y + '</tspan><tspan x="0" dy="1.2em">deg: ' + view.deg + '</tspan><tspan x="0" dy="1.2em">zoom: ' + view.zoom + '</tspan><tspan x="0" dy="1.2em">z: ' + view.z +'</tspan><tspan x="0" dy="1.2em">degX: ' + view.degX + '</tspan><tspan x="0" dy="1.2em">degY: ' + view.degY + '</tspan>';   
     } else if (e.touches[0] && readings.touchDraw) {
        if (brush[readings.pen][3] && readings.add) {
            brush[readings.pen][3]();
            readings.add = false;
        }
        brush[readings.pen][1]((e.touches[0].clientX * devicePixelRatio), (e.touches[0].clientY * devicePixelRatio));

    }
});