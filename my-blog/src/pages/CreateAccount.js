import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError('Password and confirmed password do not match...')
      } else {
        await createUserWithEmailAndPassword(getAuth(), email, password);
        navigate('/articles');
      }
    } catch (e) {
      setError(e.message);
    }
  } 

  return (
    <>
      <h1>Create Account</h1>
      {error && <p className='error'>{error}</p> }
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your Email..." />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter your password' />
      <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm your Password..." />
      <button onClick={createAccount}>Register</button>
      <Link to='/login'>Already Have Account? Log In Here</Link>
    </>
  )
}

export default CreateAccount