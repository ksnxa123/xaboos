<template>
	<div>
		<div class='citySwitch'>
			<van-area 
				:area-list="areaList" 
				:visible-item-count=8
				value='210000'
				@cancel="closeCityMaskFn"
				@change="changeItemFn"
				@confirm="selectAreaBtn"
				:title="title_name" />
		</div>
	</div>
</template>

<script>
import area from '../assets/area'

export default{
	name:'selectArea',
	data(){
		return{
			msg:'选择城区组件',
			areaList:area,
			title_name:'请选择'
		}
	},
	methods:{
		closeCityMaskFn(){
			this.$emit( 'closeCityMaskFn' );
		},
		// 改变选项时触发
		changeItemFn(d){
            let _data = d.getValues();
			this.title_name = _data[0].name+'-'+_data[1].name+'-'+_data[2].name;
		},
		selectAreaBtn(d){
			this.$emit( 'closeCityMaskFn', d[1].name);
		}
	}
}
</script>

<style scoped>

</style>