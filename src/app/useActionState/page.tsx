"use client";
import React, { useActionState } from "react";
import { loginUser } from "../../api/api";
import { TextField, Wrapper, FlexWrap, Flex, BreadCrumb } from "mfg-ui-components";

const useAction = () => {
 

  const [user, submitAction, isPending] = useActionState(
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
            <TextField
              Type="input"
              SubType="submit"
              value={isPending ? "Logging in..." : "Login"}
            />
          </Flex>
          {user.data && (
            <p style={{ color: "green" }}>Logged in: {user.data.email}</p>
          )}

          {user.error && <p style={{ color: "red" }}>{user.error}</p>}
        </FlexWrap>
      </form>
    </Wrapper>
  );
};

export default useAction;
