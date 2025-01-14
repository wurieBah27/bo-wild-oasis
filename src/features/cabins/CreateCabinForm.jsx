import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import PropTypes from "prop-types";
import useCreateCabin from "./cabins_hooks/useCreateCabin";
import useEditCabin from "./cabins_hooks/useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  /* cabin hooks */
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();

  const { id: editId, image: imagesss, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const isWorking = isCreating || isEditing;

  /* Creating new cabin on form submission */
  const onSubmitCabin = (data) => {
    const image = !data.image.length ? cabinToEdit?.image : data.image[0];

    if (isEditSession)
      editCabin(
        {
          newCabinData: { ...data, image: image },
          id: editId,
          supaIm: imagesss,
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else {
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  };

  /* All Errors in the form-state */
  const { errors } = formState;

  /* form validation */
  const onError = (errors) => {
    console.log(errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmitCabin, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
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

      <FormRow label="Cabin photo" id="image" error={errors?.image?.message}>
        <FileInput
          id="image"
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

CreateCabinForm.propTypes = {
  cabinToEdit: PropTypes.object,
  onCloseModal: PropTypes.func,
};

export default CreateCabinForm;
