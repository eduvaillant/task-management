export class ConflictError extends Error {
  messages: string[]
  constructor(messages: string[]) {
    super()
    this.messages = messages
  }
}
