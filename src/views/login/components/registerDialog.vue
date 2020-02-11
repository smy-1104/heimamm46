<template>
  <el-dialog
    class="register-dialog"
    width="603px"
    title="用户注册"
    :visible.sync="dialogFormVisible"
    center
  >
    <el-form status-icon :model="form" :rules="rules" ref="registerForm">
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          name="image"
          v-model="form.image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- imgurl有值，显示图片 -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <!-- imgurl没有有值，显示i标签 -->
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1" class="register-box">
            <!-- 图片验证码 -->
            <img @click="changeCode" class="register-code" :src="codeURL" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.code1" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!-- 点击获取 短信验证码 -->
            <el-button
              :disabled="delay != 0"
              @click="getSMS"
            >{{ delay == 0 ? '点击获取验证码' : `还有${delay}秒继续获取`}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入 axios
// import axios from "axios";

//导入接口
import { sendsms } from "@/api/register.js";

// 验证手机号的 函数
const checkPhone = (rule, value, callback) => {
  // 接收参数 value
  // 定义正则表达式
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  // 使用正则校验格式是否满足
  if (reg.test(value) == true) {
    // 对
    callback();
  } else {
    // 错
    callback(new Error("手机号格式不对哦，请检查"));
  }
};
//验证邮箱的函数
const checkEmail = (rule, value, callback) => {
  // 接收参数 value
  // 定义正则表达式
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  // 使用正则校验格式是否满足
  if (reg.test(value) == true) {
    // 对
    callback();
  } else {
    // 错
    callback(new Error("邮箱格式不对哦，请检查"));
  }
};

export default {
  data() {
    return {
      //是否显示对话框
      dialogFormVisible: false,
      //表单数据
      form: {
        //头像
        image: "",
        //昵称
        username: "",
        //邮箱
        email: "",
        //手机号
        phone: "",
        //密码
        password: "",
        //图片验证码
        code: ""
      },
      //校验规则
      rules: {
        //头像
        image: [
          {
            required: true
          }
        ],
        username: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "用户名长度为6到12位",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 6,
            max: 12,
            message: "密码长度为6到12位",
            trigger: "change"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: "blur"
          },
          {
            validator: checkPhone,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            validator: checkEmail,
            trigger: "blur"
          }
        ]
      },
      //左侧的文本宽度
      formLabelWidth: "62px",
      //验证码图片地址
      codeURL: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      //倒计时时间
      delay: 0,
      //本地图片预览地址
      imageUrl: "",
      //头像上传的接口地址
      uploadUrl: process.env.VUE_APP_URL + "/uploads"
    };
  },
  methods: {
    // 上传成功回调函数
    // file 文件的各种信息
    // file.raw 文件对象
    // res是接口响应的数据
    handleAvatarSuccess(res, file) {
      window.console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
      // URL.createObjectURL 生成的是本地的临时路径，刷新就没用了
    },
    // 上传之前
    // file 是文件 对象
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //获取短信验证码
    getSMS() {
      //手机号校验
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if(reg.test(this.form.phone)!=true){
        this.$message.error('手机号格式不对哦，请重新输入')
        return
      }
      //图片验证码的校验
      if(this.form.code.length!=4){
        this.$message.error('图片验证码的长度不对哦，请检查')
        return
      }

      //如果为0开启倒计时
      if (this.delay == 0) {
        this.delay = 60;
        const interId = setInterval(() => {
          //时间的递减
          this.delay--;
          if (this.delay == 0) {
            //清除定时器
            clearInterval(interId);
          }
        }, 100);

        // axios({
        //   url: process.env.VUE_APP_URL + "/sendsms",
        //   method: "post",
        //   data: {
        //     code: this.form.code,
        //     phone: this.form.phone
        //   },
        //   //是否跨域携带cookie 默认是false
        //   withCredentials: true
        // })
        //调用接口
        sendsms({
          code: this.form.code,
          phone: this.form.phone
        }).then(res => {
          //成功回调
          window.console.log(res);
          if (res.data.code === 200) {
            this.$message.success("验证码获取成功：" + res.data.data.captcha);
          } else if (res.data.code === 0) {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    //重新生成验证码
    changeCode() {
      this.codeURL =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    }
  }
};
</script>

<style lang='less'>
.register-dialog {
  .el-dialog__header {
    background: linear-gradient(to right, #02c6fc, #1394fb);
  }
  .el-dialog__title {
    color: white;
  }
  .register-box {
    height: 40.8px;
  }
  .register-code {
    height: 40.8px;
    width: 100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader {
    text-align: center;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>