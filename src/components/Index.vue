<template>
  <div>

      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">
                <router-link  to="/toplist">
                  排行榜
                </router-link>
            </el-menu-item>
            <el-menu-item index="3">
                <router-link  to="/detail">
                  发现音乐
                </router-link>
            </el-menu-item>
      </el-menu>
      <!--
      <div class="line"></div>
      <el-carousel :interval="4000" type="card" height="375px">
          <el-carousel-item v-for="(value, key) in arr_pic" :key="key">
              <img v-bind:src="value" class="image">
          </el-carousel-item>
      </el-carousel>
    -->
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
   let dateFormat=()=>{
        let d=new Date();
        let day=d.getDate();
        let month=d.getMonth() + 1;
        let year=d.getFullYear();
        let cDate= year + "/" + month + "/" + day;
        return cDate;
    }
    
      return {
        arr_pic:[],
        activeIndex: '1',
        activeIndex2: '1',
        currentDate: dateFormat()
      };
    },
    methods: {
      handleSelect() {
        
      },
      cartView(){
        let _this=this;
        $.ajax({
                type:"GET",
                url:'/banner',
                dataType:'json',
                success:function(resp){
                  let arr=resp['banners'];
                  let len=arr.length;
                  for(let i=0;i<len;i++){
                    _this.arr_pic.push(arr[i]['pic'])
                  }
                  
                  //console.log(_this.arr_pic)
                  },
                error:function(){
                   console.log('error')
              }
          })
      }
    },
    mounted(){
      this.$nextTick(function (){
           this.cartView()
      })
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .time {
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
