socketOnMessage = function (msg) {
    msg.data.text().then((res) => {
        var text = res.split('&');
        if (text[0] == 'new' && (!view.wb[view.wb.length - 1] || view.wb[view.wb.length - 1].id != text[2])) {

            view.wb[view.wb.push(JSON.parse(text[3])) - 1].id = text[2];
            view.wb_[view.wb_.push(JSON.parse(text[3])) - 1].id = text[2];
            a = JSON.parse(text[3]);
            draw(transform(view.wb))
        }
        if (text[0] == 'del') {
            for (var i = 0; i < view.wb.length; i++) {
                if (view.wb[i].id == text[1]) {
                    view.wb.splice(i, 1);
                    view.wb_.splice(i, 1);
                    draw(transform(view.wb));
                }
            }
        }

        if (text[0] == 'change') {
            for (var i = 0; i < view.wb.length; i++) {
                if (view.wb[i].id == text[1]) {
                    var attrs = JSON.parse(text[2]);
                    for (var key in attrs) {
                        view.wb[i][key] = attrs[key];
                        draw(transform(view.wb));
                    }
                }
            }

        }
    });
};