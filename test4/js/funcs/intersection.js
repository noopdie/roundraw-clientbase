
        intersection = function (obj1, obj2) {
            var res = [];
            var seg1 = obj1._segments || obj1.segments;
            var seg2 = obj2._segments || obj2.segments;
            var x1 = obj1._x || obj1.x;
            var y1 = obj1._y || obj1.y;
            var x2 = obj2._x || obj2.x;
            var y2 = obj2._y || obj2.y;
            var strokeWidth = ((obj1.strokeWidth / 2) || 0) + ((obj2.strokeWidth / 2) || 0);
            var points = [];
            var result;
            for (var i = 0; i < seg1.length - 1; i++) {
                var s1p = [seg1[i][0] + x1, seg1[i][1] + y1];
                var s1p1 = [seg1[i + 1][0] + x1, seg1[i + 1][1] + y1];
                for (var k = 0; k < seg2.length - 1; k++) {
                    var s2p = [seg2[k][0] + x2, seg2[k][1] + y2];
                    var s2p1 = [seg2[k + 1][0] + x2, seg2[k + 1][1] + y2];
                    var s1u_t = (s2p1[0] - s2p[0]) * (s1p[1] -
                        s2p[1]) - (s2p1[1] - s2p[1]) * (s1p[0] - s2p[0]);
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
            return res;
        }