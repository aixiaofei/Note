<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div style="float: left">
                    <el-button type="primary" @click="showAddLoveLittle">发布你的爱情点滴</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">

            </el-col>
        </el-row>
        <el-dialog title="书写你的爱情点滴" :visible.sync="loveLittleFormVisible">
            <el-form :model="loveLittleForm" ref="loveLittleForm" :rules="rules" status-icon>
                <el-form-item label="点滴标题:" :label-width="formLabelWidth" prop="title">
                    <el-input v-model="loveLittleForm.title" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="点滴内容:" :label-width="formLabelWidth" prop="content">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="loveLittleForm.content" autocomplete="off" clearable></el-input>
                </el-form-item>
                <el-form-item label="点滴类型:" :label-width="formLabelWidth" style="text-align: left" prop="type">
                    <el-select v-model="loveLittleForm.type" placeholder="请选择类型">
                        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分配爱值:" :label-width="formLabelWidth" style="text-align: left">
                    <el-input-number v-model="loveLittleForm.loveNumber" :min="-90" :max="90"></el-input-number>
                </el-form-item>
                <el-form-item label="重要程度:" :label-width="formLabelWidth" style="text-align: left">
                    <div class="div_rate">
                        <el-rate class="rate" v-model="loveLittleForm.important" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                        </el-rate>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showAddLoveLittle">取消</el-button>
                <el-button type="primary" @click="addLoveLittle('loveLittleForm')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: "loveLittle",
  data() {
    return {
      formLabelWidth: "100px",
      typeOptions: [
        {
          value: 0,
          label: "索要"
        },
        {
          value: 1,
          label: "惩罚"
        }
      ],
      showHeader: false,
      loveLittleFormVisible: false,
      loveLittleForm: {
        title: "",
        content: "",
        loveNumber: 5,
        important: 0,
        type: "",
        status: 0
      },
      loveLittle: {},
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 50, message: "长度在3到50个字符", trigger: "blur" }
        ],
        content: [
          { min: 0, max: 999, message: "长度不超过999个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }]
      }
    };
  },
  methods: {
    showAddLoveLittle() {
      this.loveLittleFormVisible = !this.loveLittleFormVisible;
    },
    addLoveLittle(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
            
        }
      });
    }
  }
};
</script>

<style scoped>
.div_rate {
  display: flex;
  height: 40px;
}
.rate {
  margin-top: auto;
  margin-bottom: auto;
}
</style>