const dbBaseUrl = process.env.REACT_APP_DB_SERVER_BASE_URL

export default {
  dbBaseUrl,
  endpoints: {
    getTransactions: `${dbBaseUrl}/transactions`,
    addTransaction: `${dbBaseUrl}/transaction`,
    getCurrency: `${dbBaseUrl}/currencies`,
    getPrice: 'https://brainblocks.io/api/exchange',
    brainBlocksVerify: 'https://brainblocks.io/api/session'
  }
}
