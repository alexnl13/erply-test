import React, {Component} from 'react';
import axios from 'axios';

import Input from '../../UI/Input/Input';
import './Form.css';
import Loader from '../../UI/Loader/Loader';

class Form extends Component {
    state = {
        loading: false,
        reqVat: '',
        reqVatValid: false,
        reqResult: null,
        error: false,
        formInputTouched: false
    };

    onSubmitHandler = (event) => {
        if(event )event.preventDefault();
        if(this.state.reqVatValid) {
            this.setState({loading: true});
            const query = 'https://vat.erply.com/numbers?vatNumber=' + this.state.reqVat;
            axios.get(query)
                .then(response => {
                    this.setState({reqResult: response.data, loading: false, error: false});
                })
                .catch(error => {
                   this.setState({reqResult: null, error: true, loading: false});
                });
        }
    };

    inputChangedHandler = (event) => {
        this.setState({formInputTouched: true});
        let reqVat = event.target.value;
        reqVat = reqVat.replace(/\s/g, "");
        const reqVatValid = this.isValid(reqVat);
        this.setState({reqVat: reqVat, reqVatValid: reqVatValid});
    };

    //assuming EU vat should be longer than 8 digits
    isValid = (value) => {
        return value.trim() !== '' && value.replace(/\s/g, "").length > 7;
    };

    render() {
        let result = [];
        if (this.state.reqResult) {
            if(this.state.reqResult.Valid) {
                const response = this.state.reqResult;
                result = [];
                for (let el in response) {
                    result.push(<p key={el}><strong>{el}</strong>: {response[el].toString()}</p>);
                }
            } else {
                result = <p className="Error">VAT does not exist or invalid VAT number.</p>
            }
        }
        let error = null;
        if (this.state.error) {
            error = <p className="Error">Error. Unable to get the result.</p>;
        }
        if(this.state.loading){
            result = <Loader/>
        }

        return (
            <form className="Form" onSubmit={this.onSubmitHandler}>
                <fieldset className="FormContainer">
                    <Input
                        htmlAttributes={{
                            type: "text",
                            placeholder: "VAT number",
                            onChange: this.inputChangedHandler,
                            maxLength: "20",
                            value: this.state.reqVat
                        }}
                        label="Enter VAT number to check"
                        invalid={!this.state.reqVatValid}
                        touched={this.state.formInputTouched}
                    />
                    <button className="FormButton" type="submit" disabled={!this.state.reqVatValid}>CHECK</button>
                </fieldset>

                <fieldset className="FormContainer ResultContainer">
                    {result}
                    {error}
                </fieldset>
            </form>
        );
    }
}

export default Form;