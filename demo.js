var main = $('.main'),
    go = $('.go'),
    speed = 5,
    num = 0,
    timer,
    flag = true,
    colors = ['#1aab8a', '#e15650', '#121B39', '#80a84e'];
//动态创建DIV
function createDiv() {
    var oDiv = $('<div></div>');
    var index = Math.floor(Math.random() * 4);
    oDiv.attr('class', 'row');
    for (var i = 0; i < 4; i++) {
        var iDiv = $('<div></div>');
        oDiv.append(iDiv);
    }
    if (main.children().length == 0) {
        main.append(oDiv);
    } else {
        oDiv.insertBefore(main.children()[0]);
    }
    var clickDiv = $(oDiv.children()[index]);
    clickDiv.css('background-color', colors[index]);
    clickDiv.attr('class', 'i');
}
function move() {
    timer = setInterval(function () {
        var step = parseInt(main.css('top')) + speed;
        main.css('top', step + 'px');
        if (parseInt(main.css('top')) >= 0) {
            createDiv();
            main.css('top', '-150px');
        }
        var len = main.children().length;
        if (len == 6) {
            for (var i = 0; i < 4; i++) {
                if (main.children()[len - 1].children[i].className == 'i') {
                    main.css('top', '-150px');
                    alert('得分:' + num);
                    clearInterval(timer);
                    flag = false;
                }
            }
            $(main.children()[len - 1]).remove();
        }
    }, 20)
    bindEvent();
}
function bindEvent() {
    main.on('click', function (e) {
        if (flag) {
            if (e.target.className == 'i') {
                $(e.target).css('background-color','#bbb');
                  e.target.className = '';
                  num ++;
            } else {
                main.css('top','0px');
                alert('得分:' + num);
                clearInterval(timer);
                flag = false;
            }
            if(num % 10 == 0){
                speed ++;
            }
        }
    })
}
function clickStart() {
    $('a').on('click', function () {
        if (main.children().length) {
            main.html('');
        } else {
            $('a').css('display', 'none');
            move();
        }
    })
}
clickStart();