<template>
  <div class="rights">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-table
      :data="rightList"
      border
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column
        type="index"
        width="50"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
      >
      </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
					<span>{{scope.row.level | fmtLevel}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getRightList} from '@/api'
export default {
  data: () => ({
		loading:true,
		rightList:[]
	}),
	created(){
		getRightList({type:'list'}).then(res=>{
			console.log(res);
			if(res.meta.status===200){
				this.rightList=res.data
				this.loading=false
			}
		})
	},
	filters:{
		fmtLevel(level){
			if(level ==='0'){
				return '一级'
			}else if(level ==='1'){
				return '二级'
			}else{
				return '三级'
			}
		}
	}
};
</script>

<style lang="scss" scoped>
</style>