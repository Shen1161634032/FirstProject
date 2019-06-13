require(['./config'], ()=>{
    require(['fly','etalage','url','template','header','footer'],(fly,etalage,url,template,header) =>{
        class Detail{
            constructor(){
                this. receiveData();
                this.getModel();

            }
            receiveData(){
                $.get(url.baseUrl+'/list/get',resp =>{
                    
                    if(resp.res_code===200){
                        let model=window.location.search,
                            obj ={},
                            arr;
                        model=model.slice(1);
                        model=model.split('&');
                        //console.log(model);
                        model.forEach(item => {
                            arr=item.split('=');
                            obj[arr[0]]=arr[1];
                        });
                        this.id=Number(obj.id)
                        //console.log(this.id)
                        this.Apply(resp.res_body[this.id-1]);
                       // console.log(resp);
                        console.log(resp.res_body[this.id-1]);
                        this.resp =resp.res_body[this.id-1];
                        
                    }
                })
                
            }
                //渲染content页面
            Apply (res){
            let html = template('ByTemplate',{
                resp_id: res.id,
                image :res.details.image,
                describe:res.details.describe,
                intro:res.details.intro,
                price:res.details.price,
                num:res.details.num

            })
            $(".main-box").html(html);
            this.bindEvents();
            this.magnify();
                
            }
            bindEvents(){
                //修改商品个数
                $('#addData').on('click',()=>{
                    let productNum = Number($('#productNum').val()),
                        residue =($('#residue').html());
                        console.log(residue)
                        if(productNum<residue){
                            $('#productNum').val(Number($('#productNum').val())+1);
                        }else{
                            $('#productNum').val( residue);
                        }
                })
                $('#reduceData').on('click',()=>{
                    let productNum = $('#productNum').val();
                    if(productNum>1){
                        $('#productNum').val(Number($('#productNum').val())-1);
                    }else{
                        $('#productNum').val(1);
                    }
                })
                $('#appendCar').on('click',()=>{
                    //先获取当前要加入购物车的数量和数据
                    this.detail ={
                        id:this.id,
                        image:this.resp.details.image[0].image_list,
                        title:this.resp.name,
                        Residue:this.resp.details.num,
                        price:this.resp.details.price,
                        num:Number($('#productNum').val())

                    }
                    console.log(this.detail.image)
                    if($('#residue').html()>=this.detail.num){

                    
                        // 把数据存localStorage
                        // 先取出来，判断是否为空
                        let cartList = localStorage.getItem('cart')
                        if(cartList){
                        //已存过数据
                            cartList = JSON.parse(cartList) 
                        //记录下标
                            let i = -1;
                        //遍历查看是否有相同数据
                            let isExist = cartList.some((cart,index)=>{

                            i=index;
                            return cart.id === this.detail.id;
                            })
                            if(isExist){

                            //存在相同数据
                            cartList[i].num += this.detail.num;
                            }else{
                            //不存在相同数据
                            cartList.push(this.detail)
                            }
                            //用修改后的值覆盖之间的值
                            localStorage.setItem('cart',JSON.stringify(cartList))

                        }else{
                            //未存过购物车
                            localStorage.setItem('cart',JSON.stringify([this.detail]))
                        }
                        let Offset = $('#shopCarIcon').offset(),
                            img = this.detail.image,
                            flyer = $('<img class="flyer-img" src="' + img + '" style="width:30px;height:30px">'); //抛物体对象  
                        console.log(Offset)
                        console.log( $('#appendCar').offset())
                        flyer.fly({
                            start:$('#appendCar').offset(),
                            end:Offset,
                            onEnd :function(){
                                console.log(this);
                                this.destroy();
                            }
                        
                        })
                        //计算剩余库存
                        $('#residue').html($('#residue').html()-this.detail.num);
                    }
                    

                })

            }
            getModel(){
                //console.dir(window.location);
                    let model=window.location.search,
                        obj ={},
                        arr;
                    model=model.slice(1);
                    model=model.split('&');
                    //console.log(model);
                    model.forEach(item => {
                        arr=item.split('=');
                        obj[arr[0]]=arr[1];
                    });
                    //console.log(obj) ;
                    $('#titleModel').html(obj.model);
                    $('.buyModel').attr('href',`http://localhost:888/html/shopList.html?model=${obj.model}`)
                    
                }
            magnify(){
                $(document).ready(function(){

                    $('#etalage').etalage({
                        thumb_image_width: 400,
                        thumb_image_height: 400,
                        source_image_width: 900,
                        source_image_height: 1200,
                        show_hint: true,
                        click_callback: function(image_anchor, instance_id){
                            alert('回调函数:\nYou clicked on an image with the anchor: "'+image_anchor+'"\n(in Etalage instance: "'+instance_id+'")');
                        }
                    });
                })
            }
            
        }
        new Detail();
    })
})