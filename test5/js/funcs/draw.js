function draw(wb, context, x, y) {
    var includesPoint = [];
    var ctx_ = (context) ? context : ctx;
    var range1 = (readings.range1) ? Math.floor(readings.range1 * wb.length) : 0;
    var range2 = (readings.range2) ? Math.floor(readings.range2 * wb.length) : wb.length;
    ctx_.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
    for (var i = range1; i < range2; i++) {
        ctx_.lineWidth = wb[i].strokeWidth;
        ctx_.lineCap = wb[i].lineCap;
        ctx_.lineJoin = wb[i].lineJoin;
        ctx_.fillStyle = wb[i].color;
        ctx_.strokeStyle = wb[i].strokeColor;
        ctx_.beginPath();
        var addx = (innerWidth * devicePixelRatio) / 2 + wb[i].x;
        var addy = + (innerHeight * devicePixelRatio) / 2 + wb[i].y;

        var seg = wb[i].segments;
        ctx_.lineTo(seg[0][0] + addx, seg[0][1] + addy);
        for (var k = 1; k < seg.length; k++) {
/* 
            if (seg[k - 1][5]) {
                ctx_.bezierCurveTo(seg[k - 1][2] + addx, seg[k - 1][3] + addy, seg[k - 1][4] + addx, seg[k - 1][5] + addy, seg[k][0] + addx, seg[k][1] + addy);
            } else if (seg[k - 1][3] && typeof seg[k - 1][3] == 'number') {
                ctx_.quadraticCurveTo(seg[k - 1][2] + addx, seg[k - 1][3] + addy, seg[k][0] + addx, seg[k][1] + addy);
            } else {
                ctx_.lineTo(seg[k][0] + addx, seg[k][1] + addy);
            }
            */
            ctx_.lineTo(seg[k][0] + addx, seg[k][1] + addy);
            /*
            for (var t = 0; t < 1; t += 0.2) {
            ctx_.fillStyle = 'red';
            var x, y;
            if (seg[k-1][5]) {
            x = Math.pow(1-t, 3) * seg[k-1][0] + 3 * Math.pow(1-t, 2) * t * seg[k-1][2] + 3 * (1-t) * Math.pow(t,2) * seg[k-1][4] + Math.pow(t,3) * seg[k][0];
            y = Math.pow(1-t, 3) * seg[k-1][1] + 3 * Math.pow(1-t, 2) * t * seg[k-1][3] + 3 * (1-t) * Math.pow(t,2) * seg[k-1][5] + Math.pow(t,3) * seg[k][1];
            } else if (seg[k-1][3]) {
            x = Math.pow(1-t, 2) * seg[k-1][0] + 2 * (1-t) * t * seg[k-1][2] + Math.pow(t,2) * seg[k][0]
            y = Math.pow(1-t, 2) * seg[k-1][1] + 2 * (1-t) * t * seg[k-1][3] + Math.pow(t,2) * seg[k][1]
            } else {
            x = (1-t) * seg[k-1][0] + t * seg[k][0]
            y = (1-t) * seg[k-1][1] + t * seg[k][1]
            }
            x+= addx;
            y+= addy;
            ctx_.beginPath();
            ctx_.arc(x, y, wb[i].strokeWidth/2, 0, 2 * Math.PI, false);
            ctx_.fill();
            }
            */
        }
        if (x && y) if (ctx_.isPointInPath(x, y)) includesPoint.push(wb[i]);
        if (wb[i].closed) ctx_.closePath();

        if (wb[i].shadowWidth) ctx_.shadowBlur = wb[i].shadowWidth * view.zoom;
        if (wb[i].shadowColor) ctx_.shadowColor = wb[i].shadowColor;
        ctx_.fill();
        ctx_.stroke()
        if (wb[i].shadowWidth) ctx_.shadowBlur = 0;
        if (wb[i].shadowColor) ctx._shadowColor = 'transparent'
    }
    return includesPoint
}