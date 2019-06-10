require(['./config'], ()=>{
    require(['url','template','header','footer'],(url,template,header) =>{
        class ListShop {
            constructor(){
                this.btnBox = $('#btnBox');
                this.receiveData();
                this.ul = $('#Content')
                console.log(this.ul)
                this.filtrateWrap =  $('#filtrateWrap');
                
            }
            //接收后端数据
            receiveData(){
                $.get(url.baseUrl+'/list/get',resp =>{
                    if(resp.res_code===200){
                        this.Apply(resp.res_body);
                        console.log(resp);
                    }
                })
                
            }
            //渲染content页面
            Apply (res){
                let html = template('ByTemplate',{res})
                $(".main-content").html(html);
                this.bindEvents();

                
            }
            bindEvents(){
                this.btnBox.on('click','.btnBox-child',function(){
                    $(this).addClass('ac').siblings().removeClass('ac');

                })
                
                $('#filtrateWrap').on('click','.navSelectBtn',function(){
                $(this).siblings().fadeToggle();
                }).on('mouseenter','.navSelectBtn',function(){
                    $(this).css({background:'orange'})
                }).on('mouseleave','.navSelectBtn',function(){
                    $(this).css({background:''})
                })
                this.ul.on('mouseenter','li',function(){
                    console.log(this)
                    $(this).css({top:"-10px"})
                }).on('mouseleave','li',function(){
                    console.log(this)
                    $(this).css({top:"0px"})
                })
            }
        }
        new ListShop
    })
})