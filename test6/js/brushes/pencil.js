brush.pencil = [
    function (x, y) {
        removed = [];
        drawing = [{
            id: Math.random().toString(16).slice(2),
            x: -(innerWidth * devicePixelRatio) / 2,
            y: -(innerHeight * devicePixelRatio) / 2,
            z: view.z,
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
        var seg = drawing[0].segments[drawing[0].segments.length - 1];
        drawing[0].segments.push([(x - seg[0]) * 0.5 + seg[0], (y - seg[1]) * 0.5 + seg[1]]);
            smooth(drawing[0]);
            draw(drawing, tctx);
            readings.startDate = new Date();
        

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