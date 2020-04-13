import React from 'react';
import {Label, Input} from 'reactstrap';

const LongUrlInput = (props) => {
    return (
        <div className="mb-2 full-width-text" >
            <Label for="longUrl">Long URL:   </Label>
            <Input type="textarea" className="full-width-text" id="longUrl" value={props.longUrl} onChange={props.onFieldChange} />
        </div>
    )
}

export default LongUrlInput;
