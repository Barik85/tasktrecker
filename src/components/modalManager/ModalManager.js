import React, { Component } from 'react';


import NewTaskModal from "../modals/newTaskModal/NewTaskModal";

class ModalManager extends Component {

    state = {
        modalIsOpen: true
    };

    render() {
       
    return (
        
            <NewTaskModal />
         
    
    )
    }
}

export default ModalManager;
