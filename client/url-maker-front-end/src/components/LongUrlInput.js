import React from 'react';
import {InputGroup, Label, Input} from 'reactstrap';

const LongUrlInput = (props) => {
    return (
        <div className="mb-2" >
            <Label for="longUrl">Long URL:   </Label>
            <Input type="textarea" className="w-100" bsSize="sm" id="longUrl" value={props.longUrl} onChange={props.onFieldChange} />
        </div>
    )
}

export default LongUrlInput;
