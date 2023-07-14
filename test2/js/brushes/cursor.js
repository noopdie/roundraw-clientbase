brush.cursor = [
    
    function (x, y) {
        readings.selMoved = false;
        readings.startX = x;
        readings.startY = y;

        delete readings.segRes2;
        delete readings.selPoint;
        var wb = transform(view.wb);
        centerw = (innerWidth * devicePixelRatio) / 2;  //even this small thing can help with awful lag!
        centerh = (innerHeight * devicePixelRatio) / 2;


        var erange1 = (readings.range1) ? Math.floor(readings.range1 * wb.length) : 0;
        var erange2 = (readings.range2) ? Math.floor(readings.range2 * wb.length) : wb.length;

        //tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        if (!readings.selected) {
        tctx.lineWidth = 2;
        tctx.fillStyle = 'rgba(0,0,0,0.5)';
        tctx.strokeStyle = 'rgba(255,255,255,0.5)';
        tctx.beginPath();
        tctx.arc(x, y, 10, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        }
        loop1: for (var i = erange1; i < erange2; i++) {
            loop2: for (var k = 1; k < wb[i].segments.length; k++) {
                if (doesLineInterceptCircle([wb[i].x + wb[i].segments[k][0] + centerw, wb[i].y + wb[i].segments[k][1] + centerh], [wb[i].x + wb[i].segments[k - 1][0] + centerw, wb[i].y + wb[i].segments[k - 1][1] + centerh], [x, y], 10 * 1 + wb[i].strokeWidth / 2)) {
                   /* tctx.fillStyle = 'red';
                    socket.send('del&' + wb[i].id);
                    removed.push(view.wb[i]);
                    view.wb.splice(i, 1);
                    view.wb_.splice(i, 1);
                    draw(wb);
                    */
                    readings.selected = i;
                    tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
                    loop3: for (var l = 0; l < wb[i].segments.length; l++) {
                        tctx.lineWidth = 2;
                        tctx.fillStyle = 'rgba(0,0,0,0.5)';
                        tctx.strokeStyle = 'rgba(255,255,255,0.5)';
                        tctx.beginPath();
                        tctx.arc(wb[i].x + wb[i].segments[l][0] + centerw, wb[i].y + wb[i].segments[l][1] + centerh, 10, 0, 2 * Math.PI, false);
                        tctx.stroke();
                        tctx.fill();
                    }
                    break loop1;
                    break loop2;
                }
            }
        }
    if (readings.selected >= 0) {
        var i = readings.selected;
        if (wb[i]) {
        for (var k = 0; k < wb[i].segments.length; k++) {
            if (Math.sqrt(Math.pow((wb[i].x + wb[i].segments[k][0] + centerw) - x, 2) + Math.pow((wb[i].y + wb[i].segments[k][1] + centerh) - y, 2)) < 10) {
                if (k==0) console.log('b')
                tctx.lineWidth = 2;
                tctx.fillStyle = (k==0) ? 'rgba(0,255,0,0.5)' : 'rgba(255,0,0,0.5)';
                tctx.strokeStyle = 'rgba(255,255,255,0.5)';

                tctx.beginPath();
                tctx.arc(wb[i].x + wb[i].segments[k][0] + centerw, wb[i].y + wb[i].segments[k][1] + centerh, 10, 0, 2 * Math.PI, false);
                tctx.stroke();
                tctx.fill(); 
                readings.selPoint = k;
            }
        }
    }
}
    },
    function (x, y) {
        readings.selMoved = true;
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        tctx.lineWidth = 2;
        tctx.fillStyle = 'rgba(0,0,0,0.5)';
        tctx.strokeStyle = 'rgba(255,255,255,0.5)';
        tctx.beginPath();
        tctx.arc(x, y, 10, 0, 2 * Math.PI, false);
        var wb = transform(view.wb);
        var erange1 = (readings.range1) ? Math.floor(readings.range1 * wb.length) : 0;
        var erange2 = (readings.range2) ? Math.floor(readings.range2 * wb.length) : wb.length;
        if (readings.selPoint >= 0) {
            var i = readings.selected;
            var k = readings.selPoint;
            var moveX = x - readings.startX;
            var moveY = y - readings.startY;
            wb[i].segments[k][0] += moveX;
            wb[i].segments[k][1] += moveY;
            if (wb[i].segments[k][2]) wb[i].segments[k][2] += moveX;
            if (wb[i].segments[k][3]) wb[i].segments[k][3] += moveY;
            if (wb[i].segments[k-1]) {
            if (wb[i].segments[k-1][4]) wb[i].segments[k-1][4] += moveX;
            if (wb[i].segments[k-1][5]) wb[i].segments[k-1][5] += moveY;
            readings.segRes2 = detransform([JSON.parse(JSON.stringify(wb[i]))])[0].segments[k-1];
            }
            readings.segRes = detransform([JSON.parse(JSON.stringify(wb[i]))])[0].segments[k];
            
            draw(wb);
        
        }
        if (!(readings.selPoint >= 0)) {
        loop1: for (var i = erange1; i < erange2; i++) {
            loop2: for (var k = 1; k < wb[i].segments.length; k++) {
                if (doesLineInterceptCircle([wb[i].x + wb[i].segments[k][0] + centerw, wb[i].y + wb[i].segments[k][1] + centerh], [wb[i].x + wb[i].segments[k - 1][0] + centerw, wb[i].y + wb[i].segments[k - 1][1] + centerh], [x, y], 10 * 1 + wb[i].strokeWidth / 2)) {
                   /* tctx.fillStyle = 'red';
                    socket.send('del&' + wb[i].id);
                    removed.push(view.wb[i]);
                    view.wb.splice(i, 1);
                    view.wb_.splice(i, 1);
                    draw(wb);
                    */
                    readings.selected = i;
                    tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
                    loop3: for (var l = 0; l < wb[i].segments.length; l++) {
                        tctx.lineWidth = 2;
                        tctx.fillStyle = 'rgba(0,0,0,0.5)';
                        tctx.strokeStyle = 'rgba(255,255,255,0.5)';
                        tctx.beginPath();
                        tctx.arc(wb[i].x + wb[i].segments[l][0] + centerw, wb[i].y + wb[i].segments[l][1] + centerh, 10, 0, 2 * Math.PI, false);
                        tctx.stroke();
                        tctx.fill();
                    }
                    break loop1;
                    break loop2;
                }
            }
            if (!(readings.selPoint >= 0)) delete readings.selected;
        }
    } else {
        var i = readings.selected;
        for (var l = 0; l < wb[i].segments.length; l++) {
            tctx.lineWidth = 2;
            tctx.fillStyle = (l == readings.selPoint) ? 'rgba(255,0,0,0.5)' : 'rgba(0,0,0,0.5)';
            tctx.strokeStyle = 'rgba(255,255,255,0.5)';
            tctx.beginPath();
            tctx.arc(wb[i].x + wb[i].segments[l][0] + centerw, wb[i].y + wb[i].segments[l][1] + centerh, 10, 0, 2 * Math.PI, false);
            tctx.stroke();
            tctx.fill();
        }
    }
        tctx.stroke();
        tctx.fill();
    },
    function () {
        if (readings.selMoved) {
        if (readings.selPoint >= 0) { view.wb[readings.selected].segments[readings.selPoint] = readings.segRes;
        if (readings.segRes2) view.wb[readings.selected].segments[readings.selPoint-1] = readings.segRes2;
        socket.send('change&' + view.wb[readings.selected].id + '&' + JSON.stringify(view.wb[readings.selected]));
        }
    }
    if (!(readings.selected >= 0)) tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
    },
];