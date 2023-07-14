brush.fill = [
    function (x, y) {
        if (!readings.st) console.log('assign steps'), readings.st = 1;
        else if (readings.st == 1) {
    console.log('1) Select a point');
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        tctx.lineWidth = 10;
        tctx.fillStyle = 'red';
        tctx.strokeStyle = 'rgba(0,0,0,0.5)';
        tctx.beginPath();
        tctx.arc(x, y, 2, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        readings.point = {x:x, y: y};
        readings.st++
        }
        else if (readings.st == 2) {
         console.log('2) Make infinite line')
         tctx.beginPath();
         tctx.moveTo(readings.point.x, readings.point.y);
         tctx.lineTo(innerWidth, readings.point.y);
         tctx.lineWidth = 10;
         tctx.stroke();
        readings.st++
        }
        else if (readings.st == 3) {
        console.log('3) Select intersection between line and everything.');
                var iw = innerWidth / 2 * devicePixelRatio;
        var ih = innerHeight / 2 * devicePixelRatio;
        wb = JSON.parse(JSON.stringify(transform(view.wb)));
        for (var i = 0; i < wb.length; i++) {
            wb[i].x = 0;
            wb[i].y = 0;
        }
                pts = [];
                            for (var i = 0; i < wb.length; i++) {
                    var p = intersection({x: 0, y: 0, _segments: [[readings.point.x - innerWidth/2, readings.point.y - innerHeight/2],[10000000000, readings.point.y - innerWidth/2]]}, wb[i]);
                    if (p.length > 0) {
                        console.log('a')

                      for (var j = 0; j < p.length; j++) {
                          pts.push([i, p[j]]);
                      }
                    }
                    for (var j = 0; j < pts.length; j++) {
                                tctx.beginPath();
        tctx.arc(pts[j][1][0], pts[j][1][1], 2, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
                    }
                }
         readings.st++
        }
                else if (readings.st == 4) {
        console.log('4) Select closest intersection in relation of line and the point.');
var p = [1, [Infinity, 1]];
for (var i = 0; i < pts.length; i++) {
 if (pts[i][1][0] < p[1][0]) p = pts[i];
}
pts = [p];
        tctx.fillStyle = 'green';
        tctx.strokeStyle = 'yellow';
                                tctx.beginPath();
        tctx.arc(pts[0][1][0], pts[0][1][1], 2, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
         readings.st++
         view.wb_[pts[0][0]].strokeColor = 'red';
        } else if (readings.st == 5) {
var el = view.wb[pts[0][0]];
for (var i = 0; i < view.wb.length; i++) {
    if (intersection(el, view.wb[i])[0]) view.wb[i].strokeColor = 'red'
}
draw(transform(view.wb))
        }

    },
    function (x,y) {
    },
    function() {}
]
