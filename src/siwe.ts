// Minimal SIWE message builder (EIP-4361)
interface SiweFields {
  domain: string
  address: string
  statement: string
  uri: string
  version: string
  chainId: number
  nonce: string
}

export class SiweMessage {
  domain: string
  address: string
  statement: string
  uri: string
  version: string
  chainId: number
  nonce: string
  issuedAt: string

  constructor(fields: SiweFields) {
    this.domain = fields.domain
    this.address = fields.address
    this.statement = fields.statement
    this.uri = fields.uri
    this.version = fields.version
    this.chainId = fields.chainId
    this.nonce = fields.nonce
    this.issuedAt = new Date().toISOString()
  }

  prepareMessage(): string {
    const header = `${this.domain} wants you to sign in with your Ethereum account:`
    const uriField = `URI: ${this.uri}`
    const versionField = `Version: ${this.version}`
    const chainField = `Chain ID: ${this.chainId}`
    const nonceField = `Nonce: ${this.nonce}`
    const issuedAtField = `Issued At: ${this.issuedAt}`

    return [
      header,
      this.address,
      '',
      this.statement,
      '',
      uriField,
      versionField,
      chainField,
      nonceField,
      issuedAtField,
    ].join('\n')
  }
}
