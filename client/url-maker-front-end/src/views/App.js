import React, { Component } from 'react';
import { Form, InputGroup, Button, Label } from 'reactstrap';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { generateRandomUrl, generateCustomUrl, retrieveByShortUrl, deleteByShortUrl } from '../redux/actions';
import '../styles/App.css';
import CustomUrlCheckBox from  '../components/customUrlCheckbox'
import RadioButtons from '../components/CRUDRadioButtons'
import LongUrlInput from '../components/LongUrlInput'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     longUrl: "",
     shortUrl: "",
     checkbox: false,
     urlFunctionOption:"create"
    }
  }

  handleOnFieldChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleCheckboxChange = (event) => {
    console.log(!event.target.checked)
    this.setState({ [event.target.id]: event.target.checked});
  }

  handleSubmit = () => {
      if (this.state.urlFunctionOption === "create") {
      this.state.checkbox ? 
      this.props.addCustom(this.state.longUrl, this.state.shortUrl):
      this.props.addRandom(this.state.longUrl, this.state.shortUrl)
      } else if (this.state.urlFunctionOption === "delete") {
        this.props.delete(this.state.shortUrl);
      } else if ("retrieve") {
        this.props.retrieve(this.state.shortUrl)
      }

  }

  handleRadioButtonChange = (event) => {
    this.setState({ urlFunctionOption: event.target.id });
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Short URL Generator</h1>
          </header>  
          <Container>
            <Row>
              <Col>
              {/* Radio Buttons for CRUD operations */}
              <RadioButtons 
                checkboxOption={ this.state.urlFunctionOption }
                optionChange={ this.handleRadioButtonChange }/>
              </Col>
              <Col>
                <Form inline>
                
                {/* Long URL Text Field */}
                { this.state.urlFunctionOption === "retrieve" || this.state.urlFunctionOption === "delete" ?
                "" : <LongUrlInput longUrl={this.state.longUrl} onFieldChange={this.handleOnFieldChange}/>
                }      

                {/* Customized Short URL Text Field */}
                  {(this.state.checkbox && this.state.urlFunctionOption === "create") ? "":
                    <InputGroup>
                      <Label for="shortUrl">Short URL: </Label>
                      <input type="text" id="shortUrl" value={this.state.shortUrl} onChange={this.handleOnFieldChange} />
                    </InputGroup> 
                  }

                  {/* Checkbox for Create */} 
                  { this.state.urlFunctionOption === "create" ?
                    <CustomUrlCheckBox checkboxChange={this.handleCheckboxChange}/> : ""
                  }

                <Button className="custom-blue mb-3 " color="secondary" size="small"
                  onClick={() => this.handleSubmit()}>
                    Submit</Button>
                </Form>
              </Col>
            </Row>
          </Container>  
          <p>{this.props.receivedLongUrl}</p>
          <p>{this.props.receivedShortUrl}</p>  
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    addRandom: (longUrl, shortUrl) => dispatch(generateRandomUrl(longUrl, shortUrl)),
    addCustom: (longUrl, shortUrl)  => dispatch(generateCustomUrl(longUrl, shortUrl)),
    retrieve: (shortUrl) => dispatch(retrieveByShortUrl(shortUrl)),
    delete: (shortUrl) => dispatch(deleteByShortUrl(shortUrl))
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
