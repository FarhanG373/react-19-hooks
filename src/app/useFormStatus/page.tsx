'use client'
import React, { useActionState } from "react";
import { loginUser } from "../../api/api";
import Submit from './btn';
import { TextField, Wrapper, FlexWrap, Flex, BreadCrumb } from "mfg-ui-components";
const useFormStatusP = () => {
   const [user, submitAction] = useActionState(
      login, // submit action
      {
        data: null, //initial state
        error: null, // error
      }
    );
  
    async function login(previousState, formData){
      const userName = formData.get("name");
      const password = formData.get("password");
      try {
        const userResp = await loginUser(userName, password);
        return { error: null, data: userResp.data };
      } catch (error) {
        return { ...previousState, error: error.error };
      }
    };
  return (
    <Wrapper wrapClass="fixWrap">
      <BreadCrumb homeLabel="Home" seprator="/" className="mb-1"/>
    <form action={submitAction}>
      <FlexWrap FlexWrap="wrap">
        <Flex FlexWidth="full-col">
          <TextField
            Type="input"
            SubType="text"
            name={`name`}
            PlaceHolder={`Name`}
          />
        </Flex>
        <Flex FlexWidth="full-col">
          <TextField
            Type="input"
            SubType="password"
            name={`password`}
            PlaceHolder={`Password`}
          />
        </Flex>
        <Flex FlexWidth="full-col">
          <Submit/>
        </Flex>
        {user.data && (
          <p style={{ color: "green" }}>Logged in: {user.data.email}</p>
        )}

        {user.error && <p style={{ color: "red" }}>{user.error}</p>}
      </FlexWrap>
    </form>
  </Wrapper>
  )
}

export default useFormStatusP