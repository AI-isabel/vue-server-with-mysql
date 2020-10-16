
<template>
  <el-form ref="form" :model="formData" label-width="80px">
    <el-form-item label="链接标题" prop="sitename">
      <el-input v-model="formData.sitename"></el-input>
    </el-form-item>

    <el-form-item label="链接内容" prop="siteurl">
      <el-input type="textarea" v-model="formData.siteurl" autosize></el-input>
    </el-form-item>
    <el-form-item>
    <el-button @click="canselEdit">取 消</el-button>
        <el-button type="primary" @click="updataFlink('form')"
          >保存</el-button
        >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  mounted() {
   this.formData=this.$store.state.key
    this.getFlink(this.currpage, this.pagesize);
  },
  methods: {
    canselEdit() {
      this.formData.sitename = "";
      this.formData.siteurl = "";
      this.formData.id = "";
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
                this.getFlink(this.currpage, this.pagesize);
                this.$router.push('/flink')
              }
            })
            .catch((err) => {
              console.error(err);
            });
         
        } else {
          this.addShow = true;
          return false;
        }
      });
      this.addShow = false;
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