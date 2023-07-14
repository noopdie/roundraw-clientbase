function transform(wb, _view) {
    var view_ = _view || view;
    if (typeof view_.deX == 'number') {
        view_.wb_ = JSON.parse(JSON.stringify(wb));
    }
    for (var i = 0; i < wb.length; i++) {
        if (view_.deX) {
            wb[i].x -= view_.deX;
            wb[i].y -= view_.deY;

        }
        view_.wb_[i].strokeWidth = wb[i].strokeWidth * view_.zoom;
        var seg = wb[i].segments;
        var seg_ = view_.wb_[i].segments;
        var deg = view_.deg * Math.PI / 180;
        for (var k = 0; k < seg.length; k++) {

            seg_[k][0] = (seg[k][0] + wb[i].x) * view_.zoom - wb[i].x;
            seg_[k][1] = (seg[k][1] + wb[i].y) * view_.zoom - wb[i].y;
            if (typeof seg_[k][seg_[k].length-1] == 'number')  {
                seg_[k].push([0]);
            }
            if (!wb[i].z) wb[i].z = 0;
            //degX
            var degX = view_.degX * Math.PI / 180;
            var degY = view_.degY * Math.PI / 180;
            var zy = -(seg_[k][1] + wb[i].y) * Math.sin(degY)  + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.cos(degY);
            var zx = -(seg_[k][0] + wb[i].x) * Math.sin(degX)  + zy * Math.cos(degX);

            var y1 = (seg_[k][1] + wb[i].y) * Math.cos(degY) + (zx) * Math.sin(degY);
            //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)
            var x1 = (seg_[k][0] + wb[i].x) * Math.cos(degX) + (zy) * Math.sin(degX);
            var dis = 50;
            var x2 = (dis * x1) / (zx + dis);
            var y2 = (dis * y1) / (zx + dis);
            //seg_[k][seg_[k].length-1][0] = z - wb[i].z;

            var x = (x2) * Math.cos(deg) - (y2) * Math.sin(deg);
            var y = (x2) * Math.sin(deg) + (y2) * Math.cos(deg);
            seg_[k][0] = x - wb[i].x, seg_[k][1] = y - wb[i].y;


           /* //degY
            var degY = view_.degY * Math.PI / 180;
            //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)

            var y = (seg_[k][1] + wb[i].y) * Math.cos(degY) + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.sin(degY);
            var z = -(seg_[k][1] + wb[i].y) * Math.sin(degY)  + (z1) * Math.cos(degY);

            seg_[k][1] = y - wb[i].y;
            seg_[k][seg_[k].length-1][0] = z - wb[i].z;
*/
            if (seg[k][3]) {
                seg_[k][2] = (seg[k][2] + wb[i].x) * view_.zoom - wb[i].x;
                seg_[k][3] = (seg[k][3] + wb[i].y) * view_.zoom - wb[i].y;
                var x = (seg_[k][2] + wb[i].x) * Math.cos(deg) - (seg_[k][3] + wb[i].y) * Math.sin(deg);
                var y = (seg_[k][2] + wb[i].x) * Math.sin(deg) + (seg_[k][3] + wb[i].y) * Math.cos(deg);
                seg_[k][2] = x - wb[i].x, seg_[k][3] = y - wb[i].y;

                //degX
                //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)
                var x = (seg_[k][2] + wb[i].x) * Math.cos(degX) + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.sin(degX);
                seg_[k][2] = x - wb[i].x;

                //degY
                //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)
                var y = (seg_[k][3] + wb[i].y) * Math.cos(degY) + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.sin(degY)
                seg_[k][3] = y - wb[i].y;


            }

            if (seg[k][5]) {
                seg_[k][4] = (seg[k][4] + wb[i].x) * view_.zoom - wb[i].x;
                seg_[k][5] = (seg[k][5] + wb[i].y) * view_.zoom - wb[i].y;
                var x = (seg_[k][4] + wb[i].x) * Math.cos(deg) - (seg_[k][5] + wb[i].y) * Math.sin(deg);
                var y = (seg_[k][4] + wb[i].x) * Math.sin(deg) + (seg_[k][5] + wb[i].y) * Math.cos(deg);
                seg_[k][4] = x - wb[i].x, seg_[k][5] = y - wb[i].y;

                //degX
                //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)
                var x = (seg_[k][4] + wb[i].x) * Math.cos(degX) + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.sin(degX)
                seg_[k][4] = x - wb[i].x;

                //degY
                //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)
                var y = (seg_[k][5] + wb[i].y) * Math.cos(degY) + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.sin(degY)
                seg_[k][5] = y - wb[i].y;

            }

        }
        view_.wb_[i].x = wb[i].x + view_.x;
        view_.wb_[i].y = wb[i].y + view_.y;
    }
    return view_.wb_;
}
