import React from 'react';
import { FormGroup, Label, CustomInput } from 'reactstrap';

const CRUDRadioButtons = (props) => {

    return(
        <FormGroup >
            <Label for="urlFunctionCheckbox">Radios</Label>
            <div >
                <CustomInput className="left" type="radio" id="create" label="create" 
                    checked={props.checkboxOption === 'create'}
                    onChange={(event)=> props.optionChange(event)} default/>
                <CustomInput className="left" type="radio" id="retrieve" label="retrieve" 
                    checked={props.checkboxOption === 'retrieve'}
                    onChange={(event)=> props.optionChange(event)} />
                <CustomInput type="radio" id="edit" label="edit"
                    checked={props.checkboxOption === 'edit'}
                    onChange={(event)=> props.optionChange(event)}   />
                <CustomInput type="radio" id="delete" label="delete"
                    checked={props.checkboxOption === 'delete'}
                    onChange={(event)=> props.optionChange(event)}  />
            </div>
        </FormGroup>
    )
}


export default CRUDRadioButtons;
