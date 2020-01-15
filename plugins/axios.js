export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    config.headers.common['X-API-KEY'] = process.env.API_KEY
    console.log(process.env.API_KEY);
    config.headers.common.Accept = 'application/json'
  })

  $axios.onError(() => {
    redirect('/404')
  })
}
