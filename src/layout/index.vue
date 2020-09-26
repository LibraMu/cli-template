<template>
	<el-container class="container">
		<el-aside
			class="container overflow_hidden"
			width="200px"
		>
			<Menu />
		</el-aside>
		<el-container class="container">
			<el-header>Header</el-header>
			<el-main>
				123
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import Menu from "./menuNav/menu";
export default {
	components: {
		Menu,
	},
};
</script>

<style>
</style>