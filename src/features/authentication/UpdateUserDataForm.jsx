import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./Auth_Hooks/useUser";
import useUpdateUser from "./Auth_Hooks/useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: {
      email,
      user_metadata: { full_name: currentFullName },
    },
  } = useUser();

  const [full_name, setFullName] = useState(currentFullName);
  const [avatar_url, setAvatar] = useState(null);
  const { updateUser, isUpdatingUser } = useUpdateUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!full_name) return;

    updateUser(
      { full_name, avatar_url },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  const resetInputs = () => {
    setFullName(currentFullName);
    setAvatar(null);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          disabled={isUpdatingUser}
          value={full_name}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          disabled={isUpdatingUser}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={resetInputs}
          disabled={isUpdatingUser}
        >
          Cancel
        </Button>
        <Button disabled={isUpdatingUser}>
          {isUpdatingUser ? <SpinnerMini /> : "Update account"}{" "}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
