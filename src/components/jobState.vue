<template>
  <div class="jobState">
    <van-nav-bar 
        @click-left="closeMaskFn"
        left-arrow />

    <h1 class='titleSty'>管理求职意向</h1>

    <van-nav-bar
        left-text="求职状态"
        :right-text=jobStateObj
        @click-right="openJobStateFn"
        />

    <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        title='求职状态'
        />
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    data(){
        return{
            msg:'求职意向',
            jobStateObj:'请选择>>',
            show:false,
            actions: [{ 
					name: '离职-随时到岗',
					is_state:0
				},{ 
					name: '在职-月内到岗',
					is_state:1
				},{ 
					name: '在职-考虑机会',
					is_state:2
				},{
					name:'在职-暂不考虑',
					is_state:3
				}],
        }
    },
    methods:{
        closeMaskFn(){
            this.$emit('closeJobStateFn')
        },
        openJobStateFn(){
            this.show = true;
        },
        onSelect(item){
            this.show = false;
            this.jobStateObj = item.name + '>>';
        }
    }
}
</script>

<style scoped>
.titleSty{font-size: .3rem;font-weight: bold;margin-left: .3rem;
	white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}

.div_p{
	font-size: .1rem;color: #969696;margin-left: .25rem;
	white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.jobState{
	white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.jobState_footer{text-align: center;margin: 2rem 0;}
/deep/ .van-nav-bar__text{
    color: blue;
}
</style>