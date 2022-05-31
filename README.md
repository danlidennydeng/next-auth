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