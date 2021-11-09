import React, { useState } from 'react';
import todo from '../images/todolist1.png';
import '../css/todo.css';

const Todo = () => {

    const [inputData , setInputData] = useState('');
    const [items,setItems] = useState([]);
    const [toggleSubmit,setToggleSubmit] = useState(true);
    const [editItemID,seteditItemID] = useState('');

    const AddItem = () => {
        if(!inputData){
            return;
        }
        else if(inputData && !toggleSubmit){
            setItems(
                items.map((elem) => {
                    if(elem.id === editItemID){
                       return {
                           ...elem,
                           name: inputData
                       }
                    }
                    setToggleSubmit(true);
                    return elem;
                })
            );
        }
        else{
            const allInputData = {
                id : new Date().getTime().toString(),
                name : inputData
            }
            setItems([...items,allInputData]);
        }      
        setInputData('');
    }

    const deleteItem = (id) => {
        const updateItems = items.filter((elem) => {
            return elem.id !== id;
        });
        setItems(updateItems);
    }

    const editItem = (id) => {
        const getItem = items.filter((elem) => {
            return elem.id === id;
        });
        setInputData(getItem[0].name);
        setToggleSubmit(false);
        seteditItemID(id);
    }

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src={todo} alt="todologo" widt="150" height="150" />
                    </figure>
                    <figcaption><i className="fas fa-list"></i> Add Your List Here</figcaption>
                    <br />
                    <div className="additems">
                        <input type="search" value={inputData} 
                        onChange={ (event) => { setInputData(event.target.value); } } placeholder="Add Items..." />
                        {
                            toggleSubmit ? <i className="fas fa-plus-circle add-btn" title="Add Item"
                            onClick={AddItem}></i> : <i className="fas fa-edit add-btn" title="Update Item"
                            onClick={AddItem}></i>
                        }
                        
                    </div>
                    <br />
                    <div className="showitems">
                        {
                            items.map( (elem)=>{
                                return (
                                    <> 
                                        <div className="eachitem" key={ elem.id }>
                                            <h3>{ elem.name }</h3> &nbsp;
                                            <i className="fas fa-edit edit-item" title="Edit Item" onClick={ () => editItem(elem.id)  }></i>
                                            <i className="fas fa-trash-alt remove-item" title="Delete Item" onClick={ () => deleteItem(elem.id)}></i>
                                        </div>
                                        <br />
                                    </>
                                );
                            })
                        }
                    </div>
                    <div className='btn'>
                        <button onClick={() => { setItems([]); }}>Remove All</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;