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
                this.getModel();
                
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
                    //console.log(this)
                    console.log() 
                    $(this).css({
                        top:"-10px",
                        boxShadow:'0 0px 3px #ccc'
                        
                })

                }).on('mouseleave','li',function(){
                   // console.log(this)
                   
                    console.log($(this).find('.product').html())
                    this.product=$(this).find('.product').html()
                    console.log( this.product)
                    $(this).css({
                        top:"0px",
                        boxShadow:''
                    })
                })
                

            }
            getModel(){
               // console.dir(window.location);
                let 
                    model=window.location.search,
                    obj ={},
                    arr;
                model=model.slice(1);
                model=model.split('&');
              //  console.log(model);
                model.forEach(item => {
                    arr=item.split('=');
                    obj[arr[0]]=arr[1];
                });
               
                
                //console.log(obj) ;
                console.log(this.product);
                $('#titleModel').html(obj.model)
                $('.buyModel').attr('href',`http://localhost:888/html/detail.html?id=${Math.ceil(Math.random()*9)}&model=${obj.model}`)

            }
        }
        new ListShop
    })
})