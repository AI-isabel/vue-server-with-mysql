
<template>
  <el-form ref="form" :model="formData" label-width="80px">
    <el-form-item label="链接标题">
      <el-input v-model="formData.sitename"></el-input>
    </el-form-item>

    <el-form-item label="链接内容">
      <el-input type="textarea" v-model="formData.siteurl"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  
  data() {
    return {
      formData: {
        sitename: "",
        siteurl: "",
        id:''
      },
       currpage: 1,
       pagesize: 5,

    
    };
  },
 
  methods: {
    onSubmit(refName) {
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
                console.log(this.currpage, this.pagesize)
                this.getFlink(this.currpage, this.pagesize);
                this.$router.push("/flink");
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          return false;
        }
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
};
</script>