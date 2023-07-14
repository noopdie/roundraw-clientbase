brush.select = [
    function (x, y) {
        if (readings.selRect) {
            var rect = readings.selRect;
            if (x > rect.left && y > rect.top && x < rect.right && y < rect.bottom) readings.moveSel = true;
            readings.selwb = transform(view.wb);
            readings.twb = JSON.parse(JSON.stringify(readings.selwb));
        }
        readings.startX = x, readings.startY = y;
    },
    function (x, y) {
        if (readings.moveSel) {
            var twb = readings.twb;
            var paths = readings.selected;
            for (var key in paths) {
                var tpath = twb[paths[key]];
                var path = readings.selwb[paths[key]];
                tpath.x = path.x + (x - readings.startX);
                tpath.y = path.y + (y - readings.startY);
                //view.wb[paths[key]] = detransform([path])[0];
            }
            draw(twb);
            showSel(twb);
        } else {
            tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
            tctx.lineWidth = 2;
            tctx.strokeStyle = 'black';
            tctx.setLineDash([7, 4]);
            tctx.fillStyle = 'rgba(255,255,255,0.5)';
            tctx.beginPath();
            tctx.moveTo(readings.startX, readings.startY)
            tctx.lineTo(x, readings.startY);
            tctx.lineTo(x, y);
            tctx.lineTo(readings.startX, y);
            tctx.lineTo(readings.startX, readings.startY)
            tctx.stroke();
            tctx.fill();
            tctx.setLineDash([0, 0]);
            readings.select = [[(readings.startX < x) ? readings.startX : x, (readings.startY < y) ? readings.startY : y], [(x > readings.startX) ? x : readings.startX, (y > readings.startY) ? y : readings.startY]];
        }
    },
    function () {
        if (readings.moveSel) {

            var twb = readings.twb;
            var paths = readings.selected;
            for (var key in paths) {
                var tpath = twb[paths[key]];
                var trace = detransform([tpath])[0];
                for (var i = 0; i < trace.segments.length; i++) {
                    trace.x = parseFloat((trace.x * 1).toFixed(2));
                    trace.y = parseFloat((trace.y * 1).toFixed(2));
                    for (var k = 0; k < trace.segments[i].length; k++) {
                        trace.segments[i][k] = parseFloat((trace.segments[i][k] * 1).toFixed(2));
                        // if (k == 2 && trace.segments[i][k] == 0) trace.segments.splice(i,1);
                    }
                }
                view.wb[paths[key]] = trace;
                socket.send('change&' + trace.id + '&' + JSON.stringify(trace));
            }
            var wb_ = transform(view.wb);
            readings.moveSel = false;
            draw(wb_);
            showSel(wb_);
        } else {
            tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
            var wb = transform(view.wb);
            var paths = readings.selected = [];
            var sel = readings.select;
            var range1 = (readings.range1) ? Math.floor(readings.range1 * wb.length) : 0;
            var range2 = (readings.range2) ? Math.floor(readings.range2 * wb.length) : wb.length;
            loop1: for (var i = range1; i < range2; i++) {
                loop2: for (var k = 0; k < wb[i].segments.length; k++) {
                    var seg = wb[i].segments[k];
                    var x = wb[i].x + seg[0] + (innerWidth / 2 * devicePixelRatio);
                    var y = wb[i].y + seg[1] + (innerHeight / 2 * devicePixelRatio);
                    if (!(x > sel[0][0] && y > sel[0][1] && x < sel[1][0] && y < sel[1][1])) break loop2;
                    if (k == wb[i].segments.length - 1) readings.selected.push(i);
                }
            }
            if (readings.selected.length == 0) readings.selRect = false;
        }
        showSel(wb);
    }
];
