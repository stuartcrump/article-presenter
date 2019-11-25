import React, { useState } from 'react';
import { Form, FormGroup, TextInput, Button, ToggleSmall } from 'carbon-components-react';
import './Form.scss';

function FormComponent({ name }) {
  const [isInvalid, setInvalid] = useState(false);
  const [mail, setMail] = useState('');

  const handleSubmit = event => {
    const includedDomains = ['google.com'];
    const isIncluded = includedDomains.some(domain => mail.includes(domain));

    event.preventDefault();

    if (mail) {
      setInvalid(isIncluded);

      if (isIncluded) {
        event.target.submit();
      } else {
        setInvalid(true);
      }
    } else {
      setInvalid(true);
    }
  };

  return (
    <Form className='article-form-element' onSubmit={handleSubmit} action='http://www.pages00.net/orgformikebean/UBXTestSignUp/SignUp'>
      <FormGroup className='form-group' invalid={false} legendText='' message={false} messageText=''>
        <div className='acoustic--row form-input-row'>
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

        <div className='acoustic--row form-input-row'>
          <TextInput
            name='Email'
            className='email-input'
            id='test2'
            invalid={isInvalid}
            invalidText='Please enter an valid email address.'
            labelText='Email'
            placeholder='Input your email address'
            type='email'
            onChange={event => setMail(event.target.value)}
          />
        </div>

        <div className='acoustic--row form-input-row'>
          <div className='acoustic--col-sm-2 consent-toggle-wrapper'>
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
          <div className='acoustic--col-sm-2 signup-button-wrapper'>
            <Button className='signup-button' kind='primary' tabIndex={0} type='submit'>
              SIGN UP
            </Button>
          </div>
        </div>
        <input type='hidden' name='formSourceName' value='StandardForm'></input>
        <input type='hidden' name='article' value={name}></input>
      </FormGroup>
    </Form>
  );
}

export default FormComponent;
