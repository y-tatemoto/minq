<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        minq
      </h1>
      <h2 class="subtitle">
        手軽にクイズを楽しめるWebアプリケーションです。
      </h2>
      <el-row :gutter="20" class="recommended">
        <el-col :md="6" :xs="24" v-for="item in recommended" :key="item.id">
          <el-card :body-style="{ padding: '20px' }">
            <nuxt-link :to="`/${item.id}`"
              ><img :src="item.image.url" class="image"
            /></nuxt-link>
            <div style="padding: 14px;">
              <span>{{ item.title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.createdAt }}</time>
                <nuxt-link :to="`/${item.id}`">
                  <el-button type="text" class="button">Open</el-button>
                </nuxt-link>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="block">
        <el-pagination
          @current-change="paging"
          :page-size="limit"
          :total="totalCount"
          layout="prev, pager, next"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  data: () => {
    return {
      recommended: [],
      totalCount: 0,
      offset: 0,
      limit: 4,
      page: 1
    }
  },
  computed: {
    pageTotal() {
      return Math.ceil(this.totalCount / this.limit)
    }
  },
  created() {
    this.$axios
      .$get('quiz', {
        params: {
          limit: this.limit
        }
      })
      .then((res) => {
        this.recommended = res.contents
        this.totalCount = res.totalCount
        this.offset = res.offset
      })
  },
  methods: {
    paging(num) {
      this.page = num
      this.offset = this.limit * (num - 1)
      this.$axios
        .$get('quiz', {
          params: {
            limit: this.limit,
            offset: this.offset
          }
        })
        .then((res) => {
          this.recommended = res.contents
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 10px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-bottom: 50px;
}

.recommended {
  margin-top: 50px;
  img {
    width: 100%;
  }
  .el-col {
    margin-top: 20px;
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.el-pagination {
  padding: 30px 0;
}

.block {
  clear: both;
}
</style>
