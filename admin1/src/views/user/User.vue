<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input
          @keydown.native.enter="initList"
          v-model="query"
          placeholder="请输入内容"
          class="search-input"
        >
          <!-- el-input是一个组件  vue规定要给组件绑定原生事件需要一个加.native的修饰符菜会生效-->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="initList"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
          @click="addDialogFormVisible=true"
        >添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="userList"
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
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            @change="changeUserState(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit"
            @click="showEditDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="warning"
            icon="el-icon-delete"
            @click="showDeleteDialog(scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            @click="showGrantDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogFormVisible"
    >
      <el-form
        :model="addForm"
        label-width="80px"
        :rules="rules"
        ref="addUserForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="addForm.username"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="addForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input
            v-model="addForm.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUserSubmit('addUserForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogFormVisible"
    >
      <el-form
        :model="editForm"
        label-width="80px"
        :rules="rules"
        ref="editUserForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
        >
          <el-input
            v-model="editForm.username"
            auto-complete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input
            v-model="editForm.email"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          prop="mobile"
        >
          <el-input
            v-model="editForm.mobile"
            auto-complete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserSubmit('editUserForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色权限对话框 -->
    <el-dialog
      title="分配角色权限"
      :visible.sync="grantDialogFormVisible"
    >
      <el-form
        :model="grantForm"
        label-width="100px"
      >
        <el-form-item
          label="当前用户："
          prop="username"
        >
          <el-tag type="info">{{grantForm.username}}</el-tag>
        </el-form-item>
        <el-form-item label="请选择角色：">
          <el-select
            v-model="roleId"
            placeholder="请选择角色"
          >
            <el-option
              :label="role.roleName"
              :value="role.id"
              v-for="(role,index) in roleList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="grantUserSubmit()"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  changeUserState,
  addUser,
  getUserById,
  editUser,
  deleteUser,
  getRoleList,
  grantUserRole
} from "@/api";
export default {
  data: () => ({
    loading:true,
    addDialogFormVisible: false,
    pagenum: 1,
    pagesize: 10,
    total: 0,
    query: "",
    userList: [],
    addForm: {
      username: "",
      password: "",
      email: "",
      mobile: ""
    },
    editForm: {
      username: "",
      email: "",
      mobile: "",
      id: 0
    },
    editDialogFormVisible: false,
    rules: {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 2, max: 8, message: "长度在 3 到 5 个字符", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 12, message: "", trigger: "blur" }
      ],
      email: [
        { required: true, message: "请输入邮箱地址", trigger: "blur" },
        { type: "email", message: "请输入合法邮箱地址", trigger: "blur,change" }
      ],
      mobile: [
        { required: true, message: "请输入手机号码", trigger: "blur" }
        // { type: 'number', message: "请输入正确手机号码", trigger: "blur" }
      ]
    },
    grantDialogFormVisible: false,
    grantForm: {},
    roleList: [],
    roleId: ""
  }),
  created() {
    this.initList();
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initList();
    },
    // 修改用户状态
    changeUserState(row) {
      console.log(row);
      changeUserState({ params: { uid: row.id, type: row.mg_state } }).then(
        res => {
          console.log(res);
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "修改用户状态成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: res.meta.msg
            });
          }
        }
      );
    },
    // 添加用户
    addUserSubmit(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          // 执行添加用户方法
          addUser(this.addForm).then(res => {
            console.log(res);
            if (res.meta.status === 201) {
              this.$message({
                type: "success",
                message: "创建用户成功"
              });
            }
            this.addDialogFormVisible = false;
            this.initList();
          });
        }
      });
    },
    // 显示编辑对话框
    showEditDialog(row) {
      // console.log(row);
      getUserById(row.id).then(res => {
        // console.log(res);
        this.editDialogFormVisible = true;
        if (res.meta.status === 200) {
          this.editForm.username = res.data.username;
          this.editForm.email = res.data.email;
          this.editForm.mobile = res.data.mobile;
          this.editForm.id = res.data.id;
        }
      });
    },
    // 编辑用户信息
    editUserSubmit(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          editUser(this.editForm).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "编辑成功"
              });
              this.editDialogFormVisible = false;
              this.initList();
            }
          });
        }
      });
    },
    // 显示删除用户信息对话框
    showDeleteDialog(row) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 执行删除用户操作
          deleteUser(row.id).then(res => {
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.initList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 显示分配角色对话框
    showGrantDialog(row) {
      this.grantForm = row;
      this.grantDialogFormVisible = true;
      getRoleList().then(res => {
        if (res.meta.status === 200) {
          this.roleList = res.data;
        }
      });
    },
    // 分配角色
    grantUserSubmit() {
      if (!this.roleId) {
        this.$message({
          type: "warning",
          message: "角色不能为空"
        });
      } else {
        grantUserRole({ id: this.grantForm.id, rid: this.roleId }).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: "success",
              message: "设置角色成功"
            });
            this.grantDialogFormVisible = false;
          } else {
            this.$message({
              type: "error",
              message: res.meta.msg
            });
          }
        });
      }
    },
    // 初始化表格数据
    initList() {
      this.loading=true;
      getUserList({
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        console.log(res);
        this.userList = res.data.users;
        this.total = res.data.total;
        this.loading=false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #d3dce6;
  }
  .el-button--success.is-plain {
    margin-left: 22px;
  }
  .el-table--border {
    margin: 20px 0;
  }
}
</style>