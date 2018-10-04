  Page({
    /**
     * 页面的初始数据
     */
    data: {
      //加载提示
      hidden:true,
      //搜索页数
      count:1,
      //产品列表
      productArr:[],
      //窗口可视距离
      clientHeight:0,
      //控制图片显示（true|false）
      arr:[],
      //图片的高
      arrHeight:[]
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var _this = this;
      //获取系统信息（窗口）
      wx.getSystemInfo({
        success: function(res) {
          //保存当前可视文档高度
          _this.setData({
            clientHeight:res.windowHeight
          });
        }
      })
        wx.request({
          url: 'https://h5.watsons.com.cn/activity/specials/info?count=${_this.data.count}0&id=774&count=&device_id=bdba9f30-c2ba-11e8-a086-85fd076d8103',
          method:'GET',
          header:{
            'Content-Type':'application/json'
          },
          success:function(res){
           //页面加载提示
           _this.setData({
             hidden:false
           })

          //处理数据
          //用来控制（true|false）
          let arr = [];
          //数据源
          let Datalength = res.data.data.specials_item_v_o_s.length;
          // 元素高度
          let arrHeight = [] ;
          for(let i=0;i<Datalength;i++){
            // 有多少条数据就生成多少false，以便控制好每一个元素
            arr[i] = false ;
            // 向下取整（i/2）因为可视宽有俩排数据，因需求而定 * （320/750）可视宽除文档高 * demo元素的高度，因为我这里设定了520高
            arrHeight[i] = Math.floor(i/2) * (320/750) * 520 ;
            //更改的数据重新保存到data中
            _this.setData({
              arr:arr,
              productArr:res.data.data.specials_item_v_o_s,
              arrHeight:arrHeight
            })
          }
          
          //数据加载完毕取消提示框
          _this.setData({
            hidden:true
          })
          }
        })
    },  

      //滚动

      scroll:function(e){
        //可视文档高度
       let seeHeight = this.data.clienHeight;
       //图片区域元素高度
       let arrHeight = this.data.arrHeight;
       //滚动距离Top
       let scrollTop = e.detail.scrollTop;
      //  获取arr
       let arr = this.data.arr;
       for(var i=0;i<this.data.productArr.length;i++){
         
         if(arrHeight[i] <=  scrollTop){
           //因为上面设置了arr为全为默认false,这里取上i元素相同并且 是false 那么就为true，则显示
           if(arr[i] == false){
             arr[i] = true;
           }
         }
      
       }
       //重新提交状态，让页面重新渲染真值
       this.setData({
         arr:arr
       })
      },
  })