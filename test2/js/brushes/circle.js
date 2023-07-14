brush.circle = [
    function (x, y) {
        drawing = [{
            id: Math.random().toString(16).slice(2),
            x: -(innerWidth * devicePixelRatio) / 2 + x,
            y: -(innerHeight * devicePixelRatio) / 2 + y,
            segments: [[x, y]],
            strokeColor: ls.color,
            closed: true,
            color: 'rgba(0,0,0,0)',
            strokeWidth: ls.pencilWidth * view.zoom,
        }];
        readings.radius = 0;
    },
    function (x, y) {
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        var s = drawing[0].segments[0];
        tctx.beginPath();
        tctx.lineWidth = drawing[0].strokeWidth;
        tctx.strokeStyle = ls.color;
        readings.radius = Math.sqrt(Math.pow(x - s[0], 2) + Math.pow(y - s[1], 2));
        tctx.arc(s[0], s[1], readings.radius, 0, Math.PI * 2, false);
        tctx.stroke();
    },
    function () {
        var pi = 3.55;
        var r = readings.radius;
        drawing[0].segments = [
            [-r + r / pi, -r + r / pi],
            [r - r / pi, -r + r / pi],
            [r - r / pi, r - r / pi],
            [-r + r / pi, r - r / pi],
            [-r + r / pi, -r + r / pi],
        ];
        smooth(drawing[0], Math.PI);
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