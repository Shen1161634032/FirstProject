//定义footer
define(['jquery'],() => {
    class Footer{
        constructor(){
            this.footer = $('.footer');
            this.loadFooter().then(()=>{
                console.log(2);
            })
        }
        //向页面加载footer
        loadFooter (){
            return new Promise(resolve=>{
                this.footer.load('/html/model/footer.html',()=>{
                    resolve();
                })
            })
        }
    }
    return new Footer();
});