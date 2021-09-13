<template>
	<view>
		
	</view>
</template>

<script>
	export default{
		// components:{
		// 	timepicker
		// },
		data(){
			return{
				
			}
		},
		methods:{
			 toggleTab(item, index) {  
			         this.$refs.dateTime.show();  
			     },  
			     onConfirm(val) {  
			         console.log(val);  
			     }  
		}
	}
</script>

<style>
</style>
