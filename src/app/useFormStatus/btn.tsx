import React from 'react';
import {useFormStatus} from 'react-dom'
import { TextField } from "mfg-ui-components";
const Submit = () => {
  const {pending} = useFormStatus()
  return (
   <TextField
               Type="input"
               SubType="submit"
               value={pending ? "Logging in..." : "Login"}
             />
  )
}

export default Submit