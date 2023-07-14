function showSel(wb) {
    var wb_ = wb || transform(view.wb);
    var paths = readings.selected;
    if (paths.length > 0) {


        if (readings.selAngle) {
            var rect = readings.selRect;
            var deg = readings.selAngle;
           var nrect = {left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom};
           var rect = nrect;
           var rect1 = readings.selRect;
           var rect2 = {left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom};
            var left = (rect1.left - (rect.left + rect.right) / 2)
            var right = (rect1.right - (rect.left + rect.right) / 2)
            var top = (rect1.top - (rect.top + rect.bottom) / 2)
            var bottom = (rect1.bottom - (rect.top + rect.bottom) / 2)
            rect.left = left * Math.cos(deg) - top * Math.sin(deg) + (rect1.left + rect1.right) / 2;
            rect.right = right * Math.cos(deg) - bottom * Math.sin(deg) +(rect1.left + rect1.right) / 2;
            rect.top = left * Math.sin(deg) + top * Math.cos(deg) + (rect1.top + rect1.bottom) / 2
            rect.bottom = right * Math.sin(deg) + bottom * Math.cos(deg) + (rect1.top + rect1.bottom) / 2

            rect2.left = left * Math.cos(deg) - bottom * Math.sin(deg) + (rect1.left + rect1.right) / 2;
            rect2.right = right * Math.cos(deg) - top * Math.sin(deg) +(rect1.left + rect1.right) / 2;
            rect2.top = right * Math.sin(deg) + top * Math.cos(deg) + (rect1.top + rect1.bottom) / 2
            rect2.bottom = left * Math.sin(deg) + bottom * Math.cos(deg) + (rect1.top + rect1.bottom) / 2
            var pinx = 0 * Math.cos(deg) - ((rect1.bottom + p20*2) - (rect1.top + rect1.bottom) / 2) * Math.sin(deg) + (rect1.left + rect1.right) / 2;
            var piny = 0 * Math.sin(deg) + ((rect1.bottom + p20*2) - (rect1.top + rect1.bottom) / 2) * Math.cos(deg) + (rect1.top + rect1.bottom) / 2;
            var pinx0 = 0 * Math.cos(deg) - ((rect1.bottom) - (rect1.top + rect1.bottom) / 2) * Math.sin(deg) + (rect1.left + rect1.right) / 2;
            var piny0 = 0 * Math.sin(deg) + ((rect1.bottom) - (rect1.top + rect1.bottom) / 2) * Math.cos(deg) + (rect1.top + rect1.bottom) / 2;
            var pinx1 = 0 * Math.cos(deg) - ((rect1.bottom + p20) - (rect1.top + rect1.bottom) / 2) * Math.sin(deg) + (rect1.left + rect1.right) / 2;
            var piny1 = 0 * Math.sin(deg) + ((rect1.bottom + p20) - (rect1.top + rect1.bottom) / 2) * Math.cos(deg) + (rect1.top + rect1.bottom) / 2;

            tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
            tctx.lineWidth = 2;
            tctx.strokeStyle = 'black';
            tctx.setLineDash([7, 4]);
            tctx.fillStyle = 'rgba(255,255,255,0.5)';
            tctx.beginPath();
            tctx.moveTo(rect.left, rect.top)
            tctx.lineTo(rect2.right, rect2.top);
            tctx.lineTo(rect.right, rect.bottom);
            tctx.lineTo(rect2.left, rect2.bottom);
            tctx.lineTo(rect.left, rect.top)
            tctx.stroke();
            tctx.fill();
            tctx.setLineDash([0, 0]);
            tctx.moveTo(rect.right, rect.bottom);
            tctx.beginPath();
            tctx.arc(rect.right, rect.bottom, p20, 0, 2 * Math.PI, false);
            tctx.stroke();
            tctx.fill();
            tctx.moveTo(rect2.left, rect2.bottom);
            tctx.beginPath();
            tctx.arc(rect2.left, rect2.bottom, p20, 0, 2 * Math.PI, false);
            tctx.stroke();
            tctx.fill();
            tctx.moveTo(rect2.right, rect2.top);
            tctx.beginPath();
            tctx.arc(rect2.right, rect2.top, p20, 0, 2 * Math.PI, false);
            tctx.stroke();
            tctx.fill();
            tctx.moveTo(rect.left, rect.top);
            tctx.beginPath();
            tctx.arc(rect.left, rect.top, p20, 0, 2 * Math.PI, false);
            tctx.stroke();
            tctx.fill();
            tctx.moveTo(pinx0, piny0);
            tctx.setLineDash([7, 4]);
            tctx.lineWidth = 1;
            tctx.lineTo(pinx1, piny1);
            tctx.stroke();
            tctx.setLineDash([0, 0]);
            tctx.beginPath();
            tctx.lineWidth = 2;
            tctx.arc(pinx, piny, p20, 0, 2 * Math.PI, false);
            tctx.stroke();
            tctx.fill();
        } else {
            var rect = readings.selRect = {
                top: Infinity,
                left: Infinity,
                bottom: -Infinity,
                right: -Infinity,
            }
    
            for (var key in paths) {
                var path = wb_[paths[key]];
                for (var i = 0; i < path.segments.length; i++) {
                    var seg = path.segments[i];
                    if (seg[1] + path.y + (innerHeight / 2 * devicePixelRatio) > rect.bottom) rect.bottom = seg[1] + path.y + (innerHeight / 2 * devicePixelRatio) + path.strokeWidth / 2;
                    if (seg[0] + path.x + (innerWidth / 2 * devicePixelRatio) > rect.right) rect.right = seg[0] + path.x + (innerWidth / 2 * devicePixelRatio) + path.strokeWidth / 2;
                    if (seg[1] + path.y + (innerHeight / 2 * devicePixelRatio) < rect.top) rect.top = seg[1] + path.y + (innerHeight / 2 * devicePixelRatio) - path.strokeWidth / 2;
                    if (seg[0] + path.x + (innerWidth / 2 * devicePixelRatio) < rect.left) rect.left = seg[0] + path.x + (innerWidth / 2 * devicePixelRatio) - path.strokeWidth / 2;
                }
            }
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        tctx.lineWidth = 2;
        tctx.strokeStyle = 'black';
        tctx.setLineDash([7, 4]);
        tctx.fillStyle = 'rgba(255,255,255,0.5)';
        tctx.beginPath();
        tctx.moveTo(rect.left, rect.top)
        tctx.lineTo(rect.right, rect.top);
        tctx.lineTo(rect.right, rect.bottom);
        tctx.lineTo(rect.left, rect.bottom);
        tctx.lineTo(rect.left, rect.top)
        tctx.stroke();
        tctx.fill();
        tctx.setLineDash([0, 0]);
        tctx.moveTo(rect.right, rect.bottom);
        tctx.beginPath();
        tctx.arc(rect.right, rect.bottom, p20, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        tctx.moveTo(rect.left, rect.bottom);
        tctx.beginPath();
        tctx.arc(rect.left, rect.bottom, p20, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        tctx.moveTo(rect.right, rect.top);
        tctx.beginPath();
        tctx.arc(rect.right, rect.top, p20, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        tctx.moveTo(rect.left, rect.top);
        tctx.beginPath();
        tctx.arc(rect.left, rect.top, p20, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        tctx.moveTo((rect.left + rect.right) / 2, rect.bottom);
        tctx.setLineDash([7, 4]);
        tctx.lineWidth = 1;
        tctx.lineTo((rect.left + rect.right) / 2, rect.bottom + p20);
        tctx.stroke();
        tctx.setLineDash([0, 0]);
        tctx.beginPath();
        tctx.lineWidth = 2;
        tctx.arc((rect.left + rect.right) / 2, rect.bottom + p20 * 2, p20, 0, 2 * Math.PI, false);
        tctx.stroke();
        tctx.fill();
        }
    }
}