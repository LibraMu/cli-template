import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: (resolve) => require(['@/layout/index'], resolve),
			meta: {
				keepAlive: true,
				icon: '',
			},
			children: [
				{
					path: "home",
					name: 'home',
					component: (resolve) => require(['@/pages/home'], resolve)
				}
			]
		}
	]
})
