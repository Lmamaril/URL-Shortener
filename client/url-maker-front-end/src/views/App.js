import React, { Component } from 'react';
import { Form, Button, Label, Input, FormText } from 'reactstrap';
import { Row, Col, Container } from 'reactstrap';
import { connect } from 'react-redux';
import { generateRandomUrl, generateCustomUrl, retrieveByShortUrl, deleteByShortUrl, editByLongUrl } from '../redux/actions';
import '../styles/App.css';
import RandomUrlCheckBox from  '../components/randomUrlCheckbox'
import RadioButtons from '../components/CRUDRadioButtons'
import LongUrlInput from '../components/LongUrlInput'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
     longUrl: "",
     shortUrl: "",
     checkbox: false,
     urlFunctionOption: "create"
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
      this.props.addRandom(this.state.longUrl, this.state.shortUrl):
      this.props.addCustom(this.state.longUrl, this.state.shortUrl)
      } else if ( this.state.urlFunctionOption === "delete") {
        this.props.delete(this.state.shortUrl);
      } else if (this.state.urlFunctionOption === "retrieve") {
        this.props.retrieve(this.state.shortUrl)
      } else if (this.state.urlFunctionOption === "edit") {
        this.props.edit(this.state.longUrl, this.state.shortUrl)
      }

  }

  handleRadioButtonChange = (event) => {
    this.setState({ urlFunctionOption: event.target.id });
  }
    
  render() {
    return (
      <div className="App">
        <header className="App-header my-4">
          <h1>Short URL Generator</h1>
          </header>  
          <Container>
            <Row className="justify-content-center">
              <Col xs="3" sm="2" md="2">
              {/* Radio Buttons for CRUD operations */}
              <RadioButtons 
                checkboxOption={ this.state.urlFunctionOption }
                optionChange={ this.handleRadioButtonChange }/>
              </Col>
              <Col xs="7" sm="5" md="4">
                <Form inline>
                
                {/* Long URL Text Field */}
                { this.state.urlFunctionOption === "retrieve" || this.state.urlFunctionOption === "delete" ?
                "" : <LongUrlInput className="full-width-text" longUrl={this.state.longUrl} onFieldChange={this.handleOnFieldChange}/>
                }      

                {/* Customized Short URL Text Field */}
                  {!(this.state.checkbox && this.state.urlFunctionOption === "create") ?
                    <div className="full-width-text">
                      <Label for="shortUrl">Short URL: </Label>
                      <Input type="text" className="mb-2 full-width-text" id="shortUrl" value={this.state.shortUrl} onChange={this.handleOnFieldChange} />
                    </div> : ""
                  }

                  {/* Checkbox for Create */} 
                  { this.state.urlFunctionOption === "create" ?
                    <div><RandomUrlCheckBox checkboxChange={this.handleCheckboxChange}/> </div>: "" 
                  }
                  <FormText/>
                <Button className="custom-blue mb-3 btn-block" color="secondary" size="small"
                  onClick={() => this.handleSubmit()}>Submit</Button>

                </Form>
              </Col>
            </Row>
          <p className="text-center">{this.props.receivedFeedback}</p>
          <p className="text-center"><a href={this.props.receivedLongUrl}>{this.props.receivedShortUrl}</a></p>  
          </Container>  
      </div>
    )
  }
}

const mapDispatchToProps = function(dispatch, props) {
  return {
    addRandom: (longUrl, shortUrl) => dispatch(generateRandomUrl(longUrl, shortUrl)),
    addCustom: (longUrl, shortUrl)  => dispatch(generateCustomUrl(longUrl, shortUrl)),
    retrieve: (shortUrl) => dispatch(retrieveByShortUrl(shortUrl)),
    edit: (longUrl, shortUrl) => dispatch(editByLongUrl(longUrl, shortUrl)),
    delete: (shortUrl) => dispatch(deleteByShortUrl(shortUrl))
  }
}

const mapStateToProps = function (state, props) {
  return{
    message: state.feedback.message,
    receivedLongUrl: state.urlLinks.displayLongUrl,
    receivedShortUrl: state.urlLinks.displayShortUrl,
    receivedFeedback: state.feedback.message
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
