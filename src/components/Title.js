import React from 'react';
const Title = (props) => {
    return (
        <React.Fragment>
            <h1>ToDo App</h1>
            <h3>Ilość zadań do zrobienia {props.data.length}</h3>
        </React.Fragment>
    );
}

export default Title;