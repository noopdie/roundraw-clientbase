var run = !1;
var event = !1;
document.onselectstart = function() {
  return false
};
var wbid = window.location.href.split('?wb_')[1];


var removed = {},
mine = [],
figures = {},
gZoom = 1,
gDeg = 0,
gX = 0,
gY = 0,
id = 0,
stageshot = [], zoomTimeoutFunc,
start_distance = 0,
move_distance = 0,
start_midx = 0,
pointAdd = false,
pointDel = false,
current_point = false,
moving_point = false,
clearHalt = false,
move_midx = 0,
start_midy = 0,
start_clientX0 = 0,
start_clientY0 = 0,
start_rightclientX0 = 0,
start_rightclientY0 = 0,
rightclick = !1,
clientX0 = 0,
clientY0 = 0,
clientX1 = 0,
clientY1 = 0,
start_clientX1 = 0,
start_clientY1 = 0,
move_midy = 0,
zoom = 0,
shiftx = 0,
zoomTimeout = !1,
shifty = 0,
start_deg = 0,
move_deg = 0,
  isel = !1,
  add = !1,
  input = !1,
  select = moving_point = !1,
  sx, sy, zm, zooming = !1,
  paths = [];
function get(elem) {
  return document.getElementById(elem)
};
function getRadius(x, y, x2, y2) {
  return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2))
};
var ls = localStorage;
ls.brush = 5;
  function setStageControls() {
	get("wc").max = innerWidth;
	get("hc").max = innerHeight;
	get("wc").value = ls.stagewidth || innerWidth;
	get("hc").value = ls.stageheight || innerHeight;
	get("xc").max = (ls.stagewidth) ? innerWidth - ls.stagewidth : 0;
	get("yc").max = (ls.stageheight) ? innerHeight - ls.stageheight : 0;
	get("xc").value = ls.stageleft || 0;
	get("yc").value = ls.stagetop || 0;
	get('main').style.left = (ls.stageleft || 0) + "px";
	get('main').style.top = (ls.stagetop || 0) + "px";
};
var images = (ls.images) ? JSON.parse(ls.images) : [false];
for (var i = 0; i < images.length; i++) {
if (images[i]) images[i] = new KeepDraw.Image(images[i]);
}
    if (images[images.length-1])get('imstyle').style.background
 = 'url(' + images[images.length-1].src + ') no-repeat', img = images[images.length-1];
pen = 'pencil';
if (!ls.initialized) { 
ls.cap = 0;
ls.initalized = true;
ls.sf = 1;
ls.imgwidth = 1000;
ls.imgheight = 1000;
ls.imgx = -500;
ls.imgy = -500;
}
if(!images[images.length-1]) get('delimg').style.display = 'none';
var colors = (!ls.colors || !JSON.parse(ls.colors)[3]) ? [
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 1], 
  [0, 0, 0, 0]
] : JSON.parse(ls.colors);
ls.slow = ls.slow || 2;
ls.smooth = ls.smooth || 2.3;
var setBrush = function(c) {
  get(pen).classList.remove('select');
  pen = c;
  get(c).classList.add('select');
  clearsel();
};
ls.fill = ls.fill || 'rgba(0,0,0,0)';
stage = new KeepDraw.Stage({
    width: (ls.stagewidth > 0) ? ls.stagewidth : innerWidth,
    height: (ls.stageheight > 0) ? ls.stageheight : innerHeight,
    fill: ls.fill,
    canvas: 'main',
  });
  gRot = new KeepDraw.Line({
  	x: innerWidth / 2  * window.devicePixelRatio,
  y: innerHeight / 2  * window.devicePixelRatio,
  segments: [[0,0],[0, 0]],
  _segments: [[0,0],[0, 0]],
  stage: stage
  });
  function draw() {
if (ls.paths != undefined) {
  if (ls.paths != "") {
    paths = JSON.parse(ls.paths);
    for (var i = 0; i < paths.length; i++) {
      var a = JSON.parse(paths[i]);
      a.stage = stage;
      if (!a.id) a.id = Math.random().toString(16).slice(2);
      figures[a.id] = new KeepDraw.Line(a);
    }
  }
} else ls.paths = "[]";
};
  if (wbid) {
  const http = new XMLHttpRequest()
http.open('GET', 'http://noopdie.com/wb_' + wbid)
http.send()
http.onload = () => {
	if (http.status != 404) {
	try {
var wb = JSON.parse(http.responseText);
for (var i = 0; i < wb.length; i++) {
	wb[i].x += innerWidth / 2  * window.devicePixelRatio;
  wb[i].y += innerHeight / 2  * window.devicePixelRatio;
  wb[i].stage = stage;
figures[wb[i].id] = new KeepDraw.Line(wb[i]);
}
socket = new WebSocket('ws://noopdie.com/wb_' + wbid);
        socket.onopen = function() {
          
        };
        socket.onmessage = function(msg) {
         msg.data.text().then((res) => {
          var text = res.split('&');
          if (text[0] == 'new' && !figures[text[2]]) {
         
          	var attrs = JSON.parse(text[3]);
          console.log(attrs);
               attrs.x = (attrs.x + innerWidth / 2  * window.devicePixelRatio)/**  gZoom **/+ gX;
               attrs.y = (attrs.y + innerHeight / 2  * window.devicePixelRatio)/** * gZoom **/ + gY;
              attrs.strokeWidth *= gZoom;
           var rotated = KeepDraw.rotateSegments(attrs.segments, gDeg, gRot.x - attrs.x + gRot._segments[0][0], gRot.y - attrs.y + gRot._segments[0][1]);
           attrs.segments = KeepDraw.scaleSegments(rotated, gZoom, gRot.x - attrs.x + gRot._segments[0][0], gRot.y - attrs.y + gRot._segments[0][1]);
         //     attrs.segments = KeepDraw.scaleSegments(attrs.segments, gZoom)
              attrs.stage = stage;
              
             figures[text[2]] = new KeepDraw[text[1]](attrs)
          }
          if (text[0] == 'del' && figures[text[1]]) {
          	stage.childs[figures[text[1]].index] = undefined;
            delete figures[text[1]];
         }
         
         if (text[0] == 'change' && figures[text[1]]) {
          	var attrs = JSON.parse(text[2]);
          
          if (attrs.strokeWidth) attrs.strokeWidth *= gZoom;
          if (attrs.shadowWidth) attrs.shadowWidth *= gZoom;
          figures[text[1]].setAttrs(attrs);
         }
          });
        };
} catch(err) { alert(err) }
} else draw(), socket = {send: () => {}}, wbid = false;
}
 } else draw(), socket = {send: () => {}}, wbid = false;
var attrs = (ls.attrs) ? JSON.parse(ls.attrs) : {
  color: 'rgba(0,0,0,1)',
  strokeColor: '#0f0f0f',
  strokeWidth: '5',
  shadowColor: 'black',
  shadowWidth: 0,
  lineCap: 'round',
  lineJoin: 'round',
  opacity: 1,
};
var init = function() {
if (get('cursor')) {
  ls.images = JSON.stringify(images);
  get('sf').value = ls.sf;
  get('fillmode').childNodes[1].innerText = (ls.sf > 2) ? '█' : (ls.sf > 1) ? '❂' : (ls.sf > 0) ? '○' : '●';
  get('cap').childNodes[1].innerText = (ls.cap > 1) ? '▶' : (ls.cap > 0) ? '■' : '◗';
  get('r').value = get('red').childNodes[1].value = colors[ls.sf][0];
  get('g').value = get('green').childNodes[1].value = colors[ls.sf][1];
  get('b').value = get('blue').childNodes[1].value =  colors[ls.sf][2];
  get('o').value = get('opacity').childNodes[1].value = colors[ls.sf][3];
  get('c').value = ls.cap;
  get('sm').value = ls.smooth;
  get('opacity').childNodes[1].value = colors[ls.sf][3]
  get('smooth').childNodes[1].value = ls.smooth || 2.3;
  get('sl').value = get('slow').childNodes[1].value = ls.slow;
  get('strw').value = get('strwidth').childNodes[1].value = attrs.strokeWidth;
  get('strw').max = 100 / gZoom;
  get('strw').step = 1 / gZoom;
  get('sh').value = get('shadow').childNodes[1].value = attrs.shadowWidth;
  get('sh').max = 100 / gZoom;
  get('sh').step = 1 / gZoom;
  images[images.length - 1].width = get('imgwidth').childNodes[1].value = get('iw').value = ls.imgwidth;
  images[images.length - 1].height = get('imgheight').childNodes[1].value = get('ih').value = ls.imgheight;
  images[images.length - 1].x = get('imgx').childNodes[1].value = get('ix').value = ls.imgx;
  images[images.length - 1].y = get('imgy').childNodes[1].value = get('iy').value = ls.imgy;
  if (elem) {
    get('x').childNodes[1].value = get('xc').value = elem.x / window.devicePixelRatio;
    get('y').childNodes[1].value = get('yc').value = elem.y / window.devicePixelRatio;
    get('width').childNodes[1].value = get('wc').value = elem.getWidth() / window.devicePixelRatio;
    get('xc').max = get('wc').max = stage.width;
    get('height').childNodes[1].value = get('hc').value = elem.getHeight() / window.devicePixelRatio;
    get('yc').max = get('hc').max = stage.height;
    
  } else {
  	setStageControls();
  get('x').childNodes[1].value = get('xc').value = ls.stageleft || 0;
  get('y').childNodes[1].value = get('yc').value = ls.stagetop || 0;
  get('wc').value = stage.width;
  get('width').childNodes[1].value = stage.width * window.devicePixelRatio;
    get('hc').value = stage.height;	
    get('height').childNodes[1].value = stage.height * window.devicePixelRatio;
  }
  get('red').style.background = 'rgba(' + (255-colors[ls.sf][0]) + ',0,0,1)';
  get('green').style.background = 'rgba(0,' + (255-colors[ls.sf][1]) + ',0,1)';
  get('blue').style.background = 'rgba(0,0,' + (255-colors[ls.sf][2]) + ',1)';
  get('opacity').style.background = 'rgba(' + colors[ls.sf][0] + ',' + colors[ls.sf][1] + ',' + colors[ls.sf][2] + ',' + colors[ls.sf][3] + ')';
}
}
colInit = function() {
if (get('cursor')) {
  get('color').style.background = attrs.color = 'rgba(' + colors[0][0] + ',' + colors[0][1] + ',' + colors[0][2] + ',' + colors[0][3] + ')';
  attrs.strokeColor = 'rgba(' + colors[1][0] + ',' + colors[1][1] + ',' + colors[1][2] + ',' + colors[1][3] + ')';
  attrs.shadowColor = 'rgba(' + colors[2][0] + ',' + colors[2][1] + ',' + colors[2][2] + ',' + colors[2][3] + ')';
  if (elem) elem.strokeColor = attrs.strokeColor, elem.shadowColor = attrs.shadowColor;
  get('color').style.boxShadow = '0 0 0 ' + ((attrs.strokeWidth * gZoom > 100) ? 50 : attrs.strokeWidth * gZoom / 2) + 'px ' + attrs.strokeColor;
  stage.fill = ls.fill = 'rgba(' + colors[3][0] + ',' + colors[3][1] + ',' + colors[3][2] + ',' + colors[3][3] + ')';
  ls.attrs = JSON.stringify(attrs);
  ls.colors = JSON.stringify(colors);
  init();
  KeepDraw.Utils.draw(stage);
  if (elem) updsel();
}
}
colInit();
if (get('cursor')) {
get('color').style.border = '0';
get('color').style.zIndex = '-1';
var change = function(el, num) {
  if (num == 'sh') {
attrs.shadowWidth = el.value;
if (elem) elem.shadowWidth = el.value;
}
  if (num == 'strw') {
  	if (elem) elem.strokeWidth = el.value;
attrs.strokeWidth = el.value;

}
  if (num == 'iw') ls.imgwidth = images[images.length - 1].width = el.value;
  if (num == 'ih') ls.imgheight = images[images.length - 1].height = el.value;
  if (num == 'ix') ls.imgx = images[images.length - 1].x = el.value;
  if (num == 'iy') ls.imgy = images[images.length - 1].y = el.value;
  if (num == 'x') {
if (elem) elem.x = el.value * window.devicePixelRatio;
else {
ls.stageleft = el.value * 1;
get('main').style.left = ls.stageleft + "px";
}
}
  if (num == 'y') {
if (elem) elem.y = el.value * window.devicePixelRatio;
else {
ls.stagetop = el.value * 1;
get('main').style.top = ls.stagetop + "px";
}
}
if (num == 'width') {
  	  if (elem) elem.setWidth(el.value * window.devicePixelRatio);
       else  stage.width = ls.stagewidth = el.value / window.devicePixelRatio;
}
  if (num == 'height') {
        if (elem) elem.setHeight(el.value * window.devicePixelRatio);
        else stage.height = ls.stageheight = el.value / window.devicePixelRatio;
}
if (num == 'sl') ls.slow = el.value; 
  if (num == 'sm') {
ls.smooth = el.value;
  if (elem) elem.smooth(el.value), displaysegs();
}
  else colors[ls.sf][num] = el.value;
  colInit();
}
get('strw').oninput = function() {
  attrs.strokeWidth = this.value;
  if (elem) elem.strokeWidth = this.value;
  colInit();
}
get('sm').oninput = function() {
  ls.smooth = this.value;
  if (elem) elem.smooth(this.value);
  colInit();
}
get('ix').oninput = function() {
  images[images.length - 1].x = ls.imgx = this.value;
  colInit();
}
get('iy').oninput = function() {
  images[images.length - 1].y = ls.imgy = this.value;
  colInit();
}
get('xc').oninput = function() {
  if (elem) elem.x = this.value * window.devicePixelRatio;
  else {
ls.stageleft = this.value * 1;
get('main').style.left = ls.stageleft + "px";
}
  colInit();
}
get('yc').oninput = function() {
  if (elem) elem.y = this.value * window.devicePixelRatio;
  else {
ls.stagetop = this.value * 1;
get('main').style.top = ls.stagetop + "px";
}
  colInit();
}
get('wc').oninput = function() {
  if (elem) elem.setWidth(this.value * window.devicePixelRatio);
  else stage.width = ls.stagewidth = this.value * 1;
  colInit();
}
get('hc').oninput = function() {
  if (elem) elem.setHeight(this.value * window.devicePixelRatio);
  else stage.height = ls.stageheight = this.value * 1;
  colInit();
}
get('sl').oninput = function() {
  ls.slow = this.value * 1;
  colInit();
}
get('iw').oninput = function() {
  images[images.length - 1].width = ls.imgwidth = this.value;
  colInit();
}
get('ih').oninput = function() {
  images[images.length - 1].height = ls.imgheight = this.value;
  colInit();
}
get('sh').oninput = function() {
  attrs.shadowWidth = this.value;
  if (elem) elem.shadowWidth = this.value;
  colInit();
}
get('c').oninput = function() {
  var v = ls.cap = this.value;
  attrs.lineCap = (v > 1) ? 'butt' : (v > 0) ? 'square' : 'round';
  attrs.lineJoin = (v > 1) ? 'mitter' : (v > 0) ? 'bevel' : 'round';
  if (elem) elem.lineCap = attrs.lineCap, elem.lineJoin = attrs.lineJoin;
  colInit();
}
get('sf').oninput = function() {
  ls.sf = this.value;
  init();
}
}
var move = !1,
  elem, x, y,
  
  
  displaysegs = function(e) {
if (isel) {
clearsel();
}
    if (elem) {
elem.img = images.length-1;
      var c = elem.index;
      if (pen != 'pencil' && pen != 'line' && pen != 'cursor' && elem.cons != KeepDraw.Line) {
        elem = elem.toLine();
        if (elem) elem.noline = !0;
      }
      isel = stage.childs.length;
      var seg = elem._segments || elem.segments;
      var segs = [];
      var width = (attrs.strokeWidth > 50) ? 50 : attrs.strokeWidth + 1;
      var seg = elem._segments || elem.segments;
      for (var i = 0; i < seg.length; i++) { 
        for (var k = 0; k < seg[i].length; k += 2) {
        	var cursedPoint = (i == 0 && elem.closed && k < 1) ? !0 : !1;
          var ltopoint = (k > 1) ? new KeepDraw.Line({
            x: 0,
            y: 0,
            segments: [
              [0, 0],
              [0, 0]
            ],
            color: '#fff',
            strokeColor: '#000',
            strokeWidth: 2,
            stage: stage
          }) : !1;
          var point = new KeepDraw[(k > 1) ? 'Polygon' : 'Circle']({
            x: seg[i][k] + elem.x,
            y: seg[i][k + 1] + elem.y,
            radius: (cursedPoint) ? 0 : 10 * window.devicePixelRatio,
            selseg: i,
            sides: 4,
            line: ltopoint,
            selsegc: k,
            color: (k > 1) ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
            strokeColor: (k > 1) ? '#fff' : '#000',
            strokeWidth: (cursedPoint) ? 0 : 2 * window.devicePixelRatio,
            stage: stage
          });
          point.on('mousedown', function(e, obj) {
sa = obj.line;
            sx = obj.x;
            sy = obj.y;
            
            if (current_point) current_point.color = (current_point.selsegc > 1) ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
            moving_point = obj;
            current_point = obj;
            current_point.color = 'rgba(255,0,0,0.4)';
          });
          point.on('touchstart', function(e, obj) {
sa = obj.line;
            sx = obj.x;
            sy = obj.y;
            
            if (current_point) current_point.color = (current_point.selsegc > 1) ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
            moving_point = obj;
            current_point = obj;
            current_point.color = 'rgba(255,0,0,0.4)';
            if (pointAdd) {
            	stage.childs = stage.childs.filter(function(value, index, arr){ 
        return value != pointAdd;
    });
            }
                        if (pointDel) {
            	stage.childs = stage.childs.filter(function(value, index, arr){ 
        return value != pointDel;
    });
            }
            if (obj.selsegc <= 1) {
            pointAdd = new KeepDraw.Circle ({
            x: obj.x,
             y: obj.y - 30 * window.devicePixelRatio,
            radius: 10 * window.devicePixelRatio,
            color: 'green',
            point: obj,
            strokeColor: 'white',
            strokeWidth: 2 * window.devicePixelRatio,
            stage: stage
          });
          pointAdd.on('touchstart', function(e, obj) {
           clearHalt = true;
           var selseg = pointAdd.point.selseg;
           
           elem.segments.splice(selseg+1, 0, [(elem.segments[selseg][0] + elem.segments[selseg+1][0])/2, (elem.segments[selseg][1] + elem.segments[selseg+1][1])/2 ]);
           clearsel(); displaysegs();
          });
          }
          pointDel = new KeepDraw.Circle ({
            x: obj.x - 30 * window.devicePixelRatio,
             y: obj.y - 30 * window.devicePixelRatio,
            radius: 10 * window.devicePixelRatio,
            color: 'red',
            point: obj,
            strokeColor: 'white',
            strokeWidth: 2 * window.devicePixelRatio,
            stage: stage
          });
                    pointDel.on('touchstart', function(e, obj) {
           clearHalt = true;
           var selseg = pointAdd.point.selseg;
           var selsegc = pointAdd.point.selsegc;
        if (selsegc <= 1)   elem.segments.splice(selseg, 1);
        else  elem.segments[selseg] = [elem.segments[selseg][0], elem.segments[selseg][1]];
           clearsel(); displaysegs();
          });
          });
        }
      }
      updsel(), init();
    }
    paths = [];
  }
brushes = {
  pencil: [
    function(e) {
             lol = elem = new KeepDraw.Line({
          x: start_clientX0,
          image: images[images.length - 1],
          y: start_clientY0,
          segments: [
            [0, 0]
          ],
          stage: stage
        });
        id = Math.random().toString(16).slice(2);
        mine.push(id);
        figures[id] = elem;
      elem.setAttrs(attrs);
      elem.strokeWidth = attrs.strokeWidth * gZoom;
      elem.shadowWidth = attrs.shadowWidth * gZoom;
    },
    function(e, clientX0, clientY0) {
    	if (elem) {
      var seg = elem.segments[elem.segments.length - 1];
      var segs = [(seg[0] + (clientX0 - (seg[0] + start_clientX0)) / (ls.slow * 1)), (seg[1] + (clientY0 - (seg[1] + start_clientY0)) / (ls.slow * 1))];
      elem.segments.push(segs);
      elem.smooth(ls.smooth);
      }
    },
    function() {     
    	sendElem(elem, id);
    }
  ],
 line: [
    function(e) {
          elem = new KeepDraw.Line({
          x: start_clientX0,
          y: start_clientY0,
          image: images[images.length - 1],
          segments: [
            [0, 0],
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
      elem.strokeWidth = attrs.strokeWidth * gZoom;
      elem.shadowWidth = attrs.shadowWidth * gZoom;
      id = Math.random().toString(16).slice(2);
      mine.push(id);
      figures[id] = elem;
    },
    function(e, clientX0, clientY0) {
      elem.segments[elem.segments.length - 1] = [clientX0 - start_clientX0, clientY0 - start_clientY0];
      if (add) elem.segments.push([clientX0 - start_clientX0, clientY0 - start_clientY0]), add = !1;

    },
    function(e) {
         
         sendElem(elem, id);
     }
  ],
 circle: [function(e) {
         elem = new KeepDraw.Circle({
          x: start_clientX0,
          y: start_clientY0,
          image: images[images.length - 1],
          segments: [
            [0, 0],
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
      elem.strokeWidth = attrs.strokeWidth * gZoom;
      elem.shadowWidth = attrs.shadowWidth * gZoom;
      id = Math.random().toString(16).slice(2);
      mine.push(id);
      figures[id] = elem;
    },
    function(e, clientX0, clientY0) {
      elem.segments[1][0] = clientX0 - start_clientX0;
      elem.segments[1][1] = clientY0 - start_clientY0;
    },
    function(e) {
    	elem = elem.toLine();
         sendElem(elem, id);
     }
  ],
  polygon: [function(e) {
           elem = new KeepDraw.Polygon({
          x: start_clientX0,
          y: start_clientY0,
          image: images[images.length - 1],
          segments: [
            [0, 0],
            [0, 0]
          ],
          sides: 3,
          stage: stage
        });
        add = !1;
      elem.setAttrs(attrs);
      elem.strokeWidth = attrs.strokeWidth * gZoom;
      elem.shadowWidth = attrs.shadowWidth * gZoom;
      id = Math.random().toString(16).slice(2);
      mine.push(id);
      figures[id] = elem;
    },
    function(e, clientX0, clientY0) {
      elem.segments[1][0] = clientX0 - start_clientX0;
      elem.segments[1][1] = clientY0 - start_clientY0;
      if (add) elem.sides++, add = !1;
    },
    function(e) {
         sendElem(elem, id);
     }
  ],
  rect: [function(e) {
             elem = new KeepDraw.Rect({
          x: start_clientX0,
          image: images[images.length - 1],
          y: start_clientY0,
          segments: [
            [0, 0],
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
      elem.strokeWidth = attrs.strokeWidth * gZoom;
      elem.shadowWidth = attrs.shadowWidth * gZoom;
      id = Math.random().toString(16).slice(2);
      mine.push(id);
      figures[id] = elem;
    },
    function(e, clientX0, clientY0) {
      elem.segments[1][0] = clientX0 - start_clientX0;
      elem.segments[1][1] = clientY0 - start_clientY0;
  },
    function(e) {
         sendElem(elem, id);
     }
  ],
  cursor: [function(e) {
         new KeepDraw.Line({
        x: start_clientX0,
        y: start_clientY0,
        strokeColor: 'rgba(0,0,0,0.3)',
        strokeWidth: 2,
        color: 'rgba(255,255,255,0.3)',
        segments: [
          [0, 0],
          [0, 0]
        ],
        stage: stage
      });
    },
    function(e, clientX0, clientY0) {
      stage.childs[stage.childs.length - 1].segments.push([clientX0 - start_clientX0, clientY0 - start_clientY0]);
      },
    function(e) {
      for (var i = 0; i < stage.childs.length - 1; i++) {
        if (stage.childs[i]) {
          if (KeepDraw.intersection(stage.childs[i], stage.childs[stage.childs.length - 1])[0]) {
            elem = stage.childs[i];
            stage.childs.length--;
            displaysegs();
            return;
          }
        }
      }
      elem = !1;
      stage.childs.length--;
    }
  ],
eraser:  [
    function(e) {
    	erasing = !0;
  new KeepDraw.Circle({
        x: start_clientX0,
        y: start_clientY0,
        strokeColor: 'rgba(255,255,255,0.5)',
        strokeWidth: 2,
        radius: 50,
        color: 'rgba(0,0,0,0.5)',
        stage: stage
      });
    },
    function(e, clientX0, clientY0) {
    	if (erasing) {
    	stage.childs[stage.childs.length - 1].x = clientX0;
    stage.childs[stage.childs.length - 1].y = clientY0;
    //  stage.childs[stage.childs.length - 1].segments.push([clientX0 - start_clientX0, clientY0 - start_clientY0]);
    for (var key in figures) {
        	var inRadius = false;
        	if (stage.childs[figures[key].index]) {
        	var seg = figures[key]._segments || figures[key].segments;
        	
        var segX = seg[0][0];        
        var segY = seg[0][1];        
        	if (Math.sqrt(Math.pow(clientX0 - (figures[key].x+segX), 2) + Math.pow(clientY0 - (figures[key].y+segY), 2)) <= 50) inRadius = true;
          if (KeepDraw.intersection(figures[key], stage.childs[stage.childs.length - 1])[0] || inRadius) {
            stage.childs[figures[key].index] = undefined;
            removed[key] = figures[key];
            delete figures[key];
         socket.send('del&' + key);
         }
        }
      }
      }
      },
    function(e) {
      if (erasing) stage.childs.length--, erasing = !1;
    }
  ],
  picker: [function(e) {
      var arr = [];
      col = stage.ctx.getImageData(start_clientX0, start_clientY0, 1, 1).data;
      for (var i = 0; i < col.length; i++) {
        arr[i] = col[i];
      }
      arr[3] /= 255;
      colors[ls.sf] = arr;
      colInit();
    },
    function(e) {},
    displaysegs
  ],
fill:  [
    function(e) {
    	filling = !0;
       new KeepDraw.Line({
        x: start_clientX0,
        y: start_clientY0,
        strokeColor: 'rgba(0,0,0,0.3)',
        strokeWidth: 2,
        color: 'rgba(255,255,255,0.3)',
        segments: [
          [0, 0],
          [0, 0]
        ],
        stage: stage
      });
    },
    function(e, clientX0, clientY0) {
    	if (filling) stage.childs[stage.childs.length - 1].segments.push([clientX0 - start_clientX0, clientY0 - start_clientY0]);
      },
    function(e) {
     if (filling &&  stage.childs[stage.childs.length - 1].strokeColor == 'rgba(0,0,0,0.3)') {
      for (var key in figures)  {
          if (KeepDraw.intersection(figures[key], stage.childs[stage.childs.length - 1])[0]) {
          var zAttrs = {};
          for (var opt in attrs) {
              zAttrs[opt] = attrs[opt];
              figures[key][opt] = attrs[opt];
          }
          figures[key].strokeWidth = attrs.strokeWidth * gZoom;
            socket.send('change&' + key + '&' + JSON.stringify(zAttrs));
          }
      }
      delete stage.childs[stage.childs.length - 1];
    }
    filling = !1;
    }
  ],
};
attrsBrush = function(c) {

}
var savepainting = function(e) {
	clearsel();
  paths = [];
  for (var i in figures) {
    var a = {};
    for (var key in figures[i]) {
      if (key == 'segments' || key == '_segments' || typeof(figures[i][key]) != 'function' && typeof(figures[i][key]) != 'object') a[key] = figures[i][key];
    }
    a['id'] = i;
    paths.push(JSON.stringify(a));
  }
  ls.paths = JSON.stringify(paths);
}
if (!wbid) window.onbeforeunload = savepainting;
get('background').onwheel = function(e) {
  if (!move) {
  clearsel();
  var ch = stage.childs;
  var zoom = (e.deltaY < 0) ? 1.1 : 0.9;
  var angle = (e.deltaY > 0) ? 15 : -15;
    for (var i = 0; i < ch.length; i++) {
          if (!rightclick) {
    ch[i].setWidth(ch[i].getWidth() * zoom);
    ch[i].setHeight(ch[i].getHeight() * zoom);
    ch[i].x = (ch[i].x - clientX0) * zoom + clientX0;
		ch[i].y = (ch[i].y - clientY0) * zoom + clientY0;
		ch[i].strokeWidth = ch[i].strokeWidth * zoom;
		ch[i].shadowWidth = ch[i].shadowWidth * zoom;
     } else {
       
       ch[i].rotate(angle, clientX0 - ch[i].x, clientY0 - ch[i].y)
       
     }
    }
  KeepDraw.Utils.draw(stage)
  }
  }
  get('background').addEventListener('mousedown', paintstart);
  get('background').addEventListener('touchstart', paintstart);
  get('background').addEventListener('touchmove', paintmove);
  get('background').addEventListener('mousemove', paintmove);
  get('background').addEventListener('touchend', paintend);
  get('background').addEventListener('mouseup', paintend);
function paintstart(e) {
  	for (var i = 0; i < stage.childs.length; i++) {
		var ele = stage.childs[i];
		var segs = ele._segments || ele.segments;
		stageshot[i] = {x: ele.x, y: ele.y, strokeWidth: ele.strokeWidth, shadowWidth: ele.shadowWidth, segments: segs.map(function(arr) {  return arr.slice(); })};
	}

 clientX0 = (((e.touches) ? e.touches[0].clientX : e.clientX) - get('main').offsetLeft) * window.devicePixelRatio;
clientY0 = (((e.touches) ? e.touches[0].clientY : e.clientY) - get('main').offsetTop) * window.devicePixelRatio;
var no1 = !0;
      if (e.which != 3) { 
if (e.touches) if (e.touches[1])  no1 = !1;
if (no1) {
start_clientX0 = clientX0;
start_clientY0 = clientY0;
}
	if (e.touches) {
if (e.touches[1] && !zoomTimeout && !moving_point) {
	zZoom = gZoom;
    zDeg = gDeg;
	clearTimeout(zoomTimeoutFunc);
	if (move && pen != 'eraser') move = !1, back();
var clientX1 = (((e.touches) ? e.touches[1].clientX : e.clientX) - get('main').offsetLeft) * window.devicePixelRatio;
var clientY1 = (((e.touches) ? e.touches[1].clientY : e.clientY) - get('main').offsetTop) * window.devicePixelRatio;
start_deg = Math.atan2(clientX1 - clientX0, clientY1 - clientY0) * 180 / Math.PI;
start_clientX1 = clientX1;
start_clientY1 = clientY1;
    zoom = 0;
	zooming = !0;
	
if (pen == 'eraser') brushes[pen][2]();

	start_midx = ( clientX1 +  clientX0) / 2;
	start_midy = ( clientY1 +  clientY0) / 2;
	 start_distance = Math.sqrt(Math.pow( clientX1  -  clientX0, 2 )+ Math.pow(clientY1   -  clientY0, 2 ));
	//clientX0 not uses anymore
	return;
		} else {
			zoomTimeoutFunc = setTimeout(function() {
				zoomTimeout = !0;
				}, 100);
			}
		}

if (!run) {
  if (!move) {
    if (!moving_point && !clearHalt) {
      if (pen != 'eraser') clearsel(), removed = {};
      move = !0;
      if (brushes[pen][0] && no1) brushes[pen][0](e);
    }
  }
if (elem) _seg = JSON.parse(JSON.stringify(elem._segments || elem.segments));
}
KeepDraw.Utils.draw(stage)
  } else {
  start_rightclientX0 = clientX0;
start_rightclientY0 = clientY0;
  rightclick = !0;
  }
}
get('background').onmouseenter = function(e) {
	get('background').focus();
}
get('background').onmouseleave = function(e) {
	get('background').blur();
}
function paintmove(e) {
event = e;
  clientX0 = (((e.touches) ? e.touches[0].clientX : e.clientX) - get('main').offsetLeft) * window.devicePixelRatio;
clientY0 = (((e.touches) ? e.touches[0].clientY : e.clientY) - get('main').offsetTop) * window.devicePixelRatio;
    if (e.which != 3) {
if (e.touches ) {
if (e.touches[1] && !zoomTimeout && !moving_point) {
var clientX1 = (((e.touches) ? e.touches[1].clientX : e.clientX) - get('main').offsetLeft) * window.devicePixelRatio;
var clientY1 = (((e.touches) ? e.touches[1].clientY : e.clientY) - get('main').offsetTop) * window.devicePixelRatio;

	 move_distance = Math.sqrt(Math.pow(clientX1  - clientX0, 2  )+ Math.pow(clientY1   - clientY0, 2 ));
	move_midx = (clientX1 + clientX0) / 2;
	move_midy = (clientY1 + clientY0) / 2;
	//
	//move_midx = start_midx;
	//move_midy = start_midy;
	//
	shiftx = move_midx - start_midx;
	shifty = move_midy - start_midy;
	zoom =  move_distance / start_distance;
	gZoom = zoom * zZoom;
	colInit();
//
     
//
	for (var i = 0; i < stageshot.length; i++) {
		var ele = stage.childs[i];
		var el = stageshot[i];
		if (ele && el) {
		ele.x = (el.x - move_midx + shiftx) * zoom + move_midx;
		ele.y = (el.y - move_midy + shifty) * zoom + move_midy;
		ele.strokeWidth = el.strokeWidth * zoom;
		ele.shadowWidth = el.shadowWidth * zoom;
		
		move_deg = Math.atan2(clientX1 - clientX0, clientY1 - clientY0) * 180 / Math.PI;
		gDeg = zDeg + start_deg - move_deg;
		if (gDeg > 360) gDeg -= 360;
		if (gDeg < 0) gDeg += 360;
         var resizedSeg = KeepDraw.scaleSegments(el.segments, zoom);
         var rotatedSeg = KeepDraw.rotateSegments(resizedSeg, start_deg - move_deg, move_midx - ele.x , move_midy - ele.y);
		ele._segments = rotatedSeg; 
		}
		
	}
	gX = gRot.x - innerWidth / 2  * window.devicePixelRatio + gRot._segments[0][0];
	gY = gRot.y - innerHeight / 2  * window.devicePixelRatio + gRot._segments[0][1];
	KeepDraw.Utils.draw(stage)
	return;
}
		}
		}
  if (move && !moving_point) {
    if (elem && pen != 'cursor' && pen != 'fill' &&pen != 'pencil') elem.smooth(ls.smooth);
    if (brushes[pen][1]) brushes[pen][1](e, clientX0, clientY0);
  } else if (moving_point) {
    var seg = elem._segments || elem.segments;
    var j = (moving_point.selsegc > 3) ? 1 : 0;
    if (moving_point.selsegc < 2) {
      if (seg[moving_point.selseg].length > 2) {
        seg[moving_point.selseg][2] = clientX0 - _seg[moving_point.selseg][0] + _seg[moving_point.selseg][2] - elem.x;
        seg[moving_point.selseg][3] = clientY0 - _seg[moving_point.selseg][1] + _seg[moving_point.selseg][3] - elem.y;
      }
      if (seg[moving_point.selseg - 1])
        if (seg[moving_point.selseg - 1].length > 4) {
          seg[moving_point.selseg - 1][4] = clientX0 - _seg[moving_point.selseg][0] + _seg[moving_point.selseg - 1][4] - elem.x;
          seg[moving_point.selseg - 1][5] = clientY0 - _seg[moving_point.selseg][1] + _seg[moving_point.selseg - 1][5] - elem.y;
        }
    }
    moving_point.x = clientX0;
    moving_point.y = clientY0;
    if (pointAdd) {
    	pointAdd.x = clientX0;
       pointAdd.y = clientY0 - 30 * window.devicePixelRatio;
    }
    if (pointDel) {
    	pointDel.x = clientX0 - 30 * window.devicePixelRatio;
       pointDel.y = clientY0 - 30 * window.devicePixelRatio;
    }
    seg[moving_point.selseg][moving_point.selsegc] = (clientX0 - sx) - (elem.x - sx);
    seg[moving_point.selseg][moving_point.selsegc + 1] = (clientY0 - sy) - (elem.y - sy);
    if ((seg.length-1 == moving_point.selseg) && elem.closed) {
    	seg[0][0] = (clientX0 - sx) - (elem.x - sx);
    seg[0][1] = (clientY0 - sy) - (elem.y - sy);
    if (seg[0][3]) {
    seg[0][2] = clientX0 - _seg[moving_point.selseg][0] + _seg[0][2] - elem.x;
    seg[0][3] = clientY0 - _seg[moving_point.selseg][1] + _seg[0][3] - elem.y;
    }
    }
    updsel();
  }
  if (rightclick) {
  clearsel();
  var ch = stage.childs;
  zoom = (clientY0 < start_clientY0) ? 1 : -1;

  	var shiftx = clientX0 - start_rightclientX0;
	  var shifty = clientY0 - start_rightclientY0;
  
    for (var i = 0; i < stageshot.length; i++) {
    	if(ch[i]) {
      var el = stageshot[i];
    ch[i].x = stageshot[i].x + shiftx;
		ch[i].y = stageshot[i].y + shifty;
    }
    }

}
KeepDraw.Utils.draw(stage);
}
console.log('a');
function paintend(e) {
	clearHalt = false;
	if (e.touches) {
if (e.touches[0]) {
	if (zooming && zoom != 0 && !moving_point) {
  zooming = !1;
  colInit();
  }
//  alert(get('main').style.transform);
}
}
  if (e.button != 2) {
var few = !1;
if (e.targetTouches) {
	if (e.targetTouches[0]) few = !0;
}
if (!few) {
  if (move) {
    move = !1;
    if (!wbid) window.onbeforeunload = savepainting;
    if (brushes[pen][2]) brushes[pen][2](e);
    select = !0;
  } else {
    if (moving_point) moving_point = !1;
  }
KeepDraw.Utils.draw(stage)
} else add = !0;
if (!move) zoomTimeout = !1;
}
      if (e.which == 3) rightclick = !1;
}
var back = function() {
  if (mine[0]) {
  	var key = mine[mine.length - 1];
  mine.length--
  removed[key] = figures[key];
  stage.childs[figures[key].index] = undefined;
            delete figures[key];
         socket.send('del&' + key);
  }
  }
var forward = function() {
	var keys = Object.keys(removed)
  if (keys.length > 0) {
  	var id = keys[keys.length - 1];
    stage.childs.push(removed[id]);
    figures[id] = removed[id];
    mine.push(id);
    sendElem(removed[id], id);
    delete removed[id];
KeepDraw.Utils.draw(stage)
  }
}
 get('background').onkeydown = function(e) {
 	if (e.keyCode == 38) {
    	
      if (!move) {
  clearsel();
  var ch = stage.childs;
  var zoom = 1.1;
  var angle = 15;
    for (var i = 0; i < ch.length; i++) {
          if (!rightclick) {
    ch[i].setWidth(ch[i].getWidth() * zoom);
    ch[i].setHeight(ch[i].getHeight() * zoom);
    ch[i].x = (ch[i].x - clientX0) * zoom + clientX0;
		ch[i].y = (ch[i].y - clientY0) * zoom + clientY0;
		ch[i].strokeWidth = ch[i].strokeWidth * zoom;
		ch[i].shadowWidth = ch[i].shadowWidth * zoom;
     } else {
       
       ch[i].rotate(angle, clientX0 - ch[i].x, clientY0 - ch[i].y)
       
     }
    }
  KeepDraw.Utils.draw(stage)
  }
    
    
    }
    if (e.keyCode == 40) {
    	
      if (!move) {
  clearsel();
  var ch = stage.childs;
  var zoom = 0.9;
  var angle = -15;
    for (var i = 0; i < ch.length; i++) {
          if (!rightclick) {
    ch[i].setWidth(ch[i].getWidth() * zoom);
    ch[i].setHeight(ch[i].getHeight() * zoom);
    ch[i].x = (ch[i].x - clientX0) * zoom + clientX0;
		ch[i].y = (ch[i].y - clientY0) * zoom + clientY0;
		ch[i].strokeWidth = ch[i].strokeWidth * zoom;
		ch[i].shadowWidth = ch[i].shadowWidth * zoom;
     } else {
       
       ch[i].rotate(angle, clientX0 - ch[i].x, clientY0 - ch[i].y)
       
     }
    }
  KeepDraw.Utils.draw(stage)
  }
    }
 }
document.body.onkeydown = function(e) {
	if (!input) {
  if (e.ctrlKey) {
    if (e.keyCode == 90) back();
    if (e.keyCode == 89) forward();
  } else {
    if (e.keyCode == 49) setBrush('cursor');
    if (e.keyCode == 50) setBrush('eraser');
    if (e.keyCode == 51) setBrush('picker');
    if (e.keyCode == 52) setBrush('fill');
    if (e.keyCode == 53) setBrush('pencil');
    if (e.keyCode == 54) setBrush('line');
    if (e.keyCode == 55) setBrush('circle');
    if (e.keyCode == 56) setBrush('polygon');
    if (e.keyCode == 57) setBrush('rect');
    if (e.keyCode == 32 && move) add = !0;
  }
  }
}
if (get('cursor')) {
get('import').onchange = function(e) {
  var read = new FileReader();
  read.readAsDataURL(get('import').files[0]);
  read.onload = function() {
    get('imstyle').style.background = 'url(' + read.result + ') no-repeat';
im = new KeepDraw.Image({
      width: ls.imgwidth,
      height: ls.imgheight,
      y: ls.imgy,
      x: ls.imgx,
      outside: false,
      src: read.result
    });
    images.push(im);
attrs.img = im;
attrs.image = im
get('delimg').style.display = 'block';
  };
};
}
get('save').onmousemove = function() {
  clearsel();
KeepDraw.Utils.draw(stage)
}

function clearsel() {
  if (elem) {
    if (isel) {
      select = false;
      stage.childs.length -= stage.childs.length - isel + ((elem.noline) ? 1 : 0);
      elem.noline = !1;
      stage.events.mousedown = [];
      stage.events.touchstart = [];
      isel = !1;
      init();
    }
  }
}
 
save = function() {
  clearsel();
  get('save').href = stage.canvas.toDataURL()
}
function updsel() {
  if (isel) {
  	var seg = elem._segments || elem.segments;
  /**
  	var points = 0;
      var numseg = 0;
      for (var j = 0; j < seg.length; j++) { 
        for (var k = 0; k < seg[j].length; k += 2) {
        numseg++;	
      }
      }
      **/
    for (var i = isel; i < stage.childs.length; i++) {
      var ch = stage.childs[i];
       if (ch.selseg || ch.selseg == 0) {
       //	points++;
      ch.x = seg[stage.childs[i].selseg][stage.childs[i].selsegc] + elem.x;
      ch.y = seg[stage.childs[i].selseg][stage.childs[i].selsegc+1] + elem.y;
        if (ch.line) {
          var j = (ch.selsegc > 3) ? 1 : 0;
          ch.line.x = seg[ch.selseg + j][0] + elem.x;
          ch.line.y = seg[ch.selseg + j][1] + elem.y;
          ch.line.segments[1] = [seg[ch.selseg][ch.selsegc] - seg[ch.selseg + j][0], seg[ch.selseg][ch.selsegc + 1] - seg[ch.selseg + j][1]];
      }
      }
    }
    KeepDraw.Utils.draw(stage);
  //alert(numseg + " " + points);
    //if (numseg != points) displaysegs();
  }
}
function reset() {
for (var key in localStorage) {
if (key != 'paths' || wbid) delete localStorage[key];
ls = {};
location.reload();
}
}




get('delimg').onclick = function() {
images.push(false);
init();
get('delimg').style.display = 'none';
get('imstyle').style.background = '';
attrs.img = !1;
attrs.image = !1;
}
document.oncontextmenu = function() {
  return false
};
for (var i = 0; i < stage.childs.length; i++) {
stage.childs[i].image = images[stage.childs[i].img]
}

var numInput = document.querySelectorAll('input[type="number"]');
for (var i = 0; i < numInput.length; i++) {
  // Listen for input event on numInput.
  numInput[i].onfocus = function() {
  	input = !0;
  }
  numInput[i].onblur = function() {
  	input = !1;
  }
}
function toggleFullScreen() {
	console.log(stage.height);
	console.log(innerHeight);
	var fullStage = (stage.height == innerHeight) ? !0 : !1;
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
get('fullscreen').style.backgroundImage = 'url(img/fullscreenexit.svg)';
if (fullStage) {
 stage.height = screen.height;
 stage.width = screen.width
 }
colInit();
  } else if (document.exitFullscreen) {
      document.exitFullscreen(); 
      get('fullscreen').style.backgroundImage = 'url(img/fullscreen.svg)';
      setTimeout(function() {
      if (fullStage) {
stage.height = innerHeight;
stage.width = innerWidth
}
      colInit();
     }, 300); //!"!'!** WHY I HAVE TO WAIT AND CAN'T USE exitFullscreen().catch() !!!!!!?????!!?!? innerHeight UPDATES TOO LATE!!
  }
}
document.body.onload =  function() {
setStageControls();
get(pen).classList.add('select');
get('background').focus();
}
        rot = function() {
        /**
new lines going to gRot
	 if (lol) {
        	var togRotX = -elem.x + innerWidth / 2  * window.devicePixelRatio + gX;
       var togRotY = -elem.y + innerHeight / 2  * window.devicePixelRatio + gY;
 lol.segments = KeepDraw.scaleSegments(KeepDraw.rotateSegments(elem.segments, 20, togRotX, togRotY), 0.95, togRotX, togRotY);
 }
 **/
 
 /**
        	movie.x = gX + innerWidth / 2  * window.devicePixelRatio;
           movie.y = gY + innerHeight / 2  * window.devicePixelRatio;
           movie._segments = KeepDraw.scaleSegments(KeepDraw.rotateSegments(movie.segments, gDeg), gZoom);
           **/
        	if (zooming) {
        	statX.text = "x: " + gX
           statY.text = "y: " + gY
           statZoom.text = "zoom: " + gZoom
           statDeg.text = "deg: " + gDeg;
           
           }
           else {
           	statX.text = statY.text = statZoom.text = statDeg.text = ""
           }
        	for (var i = 1; i < stage.childs.length; i++) {
            //stage.childs[i]._segments =	KeepDraw.caleSegments(stage.childs[i]._segments || stage.childs[i].segments, 0.99, gRot.x - stage.childs[i].x + gRot._segments[0][0], gRot.y - stage.childs[i].y + gRot._segments[0][1]);
      //  stage.childs[i].strokeWidth *= 0.99;

        	//stage.childs[i]._segments = KeepDraw.rotateSegments(stage.childs[i]._segments || stage.childs[i].segments, 5, gRot.x - stage.childs[i].x + gRot._segments[0][0], gRot.y - stage.childs[i].y + gRot._segments[0][1]);
        }
        }
        setInterval(() => {
        	
        rot();
        KeepDraw.Utils.draw(stage);
        
        }, 40);
        var info = new KeepDraw.Layer({
        	stage: stage
        });
        
        var statX =  new KeepDraw.Text({
    x: 17,
    y: 30,
    text: 'x: 0',
    color: 'rgba(255,255,255,0.3)',
    strokeColor: 'black',
    strokeWidth: 0.6,
    font: 'Ubuntu',
    layer: info, 
    fontWidth: 20,
});
var statY =  new KeepDraw.Text({
    x: 17,
    y: 52,
    text: 'y: ',
    color: 'rgba(255,255,255,0.3)',
    strokeColor: 'black',
    strokeWidth: 0.6,
    font: 'Ubuntu',
    layer: info,
    fontWidth: 20,
});
var statDeg =  new KeepDraw.Text({
    x: 15,
    y: 82,
    text: 'deg: 0',
    color: 'rgba(255,255,255,0.3)',
    strokeColor: 'black',
    strokeWidth: 0.6,
    font: 'Ubuntu',
    layer: info,
    fontWidth: 20,
});
var statZoom =  new KeepDraw.Text({
    x: 17,
    y: 106,
    text: 'zoom: 0',
    color: 'rgba(255,255,255,0.3)',
    strokeColor: 'black',
    strokeWidth: 0.6,
    font: 'Ubuntu',
    layer: info,
    fontWidth: 20,
});
function sendElem(ele, id) {
	var togRotX = -ele.x + innerWidth / 2  * window.devicePixelRatio + gX;
       var togRotY = -ele.y + innerHeight / 2  * window.devicePixelRatio + gY;
    	    var coords = {
      	x: -togRotX,
        y: -togRotY,
    }   
    for (var key in attrs) {
           coords[key] = attrs[key];
       }
       coords.strokeWidth = ele.strokeWidth / gZoom;
       coords.shadowWidth = ele.shadowWidth / gZoom;
     coords.segments = KeepDraw.scaleSegments(KeepDraw.rotateSegments((ele._segments || ele.segments), -gDeg, togRotX, togRotY), 1/gZoom, togRotX, togRotY);
    socket.send('new&Line&' + id + '&' + JSON.stringify(coords));
    elem = !1;
}
/**
gRoo = new KeepDraw.Line({
  	x: innerWidth / 2  * window.devicePixelRatio,
  y: innerHeight / 2  * window.devicePixelRatio,
  segments: [[0,0],[0, 0]],
  lineCap: 'round',
  strokeColor: 'red',
  _segments: [[0,0],[0, 0]],
  strokeWidth: 15,
  layer: info
  });
  movie = new KeepDraw.Line({
  	x: innerWidth / 2  * window.devicePixelRatio,
  y: innerHeight / 2  * window.devicePixelRatio,
  segments: [[-50, 0], [0, 0], [0, -50], [0, 0], [50, 0]],
  strokeWidth: 5,
  layer: info
  });
  **/
//alert(stage.childs[1].cons.toString());