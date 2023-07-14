brush.select = [
    function (x, y) {
        if (readings.selRect) {
            var rect = readings.selRect;
            if (Math.sqrt(Math.pow(x - ((rect.right + rect.left) / 2), 2) + Math.pow(y - (rect.bottom + p20 * 2), 2)) <= p20) {
                readings.rotateSel = true;
readings.startSelAngle = Math.atan2(x - (rect.left + rect.right) / 2, y - (rect.top + rect.bottom) / 2);

             } else if (Math.sqrt(Math.pow(x - rect.right, 2) + Math.pow(y - rect.bottom, 2)) <= p20) readings.resizeSel = true, readings.flipX = false, readings.flipY = false;
            else if (Math.sqrt(Math.pow(x - rect.right, 2) + Math.pow(y - rect.top, 2)) <= p20) readings.resizeSel = true, readings.flipX = false, readings.flipY = true;
            else if (Math.sqrt(Math.pow(x - rect.left, 2) + Math.pow(y - rect.bottom, 2)) <= p20) readings.resizeSel = true, readings.flipX = true, readings.flipY = false;
            else if (Math.sqrt(Math.pow(x - rect.left, 2) + Math.pow(y - rect.top, 2)) <= p20) readings.resizeSel = true, readings.flipX = true, readings.flipY = true;
            else if (x > rect.left && y > rect.top && x < rect.right && y < rect.bottom) readings.moveSel = true;
            readings.selwb = transform(view.wb);
            readings.twb = JSON.parse(JSON.stringify(readings.selwb));
            readings.startLeft = rect.left;
            readings.startTop = rect.top;
            readings.startRight = rect.right;
            readings.startBottom = rect.bottom;
            readings.startFlipX = readings.flipX;
            readings.startFlipY = readings.flipY;
            
        }
        readings.startX = x, readings.startY = y;
        readings.selAngle = false;
    },
    function (x, y) {
        if (readings.rotateSel) {
            var rect = readings.selRect;
            var twb = readings.twb;
            var paths = readings.selected;
            for (var key in paths) {
                var tpath = twb[paths[key]];
                var path = readings.selwb[paths[key]];
                var seg = tpath.segments;
                var seg1 = path.segments;
                var deg = -Math.atan2(x - (readings.startLeft + readings.startRight) / 2, y - (readings.startTop + readings.startBottom) / 2) - readings.startSelAngle;
                readings.selAngle = deg;
                var mx =   - (path.x + (innerWidth / 2 * devicePixelRatio)) +  (readings.startLeft + readings.startRight) / 2;
                var my =   - (path.y + (innerHeight / 2 * devicePixelRatio)) + (readings.startTop + readings.startBottom) / 2;

                for (var i = 0; i < seg.length; i++) {
                    seg[i][0] = seg1[i][0]- mx;
                    seg[i][1] = seg1[i][1]  - my;
                    var segx = seg[i][0]
                    seg[i][0] = seg[i][0] * Math.cos(deg) - seg[i][1] * Math.sin(deg);
                    seg[i][0] +=  mx;
                    seg[i][1] = segx * Math.sin(deg) + seg[i][1] * Math.cos(deg);
                    seg[i][1] +=  my;
                    if (seg[i][2]) {
                        seg[i][2] =  seg1[i][2] - mx;
                        seg[i][3] = seg1[i][3] - my;
                        var segx = seg[i][2]
                        seg[i][2] = seg[i][2] * Math.cos(deg) - seg[i][3] * Math.sin(deg);
                        seg[i][2] += mx;
                        seg[i][3] = segx * Math.sin(deg) + seg[i][3] * Math.cos(deg);

                        seg[i][3] +=  my;
                    }
                    if (seg[i][4]) {
                        seg[i][4] = seg1[i][4] -  mx;
                        seg[i][5] = seg1[i][5] - my;
                        var segx = seg[i][4]
                        seg[i][4] = seg[i][4] * Math.cos(deg) - seg[i][5] * Math.sin(deg);
                        seg[i][4] +=  mx;
                        seg[i][5] = segx * Math.sin(deg) + seg[i][5] * Math.cos(deg);

                        seg[i][5] += my;
                    }

                }
                //tpath.x = path.x + (x - readings.startX);
                //tpath.y = path.y + (y - readings.startY);
                //view.wb[paths[key]] = detransform([path])[0];
            }
            draw(twb);
            showSel(twb);
        } else
        if (readings.resizeSel) {
            var rect = readings.selRect;
            var twb = readings.twb;
            var paths = readings.selected;
            for (var key in paths) {
                var tpath = twb[paths[key]];
                var path = readings.selwb[paths[key]];
                var seg = tpath.segments;
                var seg1 = path.segments;
                var mx =   readings.startLeft - (path.x + (innerWidth / 2 * devicePixelRatio));
                var my =   readings.startTop - (path.y + (innerHeight / 2 * devicePixelRatio));

                var tx =  (readings.startFlipX) ? (x - readings.startRight) / (readings.startX - readings.startRight) : (x - readings.startLeft) / (readings.startX - readings.startLeft);

                var ty =  (readings.startFlipY) ? (y - readings.startBottom) / (readings.startY - readings.startBottom) : (y - readings.startTop) / (readings.startY - readings.startTop);
                if (readings.startFlipX) tpath.x = path.x + (x - readings.startRight) - (readings.startX - readings.startRight);
                if (readings.startFlipY) tpath.y = path.y + (y - readings.startBottom) - (readings.startY - readings.startBottom)
                if (tx < 0) readings.flipX = true;
                if (ty < 0) readings.flipY = true;
                for (var i = 0; i < seg.length; i++) {
                    seg[i][0] = seg1[i][0]- mx;
                    seg[i][0] *= tx;
                    seg[i][0] +=  mx;
                    seg[i][1] = seg1[i][1]  - my;
                    seg[i][1] *= ty;
                    seg[i][1] +=  my;
                    if (seg[i][2]) {
                        seg[i][2] =  seg1[i][2] - mx;
                        seg[i][2] *= tx;
                        seg[i][2] += mx;
                    }
                    if (seg[i][3]) {
                        seg[i][3] = seg1[i][3] - my;
                        seg[i][3] *= ty
                        seg[i][3] +=  my;
                    }
                    if (seg[i][4]) {
                        seg[i][4] = seg1[i][4] -  mx;
                        seg[i][4] *= tx;
                        seg[i][4] +=  mx;
                    }
                    if (seg[i][5]) {
                        seg[i][5] = seg1[i][5] - my;
                        seg[i][5] *= ty
                        seg[i][5] += my;
                    }

                }
                //tpath.x = path.x + (x - readings.startX);
                //tpath.y = path.y + (y - readings.startY);
                //view.wb[paths[key]] = detransform([path])[0];
            }
            draw(twb);
            showSel(twb);
        } else if (readings.moveSel) {
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

        if (readings.moveSel || readings.resizeSel || readings.rotateSel) {

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
            readings.rotateSel = false;
            readings.resizeSel = false;
            readings.selAngle = false;
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
