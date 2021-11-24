
interface clientAPI {
  method: string
  body?: {}
  customConfig: any
}

export async function client(endpoint: string, clientAPI: clientAPI) {
  const { body, customConfig, method} = clientAPI
  const headers = {'Content-Type': 'application/json'}

  const config = {
    method: body,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    body: {}
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await fetch(endpoint, config)
    data = await response.json()
    if(response.ok) {
      return data
    }
    throw new Error(response.statusText)
  } catch(err: any) {
    return Promise.reject(err.message ? err.message: data)
  }
}
