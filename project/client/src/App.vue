<template>
  <el-container style="height: 100vh">
    <el-header style="text-align: right; font-size: 12px">
      <el-row>
        <el-col :span="3" class="text-left">
          <span class="font1 font-20 ">真情喝好酒</span>
        </el-col>
        <el-col :span="15" class="font-weight-bold text-center font-20">
          友情出品
        </el-col>
        <el-col :span="6">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>链接操作</span>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="230px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']" unique-opened router>
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>金主一</template
            >
            <el-menu-item-group>
              <template slot="title">会员中心</template>
              <el-menu-item index="/flink">链接信息</el-menu-item>
              <el-menu-item index="/create-Link">新添链接</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>金主二</template>
            <el-menu-item-group>
              <template slot="title">兴趣分类</template>
              <el-menu-item index="2-1">割韭菜</el-menu-item>
              <el-menu-item index="2-2">种韭菜</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main v-loading='loading' element-loading-text="网络跑神啦" element-loading-spinner="el-icon-loading" 
    element-loading-background="rgba(130, 210, 210, 0.2)">
      <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer
      style="background-color: #eee; color: gray"
      class="d-flex justify-content-center align-items-center"
      >版权所有 &copy; 互吹科技</el-footer
    >
  </el-container>
</template>

<script>
export default {
  mounted() {
    this.loading = true;
    this.getFlink(this.currpage, this.pagesize);
  },
  methods: {
  
    getFlink(page, pagesize) {
      //获取数据库数据;prop="sitename"需要与数据库字段名一致
      this.axios
        .get("/get-flink", {
          params: {
            curr: page,
            limit: pagesize,
          },
        })
        .then((res) => {
          this.tableData = res.data.listData;

          this.totalNum = res.data.count;
          this.loading = false;
        });
    },
   
  },
  data() {
   
    return {
     
      loading: false,
      tableData: [],
      currpage: 1,
      listLoading: false, // 数据返回慢时，显示加载动画

      pagesize: 5,
      totalNum: 10,
      isEdit: false,
      addShow: false,
      formData: {
        /* 输入的信息 */ id: "",
        sitename: "",
        siteurl: "",
      },
      myrules: {
        //验证Prop标记的输入数据
        sitename: [
          { required: true, message: "请输入网站名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        siteurl: [
          { required: true, message: "请输入网站地址", trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style>
.el-header {
  background: #008c8c !important;
   color: white !important;
}
* {
  margin: 0;
  padding: 0;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-dialog__body {
  padding: 30px 20px 0 20px;
}
.table {
  width: 800px;
  margin: 0 auto;
}
.font1 {
  font-family: myfont;
  color: orange
}

@font-face {
  font-family: "myfont";
  font-display: swap;
  src: url("//at.alicdn.com/t/webfont_9z1l15rve1q.eot"); /* IE9*/
  src: url("//at.alicdn.com/t/webfont_9z1l15rve1q.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("//at.alicdn.com/t/webfont_9z1l15rve1q.woff2")
      format("woff2"),
    url("//at.alicdn.com/t/webfont_9z1l15rve1q.woff") format("woff"),
    /* chrome、firefox */ url("//at.alicdn.com/t/webfont_9z1l15rve1q.ttf")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("//at.alicdn.com/t/webfont_9z1l15rve1q.svg#庞门正道标题体2")
      format("svg"); /* iOS 4.1- */
}
a {
  text-decoration: none;
  margin-left: 20px;
}
.flink {
  margin: 20px;
}
.el-form-item__error {
  left: 78px;
}
.input {
  width: 300px;
}
.el-dialog {
  width: 34%;
}
.el-loading-spinner .el-loading-text,
.el-loading-spinner i {
  color: orangered;
}
</style>