<template>
<div style="margin-top: 15px;">
  <el-input placeholder="请输入内容" v-model="value">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
      <el-option label="单曲" value="1"></el-option>
      <!-- <el-option label="歌手" value="100"></el-option>
      <el-option label="专辑" value="10"></el-option>
      <el-option label="歌单" value="1000"></el-option>
      <el-option label="用户" value="1002"></el-option> -->
    </el-select>
    <el-button slot="append" icon="search" v-on:click="searchMusic(value,select)"></el-button>
  </el-input>
       <mu-list>
            <mu-sub-header>列表</mu-sub-header>
            <mu-list-item  v-for="k,i  in songsList" :title="k.name" :key="i" v-on:click="searchMusicUrl(k.id)">
              <mu-avatar  :src="k['album']['blurPicUrl']"  slot="leftAvatar"/>
            </mu-list-item>
            <mu-divider/>
      </mu-list>
      <audio id="audioElement" controls="controls"></audio>
</div>
</template>
<script>
export default {
        name: 'hello',
        data () {
          return {
            value: '',
            select: '',
            songsList:[]
          }
        },
        computed:{
          
        },
        methods: {
          searchMusic(val,sel) {
              const _this=this;
              if(val!=''){
                    $.ajax({
                            type:"GET",
                            url:'/search',
                            data:{
                              keywords:val,
                              type:sel
                            },
                            dataType:'json',
                            success:function(resp){
                                _this.$nextTick(function(){
                                  let arr=JSON.parse(resp['data'])['result']['songs'],len=arr.length;
                                  for(let i=0;i<len;i++){
                                      _this.getSongDetail(arr[i].id,this.songsList);
                                    }
                                })
                              },
                            error:function(){
                               console.log('error')
                          }
                  })
              }
          }, 
          getSongDetail(id,arr){
              const _this=this;
              if(id!='' && arr instanceof Array){
                    $.ajax({
                          url:'/songDetail',
                          data:{
                            id: id 
                          },
                          dataType:'json',
                          success:function(resp){
                             _this.$nextTick(function(){
                                arr.push(resp['songs'][0]);
                            })
                             //key[0]['album']['blurPicUrl']
                          },
                          error:function(){
                            console.log('error');
                          }
                    })
              }
          }, 
          searchMusicUrl (val) {
            const _this=this;
              if(val!=''){
                    $.ajax({
                          url:'/musicUrl',
                          data:{
                            id:val
                          },
                          dataType:'json',
                          success:function(resp){
                              //console.log(resp['data'][0]);
                              _this.$nextTick(function(){
                                 $("#audioElement").attr("src",resp['data'][0]['url']);
                                 $("#audioElement").attr("autoplay","autoplay");
                              })
                          },
                          error:function(){
                            console.log('error');
                          }
                    })
              }
          }
        },
        mounted(){
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-select{
    width: 110px;
  }
</style>
