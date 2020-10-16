<template>
<div>
  <el-table :data="tableData" >
    <el-table-column prop="id" label="ID" width="140">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column prop="sitename" label="姓名" width="220">
    </el-table-column>
    <el-table-column prop="siteurl" label="地址"> </el-table-column>
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
    console.log(this.currpage)
    this.loading = true;
    this.getFlink(this.currpage, this.pagesize);
  },
  methods: {
    // 每页下拉显示数据
    handleSizeChange(val) {
      this.pagesize = val;
      this.getFlink(this.currpage, this.pagesize);
      console.log(`每页 ${val} 条`);
    },

    //当页显示数据 点击第几页
    handleCurrentChange(val) {
      this.currpage = val;
      this.getFlink(this.currpage, this.pagesize);
      console.log(this.tableData);
    },
  
    editFlink(index, row) {
      this.formData.sitename = row.sitename;
      this.formData.siteurl = row.siteurl;
      this.formData.id = row.id;
      this.$store.commit('editdata',{data:this.formData})
       this.$router.push('/edit-Link')

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
              this.getFlink(this.currpage, this.pagesize);
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
      addShow: false,
      formData: { /* 输入的信息 */ 
       id: "",
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
</style>