<template>
  <div>
    <!-- header -->
    <van-sticky>
        <van-nav-bar class='bar_sty' left-text="web前端">
            <van-icon @click="jobStateOpen" name="plus" slot="right" />
            <van-icon name="search" slot="right" />
        </van-nav-bar>

        <div class='title_menu'>
            <van-button class='miniBtn' size="mini" @click='notifyFnBtn'>推荐</van-button>
            <van-button class='miniBtn' size="mini" @click='notifyFnBtn'>最新</van-button>

            <van-button class='filterBtn' size="mini" @click="openFilterMaskFn">筛选</van-button>
            <van-button class='filterBtn' size="mini" @click="openMaskFn">{{defaultCity}}</van-button>
        </div>
    </van-sticky>

	<!-- 城市操作 -->
	<div v-show='is_cityMaskObj' 
		:class='maskClassName'
		@touchmove.prevent
		@mousewheel.prevent>
		<selectArea @closeCityMaskFn='hideMaskFn($event)'></selectArea>
	</div>

	<!-- 管理求职意向 -->
	<div v-show='is_jobState'
		:class='jobStateClassName'
		@touchmove.prevent
		@mousewheel.prevent>
			<jobState @closeJobStateFn='jobStateClose'></jobState>
	</div>

	<!-- 筛选功能 -->
	<div v-show='is_filter' 
		:class='filterClassName'
		@touchmove.prevent
		@mousewheel.prevent>
			<filterWrapObj @closeFilterWrap="closeFilterMask"></filterWrapObj>
	</div>

    <!-- notify提示组件 -->
    <notify v-show='notifyShow'></notify>

    <!-- 职位列表 -->
    <div>
		<!-- 下拉 刷新 -->
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <job_item v-for="(n,inx) in jobsData" :key="inx" :itemObj=n></job_item>
		</van-pull-refresh>
    </div>

      <!-- 底部菜单 -->
    <footer_bar></footer_bar>
  </div>
</template>

<script>
import footer_bar from './footer_bar';
import job_item from './job_item';
import notify from './notify';
import filterWrapObj from './filterWrapObj';
import selectArea from './selectArea';
import jobState from './jobState';

export default {
    name:'jobList_index',
	data(){
		return{
            msg:'职位列表',
            notifyShow:false,
			isLoading: false,
			defaultCity:'城市',
			is_cityMaskObj:false,
			// 筛选的class
			filterClassName:'mask_filter',
			is_filter:false,
			// 查找城市的class
			maskClassName:'mask_a',
			// 求职状态
			is_jobState:false,
			// 求职的class
			jobStateClassName:'mask_animation',
			jobsData:[{
				title:'web前端',
				h2_txt:'什么祥 未融资',
				area:['沈阳 和平区','经验不限','本科'],
				hr:{
					img_avatar:'',
					hr_txt:'海峰-招聘者'
				},
				salary:'5-6K'
			},{
				title:'软件开发工程师',
				h2_txt:'牛万科技 未融资',
				area:['沈阳 沈河区','1-3年','学历不限'],
				hr:{
					img_avatar:'',
					hr_txt:'海峰-招聘者'
				},
				salary:'3-8K'
			},{
				title:'前端工程师',
				h2_txt:'成林健康科技 未融资',
				area:['沈阳 皇姑区','经验不限','本科'],
				hr:{
					img_avatar:'',
					hr_txt:'马xx-从事招聘专员'
				},
				salary:'5-6K'
			},{
				title:'前端开发工程师',
				h2_txt:'师福教育 未融资',
				area:['沈阳 沈河区','3-5年','学历不限'],
				hr:{
					img_avatar:'',
					hr_txt:'杨女士 - 人事'
				},
				salary:'5-8K'
			},{
				title:'前端工程师',
				h2_txt:'成林健康科技 未融资',
				area:['沈阳 皇姑区','经验不限','本科'],
				hr:{
					img_avatar:'',
					hr_txt:'马xx-从事招聘专员'
				},
				salary:'5-6K'
			},{
				title:'前端技术经理',
				h2_txt:'星擎科技 未融资',
				area:['沈阳 铁西区','5-10年','本科'],
				hr:{
					img_avatar:'',
					hr_txt:'潘舒-CEO'
				},
				salary:'6-11K'
			},{
				title:'web前端',
				h2_txt:'什么祥 未融资',
				area:['沈阳 和平区','经验不限','本科'],
				hr:{
					img_avatar:'',
					hr_txt:'海峰-招聘者'
				},
				salary:'5-6K'
			}]
		}
    },
    components:{footer_bar,job_item,notify,selectArea,filterWrapObj,jobState},
    methods:{
		// 刷新提示
        notifyFnBtn(){
            this.notifyShow = true;

            let _notify = document.querySelector('.notify');
            // webkitAnimationEnd是css3动画的结束事件
            _notify.addEventListener('webkitAnimationEnd',()=>{
                this.notifyShow = false;
            },false);
        },
        onRefresh(){
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
            }, 500);
		},
		// 城市切换打开
		openMaskFn(){
			this.is_cityMaskObj = true;
			this.maskClassName = 'mask_a cityEditWrapObj_open';

			let _mask_a = document.querySelector('.mask_a');
			_mask_a.addEventListener('webkitAnimationEnd',()=>{
				this.is_cityMaskObj = true;
			},false);
		},
		// 关闭城市切换
		hideMaskFn(_cityName){
			if(!_cityName){
				this.defaultCity = '城市'
			}else{
				this.defaultCity = _cityName;
			}
			this.maskClassName = 'mask_a cityEditWrapObj_close';

			let _mask_a = document.querySelector('.mask_a');
			_mask_a.addEventListener('webkitAnimationEnd',()=>{
				this.is_cityMaskObj = false;
			},false)
		},
		// 打开筛选
		openFilterMaskFn(){
			this.is_filter = true;
			this.filterClassName = 'mask_filter filter_open';

			let _mask_filter = document.querySelector('.mask_filter');
			_mask_filter.addEventListener('webkitAnimationEnd',()=>{
				this.is_filter = true;
			},false);
		},
		// 关闭筛选
		closeFilterMask(){
			this.filterClassName = 'mask_filter filter_close';
			let _mask_filter = document.querySelector('.mask_filter');

			_mask_filter.addEventListener('webkitAnimationEnd',()=>{
				this.is_filter = false;
			},false);
		},
		// 打开管理求职+
		jobStateOpen(){
			this.is_jobState = true;
			this.jobStateClassName = 'mask_animation animation_open';

			let _rect = document.querySelector('.mask_animation');
			_rect.addEventListener('webkitAnimationEnd',()=>{
				this.is_jobState = true;
			},false)
		},
		// 关闭，管理求职意向
		jobStateClose(){
			this.jobStateClassName = 'mask_animation animation_close';

			let _rect = document.querySelector('.mask_animation');
			_rect.addEventListener('webkitAnimationEnd', ()=>{
				this.is_jobState = false;
			}, false);
		},
    }
}
</script>

<style scoped>
.bar_sty{
    background: #14c1bb;
}
.van-icon-plus:before{
    color: #fff;
    font-size: .4rem;
    margin-right: .1rem;
    border-right: 1px solid #c1c1c1;
    padding-right: .1rem;
}
.van-icon-search:before{
    color: #fff;
    font-size: .4rem;
}
/deep/ .van-nav-bar__text{
    font-size: .35rem;
    color: #fff;
}
.miniBtn{
    border:0;
    margin:.1rem 0 0 0;
}
.filterBtn{
    float: right;
    border:0;
    margin:.1rem .1rem 0 0;
	background: #f2f3f5;
	background-image: url('../assets/button_icon.png');
	background-repeat: no-repeat;
	background-position: 44px 15px;
	background-size: 4px;
}
.title_menu{
    background: #fff;
}

.cityEditWrapObj_open{
	width: 100%;
	height: 100%;
	background: #fff;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 3333;
	animation: cityEditWrapObjAnimation_open .7s;
}
.cityEditWrapObj_close{
	width: 100%;
	height: 100%;
	background: #fff;
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: 3333;
	animation: cityEditWrapObjAnimation_close .7s;
}
.filter_open{
	width: 100%;height: 100%;background: #fff;position: absolute;left: 0;bottom: 0;
	z-index: 3333;animation: cityEditWrapObjAnimation_open .7s;
}
.filter_close{
	width: 100%;height: 100%;background: #fff;position: absolute;left: 0;bottom: 0;
	z-index: 3333;animation: cityEditWrapObjAnimation_close .7s;
}
@keyframes cityEditWrapObjAnimation_open{
	from {height:0;}
	to {height:100%;}
}
@keyframes cityEditWrapObjAnimation_close{
	from {height:100%;}
	to {height:0;}
}
.mask_animation{
	width: 100%;height: 100%;background: #fff;position: absolute;left: 0;bottom: 0;
	z-index: 3333;
}
.animation_open{
	animation: open_Animation .7s;
}
.animation_close{
	animation: close_Animation .7s;
}

@keyframes open_Animation{
	from {width:0;left:100%;}
	to {width:100%;left:0;}
}
@keyframes close_Animation{
	from {width:100%;left:0;}
	to {width:0;left:100%;}
}
</style>