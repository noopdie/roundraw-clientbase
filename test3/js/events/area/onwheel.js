get('area').onwheel = function (e) {
    if (readings.middleClick) {
        var deg = (e.deltaY > 0) ? -15 : 15;
        view.deg += deg;
        if (view.deg > 360) view.deg -= 360;
        if (view.deg < 0) view.deg += 360;
        var angle = deg * Math.PI / 180;
        var x = (view.x + (innerWidth * devicePixelRatio) / 2 - readings.moveX) * Math.cos(angle) - (view.y + (innerHeight * devicePixelRatio) / 2 - readings.moveY) * Math.sin(angle);
        var y = (view.x + (innerWidth * devicePixelRatio) / 2 - readings.moveX) * Math.sin(angle) + (view.y + (innerHeight * devicePixelRatio) / 2 - readings.moveY) * Math.cos(angle);
        view.x = x + readings.moveX - (innerWidth * devicePixelRatio) / 2;
        view.y = y + readings.moveY - (innerHeight * devicePixelRatio) / 2;
    } else {
        var zoom = (e.deltaY > 0) ? 0.8 : 1.2;
        view.zoom *= zoom;
        view.x += ((view.x + (innerWidth * devicePixelRatio) / 2) - (e.clientX * devicePixelRatio)) * zoom - ((view.x + (innerWidth * devicePixelRatio) / 2) - (e.clientX * devicePixelRatio));
        view.y += ((view.y + (innerHeight * devicePixelRatio) / 2) - (e.clientY * devicePixelRatio)) * zoom - ((view.y + (innerHeight * devicePixelRatio) / 2) - (e.clientY * devicePixelRatio));
    }
    get('info').innerHTML = 'x: ' + view.x + '<br>y: ' + view.y + '<br>deg: ' + view.deg + '<br>zoom: ' + view.zoom;
    if (readings.select.length > 0 && readings.pen == 'select') showSel();
    var wb = transform(view.wb);
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
    return false;
}