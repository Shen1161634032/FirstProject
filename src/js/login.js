require(['./config'],()=>{
    require(['cookie','header'],(cookie,header)=>{
        class LogIn{
            constructor(){
                this.username = $('#username');
                this.password = $('#password');
                this.logInBtn = $('#logInBtn');
                console.log( this.logInBtn);
                console.log( this.username,this.password);
                this.bindEvents();
            }
            bindEvents(){
                this.logInBtn.on('click',()=>{
                    let username = this.username.val(),
                        password = this.password.val();
                        console.log(username,password)
                        console.log($.cookie('username',username,{path:'/'}))
                    if(username&&password){
                        if($.cookie('username',username,{path:'/'})&&$.cookie('password',password,{path:'/'})){
                            window.location.href='http://localhost:888';
                            $('#user').css({display:'block'}).children('#Name').html(username);
                            $('#skip').css({display:'none'});
                        }else{
                            console.log(1)
                        }
                    }else{
                       console.log(2)
                    }
                })
            }

        }
        new LogIn;
    })
})