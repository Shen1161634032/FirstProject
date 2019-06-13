require(['./config'],()=>{
    require(['cookie','header'],(cookie,header)=>{
        class LogOn{
            constructor(){
                this.bindEvents()  
            }

            bindEvents(){
                console.log($('#logonBtn'))
                $('#logonBtn').on('click',()=>{
                    if($('#username').val()&&$('#password').val()&&$('#IsPassword').val()){
                        if($('#password').val()===$('#IsPassword').val()){
                            //取出cookie
                            var userSets = $.cookie('logon');
                            //如果注册过账户
                                if(userSets){
                                    userSets =JSON.parse(userSets)
                                    userSets.push({
                                        username:$('#username').val(),
                                        password:$('#password').val()
                                    })
                                }else{
                                    //如果未注册过
                                    userSets=[
                                        {
                                            username:$('#username').val(),
                                            password:$('#password').val()
                                        }
                                    ]
                                }
                                $.cookie('logon',JSON.stringify(userSets),{
                                    path:'/'
                                })
                                window.location.href ='http://localhost:888/html/login.html'
                            // var userSets = {
                            //     logon:[
                            //         {
                            //             username:$('#username').val(),
                            //             password:$('#password').val()
                            //         }
                            //     ]
                            // } 
                            
                        }else{
                            alert('两次密码不一致')
                        }
                    }else{
                        alert('请输入完整的数据')
                        
                    } 
                })
            
            }
        }
        new LogOn;
    })
})