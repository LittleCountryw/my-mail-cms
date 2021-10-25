//方式一：手动切换不同的环境（不推荐）
// const BASE_URL = 'http://coderwhy.org/dev'
// const BASE_NAME = 'coderwhy'

// const BASE_URL = 'http://coderwhy.org/prod'
// const BASE_NAME = 'kobe'

// const BASE_URL = 'http://coderwhy.org/test'
// const BASE_NAME = 'james'

//方式二：根据process.env.NODE_ENV区分
//实际开发中这种用法最多
//开发环境:development
//生产环境:production
//测试环境:test

let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // BASE_URL = '/api'
  BASE_URL = 'http://152.136.185.210:5000'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
} else {
  BASE_URL = 'http://coderwhy.org/test'
}

export { BASE_URL, TIME_OUT }

//注意:ES6语法不允许 let variable = xxx
//                  export variable

//只允许 export let variable或如上写法
