<template>
      <!-- <div class="gridlist-demo-container">
        <mu-grid-list class="gridlist-demo">
          <mu-sub-header>toplist</mu-sub-header>
          <mu-grid-tile v-for="key, index in top_list" :key="index">
            <img :src="key.album.blurPicUrl"/>
            <span slot="title">{{key.album.name}}</span>
            <span slot="subTitle"><b>{{key.artists[0].name}}</b></span>
          </mu-grid-tile>
        </mu-grid-list>
      </div> -->
       <mu-list>
            <mu-list-item  v-for="key, index in top_list" :title="key.album.name"    :key="index">
              <mu-avatar :src="key.album.blurPicUrl" slot="leftAvatar"/>
            </mu-list-item>
      </mu-list>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
         top_list:[],
         artists:[]
    }
  },
  methods:{
    handleChange (val) {
      this.bottomNav = val
    },
    getList(){
      let _this=this;
      this.$axios.get('/top_songs').then(function(res){
        let arr=res['data']['data'];
                _this.top_list=arr;
        //console.log(_this.top_list)          
           })
    }
    
  },
  mounted () {
    this.$nextTick(function (){
           this.getList()
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
.btn{
  margin-top:15%;
}
</style>
