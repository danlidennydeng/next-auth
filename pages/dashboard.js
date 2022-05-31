import { useSession, signIn } from "next-auth/react"


function Dashboard() {
  
  const {data: session, status} = useSession()

  if(status === 'loading') {
    return <h2>Loading...</h2>
  }

  if(status === 'unauthenticated') {
    return <h2>Access Denied</h2>
  }

  return <h1>{session.user.name}, Dashboard, you are signin</h1>
}

export default Dashboard