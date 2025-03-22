"use client";
import React, { useState, useOptimistic } from "react";
import { TextField, Wrapper, FlexWrap, Flex, BreadCrumb } from "mfg-ui-components";

const useOptimisticP = () => {
  const [todo, setTodo] = useState([]);

  const [optimisticTodo, setOptimisticTodo] = useOptimistic(
    todo,
    (oldtodo, newTodo) => [...oldtodo, { text: newTodo, pending: true }]
  );

  const handleTodo = async (formData) => {
    const todo = await formData.get("todo");

    setOptimisticTodo(todo);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTodo((currentTodos) => [
      ...currentTodos,
      { text: todo, pending: false }, // Mark as not pending after operation completes
    ]);
  };
  return (
    <Wrapper wrapClass="fixWrap">
      <BreadCrumb homeLabel="Home" seprator="/" className="mb-1"/>
      <form action={handleTodo}>
        <FlexWrap FlexWrap="wrap">
          <Flex FlexWidth="full-col">
            <TextField
              Type="input"
              SubType="text"
              name={`todo`}
              PlaceHolder={`Enter Todo`}
            />
          </Flex>
          <Flex FlexWidth="full-col">
            <TextField Type="input" SubType="submit" value={"Add Todo"} />
          </Flex>
          <Flex FlexWidth="full-col">
            {optimisticTodo.map((todo: any, index) => (
              <div key={index}>
                {todo.text}
                {todo.pending && <span> (Adding...)</span>}
              </div>
            ))}
          </Flex>
        </FlexWrap>
      </form>
    </Wrapper>
  );
};

export default useOptimisticP;
