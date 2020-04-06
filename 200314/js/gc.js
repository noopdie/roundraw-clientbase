var run = !1;
var curX = 0;
var curY = 0;
document.onmousemove = function(e) {
curX = e.clientX, curY = e.clientY;
for (var i=0; i < funcs.length; i++) {
if (get('frd'+i)) get('frd'+i).value = funcs[i][2] = get('rd'+i).value;
if (get('fsx'+i)) get('fsx'+i).value = funcs[i][2] = get('sx'+i).value;
if (get('fsy'+i)) get('fsy'+i).value = funcs[i][3] = get('sy'+i).value;
if (get('fscx'+i)) get('fscx'+i).value = funcs[i][2] = get('scx'+i).value;
if (get('fscy'+i)) get('fscy'+i).value = funcs[i][3] = get('scy'+i).value;
}
}
var funcs = [];
var imgs = [new KeepDraw.Image({
	width: 50,
	height: 50,
	y: -25,
	x: -25,
	src: 'img/rotate.svg'
}),
new KeepDraw.Image({
	width: 50,
	height: 50,
	y: -25,
	x: -25,
	src: 'img/move.svg'
}),
new KeepDraw.Image({
	width: 50,
	height: 50,
	y: -25,
	x: -25,
	src: 'img/curmove.svg'
})];
var utils = [function(elem, deg, x, y) {
elem.rotate(deg, x, y);
},
function(elem, sx, sy, seg) {
if (seg) {
seg = elem._segments[seg - 1] || elem.segments[seg - 1];
seg[0] += sx * 1;
seg[1] += sy * 1;
} else {
elem.x += sx * 1;
elem.y += sy * 1;
}
},
function(elem, sx, sy, seg, x, y) {
if (seg) {
seg = elem._segments[seg - 1] || elem.segments[seg - 1];
seg[0] = curX - elem.x;
seg[1] = curY - elem.y;
} else {
elem.x += ((curX - x) - elem.x) * (sx / 100);
elem.y += ((curY - y) - elem.y) * (sy / 100);
}
}];
var actinit = [
function(point, act) {
point.x = act[3] + elem.x;
point.y = act[4] + elem.y;
},
function (point, act) {

if (act[4]) {
var seg = elem.segments[act[4] - 1];
point.x = seg[0] + elem.x;
point.y = seg[1] + elem.y;
point.color = 'white';
point.strokeColor = 'black';
point.strokeWidth = 2;
} else {
var c = elem.center();
point.x = c[0] + elem.x;
point.y = c[1] + elem.y;
}
},
function (point, act) {
if (act[4]) {
var seg = elem.segments[act[4] - 1];
point.x = seg[0] + elem.x;
point.y = seg[1] + elem.y;
point.color = 'white';
point.strokeColor = 'black';
point.strokeWidth = 2;
} else {
if (!act[6]) {
var c = elem.center();
point.x = c[0] + elem.x;
point.y = c[1] + elem.y;
act[5] = c[0];
act[6] = c[1];
} else {
point.x = act[5] + elem.x;
point.y = act[6] + elem.y;
}
}
}
]
var actmove = [
function(e) {
if (funcs[selact.act][0] >= 0) get('t' + selact.act).childNodes[0].classList.add('selt');
	elem.acts[selact.act][3] = e.clientX - elem.x;
	elem.acts[selact.act][4] = e.clientY - elem.y;
},
function(e) {
var seg = elem._segments || elem.segments;
var act = elem.acts[selact.act];
for (var i = 0; i < seg.length; i++) {
if (KeepDraw.getIntersection(selact, seg[i][0] + elem.x, seg[i][1] + elem.y)) {
selact.color = 'white';
selact.strokeColor = 'black';
selact.strokeWidth = 2;
act[4] = i + 1;
}
}
if (act[4]) {
if (!KeepDraw.getIntersection(selact, seg[act[4] - 1][0] + elem.x, seg[act[4] - 1][1] + elem.y)) {
selact.color = !1;
selact.strokeColor = !1;
selact.strokeWidth = !1;
act[4] = !1;
}
}
},
function(e) {
var seg = elem._segments || elem.segments;
var act = elem.acts[selact.act];
act[5] = e.clientX - elem.x;
act[6] = e.clientY - elem.y;
for (var i = 0; i < seg.length; i++) {
if (KeepDraw.getIntersection(selact, seg[i][0] + elem.x, seg[i][1] + elem.y)) {
selact.color = 'white';
selact.strokeColor = 'black';
selact.strokeWidth = 2;
act[4] = i + 1;
}
}
if (act[4]) {
if (!KeepDraw.getIntersection(selact, seg[act[4] - 1][0] + elem.x, seg[act[4] - 1][1] + elem.y)) {
selact.color = !1;
selact.strokeColor = !1;
selact.strokeWidth = !1;
act[4] = !1;
}
}
}
];
get('run').onclick = function() {
clearsel();
if (!run) {
run = !0;
stage.draw = function() {
for (var i = 0; i < funcs.length; i++) {
if (funcs[i][0] >= 0) utils[funcs[i][0]](stage.childs[funcs[i][1]], funcs[i][2], funcs[i][3], funcs[i][4], funcs[i][5], funcs[i][6]);
}
}
} else {
run = !1;
stage.draw = function() {}
}
get('run').style.backgroundImage = (run) ? 'url(img/pause.svg)' : 'url(img/play.svg)';
}
get('stop').onclick = function() {
run = !1;
stage.childs = [];
stage.draw = function() {}
draw();
for (var i = 0; i < funcs.length; i++) {
var elem = stage.childs[funcs[i][1]];
if (!elem.acts) elem.acts = [];
elem.acts.push(funcs[i]);
}
get('run').style.backgroundImage = 'url(img/play.svg)';
}
get('rotate').onclick = function() {
var c = elem.center();
var act = [0, elem.index, 2, c[0], c[1]];
funcs.push(act);
if (!elem.acts) elem.acts = [];
elem.acts.push(act);
stage.childs.length -= stage.childs.length - isel;
stage.events.mousedown = [];
brushesup();
var id = funcs.length - 1;
var tab = document.createElement('div');
tab.id = 't' + id;
tab.classList.add('tab');
tab.innerHTML = "<div class='ttab'>Rotation<a id='d" + id + "' class='del'>X</a></div><input id='rd" + id + "' max='90' min='-90' type='range' step='0.01' value='2'><div class='deg'><input id='frd" + id + "' type='number' value='2'></div></div>";
get('panel').appendChild(tab);
get('d' + id).onmousedown = function() {
funcs[id][0] = -1;
clearsel();
get('t' + id).remove();
}
get('frd'+id).oninput = function() {
console.log('a');
funcs[id][2] = get('rd'+id).value = get('frd'+id).value;
};
}

get('move').onclick = function() {
var act = [1, elem.index, 2, 0, 0];
funcs.push(act);
if (!elem.acts) elem.acts = [];
elem.acts.push(act);
stage.childs.length -= stage.childs.length - isel;
stage.events.mousedown = [];
brushesup();
var id = funcs.length - 1;
var tab = document.createElement('div');
tab.id = 't' + id;
tab.classList.add('tab');
tab.innerHTML = "<div class='ttab'>Move<a id='d" + id + "' class='del'>X</a></div><input id='sx" + id + "' max='100' min='-100' type='range' step='0.01' value='2'><div class='speedx'><input id='fsx" + id + "' type='number' value='2'></div><input id='sy" + id + "' max='100' min='-100' type='range' step='0.01' value='2'><div class='speedy'><input id='fsy" + id + "' type='number' value='2'></div></div>";
get('panel').appendChild(tab);
get('d' + id).onmousedown = function() {
funcs[id][0] = -1;
clearsel();
get('t' + id).remove();
}
get('fsx'+id).oninput = function() {
console.log('a');
funcs[id][2] = get('sx'+id).value = get('fsx'+id).value;
};
get('fsy'+id).oninput = function() {
console.log('a');
funcs[id][3] = get('sy'+id).value = get('fsy'+id).value;
};
}
get('curmove').onclick = function() {
var act = [2, elem.index, 2, 0, 0];
funcs.push(act);
if (!elem.acts) elem.acts = [];
elem.acts.push(act);
stage.childs.length -= stage.childs.length - isel;
stage.events.mousedown = [];
brushesup();
var id = funcs.length - 1;
var tab = document.createElement('div');
tab.id = 't' + id;
tab.classList.add('tab');
tab.innerHTML = "<div class='ttab'>Move to cursor<a id='d" + id + "' class='del'>X</a></div><input id='scx" + id + "' max='100' type='range' step='0.01' value='2'><div class='speedx'><input id='fscx" + id + "' type='number' value='2'></div><input id='scy" + id + "' max='100' type='range' step='0.01' value='2'><div class='speedy'><input id='fscy" + id + "' type='number' value='2'></div></div>";
get('panel').appendChild(tab);
get('d' + id).onmousedown = function() {
funcs[id][0] = -1;
clearsel();
get('t' + id).remove();
}
get('fscx'+id).oninput = function() {
console.log('a');
funcs[id][2] = get('scx'+id).value = get('fscx'+id).value;
};
get('fscy'+id).oninput = function() {
console.log('a');
funcs[id][3] = get('scy'+id).value = get('fscy'+id).value;
};
}
document.addEventListener('mouseup', function() {
for (var i = 0; i < funcs.length; i++) {
if (funcs[i][0] >= 0) get('t'+i).childNodes[0].classList.remove('selt');
}
});
