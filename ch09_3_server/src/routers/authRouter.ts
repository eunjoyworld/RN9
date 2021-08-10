import {Router} from 'express'
import {IJWTDecoded} from './IJWTDecoded'
import * as U from '../utils'

export const authRouter = () => {
  const router = Router()
  return router
    .post('/signup', async (req, res) => {
      const {name, email, password} = req.body
      console.log('signup', name, email, password)
      const jwt = await U.jwtSign(
        {email, name, password, provider: 'local'},
        {expiresIn: '9999 years'} // 회원 가입 토큰 이므로 영구히 유지되도록 합니다.
      )
      res.json({jwt})
    })
    .post('/login', async (req, res) => {
      const {authorization} = req.headers || {}
      if (!authorization) {
        res.json({sucess: false, message: 'no jwt'})
        return
      }

      const {email, password} = req.body
      const jwt = authorization.split(' ')[1]
      if (!jwt || jwt.length < 0) {
        res.json({sucess: false, message: 'no jwt'})
        return
      }
      try {
        const decoded = await U.jwtVerify<IJWTDecoded>(jwt)
        console.log('email', email, decoded.email)
        console.log('password', password, decoded.password)
        if (email !== decoded.email) {
          res.json({
            sucess: false,
            message: `죄송합니다.\n누구신지 모르겠어요.`
          })
        }
        if (password !== decoded.password) {
          res.json({
            sucess: false,
            message: `패스워드가 틀립니다.`
          })
        } else
          res.json({
            success: true,
            provider: decoded.provider,
            name: decoded.name,
            message: `환영합니다 ${decoded.name}님.`
          })
      } catch (e) {
        res.json({success: false, message: e.message})
      }
    })
}
