import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/APIS/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

const FormRow2 = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;
const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const validateInputs = !getValues().name;
  /* Update the UI with React-Query */
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  /* Creating new cabin on form submission */
  const onSubmitCabin = (data) => {
    mutate({ ...data, image: data.image[0] });
  };

  /* All Errors in the form-state */
  const { errors } = formState;

  /* form validation */
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitCabin, onError)}>
      <FormRow label="Cabin Name" id="name" error={errors?.name?.message}>
        <Input
          style={
            errors?.name?.message
              ? { border: "1px solid red", color: "red" }
              : {}
          }
          type="text"
          id="name"
          {...register("name", { required: "This field is required." })}
        />
      </FormRow>
      <FormRow
        label="Maximum capacity"
        id="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          style={
            errors?.maxCapacity?.message
              ? { border: "1px solid red", color: "red" }
              : {}
          }
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required.",
            min: {
              value: 1,
              message: "Capacity should be atleast 1 person & above.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        id="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          style={
            errors?.regularPrice?.message
              ? { border: "1px solid red", color: "red" }
              : {}
          }
          type="number"
          id="regularPrice"
          {...register("regularPrice", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Discount" id="discount" error={errors?.discount?.message}>
        <Input
          style={
            errors?.discount?.message
              ? { border: "1px solid red", color: "red" }
              : {}
          }
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required.",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than the regular price.",
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin Description"
        id="description"
        error={errors?.description?.message}
      >
        <Textarea
          style={
            errors?.description?.message
              ? { border: "1px solid red", color: "red" }
              : {}
          }
          type="number"
          id="description"
          defaultValue=""
          {...register("description", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
