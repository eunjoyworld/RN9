import {sign, verify} from 'jsonwebtoken'
// prettier-ignore
import type {SignOptions, Secret, VerifyOptions, VerifyErrors} from 'jsonwebtoken'

const secret = 'very important secret'

// prettier-ignore
export const jwtSign = (
  payload: string | Buffer | object, options: SignOptions = {}
) => new Promise<string>((resolve, reject) => {
    sign(payload, secret, options, (err?: any, signingKey?: Secret) => {
      if (err) reject(err)
      else resolve(signingKey as string)
    })
  })
// prettier-ignore
export const jwtVerify = <T extends object>(token: string, options: VerifyOptions = {}) =>
  new Promise<T>((resolve, reject) => {
    verify(token, secret, options,
      (err: VerifyErrors | null, decoded: object | undefined) => {
        if (err) reject(err)
        else if (decoded) {
          resolve(decoded as T)
        }
      }
    )
  })
