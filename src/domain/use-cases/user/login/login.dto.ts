export type LoginUseCaseCommand = {
  username: string
  password: string
}

export type LoginUseCaseOutput = {
  accessToken: string
}
