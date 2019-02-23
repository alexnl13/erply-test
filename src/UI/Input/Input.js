import React from 'react';
import './Input.css';

const input = (props) => {
    let inputClasses = ["InputElement"];
    if(props.invalid && props.touched && props.htmlAttributes.value !== '') {
        inputClasses.push("Invalid");
    }
    const htmlAttributes = props.htmlAttributes;
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            <input className={inputClasses.join(' ')} {...htmlAttributes}/>
        </div>
    );
};
export default input;