function transform(wb, _view) {
    var view_ = _view || view;
    if (typeof view_.deX == 'number') {
        view_.wb_ = JSON.parse(JSON.stringify(wb));
    }
           var screenSize = ((innerHeight > innerWidth) ? innerHeight : innerWidth) / devicePixelRatio / view_.zoom;
    for (var i = 0; i < wb.length; i++) {
    	     
        if (typeof view_.deX == "number") {
            wb[i].x -= view_.deX;
            wb[i].y -= view_.deY;
            

        }
        view_.wb_[i].strokeWidth = wb[i].strokeWidth * view_.zoom;
        var seg = wb[i].segments;
        var seg_ = view_.wb_[i].segments;
        var deg = view_.deg * Math.PI / 180;

        for (var k = 0; k < seg.length; k++) {

            seg_[k][0] = seg[k][0];
            seg_[k][1] = seg[k][1];

            if (typeof seg[k][6] == 'undefined')  {
                seg_[k].push(0);
                seg[k].push(0);
            }
            if (view_.deZ) {
                
                seg_[k][6] = seg[k][6] + view_.deZ/2;
            }
            else seg_[k][6] = seg[k][6] - view_.z;
        
            //degX
            var degX = view_.degX * Math.PI / 180;
            var degY = view_.degY * Math.PI / 180;
            
            var zx = -(seg_[k][0] + wb[i].x) * Math.sin(degX)  + (seg_[k][6] + wb[i].z + screenSize) * Math.cos(degX);
            var zy = -(seg_[k][1] + wb[i].y) * Math.sin(degY)  + zx * Math.cos(degY);

            var y1 = (seg_[k][1] + wb[i].y) * Math.cos(degY) + zx * Math.sin(degY);
            //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)
            var x1 = (seg_[k][0] + wb[i].x) * Math.cos(degX) + (zx) * Math.sin(degX);
            var screenSize = ((innerHeight > innerWidth) ? innerHeight : innerWidth) / devicePixelRatio / view_.zoom;
            if (view_.deX) var dis = screenSize;
           else dis = screenSize;
            if  ( true || !view_.deX) {
            var x2 = (dis * x1) / (zx + dis);
            var y2 = (dis * y1) / (zx + dis);

            } else {
                var x2 = x1,
                y2 = y1
            }
            if (view_.deZ) {
                seg_[k][6] = zx - wb[i].z +  view_.z / 2;
            }
            else seg_[k][6] = zx - wb[i].z +  view_.z / 2;
            seg_[k][0] = x * view_.zoom - wb[i].x, seg_[k][1] = y * view_.zoom - wb[i].y;
    seg_[k][seg_[k].length-1][0] = zx - wb[i].z - (view_.deZ) ? view._deZ : 0;
            var x = (x2) * Math.cos(deg) - (y2) * Math.sin(deg);
            var y = (x2) * Math.sin(deg) + (y2) * Math.cos(deg);


           /* //degY
            var degY = view_.degY * Math.PI / 180;
            //var y = (seg_[k][1] + wb[i].y) * Math.cos(degX) + (seg_[k][seg[k].length-1][0] + wb[i].z) * Math.sin(degX)

            var y = (seg_[k][1] + wb[i].y) * Math.cos(degY) + (seg_[k][seg_[k].length-1][0] + wb[i].z) * Math.sin(degY);
            var z = -(seg_[k][1] + wb[i].y) * Math.sin(degY)  + (z1) * Math.cos(degY);

            seg_[k][1] = y - wb[i].y;
            seg_[k][seg_[k].length-1][0] = z - wb[i].z;

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
*/
        }

        //view_.wb_[i].strokeWidth = view_.wb_[i].strokeWidth * ((screenSize) / (screenSize - (view_.wb_[i].z - view_.wb_[i].segments[0][6] + view_.z)));
        view_.wb_[i].x = wb[i].x + view_.x;
        view_.wb_[i].y = wb[i].y + view_.y;
    }
    return view_.wb_;
}
