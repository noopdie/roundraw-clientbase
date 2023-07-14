brush.rect = [
    function (x, y) {
        drawing = [{
            id: Math.random().toString(16).slice(2),
            x: -(innerWidth * devicePixelRatio) / 2,
            y: -(innerHeight * devicePixelRatio) / 2,
            segments: [[x, y], [x, y]],
            strokeColor: ls.color,
            color: 'rgba(0,0,0,0)',
            strokeWidth: ls.pencilWidth * view.zoom,
            lineCap: 'round',
            lineJoin: 'round'
        }];

    },
    function (x, y) {
        var sx = drawing[0].segments[0][0];
        var sy = drawing[0].segments[0][1];
        drawing[0].segments = [[sx, sy], [x, sy], [x, y], [sx, y], [sx, sy]];
        draw(drawing, tctx);
    },
    function () {
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
