brush.pencil = [
    function (x, y) {
        drawing = [{
            id: Math.random().toString(16).slice(2),
            x: -(innerWidth * devicePixelRatio) / 2,
            y: -(innerHeight * devicePixelRatio) / 2,
            segments: [],
            strokeColor: ls.color,
            color: 'rgba(0,0,0,0)',
            strokeWidth: ls.pencilWidth * view.zoom,
            lineCap: 'round',
            lineJoin: 'round'
        }];
        readings.startDate = false;
        readings.startX = x, readings.startY = y;
    },
    function (x, y) {
        if (!drawing[0].segments[0]) drawing[0].segments[0] = [x, y];
        var endDate = new Date();
        var timeDiff = (readings.startDate) ? (endDate.getTime() - readings.startDate.getTime()) / 50 : 1;
        timeDiff = timeDiff * timeDiff * timeDiff * 5;
        info.innerText = timeDiff;
        if (timeDiff > 2) timeDiff = 1;
        var seg = drawing[0].segments[drawing[0].segments.length - 1];
        var distance = Math.sqrt(Math.pow(x - seg[0], 2) + Math.pow(y - seg[0], 2));
        if (distance > 25) timeDiff = 0.5;
        if (distance > 4) {
            drawing[0].segments.push([(x - seg[0]) * timeDiff + seg[0], (y - seg[1]) * timeDiff + seg[1]]);
            smooth(drawing[0]);
            draw(drawing, tctx);
            readings.startDate = new Date();
        }

    },
    function () {
        if (!drawing[0].segments[0]) drawing[0].segments = [[readings.startX, readings.startY], [readings.startX, readings.startY]];
        trace = detransform(drawing)[0];
        for (var i = 0; i < trace.segments.length; i++) {
            trace.x = parseFloat((trace.x * 1).toFixed(2));
            trace.y = parseFloat((trace.y * 1).toFixed(2));
            for (var k = 0; k < trace.segments[i].length; k++) {
                trace.segments[i][k] = parseFloat((trace.segments[i][k] * 1).toFixed(2));
            }
        }
        view.wb.push(trace);
        view.wb_.push(JSON.parse(JSON.stringify(trace)));
        mine.push(trace.id);
        socket.send('new&Line&' + trace.id + '&' + JSON.stringify(trace));
        drawing = [];
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        draw(transform(view.wb))
    },
];