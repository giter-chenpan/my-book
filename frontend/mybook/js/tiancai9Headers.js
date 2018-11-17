ifLogin()

function Bodyonscroll() {
    var top = $(document).scrollTop()
    var bottom = 80
    if (top > bottom) {
        $('.menu').css('padding', '0.4rem')
        $('.menu-mylogo').css('width', '2.5rem')
        $('.menu-mylogo').css('top', '.1rem')
        $('.menu-mylogo-logo').css('font-size', '.4rem')
        $('.menu-mylogo-logo').css('width', '0.6rem')
        $('.menu-mylogo-logo').css('height', '0.6rem')
        $('.menu-mylogo-title').css('font-size', '.2rem')
        $('.menu-mylogo-title').css('line-height', '0.6rem')
        $('.menu-mylogo-title').css('text-indent', '.2rem')
        $('.menu-user').css('top', '.1rem')
    } else {
        $('.menu').css('padding', '0.8rem')
        $('.menu-mylogo').css('width', '4rem')
        $('.menu-mylogo').css('top', '.2rem')
        $('.menu-mylogo-logo').css('font-size', '.8rem')
        $('.menu-mylogo-logo').css('width', '1.2rem')
        $('.menu-mylogo-logo').css('height', '1.2rem')
        $('.menu-mylogo-title').css('font-size', '.4rem')
        $('.menu-mylogo-title').css('line-height', '1.2rem')
        $('.menu-mylogo-title').css('text-indent', '.4rem')
        $('.menu-user').css('top', '.9rem')
    }
}

function ifLogin () {
    if(localStorage.tiancai9token){
        $('#UserState').css('display', 'none')
        $('.UserMymid').css('display', 'block')
    }else {
        $('#UserState').css('display', 'block')
        $('.UserMymid').css('display', 'none')    
    }
}

function UserLogout() {
    var token = window.localStorage.tiancai9token
    $.ajax({
        type: "GET",
        url: url + 'api/userlogout',
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: {},
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("tiancai9token", token);
        },
        success: function (res) {
            if(res.code == 200) {
                alert('登出成功')
                $('#UserState').css('display', 'block')
                $('.UserMymid').css('display', 'none')
                localStorage.removeItem('tiancai9token');
            } else {
                alert('登出失败')
            }
        },error:function(error){
            console.log(error);
        }
    });

    // $.ajax({
    //     method: 'GET',
    //     headers: {
    //         tiancai9token: window.localStorage.tiancai9token
    //     },
    //     url: url + 'api/userlogout',
    //     dataType:'text'
    // })
    // .then(response=>{

    // })
}