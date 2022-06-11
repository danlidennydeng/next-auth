import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"
import { getToken } from 'next-auth/jwt'

export default NextAuth({
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  
  adapter: MongoDBAdapter(clientPromise),

  // session: {
  //   strategy: "jwt",
  // },

  // jwt: {
  //   secret: 'randomhfunvvpnvaagnvalk',
  // },

  // callbacks: {
  //   async jwk({token, user}) {
  //     if(user) {
  //       token.id = user.id
  //     }
  //     return token
  //   },

  //   async session({session, token}) {
  //     session.user.id = token.id
  //     return session
  //   }
  // }
})
