import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
// import clientPromise from "../lib/mongodb"

export default NextAuth({
  
  // adapter: MongoDBAdapter(clientPromise),

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  
  // database: process.env.MONGODB_URI,
  
  // session: {
  //   strategy: "jwt",
  // },
  // jwt: {
  //   maxAge: 60 * 60 * 24 * 30,
  // }
})