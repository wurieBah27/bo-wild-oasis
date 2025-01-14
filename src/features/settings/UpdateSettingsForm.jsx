import styled from "styled-components";
import DarkMOdeToggle from "../../ui/DarkMOdeToggle";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./settings_hooks/useEditSettings";
import useSettings from "./settings_hooks/useSettings";

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;

function UpdateSettingsForm() {
  /* get the previous settings */
  const {
    isLoading,
    settingsData: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
      language,
    } = {},
  } = useSettings();
  /* update the settings function */
  const { isEditingSettings, editSettings } = useEditSettings();
  if (isLoading) return <Spinner />;

  const handleUpdateSettings = (e, field) => {
    const { value } = e.target;

    if (!value) return;
    editSettings({ [field]: value });
  };
  return (
    <>
      <ToggleContainer>
        <p>Toggle the background of the website:</p>
        <DarkMOdeToggle />
      </ToggleContainer>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isEditingSettings}
            onBlur={(e) => handleUpdateSettings(e, "minBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isEditingSettings}
            onBlur={(e) => handleUpdateSettings(e, "maxBookingLength")}
          />
        </FormRow>

        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            disabled={isEditingSettings}
            onBlur={(e) => handleUpdateSettings(e, "maxGuestsPerBooking")}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            disabled={isEditingSettings}
            onBlur={(e) => handleUpdateSettings(e, "breakfastPrice")}
          />
        </FormRow>

        <FormRow label="App Language">
          <Input
            type="text"
            id="app-language"
            defaultValue={language}
            disabled={isEditingSettings}
            onBlur={(e) => handleUpdateSettings(e, "language")}
          />
        </FormRow>
      </Form>
    </>
  );
}

export default UpdateSettingsForm;
