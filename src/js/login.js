require(['./config'],()=>{
    require(['cookie','header'],(cookie,header)=>{
        class LogIn{
            constructor(){
                this.bindEvents()
            }
            bindEvents(){
                console.log($('#logInBtn'))
                $('#logInBtn').on('click',()=>{
                    if($('#username').val()&&$('#password').val()){
                        
                            //取出cookie
                            var userSets = $.cookie('logon');
                            //如果注册过账户
                                if(userSets){
                                    userSets =JSON.parse(userSets)
                                    console.log(userSets)
                                    var IsLogin = userSets.some(element => {
                                        console.log(element)
                                        console.log( element.username==$('#username').val()&&element.password==$('#password').val())
                                        return  (element.username==$('#username').val()&&element.password==$('#password').val())
                                    });
                                    console.log(IsLogin)
                                    if(IsLogin){
                                        $.cookie('login',JSON.stringify({
                                            username: $('#username').val(),
                                            password:$('#password').val()
                                        }),{
                                            path:'/'
                                        })
                                        window.location.href ='http://localhost:888/'
                                    }else{
                                        alert('账号或密码不正确')
                                    }
                                }else{
                                    alert('账号或密码不正确') 
                                }
                                
                            
                        
                            
                    
                    }else{
                        alert('请输入完整的数据')
                        
                    } 
                })
            }

        }
        new LogIn;
    })
})