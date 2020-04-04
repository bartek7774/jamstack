import React, { useReducer } from "react";
import clx from "classnames";
import styles from "./form.module.css";

const INITIAL_STATE = {
  name: "name1",
  email: "bgajdkos@gmail.com",
  subject: "subject 1",
  title: "title 1",
  content: "conent 1",
  status: "IDLE"
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateField":
      return { ...state, [action.field]: action.value };
    case "updateStatus": {
      return { ...state, status: action.status };
    }
    default:
      return INITIAL_STATE;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateStatus = status =>
    dispatch({
      type: "updateStatus",
      status
    });

  const handleSubmit = evt => {
    evt.preventDefault();
    console.log("send", state);
    updateStatus("PENDING");
    fetch('/api/contact',{
      method:'POST',
      body: JSON.stringify(state)
    }).then(response=>response.json())
    .then(response=>{
      console.log({response});
      updateStatus('SUCCESS')
    }).catch(err=>{
      console.error(err);
      updateStatus('ERROR')
    })
    // setTimeout(() => {
    //   updateStatus("SUCCESS");
    //   // updateStatus('ERROR')
    // }, 1000);
  };
  const updateFieldValue = field => evt => {
    const value = evt.target.value;
    dispatch({
      type: "updateField",
      field,
      value
    });
  };
  const reset = () => dispatch({ type: "reset" });
  if (state.status === "SUCCESS")
    return (
      <>
        <p className={styles.success}>Success!!!</p>{" "}
        <button
          className={clx(styles.button, styles.again)}
          onClick={reset}
          type="button"
        >
          Send another message
        </button>
      </>
    );
  return (
    <>
      {state.status === "ERROR" && (
        <p className={styles.error}>Something went wrong.</p>
      )}
      <form
        className={clx({
          [styles.form]: true,
          [styles.pending]: state.status === "PENDING"
        })}
        onSubmit={handleSubmit}
      >
        <p>{JSON.stringify(state)}</p>
        <label className={styles.label}>
          Name:{" "}
          <input
            type="text"
            className={styles.input}
            name="name"
            value={state.name}
            onChange={updateFieldValue("name")}
          />
        </label>
        <label className={styles.label}>
          Email:{" "}
          <input
            type="email"
            className={styles.input}
            value={state.email}
            onChange={updateFieldValue("email")}
          />
        </label>
        <label className={styles.label}>
          Title:{" "}
          <input
            type="text"
            className={styles.input}
            name="title"
            value={state.title}
            onChange={updateFieldValue("title")}
          />
        </label>
        <label className={styles.label}>
          Subject:{" "}
          <input
            type="text"
            className={styles.input}
            name="subject"
            value={state.subject}
            onChange={updateFieldValue("subject")}
          />
        </label>
        <label className={styles.label}>
          Content:{" "}
          <textarea
            className={styles.input}
            name="content"
            value={state.content}
            onChange={updateFieldValue("content")}
          />
        </label>
        <div className={styles.actions}>
          <button
            className={clx(styles.button, styles.reset)}
            onClick={reset}
            type="button"
          >
            Reset
          </button>
          <button className={styles.button}>Send</button>
        </div>
      </form>
    </>
  );
};
