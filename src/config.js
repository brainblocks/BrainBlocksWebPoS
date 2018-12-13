const dbBaseUrl = process.env.REACT_APP_DB_SERVER_BASE_URL
const gaId = process.env.REACT_APP_GOOGLE_ANALYTICS_ID

export default {
  dbBaseUrl,
  gaId,
  endpoints: {
    getTransactions: `${dbBaseUrl}/transactions`,
    addTransaction: `${dbBaseUrl}/transaction`,
    getCurrency: `${dbBaseUrl}/currencies`,
    getPrice: 'https://brainblocks.io/api/exchange',
    brainBlocksVerify: 'https://brainblocks.io/api/session'
  }
}
