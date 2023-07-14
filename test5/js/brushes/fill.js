brush.fill = [
    function (x, y) {
        var iw = innerWidth / 2 * devicePixelRatio;
        var ih = innerHeight / 2 * devicePixelRatio;
        var wb = JSON.parse(JSON.stringify(view.wb));
        for (var i = 0; i < wb.length; i++) {
            var seg = wb[i].segments;
            for (var k = 0; k < wb[i].segments.length; k++) {
                for (var l = 0; l < wb[i].segments[k].length; l++) {
                    wb[i].segments[k][l] += (l % 2 == 0) ? -(-wb[i].x - iw) : -(- wb[i].y - ih);
                }
            }
            wb[i].x = -iw;
            wb[i].y = -ih;
        }
        var drawing = [];
        pts = [];
        for (var i = 0; i < wb.length; i++) {
            var segi = wb[i].segments;
            var p = selfIntersection(wb[i]);

            if (p.length != 0) {
                for (s = 1; s < p.length; s++) {
                    var sm = (s == 0) ? p.length - 1 : s - 1;
                    var sprout = false;
                    var l1 = p[sm][2] < p[sm][3];
                    var l2 = p[s][2] > p[s][3];
                    var si1 = (l1) ? p[sm][2] : p[sm][3];
                    var si2 = (l2) ? p[s][3] : p[s][2];
                    var sk2 = (!l1) ? p[sm][2] : p[sm][3];
                    var sk1 = (!l2) ? p[s][3] : p[s][2];
                    var rev = sk1 > sk2;
                    for (var m = s; m < p.length; m++) {
                        if (m != s - 1) {
                            var mrev = si1 > sk2;
                            var m1 = (!mrev) ? si1 : sk2;
                            var m2 = (!mrev) ? sk2 : si1;
                            if (p[m][2] >= m1 && p[m][2] <= m1) sprout = true;
                            if (p[m][3] >= m1 && p[m][3] <= m2) sprout = true;
                            break;
                        }
                    }
                    if (sprout) {
                        var cuti = segi.slice(si1, si2);
                        var cutk = segi.slice(sk1, sk2);
                        if (rev) cutk = segi.slice(sk2, sk1);
                        cutk = (rev) ? cutk.reverse() : cutk;
                        cuti.unshift([p[sm][0] + iw, p[sm][1] + ih])
                        cuti.push([p[s][0] + iw, p[s][1] + ih])
                        var cut = cuti.concat(cutk);
                        drawing.push({
                            x: -iw,
                            y: -ih,
                            segments: cut,
                            closed: true,
                        });
                    } else {
                        var l = p[s][2] < p[s][3];
                        var si = (l) ? p[s][2] : p[s][3];
                        var sk = (l) ? p[s][3] : p[s][2];
                        var cut = segi.slice(si, sk);
                        if (segi[si - 1][5]) cut.unshift([p[s][0] + iw, p[s][1] + ih, segi[si - 1][2], segi[si - 1][3], segi[si - 1][4], segi[si - 1][5]]);
                        else if (segi[si - 1][3]) cut.unshift([p[s][0] + iw, p[s][1] + ih, segi[si - 1][2], segi[si - 1][3]]);
                        cut.push([p[s][0] + iw, p[s][1] + ih])
                        drawing.push({
                            x: -iw,
                            y: -ih,
                            segments: cut,
                            closed: true,
                            color: 'transparent',
                            strokeColor: 'transparent'
                        });
                    }
                }
                if (true) {
                    var s = (sprout && wb[i].segments.length > 30) ? p.length - 1 : 0;
                    var l = p[s][2] < p[s][3];
                    var si = (l) ? p[s][2] : p[s][3];
                    var sk = (l) ? p[s][3] : p[s][2];
                    var cut = segi.slice(si, sk);
                    if (segi[si - 1][5]) cut.unshift([p[s][0] + iw, p[s][1] + ih, segi[si - 1][2], segi[si - 1][3], segi[si - 1][4], segi[si - 1][5]]);
                    else if (segi[si - 1][3]) cut.unshift([p[s][0] + iw, p[s][1] + ih, segi[si - 1][2], segi[si - 1][3]]);
                    cut.push([p[s][0] + iw, p[s][1] + ih]);
                    drawing.push({
                        x: -iw,
                        y: -ih,
                        segments: cut,
                        closed: true,
                        color: 'transparent',
                        strokeColor: 'transparent'
                    });
                }
            }

            for (var k = i; k < wb.length; k++) {
                var segk = wb[k].segments;
                if (i != k) {
                    var p = intersection(wb[i], wb[k]);
                    if (p.length > 0) {
                      for (var m = 0; m < p.length; m++) {
                       // pts.push([i, k, p[m]]);
                      }
                      pts.push([i, k, p[p.length-1]]);
                    } 
                    for (var s = 1; s < p.length; s++) {
                        var si1 = p[s - 1][2];
                        var sk1 = p[s - 1][3];

                        var si2 = p[s][2];
                        var sk2 = p[s][3];

                        var cuti1 = (si1 < si2) ? si1 : si2;
                        var cuti2 = (si1 > si2) ? si1 : si2;
                        var cutk1 = (sk1 < sk2) ? sk1 : sk2;
                        var cutk2 = (sk1 > sk2) ? sk1 : sk2;
                        var cuti = segi.slice(cuti1, cuti2);
                        var cutk = segk.slice(cutk1, cutk2);
                        var rev = (sk1 < sk2) ? true : false;
                        var end1 = p[s];
                        var end2 = p[s - 1];
                        if (!rev) {
                            end1 = p[s - 1];
                            end2 = p[s];
                        }
                        for (var ci = 0; ci < cuti.length; ci++) {
                            for (var key in cuti[ci]) {
                                cuti[ci][key] += (key % 2 == 0) ? wb[i].x + iw : wb[i].y + ih;
                            }
                        }
                        for (var ck = 0; ck < cutk.length; ck++) {
                            for (var key in cutk[ck]) {
                                cutk[ck][key] += (key % 2 == 0) ? wb[k].x + iw : wb[k].y + ih;
                            }
                        }
                        if (!rev) cuti.unshift([end1[0] + iw, end1[1] + ih]);
                        else cuti.push([end1[0] + iw, end1[1] + ih]);
                        cutk.unshift([end2[0] + iw, end2[1] + ih]);
                        if (rev) {
                            cuti = cuti.reverse();
                            //cuti[0] = [cuti[0][0], cuti[0][1], cuti[cuti.length-1][2], cuti[cuti.length-1][3]];
                            for (var l = 1; l < cuti.length; l++) {
                                var cutil = JSON.parse(JSON.stringify(cuti[l]));
                                if (cutil[5]) {
                                    var l2 = cutil[2]
                                    var l3 = cutil[3]
                                    //cuti[l] = [cutil[0], cutil[1], cuti[l-1][4], cuti[l-1][5], cuti[l-1][2], cuti[l-1][3]];
                                    cuti[l - 1] = [cuti[l - 1][0], cuti[l - 1][1], cutil[4], cutil[5], l2, l3];
                                } else if (cutil[3]) {
                                    var l2 = cutil[2]
                                    var l3 = cutil[3]
                                    cuti[l - 1] = [cuti[l - 1][0], cuti[l - 1][1], l2, l3];
                                }
                            }
                        }
                        var cut = cutk.concat(cuti);
                        drawing.push({
                            x: -iw,
                            y: -ih,
                            segments: cut,
                            closed: true,
                            color: 'transparent',
                            strokeColor: 'transparent'
                        });

                    }

                }
            }
        }
        ch = (pts[0]) ? [[pts[0]]] : [];
        pts.splice(0, 1);
        var k = 0;
        if (ch[0]) {
            loop1: while (true) {
                var go = false;
                loop2: for (var i = 0; i < pts.length; i++) {
                    var a = ch[k][ch[k].length - 1];
                    var b = pts[i];

                    if (a[0] == b[0] || a[1] == b[1] || a[0] == b[1] || a[1] == b[0]) {
                        go = true;
                        ch[k].push(b);
                         if (ch[k].length > 2) pts.splice(i, 1);
                        break loop2;
                    }
                }
                if (!go) {
                    var a = ch[k][ch[k].length - 1];
                    var b = ch[k][0];
                    if (!(a[0] == b[0] || a[1] == b[1] || a[0] == b[1] || a[1] == b[0]) || ch[k].length < 3) {
                        if (!pts[0]) break loop1;
                        else ch.push(pts.splice(0, 1))
                    } else {
                        if (pts[0]) {
                            ch.push(pts.splice(0, 1));
                            k = ch.length - 1;
                        } else break loop1;
                    }
                }
            }
            for (var i = 0; i < ch.length; i++) { //the number of polygons
                var cut = [];
                for (var k = 0; k < ch[i].length; k++) { //the number of facets in polygon
                    var ni, nk, n; //n is index of shape in viewboard
                    var chi = ch[i][(k == 0) ? ch[i].length - 1 : k - 1]; //first intersecting facet
                    var chk = ch[i][k]; //second intersecting facet
                    //chi and chk is intersecting ponts and it`s facets at once. It`s becuse yet unclear, to which facet point is belonging to.     I think that facets are defined fine, but not intersections.
                    if (chk[0] == chi[0]) n = chi[0], ni = 2, nk = 2;
                    if (chk[1] == chi[1]) n = chi[1], ni = 3, nk = 3;
                    if (chk[1] == chi[0]) n = chi[0], ni = 2, nk = 3;
                    if (chk[0] == chi[1]) n = chi[1], ni = 3, nk = 2;
                    if (wb[n]) {
                    var nsi = chi[2][ni];
                    var nsk = chk[2][nk];
                    var n1 = (nsi < nsk) ? nsi : nsk;
                    var n2 = (nsi > nsk) ? nsi : nsk;
                    var rev = (nsi > nsk) ? true : false;

                    var seg = wb[n].segments.slice(n1, n2);
                    if (rev) {
                        seg = seg.reverse();
                        //cuti[0] = [cuti[0][0], cuti[0][1], cuti[cuti.length-1][2], cuti[cuti.length-1][3]];
                        for (var l = 1; l < seg.length; l++) {
                            var segl = JSON.parse(JSON.stringify(seg[l]));
                            if (segl[5]) {
                                var l2 = segl[2]
                                var l3 = segl[3]
                                //cuti[l] = [cutil[0], cutil[1], cuti[l-1][4], cuti[l-1][5], cuti[l-1][2], cuti[l-1][3]];
                                seg[l - 1] = [seg[l - 1][0], seg[l - 1][1], segl[4], segl[5], l2, l3];
                            } else if (segl[3]) {
                                var l2 = segl[2]
                                var l3 = segl[3]
                                seg[l - 1] = [seg[l - 1][0], seg[l - 1][1], l2, l3];
                            }
                        }
                    }
                    cut = cut.concat(seg);
                    var e1 = (nsi < nsk) ? chi[2] : chk[2];
                    var e2 = (nsi > nsk) ? chi[2] : chk[2];
                    var end1 = (rev) ? e2 : e1;
                    var end2 = (rev) ? e1 : e2;
                    //cut.unshift([end1[0]+iw, end1[1]+ih])
                    cut.push([end2[0] + iw, end2[1] + ih])
                }
                }

                drawing.push({
                    x: -iw,
                    y: -ih,
                    segments: cut,
                    closed: true,
                    color: 'transparent',
                    strokeColor: 'transparent'
                });
            }
        }
        //socket.send('new&Line&' + Math.random().toString(16).slice(2) + '&' + JSON.stringify(drawing[0]));
        var sel = draw(transform(drawing, { x: view.x, y: view.y, deg: view.deg, zoom: view.zoom, wb_: JSON.parse(JSON.stringify(drawing)) }), tctx, x, y);
        if (sel[0]) {
            var area = Infinity;
            var i;
            for (var o = 0; o < sel.length; o++) {
                var calc = calcPolygonArea(sel[o]);
                if (calc < area) area = calc, i = o;
            }
            sel[i].color = ls.color;
            sel[i].strokeColor = ls.color;
            sel[i].strokeWidth = ls.pencilWidth;
            var id = Math.random().toString(16).slice(2);
            sel[i].id = id;
            var obj = detransform([sel[i]])[0]
            view.wb.push(obj);
            var trace = JSON.stringify(obj);
            view.wb_.push(JSON.parse(trace));
            mine.push(id);
            draw(transform(view.wb));
            socket.send('new&Line&' + id + '&' + trace);
        } else {
            for (var i = 0; i < drawing.length; i++) {
                drawing[i].strokeColor = 'hsla(' + (Math.random() * 360) + ', 100%, 50%, 0.5)';
                drawing[i].color = 'rgba(0,255,0,0.3)';
                drawing[i].strokeWidth =  Math.random() * 50 + 3;
            }
            draw(transform(drawing, { x: view.x, y: view.y, deg: view.deg, zoom: view.zoom, wb_: JSON.parse(JSON.stringify(drawing)) }), tctx, x, y);
        }
    }
    ,
    function (x, y) {

    },
    function () {
        var sel = readings.selFill;

        tctx.clearRect(0, 0, (innerWidth * devicePixelRatio), (innerHeight * devicePixelRatio));
    }
];