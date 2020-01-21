<template>
  <div id="quiz" class="container">
    <div class="container-in">
      <h1 class="title">{{ title }}</h1>
      <div class="image"><img :src="image.url" /></div>
      <div v-html="content" class="content"></div>
      <h2 class="subtitle">答え</h2>
      <div v-if="showAnswer" v-html="answer" class="answer"></div>
      <el-button v-else @click="openAnswer" class="answer-btn" type="success"
        >答えを見る</el-button
      >

      <el-row :gutter="20" class="recommended">
        <el-col :md="6" :xs="24" v-for="item in recommended" :key="item.id">
          <Card
            :id="item.id"
            :src="item.image.url"
            :title="item.title"
            :created="item.createdAt"
          />
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
import Card from '~/components/Card.vue'

export default {
  components: {
    Card
  },
  data: () => {
    return {
      title: '',
      content: '',
      answer: '',
      image: {},
      showAnswer: false,
      recommended: [],
      totalCount: 0,
      offset: 0,
      limit: 4,
      page: 1
    }
  },
  async asyncData({ $axios, params }) {
    const res = await $axios.$get(`quiz/${params.id}`)
    return res
  },
  created() {
    this.$axios
      .$get('quiz', {
        params: {
          limit: 4
        }
      })
      .then((res) => {
        this.recommended = res.contents
      })
    this.paging(1)
  },
  methods: {
    openAnswer() {
      this.showAnswer = true
    },
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
          this.totalCount = res.totalCount
        })
    }
  }
}
</script>

<style lang="scss">
#quiz.container {
  margin: 0 auto;
  text-align: center;
  max-width: 1180px;
  padding-bottom: 50px;

  .container-in {
    margin: 0 10px;
  }

  .recommended {
    margin-top: 50px;
    .el-col {
      margin-top: 20px;
    }
  }

  .title {
    display: block;
    font-weight: 300;
    font-size: 32px;
    color: #35495e;
    letter-spacing: 1px;
    padding: 20px 0;
  }

  .image {
    max-width: 500px;
    margin: auto;
    img {
      width: 100%;
    }
  }

  .subtitle {
    font-size: 20px;
    color: #526488;
    padding-top: 60px;
    padding-bottom: 15px;
  }

  .answer-btn {
    margin-top: 10px;
  }

  .answer {
    border: 1px solid #ddd;
    padding: 30px;
    border-radius: 8px;
    img {
      max-width: 100%;
    }
  }

  .links {
    padding-top: 15px;
  }

  .el-pagination {
    padding: 30px 0;
  }

  .block {
    clear: both;
    text-align: center;
  }
}
</style>
