import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
// 后台服务 node app.js
// 登录验证
export const checkUser = params=>{
	return axios.post('login',params).then(res=>res.data)
}
// 请求拦截
axios.interceptors.request.use(function(config){
	let token = localStorage.getItem('mytoken')
	if(token){
		config.headers['Authorization']=token
		// config:请求对象
	}
	return config;
	},function(error){
		return Promise.reject(error)
	})
	//用户链表
export const getUserList = params=>{
	return axios.get('users',params).then(res=>res.data)
}
// 更改用户状态
export const changeUserState = params=>{
	return axios.put(`users/${params.uid}/state/${params.type}`)
	// .then(res=>res.data)
	// .then(res=>res.data)是返回data中的数据，如果不加这么一段返回的则是所有数据。详情可以删除这一段测试
	// ES7写法
	// return axios.put('users/:'+'params.uId'+'/state/:'+'params.type')
}
// 添加用户
export const addUser = params =>{
	return axios.post('users',params).then(res=>res.data)
}
// 编辑用户获取用户信息
export const getUserById = params =>{
	return axios.get(`users/${params}`).then(res=>res.data)
}
// 编辑用户信息
export const editUser = params =>{
	return axios.put(`users/${params.id}`,params).then(res=>res.data)
}
// 删除用户信息
export const deleteUser = params =>{
	return axios.delete(`users/${params.id}`).then(res=>res.data)
}
// 获取角色权限列表
export const getRoleList = params =>{
	return axios.get('roles').then(res=>res.data)
}
// 分配角色权限
export const grantUserRole = params =>{
	return axios.put(`users/${params.id}/role`,params).then(res=>res.data)
}
// 获取权限列表	
export const getRightList  = params =>{
	return axios.get(`rights/${params.type}`).then(res=>res.data)
}
// 删除角色指定权限
export const deleteRoleRight = params =>{
	return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res=>res.data)
}
//角色授权
export const grantRoleRight = (roleId,rids)=>{
	return axios.post(`roles/${roleId}/rights`,rids).then(res=>res.data)
}
//重点

// 如果在某些情况下。使用axios传递的是一个对象那么久使用这种写法，不要使用下面这种写法。
// 会报错axios[object%20Object]。

// export const grantRoleRight = params=>{
// 	return axios.post(`roles/${params.roleId}/rights`,params.rids).then(res=>res.data)
// }
// 左侧菜单权限
export const getMenus  = params =>{
	return axios.get('menus').then(res=>res.data)
}
// 商品数据列表
export const getCategories  = params =>{
	return axios.get('categories',params).then(res=>res.data)
}
// initList() {
// 	getCategories({params:{type:'3',pagenum:1,pagesize:5}}).then(res=>{
// 		console.log(res);
// 	})
// }
// 如果传递的参数是一个对象,这边封装的请求api参数用params代替,
// 那么对应的请求方法中传递的参数需要{params:{type:'3',pagenum:1,pagesize:5}}:赋值这种写法:
// 注意了上面这种参数传递方式和下面的区别。

// export const getCategories  = params =>{
// 	return axios.get('categories',{params:params}).then(res=>res.data)
// }
// initList() {
// 	getCategories({type:'3',pagenum:1,pagesize:5}).then(res=>{
// 		console.log(res);
// 	})
// }



// 添加分类
export const addCategories  = params =>{
	return axios.post('categories',params).then(res=>res.data)
}