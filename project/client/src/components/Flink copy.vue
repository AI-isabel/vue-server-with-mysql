<template>
  <div class="link">
    <el-button type="primary" class="flink" @click="addFlink"
      >添加友情链接</el-button
    >
    <el-table
      :data="tableData"
      border
      class="table"
      v-loading='loading' element-loading-text="网络跑神啦" element-loading-spinner="el-icon-loading" 
    element-loading-background="rgba(130, 210, 210, 0.2)"
    >
      <el-table-column prop="id" label="ID">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="sitename" label="网站名称"></el-table-column>

      <el-table-column prop="siteurl" label="网站地址"> </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="editFlink(scope.$index, scope.row)"
            type="warning"
            size="small"
            ><i class="el-icon-edit"></i>编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            @click="del(scope.$index, scope.row)"
            ><i class="el-icon-delete"></i>删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加友情链接" :visible.sync="addShow">
      <el-form :rules="myrules" :model="formData" ref="addFlinkForm">
        <el-form-item label="网站名称" prop="sitename">
          <el-input
            v-model="formData.sitename"
            autocomplete="off"
            class="input"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="siteurl">
          <el-input
            v-model="formData.siteurl"
            autocomplete="off"
            class="input"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addShow = false">取 消</el-button>
        <el-button type="primary" @click="saveFlink('addFlinkForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="编辑友情链接" :visible.sync="isEdit">
      <el-form :rules="myrules" :model="formData" ref="editFlinkForm">
        <el-form-item label="网站名称" prop="sitename">
          <el-input
            v-model="formData.sitename"
            autocomplete="off"
            class="input"
          ></el-input>
        </el-form-item>
        <el-form-item label="网站地址" prop="siteurl">
          <el-input
            v-model="formData.siteurl"
            autocomplete="off"
            class="input"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="canselEdit">取 消</el-button>
        <el-button type="primary" @click="updataFlink('editFlinkForm')"
          >保存</el-button
        >
      </div>
    </el-dialog>
     <!-- layout:表示分页栏的布局，逗号分隔， 先后顺序会影响布局效果
      total 是否显示总条数
      prev 显示上一页的图标
      next 显示上一页的图标
      pager 显示页码列表
      jumper 显示跳页元素
      sizes 显示每页条数下拉
      -->
      <!-- :page-size="10" 表示每页显示多少条； -->
      <!-- :pager-count="11" 表示最大显示多少个页码按钮，超过会折叠多余的页码按钮 -->
      <!-- :page-sizes="[10, 55, 66, 77]" 表示我们可以自定义每页显示的数量；通常配合layout的sizes使用；第一个数最好和pageSize一致，否则会有bug -->
      <!-- :currentPage:表示当前的页码； -->
      <!-- 设置background属性可以为分页按钮添加背景色 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes,prev, pager, next, jumper"
      :total="totalNum"
      :page-size="pagesize"
      :page-sizes="[5, 10, 15]"
      :current-page="currpage"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loading=true
  this.getFlink(this.currpage,this.pagesize);
  },
  methods: {
   // 每页下拉显示数据
    handleSizeChange(val) {
     this.pagesize=val
     this.getFlink(this.currpage,this.pagesize)
     console.log(`每页 ${val} 条`);
     
    },
    
    //当页显示数据 点击第几页
    handleCurrentChange(val) {
       this.currpage = val;
      this.getFlink(this.currpage,this.pagesize);
       console.log(this.tableData)
       
    },
    canselEdit() {
      this.isEdit = false;
      this.formData.sitename = "";
      this.formData.siteurl = "";
      this.formData.id = "";
    },
    editFlink(index, row) {
      this.isEdit = true;
      this.formData.sitename = row.sitename;
      this.formData.siteurl = row.siteurl;
      this.formData.id = row.id;
    },
    // 删除友情链接
    del(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios.post("/del", { id: row.id }).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功！",
                type: "success",
              });
             this.getFlink(this.currpage,this.pagesize);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    updataFlink(refName) {
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.axios
            .post("/updata-flink", {
              sitename: this.formData.sitename,
              siteurl: this.formData.siteurl,
              id: this.formData.id,
            })
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "编辑成功",
                  type: "success",
                });
                this.formData.sitename = "";
                this.formData.siteurl = "";
               this.getFlink(this.currpage,this.pagesize);
              }
            })
            .catch((err) => {
              console.error(err);
            });
          this.isEdit = false;
        } else {
          this.addShow = true;
          return false;
        }
      });
      this.addShow = false;
    },
    saveFlink(refName) {
      console.log(this.formData);
      this.$refs[refName].validate((valid) => {
        if (valid) {
          this.axios
            .post("/add-flink", {
              sitename: this.formData.sitename,
              siteurl: this.formData.siteurl,
            })
            .then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  message: "添加成功",
                  type: "success",
                });
                this.formData.sitename = "";
                this.formData.siteurl = "";
               this.getFlink(this.currpage,this.pagesize);
              }
            })
            .catch((err) => {
              console.error(err);
            });
          this.isAddFlinkShow = false;
        } else {
          this.addShow = true;
          return false;
        }
      });
      this.addShow = false;
    },
    // 保存友情链接
    addFlink() {
      this.addShow = true;
    },
    getFlink(page,pagesize) {
      //获取数据库数据;prop="sitename"需要与数据库字段名一致
      this.axios.get("/get-flink",{
       params: {
            curr:page,
            limit: pagesize
          },
      }).then((res) => {
        this.tableData = res.data.listData;
        
        this.totalNum = res.data.count
        this.loading=false
      });
    },
    handleClick(row) {
      console.log(row);
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
.el-dialog__body {
  padding: 30px 20px 0 20px;
}
.table {
  width: 800px;
  margin: 0 auto;
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
.el-loading-spinner .el-loading-text ,.el-loading-spinner i {
    color: orangered
   
}
</style>