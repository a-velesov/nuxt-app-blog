<template>
  <div class="post-list">
    <section class="post-list">
      <post-preview
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :is-admin="isAdmin"
        :title="post.title"
        :previewText="post.previewText"
        :thumbnail="post.thumbnail"
      />
    </section>
  </div>
</template>

<script>
import PostPreview from '@/components/Posts/PostPreview';

export default {
  name: 'PostList',
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array,
      required: true
    }
  },
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
