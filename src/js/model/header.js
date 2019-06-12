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
                this.getData();
            })
        }
        loadHeader (){
            return new Promise(resolve =>{
                this.header.load('/html/model/header.html',()=>{
                    resolve();
                })
            })
        }
        getData(){
            $('#header-search-form-text').on('keydown',function(){
                var stockPile =$('#header-search-form-text').val();
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${stockPile}&cb=?` ,
                    function (returnData) {
                        var arr =returnData.s;
                        $('#select').html('');
                        arr.forEach(item=>{
                            $('<li/>').html(item).on('mouseenter',function(){
                                $(this).css({background:'#ccc'})
                            }).on('mouseleave',function(){
                                $(this).css({background:''})
                            }).on('mousedown',function(){
                                $('#header-search-form-text').val( $(this).html()) 
                            }).appendTo($('#select'))
                        })
                    }
                );
            }) 
            $('#header-search-form-text').on('focus',function(){
                var stockPile =$('#header-search-form-text').val();
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${stockPile}&cb=?` ,
                    function (returnData) {
                        var arr =returnData.s;
                        $('#select').html('');
                        arr.forEach(item=>{
                            $('<li/>').html(item).on('mouseenter',function(){
                                $(this).css({background:'#ccc'})
                            }).on('mouseleave',function(){
                                $(this).css({background:''})
                            }).on('mousedown',function(){
                                $('#header-search-form-text').val( $(this).html()) 
                            }).appendTo($('#select'))
                        })
                    }
                );
            }) 
            $('#header-search-form-text').on('blur',function(){
                var stockPile =$('#header-search-form-text').val();
                $.getJSON(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${stockPile}&cb=?` ,
                    function (returnData) {
                        $('#select').html('')
                    }
                );
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