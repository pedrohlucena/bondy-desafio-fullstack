import cookie from 'cookie'

const httpHeadersPlugin = {
  requestDidStart() {
    return {
      willSendResponse(requestContext) {
        const { setHeaders = [], setCookies = [] } = requestContext.contextValue

        // inform user about wrong usage
        if (!Array.isArray(requestContext.contextValue.setHeaders)) {
          console.warn('setHeaders is not in context or is not an array')
        }

        if (!Array.isArray(requestContext.contextValue.setCookies)) {
          console.warn('setCookies is not in context or is not an array')
        }

        if (setCookies.length > 1) {
          // dont allow to set multiple cookies because that wouldnt work (limitation in apollo-server)
          throw new Error(
            'multiple cookies in setCookies provided but because of limitations in apollo-server only one cookie can be set'
          )
        }

        // set headers
        setHeaders.forEach(({ key, value }) => {
          requestContext.response.http.headers.append(key, value)
        })

        // set cookies
        setCookies.forEach(({ name, value, options }) => {
          const cookieString = cookie.serialize(name, value, options)
          requestContext.response.http.headers.set('Set-Cookie', cookieString)
        })

        return requestContext
      },
    }
  },
}

export default httpHeadersPlugin
