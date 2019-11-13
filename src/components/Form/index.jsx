import React, { useState } from 'react';
import { Form as CarbonForm, FormGroup, TextInput, Button, ToggleSmall } from 'carbon-components-react';

function FormComponent({ name }) {
  const [isValidMail, setValidMail] = useState(false);
  const [mail, setMail] = useState('');

  const handleSubmit = event => {
    const excludedDomain = 'yahoo.uk';
    const isExcluded = mail.includes(excludedDomain);

    event.preventDefault();

    if (mail) {
      setValidMail(isExcluded);

      if (!isExcluded) {
        // handle submission
        console.log('Form Submitted');
      }
    } else {
      setValidMail(true);
    }
  };

  return (
    <CarbonForm
      className='article-form-element'
      onSubmit={handleSubmit}
      action='http://www.pages00.net/orgformikebean/UBXTestSignUp/SignUp'
    >
      <FormGroup className='form-group' invalid={false} legendText='' message={false} messageText=''>
        <div className='bx--row form-input-row'>
          <TextInput
            className='name-input'
            id='article-form-name'
            invalidText=''
            labelText='Name'
            placeholder='Input your full name'
            type='text'
          />
        </div>

        <div className='bx--row form-input-row'>
          <TextInput
            className='email-input'
            id='article-form-email'
            invalid={isValidMail}
            invalidText='Please input valid email address'
            labelText='Email'
            placeholder='Input your email address'
            type='email'
            onChange={event => setMail(event.target.value)}
          />
        </div>

        <input type='hidden' name='formSourceName' value='StandardForm'></input>
        <input type='hidden' name='article' value={name}></input>

        <div className='bx--row form-input-row'>
          <div className='bx--col-sm-2 consent-toggle-wrapper'>
            <ToggleSmall
              name='sp_exp'
              value='yes'
              aria-label='Toggle'
              className='consent-toggle'
              defaultToggled={true}
              id='article-form-consent-toggle'
              labelA="I don't consent"
              labelB='I consent'
              onToggle={void 0}
            />
          </div>
          <div className='bx--col-sm-2 signup-button-wrapper'>
            <Button className='signup-button' kind='primary' type='submit'>
              SIGN UP
            </Button>
          </div>
        </div>
      </FormGroup>
    </CarbonForm>
  );
}

export default FormComponent;
