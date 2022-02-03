import './App.css'
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_USER} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {
    const {data, loading, refetch} = useQuery(GET_ALL_USERS)
    const {data: user, loading: loadingUser} = useQuery(GET_USER, {
        variables: {
            id: 1
        }
    })
    const [createUser] = useMutation(CREATE_USER)

    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [age, setAge] = useState(0)

    console.log(!loadingUser && user)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    if (loading) {
        return <h1>Loading...</h1>
    }

    const addUser = async e => {
        e.preventDefault()

        await createUser({
            variables: {
                input: {
                    username, age
                }
            }
        })

        setUsername('')
        setAge(0)
    }

    const getAll = async e => {
        e.preventDefault()

        await refetch()
    }

    return (
        <div>
            <form>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text"/>
                <input value={age} onChange={e => setAge(Number(e.target.value))} type="number"/>

                <div className="btns">
                    <button onClick={addUser}>Создать</button>
                    <button onClick={getAll}>Получить</button>
                </div>
            </form>

            <div>
                {users.map(user => (
                    <div key={user.id} className="user">{user.id}. {user.username} {user.age}</div>
                ))}
            </div>
        </div>
    )
}

export default App;
