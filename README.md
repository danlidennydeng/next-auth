Chapter 66 - 72

Chapter 70

next-auth has updated to version 4 since the youtube video. Thus,

In recent Update Code should be look like this----
At first wrap your _app.js by SessionProvider
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: {session, ...pageProps }}) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

=> useSession will then have access to the session data and status. Now go to Navbar.js

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <nav className="header">
      <h1 className="logo">
        <a href="#">NextAuth</a>
      </h1>
      <ul className="main-nav">
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/blog">
            <a>Blog</a>
          </Link>
        </li>
        {!session && status == "unauthenticated" && (
          <li>
            <Link href="/api/auth/signin">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signIn('github');
                }}
              >
                Sign In
              </a>
            </Link>
          </li>
        )}

        {session && status == 'authenticated' && (
          <li>
            <Link href="/api/auth/signout">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign Out
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

==================================================================================

Chapter 71

import {useSession, signIn} from 'next-auth/react';


function Dashboard(){
    
    const {status} = useSession();
    
    if(status === 'loading'){
        return <h2>Loading...</h2>
    }
    if(status === 'unauthenticated'){
        return <h2>Access Denied</h2>
    }

    return(
        <>
            <h1>Protected page</h1>
            <p>You can view Dashboard Page, because you are Signed In</p>
        </>
    )
}

export default Dashboard;

==================================================================================

Chapter 73

import { getSession } from 'next-auth/react';

function Blog({blogsdata}){
    return <h1>Blog Page - {blogsdata}</h1>
}

export default Blog


export async function getServerSideProps(context){
    const session = await getSession(context);
    console.log(session)
    return {
        props:{
            blogsdata : session  ? 'List of 100 personalizedblogs' : 'List of free blogs'
        },
    }
}

---------------------------------------

did not pay too much attention to flicking...I will come back to study more about it.

---------------------------------------

What are the differences in between client-side authentication and server-side authentication?

Server side won't render if user is not authed. While with client side you still render the ui to the user,  then try to auth him, and then populate it (or not if he's not authorized). If you want to protect the UI or maybe other reasons to not render anything to the user if he's not authed then you need server-side authentication.

Should I use both? They seems so.

Chapter 76

Next Auth Basics tutorial | Add Google, GitHub, Twitter, and Email authentication in Next.js project by Clues Coding
https://youtu.be/tgrvKGPmI04
at 51:12

In [...nextauth].js file,

import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./lib/mongodb"

export default NextAuth({
  
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
  ],
  
  adapter: MongoDBAdapter(clientPromise),

})

This would create an account, session, users collections in MongoDB Atlas automatically.

account: account from github
session: session ID will expires after one month, the default
users: user information, including user name, email, etc


Account ID: 629d5016c94e7596e9fb5bd7
#keeps the same after each signin, signout or each session from github

providerAccountId: "5419435"
#keeps the same after each signin, signout or each session

access_token: "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"
#access_token keeps the same after each signin, signout, or each session.

session ID: 629d5167c94e7596e9fb5bd9
sessionToken: se5bcc0e5-310a-4118-ba47-4314f0c91b29
#both session ID and sessionToken changes after each signin, signout or each session even for the same user.

User ID:    629d5016c94e7596e9fb5bd6
#keeps the same after each signin, signout, or each session.