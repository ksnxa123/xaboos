;
(function(win){
    var doc = win.document;
    var docEl = doc.documentElement;
    var tid;

    function refreshRem(){
        var _width = docEl.getBoundingClientRect().width;
        if(_width > 640){
            _width = 640;
        }
        var _rem = _width/6.4;
        docEl.style.fontSize = _rem + 'px';
    }

    // 页面缩放时
    win.addEventListener('resize',function(){
        clearTimeout(tid);
        tid = setTimeout(refreshRem,300);
    },false);
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    // 页面一打开就调用
    refreshRem();
})(window);