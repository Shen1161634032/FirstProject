require(['./config'], ()=>{
    require(['url','template','header','footer'],(url,template,header) =>{
        class ListShop {
            constructor(){
                this.btnBox = $('#btnBox');
               
                this.btnState = true ;
                
                this.bindEvents();
            }
            bindEvents(){
                this.btnBox.on('click','.btnBox-child',function(){
                    $(this).addClass('ac').siblings().removeClass('ac');

                })
                
            
            }
        }
        new ListShop
    })
})