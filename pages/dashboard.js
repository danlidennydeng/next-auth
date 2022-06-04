import { useSession, signIn } from "next-auth/react"
import Link from 'next/link'

function Dashboard() {
  
  const {data: session, status} = useSession()

  if(status === 'loading') {
    return <h2>Loading...</h2>
  }

  if(status === 'unauthenticated') {
    return (
      <div><h2>Dashboard Page Access Denied</h2>
      <Link href='/api/auth/signin'>
            <a>Sign In</a>
          </Link></div>
      
    )
  }

  return <h1>{session.user.name}, Dashboard, you are signin</h1>
}

export default Dashboard