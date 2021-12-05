export const convertTypeToMessage = (type: string) => {
  const action_array = type.split('/')

  if (action_array && action_array[1]) {
    return action_array[1].replace(/([a-z])([A-Z])/, '$1 $2').replace(/^./, function (str) { return str.toUpperCase(); })
  }

  return null
}
