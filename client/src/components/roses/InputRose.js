
import React, {Fragment, useState} from 'react';

const InputRose  = () => {

    const [description, setDescription] = useState("");

    return (
        <Fragment>
            <h1>Input Rose!</h1> 
            <form>
             <input type="text"/>
                <button>Add</button>
            </form>
        </Fragment>
    );
}
 
export default InputRose;