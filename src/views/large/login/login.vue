<style lang="less">
@import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@coms/large/login-form';
import { mapActions } from 'vuex';
window.addEventListener('resize', (e) => setViewHeight());
function setViewHeight() {
  let view = document.querySelector('.login');
  if(view) view.style.height = window.innerHeight + 'px';
}
export default {
  components: {
    LoginForm,
  },
  mounted() {
    setViewHeight();
  },
  methods: {
    ...mapActions('user', ['handleLogin', 'getUserInfo']),
    async handleSubmit({ username, password }) {
      console.log("login----=", username, password);
      let { code, msg, data } = await this.handleLogin({ username, password });
      console.log('code============', code, msg, data);
      code == 200 && this.$router.push('/');
      /*       this.handleLogin({ userName, password }).then((res) => {
        this.getUserInfo().then((res) => {
          console.log('login12', this.$config.homeName);

          this.$router.push({
            name: this.$config.homeName,
          });
        });
      }); */
    },
  },
};
</script>

<style></style>
