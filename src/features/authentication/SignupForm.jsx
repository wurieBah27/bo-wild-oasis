import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignUp } from "./Auth_Hooks/useSignUp";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  /* React Hook form Library */
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  /* React_query function for submitting the form */
  const { signUpUser, isSigningUpUser } = useSignUp();

  /* Form Submit function */
  const onSubmitForm = ({ fullName, email, password }) => {
    signUpUser({ fullName, email, password }, { onSettled: () => reset() });
  };

  /* Sign up form */
  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        {/* Employee Name */}
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUpUser}
          {...register("fullName", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        {/* Employee Email address */}
        <Input
          type="email"
          id="email"
          disabled={isSigningUpUser}
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        {/*Employee Password */}
        <Input
          type="password"
          id="password"
          disabled={isSigningUpUser}
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        {/* Repeat Password */}
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUpUser}
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords do not match.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isSigningUpUser}>
          Cancel
        </Button>
        <Button disabled={isSigningUpUser}>
          {!isSigningUpUser ? "Create new user" : <SpinnerMini />}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
