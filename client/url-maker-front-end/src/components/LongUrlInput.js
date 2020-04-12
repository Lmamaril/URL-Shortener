import React from 'react';
import {InputGroup, Label, Input} from 'reactstrap';

const LongUrlInput = (props) => {
    return (
        <InputGroup>
            <Label for="longUrl">Long URL:   </Label>
            <Input type="text"  bsSize="sm" id="longUrl" value={props.longUrl} onChange={props.onFieldChange} />
        </InputGroup>
    )
}

export default LongUrlInput;
