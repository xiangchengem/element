<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo"></div>
        <el-menu
					:collapse="isCollapse"
          class="el-menu-admin"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router="true"
          :unique-opened="true"
        >
          <el-submenu :index="item.path" v-for="item in menuData" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="tag.path" v-for="tag in item.children" :key="tag.id">
              <i class="el-icon-menu"></i>
              <span slot="title">{{tag.authName}}</span>
            </el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
          </el-submenu> -->
          <!-- <el-menu-item index="/rights">
            <i class="el-icon-menu"></i>
            <span slot="title">权限管理</span>
          </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i class="el-icon-menu toggle-btn" @click="toggleCollapse"></i>
          <div class="system-title">
            管理控制台
          </div>
          <div>
						<span class="welcome">
            欢迎{{$store.getters.getUsername}}小哥
						</span>
						<el-button type="text" @click="logout">退出</el-button>
						</div>
        </el-header>
        <el-main>
					<router-view></router-view>
				</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserList,getMenus } from "@/api";
export default {
  data: () => ({
      isCollapse: false,
      menuData:[]
	}),
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
		},
		toggleCollapse(){
			this.isCollapse=!this.isCollapse;
		},
		//折叠侧边栏
		logout(){
			//清除登录状态，直接清除token值，并回到login页面
		localStorage.removeItem('mytoken')
		this.$router.push({name:'Login'})
		}
  },
  mounted() {
    let params = { params: { query: "", pagenum: "1", pagesize: "10" } };
    getUserList(params).then(res => {
      // console.log(res);
    });
  },
  created(){
    getMenus().then(res=>{
      if(res.meta.status ===200){
        this.menuData=res.data
      }
    })
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background-color: #e5e5e5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #009688;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>