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