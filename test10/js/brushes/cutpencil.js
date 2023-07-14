brush.cutpencil = [
    function (x, y) {
        removed = [];
        drawing = [{
            id: Math.random().toString(16).slice(2),
            x: -(innerWidth * devicePixelRatio) / 2,
            y: -(innerHeight * devicePixelRatio) / 2,
            z: 0,
            segments: [],
            strokeColor: ls.color,
            color: 'rgba(0,0,0,0)',
            strokeWidth: ls.pencilWidth * view.zoom,
            lineCap: 'round',
            lineJoin: 'round'
        }];
        readings.startDate = false;
        readings.startX = x, readings.startY = y;
        drawing[0].segments[0] = [x, y];
        readings.twb = transform(view.wb);
        readings.stopDrawing = false
    },
    function (x, y) {
    	if (!readings.stopDrawing) {
        if (!drawing[0].segments[0]) drawing[0].segments[0] = [x, y];
        var seg = drawing[0].segments[drawing[0].segments.length - 1];
        drawing[0].segments.push([(x - seg[0]) * (0.5 / devicePixelRatio) + seg[0], (y - seg[1]) * (0.5 / devicePixelRatio) + seg[1]]);
            smooth(drawing[0]);
            readings.startDate = new Date();
         var wb = readings.twb;
         var erange1 = (readings.range1) ? Math.floor(readings.range1 * wb.length) : 0;
        var erange2 = (readings.range2) ? Math.floor(readings.range2 * wb.length) : wb.length;
        for (var i = erange1; i < erange2; i++) {
        	var inter = intersection(drawing[0], wb[i])
        
        if (inter[0]) {
        	var iw = innerWidth / 2 * devicePixelRatio;
        var ih = innerHeight / 2 * devicePixelRatio;
        	drawing[0].segments.splice(drawing[0].segments.length - 1, 1);
        drawing[0].segments.push(inter[0][0], inter[0][1]);
        	readings.stopDrawing = true;
var chunk = wb[i];
view.wb.splice(i, 1);
                    view.wb_.splice(i, 1);
                    
                    
                    draw(transform(view.wb));
                    
                   if (inter[0][3] >= chunk.segments.length /2) {
                   	for (var k = inter[0][3]; k >=0; k--) {
                   	var seg = chunk.segments[k];
                   for (var j = 0; j < seg.length; j++) {
                   	seg[j] += (j  % 2 == 0) ? chunk.x + iw : chunk.y + ih;
                   }
                   if (true) {
                   	var seg2 = chunk.segments[k-1];
                   for (var j = 0; j < seg2.length; j++) {
                   //	seg2[j] += (j  % 2 == 0) ? chunk.x + iw : chunk.y + ih;
                   }
                   var l2 = seg2[2] + chunk.x + iw;
                 var l3 = seg2[3] + chunk.y + ih;
                   if (seg.length >  4) {
                 //  seg = [seg[0], seg[1], seg[4], seg[5], seg[2], seg[3]];
                 
             
                   seg = [seg[0], seg[1], seg2[4] + chunk.x + iw, seg2[5] + chunk.y + ih, l2, l3];
                   } else  if (seg.length >  2) {
                   	seg = [seg[0], seg[1], l2, l3];
                   }
                   }
                  	drawing[0].segments.push(seg)
                   }
                   }
          
                   else {
                   	for (var k = inter[0][3]; k < chunk.segments.length; k++) {
                   	var seg = chunk.segments[k];
                   	for (var j = 0; j < seg.length; j++) {
                   	seg[j] += (j  % 2 == 0) ? chunk.x + iw : chunk.y + ih;
                   }
                   	drawing[0].segments.push(seg)
                   }
              }     
        }
        }
}
draw(drawing, tctx);
    },
    function () {
        if (!drawing[0].segments[0]) drawing[0].segments = [[readings.startX, readings.startY], [readings.startX, readings.startY]];
        trace = detransform(drawing)[0];
        for (var i = 0; i < trace.segments.length; i++) {
            trace.x = parseFloat((trace.x * 1).toFixed(2));
            trace.y = parseFloat((trace.y * 1).toFixed(2));
            for (var k = 0; k < trace.segments[i].length; k++) {
                trace.segments[i][k] = parseFloat((trace.segments[i][k] * 1).toFixed(2));
            }
        }
        view.wb.push(trace);
        view.wb_.push(JSON.parse(JSON.stringify(trace)));
        mine.push(trace.id);
        socket.send('new&Line&' + trace.id + '&' + JSON.stringify(trace));
        drawing = [];
        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
        draw(transform(view.wb))
    },
];