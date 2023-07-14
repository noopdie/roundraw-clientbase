function showSel(wb) {
    var wb_ = wb || transform(view.wb);
    var paths = readings.selected;
    if (paths.length > 0) {

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
    }
}