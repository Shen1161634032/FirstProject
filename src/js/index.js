require(['./config'],()=>{
    require(['url','template','swiper','header','footer'],(url,template,Swiper,header,footer)=>{
        class HomePage{
            constructor(){
                this.receiveData();
                this.bindEvents();
                
            }
            //接收后端数据
            receiveData(){
                $.get(url.baseUrl+'/slideShow/get',resp =>{
                    console.log(resp);
                    if(resp.res_code===200){
                        this.Apply(resp.res_body);
                    }
                })
                
            }
            //渲染轮播页面
            Apply (res){
                let html = template('ByTemplate',{res})
                $("#main-box").html(html);
                this. slideShow();
            }

            slideShow(){
                var mySwiper = new Swiper ('.swiper-container', {
                    autoplay: {
                        disableOnInteraction: false,
                        autoplay:1000
                    },
                    speed: 1500,
                    effect: 'flip',
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable :true,
                        
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                        
                    }
                })        
            }
            bindEvents () {
                console.log($('#listBox'))
                $('#listBox').on('mouseenter','.shades',function(){
                    console.log($(this))
                    $(this).css({
                        
                        opacity:0.3
                    })

                    $(this).siblings("img").css({transform:"scale(1.1)"})
                }).on('mouseleave','.shades',function(){
                    $(this).css({
                        
                        
                        opacity:0
                    })
                    $(this).siblings("img").css({transform:"scale(1)"})
                }).on('mouseenter','.listsBtn',function(){
                    $(this).css({
                        background:"#666666",
                        border:'1px solid #666666'
                    }).siblings('.shades').css({opacity:0.3}).siblings('img').css({transform:"scale(1.1)"})
                }).on('mouseleave','.listsBtn',function(){
                    $(this).css({
                        background:'',
                        border:'1px solid #fff'
                    })
                })
                
            }
        }
        new  HomePage();
    })
})