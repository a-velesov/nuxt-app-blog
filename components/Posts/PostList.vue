<template>
  <div class="post-list">
    <section class="post-list">
      <post-preview
        id="1"
        title="Hellow world"
        preview-text="Preview"
        thumbnail="https://cloudspoint.xyz/wp-content/uploads/2020/02/CODE-1.jpg"
      />
    </section>
  </div>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview';

export default {
  name: 'PostList',
  components: {
    PostPreview
  }
};

</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

</style>
