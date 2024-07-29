interface Error {
  extensions: {
    code: string
  }
}

export default interface ApolloNetworkError {
  result: {
    errors: Error[]
  }
}
