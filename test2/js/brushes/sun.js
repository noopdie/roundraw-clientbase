brush.sun = [
    function (x, y) {
        var segs = [];
        tctx.fillStyle = 'red';
        readings.pick = ctx.getImageData(x, y, 1, 1).data;
        function eqc() {
            var s = readings.pick;
            var c = ctx.getImageData(readings.go.x, readings.go.y, 1, 1).data;
            return (c[0] == s[0] && c[1] == s[1] && c[2] == s[2] && c[3] == s[3]) ? true : false
        }
        function dr() { tctx.fillRect(readings.go.x, readings.go.y, 1, 1) }
        var mv = true;
        var go = readings.go = {
            x: x,
            y: y,
        };
        loop1: for (var deg = 0; deg < 360; deg += 1) {
            var angle = deg * Math.PI / 180;
            var dx = Math.cos(angle) - Math.sin(angle);
            var dy = Math.sin(angle) + Math.cos(angle);
            loop2: while (mv) {
                if (eqc()) {
                    dr();
                    go.x += dx;
                    go.y += dy;
                    if (go.x > innerWidth * devicePixelRatio || go.x < 0 || go.y > innerHeight * devicePixelRatio || go.y < 0) {
                        segs = false;
                        break loop1;
                        break loop2;

                    }
                } else {
                    mv = false;
                }
            }
            mv = true;
            if (segs) segs.push([go.x, go.y])
            go.x = x;
            go.y = y;
        }
        if (segs) {
            var drawing = [{
                strokeWidth: 0,
                strokeColor: 'rgba(0,0,0,0)',
                color: ls.color,
                segments: segs,
                id: Math.random().toString(16).slice(2),
                x: -(innerWidth * devicePixelRatio) / 2,
                y: -(innerHeight * devicePixelRatio) / 2,
            }];
            var trace = readings.trace = detransform(drawing)[0];
            for (var i = 0; i < trace.segments.length; i++) {
                trace.x = parseFloat((trace.x * 1).toFixed(2));
                trace.y = parseFloat((trace.y * 1).toFixed(2));
                for (var k = 0; k < trace.segments[i].length; k++) {
                    trace.segments[i][k] = parseFloat((trace.segments[i][k] * 1).toFixed(2));
                    // if (k == 2 && trace.segments[i][k] == 0) trace.segments.splice(i,1);
                }
            }
        }
    },
    function (x, y) {
        readings.noMove = true;
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
    },
    function () {
        if (!readings.noMove) {
            view.wb.push(readings.trace);
            view.wb_.push(JSON.parse(JSON.stringify(readings.trace)));
            draw(transform(view.wb));
            tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
            socket.send('new&Line&' + readings.trace.id + '&' + JSON.stringify(readings.trace));
        }
        readings.noMove = false;
    }
];