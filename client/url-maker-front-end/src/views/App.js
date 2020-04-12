import React, { Component } from 'react';
import { Form, InputGroup, Input, Button, FormGroup, Label, CustomInput } from 'reactstrap';
import { connect } from 'react-redux';
import { generateRandomUrl, generateCustomUrl } from './redux/actions';
import './styles/App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     longUrl: "",
     shortUrl: "",
     checkbox: false
    }

    this.onFieldChange = this.onFieldChange.bind(this);
    this.checkboxChange = this.checkboxChange.bind(this);
  }

  onFieldChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  checkboxChange(event) {
    console.log(!event.target.checked)
    this.setState({ [event.target.id]: event.target.checked});
  }

  handleSubmit() {
    this.state.checkbox ? 
    this.props.addCustom(this.state.longUrl, this.state.shortUrl):
    this.props.addRandom(this.state.longUrl, this.state.shortUrl)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Short URL Generator</h1>

          <FormGroup>
        <Label for="exampleCheckbox">Radios</Label>
        <div>
          <CustomInput type="radio" id="create" label="create" checked="true" />
          <CustomInput type="radio" id="retrieve"  label="retrieve" />
          <CustomInput type="radio" id="edit" label="edit"  />
          <CustomInput type="radio" id="delete" label="delete" />
        </div>
      </FormGroup>
          
          <Form inline>
            {/*Long URL Text Field */}
            <InputGroup>
            <Label for="longUrl">Long URL:   </Label>
              <Input type="text" id="longUrl" value={this.state.longUrl} onChange={this.onFieldChange} />
            </InputGroup>

            {/*Customized Short URL Text Field */}
            {this.state.checkbox ? 
            <InputGroup>
              <Label for="shortUrl">Short URL: </Label>
              <Input type="text" id="shortUrl" value={this.state.shortUrl} onChange={this.onFieldChange} />
            </InputGroup> : ""}
            <Button className="custom-blue mb-3" 
              onClick={() => this.handleSubmit()}>
                Make Short Url</Button>
            <FormGroup check>
            <Label check>
              <Input type="checkbox" id="checkbox" onChange={this.checkboxChange} /> Add Custom Short Url
            </Label>
            </FormGroup>
          </Form>
              <p>{this.props.receivedLongUrl}</p>
              <p>{this.props.receivedShortUrl}</p>
    </header>
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    addRandom: (longUrl, shortUrl) => dispatch(generateRandomUrl(longUrl, shortUrl)),
    addCustom: (longUrl, shortUrl)  => dispatch(generateCustomUrl(longUrl, shortUrl))
  }
}

const mapStateToProps = function (state, props) {
  return{
    message: state.feedback.message,
    receivedLongUrl: state.urlLinks.displayLongUrl,
    receivedShortUrl: state.urlLinks.displayShortUrl
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
