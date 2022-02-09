<template>
  <div>
    <el-container>
      <el-header class="container-header">index</el-header>
      <el-container>
        <el-main class="command-main">
          <el-row class="command-button">
            <el-col :span="12">
              <!-- <el-button type="primary" @click="getFileList">刷新列表</el-button> -->
            </el-col>
          </el-row>

          <el-row class="file-list">
            
          </el-row>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
// import http from "../utils/http";
// import moment from "moment";
import { ElMessage } from "element-plus";

export default defineComponent({
  setup() {
    return {
    };
  },
  components: {},
  mounted() {
    
  },
  methods: {
    
  },
  beforeCreate() {
    console.log("beforeCreate");
  }
});
</script>

// 样式
<style>

</style>