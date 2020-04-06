
run = !1;
var event = !1;
document.onselectstart = function() {
  return false
};
var removed = [],
  isel = !1,
  select = selpoint = selact = !1,
  sx, sy,
  paths = [],
  stage = new KeepDraw.Stage({
    width: innerWidth,
    height: innerHeight,
    canvas: 'main',
  });

function get(elem) {
  return document.getElementById(elem)
};
function getRadius(x, y, x2, y2) {
  return Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2))
};
get('toolbar').onselectstart = function() {
  return false
};
var ls = localStorage;
ls.brush = "pencil";
var add = !1;
var images = (ls.images) ? JSON.parse(ls.images) : [false];
for (var i = 0; i < images.length; i++) {
if (images[i]) images[i] = new KeepDraw.Image(images[i]);
}
    if (images[images.length-1])get('imstyle').style.background = 'url(' + images[images.length-1].src + ') no-repeat', img = images[images.length-1];
if (!get(0)) ls.pen = 5;
if (!ls.pen) { ls.pen = ls.sf = ls.cap = 0;
ls.imgwidth = 1000;
ls.imgheight = 1000;
ls.imgx = -500;
ls.imgy = -500;
}
if(!images[images.length-1]) get('delimg').style.display = 'none';
var colors = (ls.colors) ? JSON.parse(ls.colors) : [
  [0, 0, 0, 0],
  [0, 0, 0, 1],
  [0, 0, 0, 1]
];
ls.slow = ls.slow || 1;
get(ls.pen).classList.add('select');
var setBrush = function(c) {
  get(ls.pen).classList.remove('select');
  ls.pen = c;
  get(c).classList.add('select');
  clearsel();
};
function draw() {
if (ls.paths != undefined) {
  if (ls.paths != "") {
    paths = JSON.parse(ls.paths);
    for (var i = 0; i < paths.length; i++) {
      var a = JSON.parse(paths[i]);
      a.stage = stage;
      new KeepDraw.Line(a);
    }
  }
} else ls.paths = "[]";
};
draw();
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
if (get(0)) {
  ls.images = JSON.stringify(images);
  get('sf').value = ls.sf;
  get('stroke').childNodes[1].innerText = (ls.sf > 1) ? '❂' : (ls.sf > 0) ? '○' : '●';
  get('cap').childNodes[1].innerText = (ls.cap > 1) ? '▶' : (ls.cap > 0) ? '■' : '◗';
  get('r').value = get('red').childNodes[1].value = colors[ls.sf][0];
  get('g').value = get('green').childNodes[1].value = colors[ls.sf][1];
  get('b').value = get('blue').childNodes[1].value = colors[ls.sf][2];
  get('o').value = get('opacity').childNodes[1].value = colors[ls.sf][3];
  get('c').value = ls.cap;
  get('sm').value = ls.smooth;
  get('opacity').childNodes[1].value = colors[ls.sf][3]
  get('smooth').childNodes[1].value = ls.smooth || 0;
  get('sl').value = get('slow').childNodes[1].value = ls.slow;
  get('strw').value = get('strwidth').childNodes[1].value = attrs.strokeWidth;
  get('sh').value = get('shadow').childNodes[1].value = attrs.shadowWidth;
  images[images.length - 1].width = get('imgwidth').childNodes[1].value = get('iw').value = ls.imgwidth;
  images[images.length - 1].height = get('imgheight').childNodes[1].value = get('ih').value = ls.imgheight;
  images[images.length - 1].x = get('imgx').childNodes[1].value = get('ix').value = ls.imgx;
  images[images.length - 1].y = get('imgy').childNodes[1].value = get('iy').value = ls.imgy;
  if (elem) {
    get('x').childNodes[1].value = get('xc').value = elem.x || 0;
    get('y').childNodes[1].value = get('yc').value = elem.y || 0;
    get('width').childNodes[1].value = get('wc').value = elem.width || 0;
    get('height').childNodes[1].value = get('hc').value = elem.height || 0;
    updsel();
  }
  get('red').style.background = 'rgba(' + colors[ls.sf][0] + ',0,0,1)';
  get('green').style.background = 'rgba(0,' + colors[ls.sf][1] + ',0,1)';
  get('blue').style.background = 'rgba(0,0,' + colors[ls.sf][2] + ',1)';
  get('opacity').style.background = 'rgba(' + colors[ls.sf][0] + ',' + colors[ls.sf][1] + ',' + colors[ls.sf][2] + ',' + colors[ls.sf][3] + ')';
}
}
init();
colInit = function() {
if (get(0)) {
  get('color').style.background = attrs.color = 'rgba(' + colors[0][0] + ',' + colors[0][1] + ',' + colors[0][2] + ',' + colors[0][3] + ')';
  attrs.strokeColor = 'rgba(' + colors[1][0] + ',' + colors[1][1] + ',' + colors[1][2] + ',' + colors[1][3] + ')';
  attrs.shadowColor = 'rgba(' + colors[2][0] + ',' + colors[2][1] + ',' + colors[2][2] + ',' + colors[2][3] + ')';
  get('color').style.boxShadow = '0 0 0 ' + ((attrs.strokeWidth > 100) ? 50 : attrs.strokeWidth / 2) + 'px ' + attrs.strokeColor;
  ls.attrs = JSON.stringify(attrs);
  ls.colors = JSON.stringify(colors);
  init();
}
}
colInit();
if (get(0)) {
get('color').style.border = '0';
get('color').style.zIndex = '-1';
var change = function(el, num) {
  if (num == 'sh') attrs.shadowWidth = el.value;
  if (num == 'w') attrs.strokeWidth = el.value;
  if (num == 'strw') attrs.strokeWidth = el.value;
  if (num == 'iw') ls.imgwidth = images[images.length - 1].width = el.value;
  if (num == 'ih') ls.imgheight = images[images.length - 1].height = el.value;
  if (num == 'ix') ls.imgx = images[images.length - 1].x = el.value;
  if (num == 'iy') ls.imgy = images[images.length - 1].y = el.value;
  if (num == 'x') elem.x = el.value * 1;
  if (num == 'width') elem.width = el.value * 1;
  if (num == 'y') elem.y = el.value * 1;
  if (num == 'height') elem.height = el.value * 1;
if (num == 'sl') ls.slow = el.value; 
  if (num == 'sm') {
ls.smooth = el.value;
if (elem && ls.pen != 0) elem.smooth(ls.smooth)
}
  else colors[ls.sf][num] = el.value;
  colInit();
}
get('panel').onmouseup = function() {
  updsel();
}
get('strw').oninput = function() {
  attrs.strokeWidth = this.value;
  colInit();
}
get('sm').oninput = function() {
  ls.smooth = this.value;
  if (elem && ls.pen != 0) elem.smooth(this.value), brushesup();
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
  if (elem) elem.x = this.value * 1;
  colInit();
}
get('hc').oninput = function() {
  if (elem) elem.height = this.value * 1;
  colInit();
}
get('sl').oninput = function() {
  ls.slow = this.value * 1;
  colInit();
}
get('yc').oninput = function() {
  if (elem) elem.y = this.value * 1;
  colInit();
}
get('wc').oninput = function() {
  if (elem) elem.width = this.value * 1;
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
  colInit();
}
get('c').oninput = function() {
  var v = ls.cap = this.value;
  attrs.lineCap = (v > 1) ? 'butt' : (v > 0) ? 'square' : 'round';
  attrs.lineJoin = (v > 1) ? 'mitter' : (v > 0) ? 'bevel' : 'round';
  colInit();
}
get('sf').oninput = function() {
  ls.sf = this.value;
  init();
}
}
var move = !1,
  elem, x, y,
  brushesup = function(e) {
if (isel) {
clearsel();
}
    if (elem) {
elem.img = images.length-1;
      var c = elem.index;
      if (ls.pen > 1 && ls.pen != 5 && elem.cons != KeepDraw.Line) {
        elem = elem.toLine();
        if (elem) elem.noline = !0;
      }
      isel = stage.childs.length;
      init();
      var seg = elem._segments || elem.segments;
      var segs = [];
      var width = (attrs.strokeWidth > 50) ? 50 : attrs.strokeWidth + 1;
      var seg = elem._segments || elem.segments;
      for (var i = 0; i < seg.length; i++) {
        for (var k = 0; k < seg[i].length; k += 2) {
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
          var point = new KeepDraw.Circle({
            x: seg[i][k] + elem.x,
            y: seg[i][k + 1] + elem.y,
            radius: 20,
            selseg: i,
            line: ltopoint,
            selsegc: k,
            color: 'rgba(255,255,255,0.4)',
            strokeColor: '#000',
            strokeWidth: 2,
            stage: stage
          });
          point.on('mousedown', function(e, obj) {
console.log(obj.selsegc, obj.line); 
sa = obj.line;
            sx = obj.x;
            sy = obj.y;
            selpoint = obj;
          });
          point.on('touchstart', function(e, obj) {
console.log(obj.selsegc, obj.line); 
sa = obj.line;
            sx = obj.x;
            sy = obj.y;
            selpoint = obj;
          });
        }
      }
	if (elem.acts) for (var i = 0; i < elem.acts.length; i++) {
		if (elem.acts[i][0] >= 0) {
		var c = elem.center();
		var point = new KeepDraw.Circle({
		x: c[0] + elem.x,
		y: c[1] + elem.y,
		image: imgs[elem.acts[i][0]],
		radius: 30,
		act: i,
		stage: stage
		});
          point.on('mousedown', function(e, obj) {
            sx = obj.x;
            sy = obj.y;
            selact = obj;
          });
          point.on('touchstart', function(e, obj) {
            sx = obj.x;
            sy = obj.y;
            selact = obj;
          });
}
	}
      updsel();
    }
    paths = [];
  }
brushes = [
  [
    function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio,
        elem = new KeepDraw.Line({
          x: x,
          image: images[images.length - 1],
          y: y,
          segments: [
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
    },
    function(e) {
      var seg = elem.segments[elem.segments.length - 1];
      var segs = [(seg[0] + (((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - (seg[0] + x)) / (ls.slow * 1)), (seg[1] + (((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - (seg[1] + y)) / (ls.slow * 1))];
      elem.segments.push(segs);
    },
    function() {
      elem = !1;
    }
  ],
  [
    function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio,
        elem = new KeepDraw.Line({
          x: x,
          y: y,
          image: images[images.length - 1],
          segments: [
            [0, 0],
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
    },
    function(e) {
      elem.segments[elem.segments.length - 1] = [((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y];
      if (add) elem.segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]), add = !1;
    },
    brushesup
  ],
  [function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio,
        elem = new KeepDraw.Circle({
          x: x,
          y: y,
          image: images[images.length - 1],
          segments: [
            [0, 0],
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
    },
    function(e) {
      elem.segments[1][0] = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x;
      elem.segments[1][1] = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y;
    },
    brushesup
  ],
  [function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio,
        elem = new KeepDraw.Polygon({
          x: x,
          y: y,
          image: images[images.length - 1],
          segments: [
            [0, 0],
            [0, 0]
          ],
          sides: 3,
          stage: stage
        });
      elem.setAttrs(attrs);
    },
    function(e) {
      elem.segments[1][0] = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x,
        elem.segments[1][1] = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y;
      if (add) elem.sides++, add = !1;
    },
    brushesup
  ],
  [function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio,
        elem = new KeepDraw.Rect({
          x: x,
          image: images[images.length - 1],
          y: y,
          segments: [
            [0, 0],
            [0, 0]
          ],
          stage: stage
        });
      elem.setAttrs(attrs);
    },
    function(e) {
      elem.segments[1][0] = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x,
        elem.segments[1][1] = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y;
    },
    brushesup
  ],
  [function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio;
      new KeepDraw.Line({
        x: x,
        y: y,
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
    function(e) {
      stage.childs[stage.childs.length - 1].segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]);
      if (add) stage.childs[stage.childs.length - 1].segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]), add = !1;
    },
    function(e) {
      for (var i = 0; i < stage.childs.length - 1; i++) {
        if (stage.childs[i]) {
          if (KeepDraw.intersection(stage.childs[i], stage.childs[stage.childs.length - 1])[0]) {
            elem = stage.childs[i];
            stage.childs.length--;
            brushesup();
            return;
          }
        }
      }
      elem = !1;
      stage.childs.length--;
    }
  ],
  [
    function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio;
      new KeepDraw.Line({
        x: x,
        y: y,
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
    function(e) {
      stage.childs[stage.childs.length - 1].segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]);
      if (add) stage.childs[stage.childs.length - 1].segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]), add = !1;
    },
    function(e) {
      for (var i = 0; i < stage.childs.length - 1; i++) {
        if (stage.childs[i]) {
          if (KeepDraw.intersection(stage.childs[i], stage.childs[stage.childs.length - 1])[0]) {
            stage.childs[i] = undefined;
          }
        }
      }
      stage.childs.length--;
    }
  ],
  [function(e) {
      var arr = [];
      col = stage.ctx.getImageData(((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio, 1, 1).data;
      for (var i = 0; i < col.length; i++) {
        arr[i] = col[i];
      }
      arr[3] /= 255;
      colors[ls.sf] = arr;
      colInit();
    },
    function(e) {},
    brushesup
  ],
  [
    function(e) {
      x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio,
        y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio;
      new KeepDraw.Line({
        x: x,
        y: y,
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
    function(e) {
      stage.childs[stage.childs.length - 1].segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]);
      if (add) stage.childs[stage.childs.length - 1].segments.push([((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - x, ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - y]), add = !1;
    },
    function(e) {
      for (var i = 0; i < stage.childs.length - 1; i++) {
        if (stage.childs[i]) {
          if (KeepDraw.intersection(stage.childs[i], stage.childs[stage.childs.length - 1])[0]) {
            for (var key in attrs) {
              stage.childs[i][key] = attrs[key];
            }
          }
        }
      }
      stage.childs.length--;
    }
  ],
];
attrsBrush = function(c) {

}
if (get(0)) {
window.onbeforeunload = function() {
  clearsel();
  paths = [];
  for (var i = 0; i < stage.childs.length; i++) {
    var a = {};
    for (var key in stage.childs[i]) {
      if (key == 'segments' || key == '_segments' || typeof(stage.childs[i][key]) != 'function' && typeof(stage.childs[i][key]) != 'object') a[key] = stage.childs[i][key];
    }
    paths.push(JSON.stringify(a));
  }
  ls.paths = JSON.stringify(paths);
}
}
get('main').onmousedown = get('main').ontouchstart = function(e) {
if (!selact && !run) {
  if (!move) {
    if (!selpoint) {
      if (ls.pen != 6) clearsel();
      removed = [];
      move = !0;
      if (brushes[ls.pen][0]) brushes[ls.pen][0](e);
    }
  }
if (elem) _seg = JSON.parse(JSON.stringify(elem._segments || elem.segments));
}
KeepDraw.Utils.draw(stage)
}
document.onmousemove = document.ontouchmove = function(e) {
event = e;
  if (move && !selpoint && !selact) {
    if (elem && ls.smooth * 1 > 0.1 && ls.pen != 5 && ls.pen != 8 &&ls.pen != 0) elem.smooth(ls.smooth);
    if (brushes[ls.pen][1]) brushes[ls.pen][1](e);
  } else if (selpoint) {
    var seg = elem._segments || elem.segments;
    var j = (selpoint.selsegc > 3) ? 1 : 0;
    if (selpoint.selsegc < 2) {
      if (seg[selpoint.selseg].length > 2) {
        seg[selpoint.selseg][2] = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - _seg[selpoint.selseg][0] + _seg[selpoint.selseg][2] - elem.x;
        seg[selpoint.selseg][3] = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - _seg[selpoint.selseg][1] + _seg[selpoint.selseg][3] - elem.y;
      }
      if (seg[selpoint.selseg - 1])
        if (seg[selpoint.selseg - 1].length > 4) {
          seg[selpoint.selseg - 1][4] = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - _seg[selpoint.selseg][0] + _seg[selpoint.selseg - 1][4] - elem.x;
          seg[selpoint.selseg - 1][5] = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - _seg[selpoint.selseg][1] + _seg[selpoint.selseg - 1][5] - elem.y;
        }
    }
    selpoint.x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio;
    selpoint.y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio;
    seg[selpoint.selseg][selpoint.selsegc] = (((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio - sx) - (elem.x - sx);
    seg[selpoint.selseg][selpoint.selsegc + 1] = (((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio - sy) - (elem.y - sy);
    updsel();
  } else if (selact) {
	selact.x = ((e.touches) ? e.touches[0].clientX : e.clientX) * window.devicePixelRatio;
	selact.y = ((e.touches) ? e.touches[0].clientY : e.clientY) * window.devicePixelRatio;
}
KeepDraw.Utils.draw(stage)
}
document.onmouseup = document.ontouchend = function(e) {
    if (selact) selact = !1;
 else {
  if (e.which == 3 && move) add = !0;
  else if (move) {
    move = !1;
    if (brushes[ls.pen][2]) brushes[ls.pen][2](e);
    select = !0;
  } else {
    if (selpoint) selpoint = !1;
  }
}
KeepDraw.Utils.draw(stage)
}
var back = function() {
  if (stage.childs.length > 0) {
    clearsel();
    removed.push(stage.childs[stage.childs.length - 1]);
    stage.childs.length--;

  }
}
var forward = function() {
  if (removed.length > 0) {
    stage.childs.push(removed[removed.length - 1]);
    removed.length--;

  }
}
document.body.onkeydown = function(e) {
  if (e.ctrlKey) {
    if (e.keyCode == 90) back();
    if (e.keyCode == 89) forward();
  } else {
    if (e.keyCode == 49) setBrush(5);
    if (e.keyCode == 50) setBrush(6);
    if (e.keyCode == 51) setBrush(7);
    if (e.keyCode == 52) setBrush(8);
    if (e.keyCode == 53) setBrush(0);
    if (e.keyCode == 54) setBrush(1);
    if (e.keyCode == 55) setBrush(2);
    if (e.keyCode == 56) setBrush(3);
    if (e.keyCode == 57) setBrush(4);
    if (e.keyCode == 58) setBrush(4);
    if (e.keyCode == 32 && move) add = !0, (event ? document.body.onmousemove(event) : !1);
  }
}
if (get(0)) {
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
    }
  }
}

function movesel() {
  if (!selpoint && select) {
    var seg = elem._segments || elem.segments;
    for (var i = stage.childs.length - seg.length; i < stage.childs.length; i++) {
      stage.childs[i].x = seg[stage.childs[i].selseg][0] + elem.x;
      stage.childs[i].y = seg[stage.childs[i].selseg][1] + elem.y;
    }
  }
}
save = function() {
  clearsel();
  get('save').href = stage.canvas.toDataURL()
}

function updsel() {
  if (isel) {
    for (var i = isel; i < stage.childs.length; i++) {
      var ch = stage.childs[i];
      var seg = elem._segments || elem.segments;
      if (ch.cons == KeepDraw.Circle) {
        ch.x = seg[ch.selseg][ch.selsegc] + elem.x;
        ch.y = seg[ch.selseg][ch.selsegc + 1] + elem.y;
        if (ch.line) {
          var j = (ch.selsegc > 3) ? 1 : 0;
          ch.line.x = seg[ch.selseg + j][0] + elem.x;
          ch.line.y = seg[ch.selseg + j][1] + elem.y;
          ch.line.segments[1] = [seg[ch.selseg][ch.selsegc] - seg[ch.selseg + j][0], seg[ch.selseg][ch.selsegc + 1] - seg[ch.selseg + j][1]];
        }
      }
    }
  }
}
function reset() {
for (var key in localStorage) {
delete localStorage[key];
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

window.onerror = function(msg, url, linenumber) {
        alert(
          "Error message: " +
            msg +
            "\nURL: " +
            url +
            "\nLine Number: " +
            linenumber
        );
        return true;
      };
