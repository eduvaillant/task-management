export interface Hasher {
  hash(data: string): Promise<string>
  compare(data: string, hash: string): Promise<boolean>
}
