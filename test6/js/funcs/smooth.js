function smooth(obj, power) {
    var seg = obj._segments || obj.segments;
    var pow = (power || power == 0) ? 2 + power / 2 : Math.PI;
    if (seg.length > 2)
        for (var i = 0; i < seg.length - 1; i++) {
            var im = (i < 1) ? (obj.closed) ? seg[seg.length - 2] : seg[i] : seg[i - 1];
            var ib = seg[i + 1];
            var a = ((ib[0] + seg[i][0]) / 2 + (seg[i][0] + (seg[i][0] - ib[0]) * pow + ib[0]) / 2),
                b = ((ib[1] + seg[i][1]) / 2 + (seg[i][1] + (seg[i][1] - ib[1]) * pow + ib[1]) / 2),
                c = ((im[0] + seg[i][0]) / 2 + (seg[i][0] + (seg[i][0] - im[0]) * pow + im[0]) / 2),
                d = ((im[1] + seg[i][1]) / 2 + (seg[i][1] + (seg[i][1] - im[1]) * pow + im[1]) / 2);

            im[4] = ((seg[i][0] - c + seg[i][0]) + a + seg[i][0]) / 3,
                im[5] = ((seg[i][1] - d + seg[i][1]) + b + seg[i][1]) / 3;

            seg[i][2] = ((seg[i][0] - a + seg[i][0]) + c + seg[i][0]) / 3;
            seg[i][3] = ((seg[i][1] - b + seg[i][1]) + d + seg[i][1]) / 3;
            if (power == 0) seg[i].length = 2, im.length = 2;
        }
    if (power == 0) seg[seg.length - 1].length = 2;
    obj.segments = seg;
};