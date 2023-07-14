 function selfIntersection (obj) {
    var res = [];
    var seg = obj._segments || obj.segments;
    var x = obj._x || obj.x;
    var y = obj._y || obj.y;
    var strokeWidth = ((obj.strokeWidth / 2) || 0) + ((obj.strokeWidth / 2) || 0);
    var points = [];
    var result;
    for (var i = 0; i < seg.length - 1; i++) {
        var s1p = [seg[i][0] + x, seg[i][1] + y];
        var s1p1 = [seg[i + 1][0] + x, seg[i + 1][1] + y];
        for (var k = i; k < seg.length - 1; k++) {
            if (i != k && i != k + 1 && k != i + 1) {
                var s2p = [seg[k][0] + x, seg[k][1] + y];
                var s2p1 = [seg[k + 1][0] + x, seg[k + 1][1] + y];
                var s1u_t = (s2p1[0] - s2p[0]) * (s1p[1] - s2p[1]) - (s2p1[1] - s2p[1]) * (s1p[0] - s2p[0]);
                var s2u_t = (s1p1[0] - s1p[0]) * (s1p[1] - s2p[1]) - (s1p1[1] - s1p[1]) * (s1p[0] - s2p[0]);
                var u_s2 = (s2p1[1] - s2p[1]) * (s1p1[0] - s1p[0]) - (s2p1[0] - s2p[0]) * (s1p1[1] - s1p[1]);

                if (u_s2 != 0) {
                    var s1u = s1u_t / u_s2;
                    var s2u = s2u_t / u_s2;

                    if (0 <= s1u && s1u <= 1 && 0 <= s2u && s2u <= 1) {
                        res.push([
                            s1p[0] + s1u * (s1p1[0] - s1p[0]),
                            s1p[1] + s1u * (s1p1[1] - s1p[1]),
                            i + 1, k + 1
                        ]);
                    }
                }
            }
        }
    }
    return res;
}