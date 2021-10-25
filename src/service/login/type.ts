export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

//如果想像上面一样更加详细的获取data的类型，则可以再定义接口，
//此处为了方便不再进一步详细，而是还使用data:any
//export interface IUserInfo
