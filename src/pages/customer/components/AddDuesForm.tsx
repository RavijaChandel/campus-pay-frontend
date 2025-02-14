import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import FormLabel from '@mui/joy/FormLabel';
import { Input, Select, Option} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { PaymentFormValues, makeTransaction } from '../../callbacks/MakeTransaction';


type RegistrationFormProps = {
  onSubmit: (values: PaymentFormValues) => void;
};

// type RegistrationFormValues = {
//   customerID: string;
//   vendorID: string;
//   email: string;
//   password: string;
//   amount: string;
// };

const selectStyle = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "background.body",
  fontSize: "16px",
  cursor: "pointer",
  width:"100%",
}

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const receiverIDPattern = /^[A-Z0-9]{8}$/;



const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<PaymentFormValues>({
    receiverID: '',
    password: '',
    amount: 0,
    transactionType: 2,
  });

  const [errors, setErrors] = useState<Partial<PaymentFormValues>>({});

  const validate = (values: PaymentFormValues) => {
    const errors: Partial<PaymentFormValues> = {};

    if (!values.receiverID.trim()) {
      errors.receiverID = 'Customer ID is required';
    } else if(!receiverIDPattern.test(values.receiverID.trim())) {
        errors.receiverID = 'Customer ID is invalid';
    }
    // if (!values.vendorID.trim()) {
    //   errors.vendorID = 'Vendor ID is required';
    // }


    // if (!values.email.trim()) {
    //   errors.email = 'Email is required';
    // } else if (!emailPattern.test(values.email.trim())) {
    //   errors.email = 'Email is invalid';
    // }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if(!passwordPattern.test(values.password.trim())) {
        errors.password = 'Password is invalid';
    }

    // if (!values.amount.trim()) {
    //     errors.amount = 'Amount is required';
    //  }



    return errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // //console.log(values);
    const userTypeInputElement = event.currentTarget.elements[0] as HTMLInputElement;
    setValues((prevValues) => ({
      ...prevValues,
      userType: userTypeInputElement.value,
    }));

    const errors = validate(values);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      makeTransaction(values);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    setErrors((errors) => ({ ...errors, [name]: ''}));
  };

  const navigate = useNavigate();
  const signinpage = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="receiverID"><b>Receiver ID *</b></label>
        <br />
        <Input 
          type="text"
          id="receiverID"
          name="receiverID"
          placeholder='123'
          value={values.receiverID}
          onChange={handleChange}
          style={{width:"100%"}}
        />
      </div>
      {/* <div> 
        <label htmlFor="vendorID"><b>Vendor ID *</b></label>
        <br />
        <Input
          type="text"
          id="vendorID"
          name="vendorID"
          placeholder='123'
          value={values.vendorID}
          onChange={handleChange}
          style={{width:"100%"}}
        />
      </div> */}

      {/* <div>
        <label htmlFor="email"><b>Email ID *</b></label>
        <br />
        <Input
          type="email"
          id="email"
          name="email"
          placeholder='abc.xyz@gmail.com'
          value={values.email}
          onChange={handleChange}
          style={{width:"100%"}}
        />
        {errors.email && <span style ={{color:"red"}}>{errors.email}</span>}
      </div> */}
      
      <div>
        <label htmlFor="password"><b>Password *</b></label>
        <br />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder='abcxyz@123'
          value={values.password}
          onChange={handleChange}
          style={{width:"100%"}}
        />
        {errors.password && <span style={{color: "red"}}> {errors.password} </span>}
      </div>
        <div>
        <label htmlFor="amount"><b>Amount *</b></label>
        <br />
        <Input
            type="number"
            id="amount"
            name="amount"
            placeholder='110'
            value={values.amount}
            onChange={handleChange}
            style={{width:"100%"}}
        />
        </div>
      <br />
      <Button type="submit" fullWidth onClick={signinpage}>
               Add Due
      </Button>

    </form>
  );
};

export default RegistrationForm;



