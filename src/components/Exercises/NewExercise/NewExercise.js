import { useState } from 'react';


import classes from './NewExercise.module.css';
import NewExerciseForm from './NewExerciseForm';

const NewExercise = props => {

    const [isEditing, setIsEditing] = useState(false);
    
    const showFormHandler = () => {
        setIsEditing(true);
    }

    const closeFormHandler = () => {
        setIsEditing(false);
    }
    
    const addNewHandler = exercise => {
        const NewExercise = {
            ...exercise,
            id: Math.random().toString(),
        }
        props.onAddNewExercise(NewExercise);
        }
    
    return <div className={classes["new-exercise"]}>
        {!isEditing && <button onClick={showFormHandler}>Add new exercise</button>}
        {isEditing && <NewExerciseForm onAddNew={addNewHandler} onCloseForm={closeFormHandler}/>}
    </div>
}

export default NewExercise;