require(['./config'], ()=>{
    require(['etalage','url','template','header','footer'],(etalage,url,template,header) =>{
        class Detail{
            constructor(){
                this. receiveData();

            }
            receiveData(){
                $.get(url.baseUrl+'/list/get',resp =>{
                    if(resp.res_code===200){
                        this.Apply(resp.res_body[0]);
                        console.log(resp);
                        
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
            
            this.magnify();
                
            }
            magnify(){
                $(document).ready(function($){

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