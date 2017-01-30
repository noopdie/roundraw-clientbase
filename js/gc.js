var run = !1;
get('run').onclick = function() {
if (!run) {
run = !0;
stage.draw = function() {
elem.x += 1;
elem.rotate(0.01);
if (elem.x > innerWidth - 500) elem.x -= 2;
}
} else {
run = !1;
stage.draw = function() {}
}
}
get('stop').onclick = function() {
run = !1;
stage.childs = [];
stage.draw = function() {}
draw();
}
