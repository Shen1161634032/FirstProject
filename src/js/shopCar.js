require(['./config'],()=>{
    require(['template','header','footer'],(template)=>{
        class ShopCar{
            constructor(){
                this.shopList=$('#shopList');
                this.n =0;
                this.sum=0;
                this.getShopList();
                
                //console.log(this.n)
            }
            //获取购物车清单
            getShopList(){
                this.detailList = localStorage.getItem('cart');
                if(this.detailList){
                    this.detailList = JSON.parse(this.detailList)
                    //console.log( this.detailList)
                    
                    this.Apply (this.detailList);
                }
            }
            //渲染页面
            Apply (res){
                let html = template('ByTemplate',{res})
                $("#shopList").html(html);
                this.bindEvents(res);
                this.CalcSum();
                
                
            }
            bindEvents(){
                //记录外层this
                let _this=this
                //减少商品按钮事件
                this.shopList.on('click',".shopSubtract",function(){
                    let shopId = $(this).parents('.shopWrap').siblings('.shopId').attr('id')
                   // console.log(shopId)
                    _this.residueData(shopId)
                    
                    if($(this).siblings('.shopNum').html()>1){
                        $(this).siblings('.shopNum').html($(this).siblings('.shopNum').html()-1);

                    }
                    _this.CalcSum();
                    //console.log($('.shopPlus'))
                    //添加商品按钮事件
                }).on('click','.shopPlus',function(){
                    let shopId = $(this).parents('.shopWrap').siblings('.shopId').attr('id')
                    let shopImgNum = Number($(this).parents('.shopWrap').siblings('.shopImg').attr('alt'));
                    let shopNum = Number($(this).siblings('.shopNum').html())
                    //console.log(shopImgNum)
                    _this.addData(shopId);
                    if(shopNum<shopImgNum){
                        $(this).siblings('.shopNum').html(Number($(this).siblings('.shopNum').html())+1);
                    }
                    _this.CalcSum();
                    //删除商品按钮事件
                }).on('click','.shopId',function(){
                    //console.log($(this).attr('id'))
                    _this.delData($(this).attr('id'))
                    $(this).parents('.shopBigBox').remove()
                    _this.CalcSum();
                    if($(this).siblings('.shopPitch').is('checked')){
                        _this.n--;
                        
                    }
                    if(_this.n==$('.shopPitch').length){
                        $('#checkAll').prop('checked',true)

                    }
                })
                //商品总价计算
                //console.log( $('.shopPitch').length)
                
                console.log(this.n)
                
                $('#checkAll').on('change',function(){
                    //console.log($(this).is(':checked'))
                    if($(this).is(':checked')){
                        $('.shopPitch').each((index,item)=>{
                            $(item).prop('checked',true)
                            
                            
                            
                        }) 
                        
                        _this.n = $('.shopPitch').length;
                        console.log(_this.n)
                    }else{
                        $('.shopPitch').each((index,item)=>{
                            $('.shopPitch').prop('checked',false)
                            
                            
                            
                        }) 
                        
                        _this.n=0;
                        
                    }
                    console.log(_this.n)
                    _this.CalcSum();
                })
                
                $('.shopPitch').each(function(){
                    console.log($(this))
                    $(this).on('change',function(){
                        if($(this).is(':checked')){
                            _this.n+=1;
                            
                            _this.CalcSum();
                            
                                
                            
                        }else{
                            _this.n-=1
                            //console.log(_this.n)
                            $('#checkAll').prop('checked',false)
                                
                            
                            _this.CalcSum();
                        }
                        console.log(_this.n)
                        _this.CalcSum();
                        if(_this.n==$('.shopPitch').length){
                            $('#checkAll').prop('checked',true)

                        }
                    })
                })

            

            }
            //减少商品数量
            residueData(shopId){
                let cartList = localStorage.getItem('cart')
                cartList = JSON.parse(cartList) 
                let i = -1;
                //遍历查看是否有相同数据
                let isExist = cartList.some((cart,index)=>{

                i=index;
                return cart.id == shopId;
                })
                if(isExist){
                    cartList[i].num -= 1;
                    localStorage.setItem('cart',JSON.stringify(cartList))
                }
                

            }
            //添加商品数量
            addData(shopId){
                let cartList = localStorage.getItem('cart')
                cartList = JSON.parse(cartList) 
                let i = -1;
                //遍历查看是否有相同数据
                let isExist = cartList.some((cart,index)=>{

                i=index;
                return cart.id == shopId;
                })
                if(isExist){
                    cartList[i].num = Number(cartList[i].num)+1;
                    localStorage.setItem('cart',JSON.stringify(cartList))
                }
                

            }
             //删除商品
            delData(shopId){
                let cartList = localStorage.getItem('cart')
                cartList = JSON.parse(cartList) 
                let i = -1;
                //遍历查看是否有相同数据
                let isExist = cartList.some((cart,index)=>{

                i=index;
                return cart.id == shopId;
                })
                if(isExist){
                    cartList.splice(i,1)
                    //console.log( cartList)
                    localStorage.setItem('cart',JSON.stringify(cartList))
                }
            
            }
            //计算总数方法
            CalcSum(){
                this.sum=0;
                this.ShopSum =0;
                this.i = 0;
                $('.shopPitch').each((index,item)=>{
                    if($(item).is(':checked')){
                        this.sum += ($(item).siblings('.shopWrap').children('.shopNum').html())*($(item).siblings('p').children('.shopUnitPrice').html())
                        this.ShopSum +=Number($(item).siblings('.shopWrap').children('.shopNum').html())
                        this.i++;  
                    }
                    
                })
                $('#shopType').html( this.i);
                $('#ShopSum').html(this.ShopSum);
                //console.log(this.sum)
                $('#sumPrice').html(this.sum) ;
            }
            
        }
        new ShopCar()
    })
})