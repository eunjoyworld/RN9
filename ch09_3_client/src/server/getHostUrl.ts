export const getHostUrl = (path: string) => {
  const protocol = 'http'
  const ip = '192.168.123.107'
  const port = 4000
  return `${protocol}://${ip}:4000${path}` // http://192.168.1.69:4000/auth/login
}
