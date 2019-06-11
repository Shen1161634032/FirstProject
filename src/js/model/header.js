define(['jquery'], () => {
    class Header{
        constructor(){
            this.header = $('header');
            
            this.loadHeader().then(()=>{
                this.ul = $('#nav');
                this.select1 =$('#select1');
                this.select2 =$("#select2");
                this.select1.hide();
                this.select2.hide();
                this.bindEvents();
                this.IsLogIn();
            })
        }
        loadHeader (){
            return new Promise(resolve =>{
                this.header.load('/html/model/header.html',()=>{
                    resolve();
                })
            })
        }
        bindEvents () {
            this.header.on('mouseover', e => {
                var target = e.target;
                if(target.nodeName==='A'){
                    $(target).addClass('ac');
                    if(target.id === 'subject'){
                        this.select1.show();
                    }
                    if(target.id==='Custom'){
                        this.select2.show();
                    }
                }
            }).on('mouseout',e=>{
                var target = e.target;
                if(target.nodeName==='A'){
                    $(target).removeClass('ac');
                    if(target.id === 'subject'){
                        this.select1.hide();
                    }
                    if(target.id==='Custom'){
                        this.select2.hide();
                    } 
                } 
            })

            this.select1.on('mouseenter',function (e) {
                var target = e.target;
                $(this).show()
                console.log(this);
                console.log(target)
                if(target.nodeName==="DD"){
                    
                    $(target).addClass('ac');
                }
            }).on('mouseleave',function (e){
                var target = e.target;
                $(this).hide()
                if(target.nodeName==="DD"){
                    $(target).removeClass('ac');
                }
            })
            
            
            this.select2.on('mouseenter',function (e){
                var target = e.target;
                $(this).show();
                if(target.nodeName==="DD"){
                    $(target).addClass('ac');
                    
                }
            }).on('mouseleave',function (e){
                var target = e.target;
                $(this).hide();
                if(target.nodeName==="DD"){
                    $(target).removeClass('ac');
                }
            })
        }
        IsLogIn(){
            let a =document.cookie,

                obj={};
            
            if(a){

            
            a.split('; ').forEach((item)=>{
                var arr2 =item.split('=')
                obj[arr2[0]]=arr2[1];
            })
            
            $('#user').css({display:"block"}).children('#Name').html(obj.username);
            $('#skip').css({display:"none"});
        }
            

        }
        
    }
    return new Header
    
});