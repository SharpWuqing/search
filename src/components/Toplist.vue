<template>
	 
</template>

<script>
export default {
  name: 'toplist',
  data () {
    return {
         bottomNav: 'recents'
    }
},
methods:{
   handleChange (val) {
      this.bottomNav = val
    },
	topView(){
        let _this=this;
        $.ajax({
                type:"GET",
                url:'/toplist',
                dataType:'json',
                success:function(resp){
                 console.log(resp)
                  },
                error:function(){
                   console.log('error')
              }
          })
      }
},
	mounted(){
				this.$nextTick(function (){
           			this.topView()
      		})
		}
}
</script>

<style>
a{
  text-decoration: none;
}
</style>
