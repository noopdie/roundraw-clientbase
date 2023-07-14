 brush.styler = [
    function (x, y) {
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        tctx.lineWidth = 2;
        tctx.fillStyle = 'rgba(0,0,0,0.5)';
        tctx.strokeStyle = 'rgba(255,255,255,0.5)';
        tctx.beginPath();
        tctx.arc(x, y, ls.eraserWidth, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        centerw = (innerWidth * devicePixelRatio) / 2;  //even this small thing can help with awful lag!
        centerh = (innerHeight * devicePixelRatio) / 2;
    },
    function (x, y) {
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        tctx.lineWidth = 2;
        tctx.fillStyle = 'rgba(0,0,0,0.5)';
        tctx.strokeStyle = 'rgba(255,255,255,0.5)';
        tctx.beginPath();
        tctx.arc(x, y, ls.eraserWidth, 0, 2 * Math.PI, false);
        var wb = transform(view.wb);
        var erange1 = (readings.range1) ? Math.floor(readings.range1 * wb.length) : 0;
        var erange2 = (readings.range2) ? Math.floor(readings.range2 * wb.length) : wb.length;
        loop1: for (var i = erange1; i < erange2; i++) {
            loop2: for (var k = 1; k < wb[i].segments.length; k++) {
                if (doesLineInterceptCircle([wb[i].x + wb[i].segments[k][0] + centerw, wb[i].y + wb[i].segments[k][1] + centerh], [wb[i].x + wb[i].segments[k - 1][0] + centerw, wb[i].y + wb[i].segments[k - 1][1] + centerh], [x, y], ls.eraserWidth * 1 + wb[i].strokeWidth / 2)) {
                    tctx.fillStyle = 'red';
                    // socket.send('del&' + wb[i].id);
                    view.wb[i].strokeWidth = ls.pencilWidth;
                    view.wb_.strokeWidth = ls.pencilWidth;
                    draw(wb);
                    break loop1;
                    break loop2;
                }
            }
        }
        tctx.stroke();
        tctx.fill();
    },
    function () {
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
    },
];
