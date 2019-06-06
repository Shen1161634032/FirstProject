require(['./config'], ()=>{
    require(['url','template','header','footer'],(url,template,header) =>{
        class ListShop {
            constructor(){
                this.btnBox = $('#btnBox');
                console.log( $('.navSelectBtn'));
                this.bindEvents()
                this.filtrateWrap =  $('#filtrateWrap');
                
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
            }
        }
        new ListShop
    })
})