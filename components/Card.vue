<template>
  <el-card :body-style="{ padding: '20px' }">
    <nuxt-link :to="`/${id}`"><img :src="src" class="image"/></nuxt-link>
    <div style="padding: 14px;">
      <span>{{ title }}</span>
      <div class="bottom clearfix">
        <time class="time">{{ created }}</time>
        <nuxt-link :to="`/${id}`">
          <el-button type="text" class="button">Open</el-button>
        </nuxt-link>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      type: String,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    created: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
