<template>
  <div class="mx-auto login-container">
    <section class="text-center text-lg-start shadow">
      <div class="card mb-3">
        <div class="row g-0 d-flex align-items-center no-gutters">
          <div class="col-lg-12">
            <img
              class="card-img-top w-50 mt-5"
              src="https://reqlut2.s3.amazonaws.com/uploads/logos/416e5708064894b7f6cd775a5547bf29a4adb02a-5242880.png"
              alt=""
            />
            <div class="card-body py-4 mt-4 px-md-5">
              <form>
                <div class="form-outline mb-4 text-left">
                  <label class="form-label" for="email">Correo</label>
                  <input
                    v-model="email"
                    type="email"
                    id="email"
                    class="form-control"
                  />
                </div>
                <div class="form-outline mb-4 text-left">
                  <label class="form-label" for="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    v-model="password"
                  />
                </div>
                <Button
                  :handleClick="handleSubmit"
                  :text="'Iniciar sesión'"
                  :loading="loading"
                ></Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from '@/components/common/Button.vue'
import axios from '@nuxtjs/axios'

@Component({
  components: {
    Button,
  },
})
export default class Login extends Vue {
  email: string = ''
  password: string = ''
  loading: boolean = false
  async handleSubmit() {
    const data = { email: this.email, password :this.password }
    try {
        this.loading = true;
        const response = await this.$auth.loginWith('local', { data });
    } catch (error) {
        console.log(error)
        this.loading = true;
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  padding-top: 150px;
}
.rounded-t-5 {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
  .rounded-tr-lg-0 {
    border-top-right-radius: 0;
  }

  .rounded-bl-lg-5 {
    border-bottom-left-radius: 0.5rem;
  }
}
</style>