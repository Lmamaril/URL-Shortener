import React from 'react';
import { Label, Input, FormGroup} from 'reactstrap'

const CustomUrlCheckbox = (props) => {
    return (
        <FormGroup check>
            <Label check>
            <Input type="checkbox" id="checkbox" onChange={props.checkboxChange} /> Add Custom Short Url
            </Label>
        </FormGroup>
    )
}

export default CustomUrlCheckbox;
