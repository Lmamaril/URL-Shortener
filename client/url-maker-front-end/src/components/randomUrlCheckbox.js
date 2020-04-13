import React from 'react';
import { Label, Input, FormGroup} from 'reactstrap'

const RandomCheckbox = (props) => {
    return (
        <FormGroup check>
            <Label check>
            <Input type="checkbox" id="checkbox" onChange={props.checkboxChange} /> Generate Random Short Url
            </Label>
        </FormGroup>
    )
}

export default RandomCheckbox;
