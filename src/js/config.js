require.config({
    baseUrl:"/",
    paths:{
        jquery:"libs/jquery/jquery-3.2.1.min",
        header:'js/model/header',
        footer:'js/model/footer',
        url:'js/model/url',
        template:'libs/art-template/template-web',
        swiper:'libs/swiper/js/swiper.min',
        cookie:'libs/jquery-plugins/jquery.cookie',
        etalage: 'libs/jquery-plu-etalage/jquery.etalage.min',
        fly:'libs/jquery-plugins/jquery.fly.min'
        
        
    },
      // 垫片，加载一些不满足AMD规范但是又依赖于别的模块
  // cookie插件不满足AMD并且依赖于jquery
    shim: {
        cookie: {
        deps: ['jquery']
        },
        etalage:{
            deps: ['jquery']
        },
        fly:{
            deps:['jquery']
        }
    }

})