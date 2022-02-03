import React, {useEffect} from 'react'
import Link from './Link'
import {useQuery, gql} from '@apollo/client';

export const FEED_QUERY = gql`
    query {
        feed {
            count
            links {
                id
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`

const LinkList = () => {
    const {data, loading, refetch} = useQuery(FEED_QUERY)

    useEffect(() => {
        if (!loading) {
            refetch()
        }
    }, [loading, refetch])

    return (
        <div>
            {data && (
                <>
                    {data.feed.links.map((link, index) => (
                        <Link key={link.id} link={link} index={index}/>
                    ))}
                </>
            )}
        </div>
    )
}

export default LinkList
