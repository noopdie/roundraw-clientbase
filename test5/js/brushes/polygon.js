     
     brush.polygon = [
    function (x, y) {
    readings.startX = x;
    readings.startY = y;
        drawing = [{
            id: Math.random().toString(16).slice(2),
            x: -(innerWidth * devicePixelRatio) / 2 + x,
            y: -(innerHeight * devicePixelRatio) / 2 + y,
            segments: [[x, y]],
            closed: true,
            sides: 3,
            strokeColor: ls.color,
            color: 'rgba(0,0,0,0)',
            strokeWidth: ls.pencilWidth * view.zoom,
            lineCap: 'round',
            lineJoin: 'round'
        }];

    },
    function (x, y) {
    	drawing[0].segments = [];
    	try {
        var sides = drawing[0].sides;
var startX =  readings.startX;
var startY =  readings.startY;
var radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
var deg = Math.atan2(x - startX, y - startY);
     var a = (Math.PI * 2) / sides;
     for (var i = 0; i < sides; i++) {
       var j = [radius * Math.cos(a * i), radius * Math.sin(a * i)];
       var sy = j[0] * Math.cos(deg) - j[1] * Math.sin(deg);
       var sx = j[0] * Math.sin(deg) + j[1] * Math.cos(deg);
       drawing[0].segments.push([sx, sy]);
     }
        draw(drawing, tctx);
        } catch(e) {
        	alert(e) }
    },
    function () {
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
    function() {
    	drawing[0].sides++;
    }
];
