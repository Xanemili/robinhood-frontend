// https://read.reduxbook.com/markdown/part2/13-authenticated-requests.html

const auth =  onAuthFailure => (url, opts) => {
  const headers = {
    token: getTokenFromLocalStorage()
  }

  const combinedOptions = Object.assign({}, { headers }, opts)
  return (
    fetch('localhost:8000/' + url, combinedOptions)
      .then(res => {
        if (res.statusCode === 401) {
          throw Error('rejected')
        }

        return res.json()
      })
      .catch(err => {
        if (err.message === 'Rejected') {
          // error handle rejection messages here
          onAuthFailure()
          return
        }

        throw err
      })
  )
}

export const getTokenFromLocalStorage = async () => {
  return window.localStorage.getItem('token')
}

export default auth;

// export const doLogout = (broadcast = true) => ({ dispatch }) => {
//   dispatch({ type: actions.DO_LOGOUT })
//   try {
//     if (broadcast) {
//       window.localStorage.logout = true
//     }
//     window.localStorage.clear()
//   } catch (err) {
//     return err
//   }
//   clearAllCached().then(() => {
//     window.location = '/'
//   })
// }
