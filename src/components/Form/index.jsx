import React, { useState } from 'react';
import { Form, FormGroup, TextInput, Button, ToggleSmall } from 'carbon-components-react';
import './style.scss';

function FormComponent({ name }) {
  const [isValidMail, setValidMail] = useState(false);
  const [mail, setMail] = useState('');

  const handleSubmit = event => {
    const excludedDomain = 'yahoo.uk';
    const isExcluded = mail.includes(excludedDomain);
    const data = new FormData(event.target);
    event.preventDefault();

    if (mail) {
      setValidMail(isExcluded);
      if (!isExcluded) {
        // handle submission
        console.log('Form Submitted', data, event.target);

        fetch('http://www.pages00.net/orgformikebean/UBXTestSignUp/SignUp', {
          method: 'POST',
          body: data,
          mode: 'no-cors'
        }).then(res => console.log(res.body));
      }
    } else {
      setValidMail(true);
    }
  };

  return (
    <Form className='article-form-element' onSubmit={handleSubmit}>
      <FormGroup className='form-group' invalid={false} legendText='' message={false} messageText=''>
        <div className='bx--row form-input-row'>
          <TextInput
            name='Forename'
            className='name-input'
            disabled={false}
            id='article-form-name'
            invalid={false}
            invalidText=''
            labelText='Name'
            onChange={function noRefCheck() {}}
            onClick={function noRefCheck() {}}
            placeholder='Input your full name'
            type='text'
          />
        </div>

        <div className='bx--row form-input-row'>
          <TextInput
            name='Email'
            className='email-input'
            id='test2'
            invalid={isValidMail}
            invalidText=''
            labelText='Email'
            placeholder='Input your email address'
            type='email'
            onChange={event => setMail(event.target.value)}
          />
        </div>

        <div className='bx--row form-input-row'>
          <div className='bx--col-sm-2 consent-toggle-wrapper'>
            <ToggleSmall
              name='sp_exp'
              value='yes'
              aria-label='Toggle'
              className='some-class'
              defaultToggled={true}
              id='consent-toggle'
              labelA="I don't consent"
              labelB='I consent'
              onToggle={function noRefCheck() {}}
            />
          </div>
          <div className='bx--col-sm-2 signup-button-wrapper'>
            <Button className='signup-button' kind='primary' tabIndex={0} type='submit'>
              SIGN UP
            </Button>
          </div>
        </div>
        {/* Added for Campaign, supports the webform */}
        <input type='hidden' name='formSourceName' value='StandardForm'></input>
        <input type='hidden' name='article' value={name}></input>
      </FormGroup>
    </Form>
  );
}

export default FormComponent;
