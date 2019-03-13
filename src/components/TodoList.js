import React from 'react';

const TodoList = (props) => {

    const tasks = props.data.map(data => <li onClick={() => props.remove(data.id)} key={data.id}>Zadanie {data.id}: {data.text} </li>)
    console.log(tasks);

    return (
        <ul>
            {tasks}

        </ul>);
}

export default TodoList;