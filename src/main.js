import './assets/rem'
import './assets/reset.css'
import './assets/reset_vant.css'

import Vue from 'vue'
import App from './App'
import router from './router'

import { Button,Swipe, SwipeItem,NavBar,Icon,Sticky,
      Tabbar, TabbarItem,Notify,PullRefresh,Loading,
      Toast,Area,Grid, GridItem,ActionSheet,Divider } from 'vant';

Vue.use(Button).use(Swipe).use(SwipeItem).use(NavBar).use(Icon)
  .use(Sticky).use(Tabbar).use(TabbarItem).use(Notify).use(PullRefresh)
  .use(Loading).use(Toast).use(Area).use(Grid).use(GridItem).use(ActionSheet)
  .use(Divider);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
