<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <admin-post-form @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>

import AdminPostForm from '@/components/Admin/AdminPostForm';
import axios from 'axios';

export default {
  layout: 'admin',
  components: {
    AdminPostForm,
  },
  methods: {
    onSubmitted(data) {
      axios.post(`${ process.env.NUXT_ENV_BASE_URL }/posts.json`, {
        ...data,
        updatedData: new Date(),
      })
           .then(res => {
             this.$router.push('/admin');
           })
           .catch(e => console.log(e));
    },
  },
};

</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>
