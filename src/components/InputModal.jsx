import Modal from "react-modal";
import { useForm, FormProvider } from "react-hook-form";

import FormInput from "./FormInput";
import Button from "./Button";

import { newContact, editContact } from "../api/api";

Modal.setAppElement("#root"); // This line is needed for accessibility reasons

function InputModal({ isOpen, onRequestClose, currentData, edit }) {
    const methods = useForm({
        defaultValues: edit ? currentData : {},
    });

    const { handleSubmit } = methods;

    const onSubmit = (data) => {
        edit
            ? editContact(data.id, data).then((response) => {
                  console.log(response);
                  onRequestClose("edit");
              })
            : newContact(data)
                  .then((response) => {
                      console.log(response);
                      /** Close Modal */
                      /** Error in modal close not changing to false */
                      onRequestClose("create");
                  })
                  .catch((error) => {
                      console.error("There was an error!", error);
                  });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-80 mx-auto border rounded-lg"
        >
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="px-7 py-4 bg-white border border-black rounded-lg"
                >
                    <FormInput
                        label="Name"
                        name="name"
                        validationRules={{ required: "Please enter your name" }}
                    />
                    <FormInput
                        label="Contact Number"
                        name="phone"
                        validationRules={{
                            required: "Please enter a contact number",
                            pattern: {
                                value: /^[0-9]{11}$/,
                                message: "Invalid phone number",
                            },
                        }}
                    />
                    <FormInput
                        label="Email Address"
                        name="email"
                        validationRules={{
                            required: "Please enter an email address",
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message:
                                    "Entered value does not match email format",
                            },
                            validate: (value) =>
                                value.split("@")[1]?.length >= 9
                                    ? null
                                    : "Domain does not fit email format",
                        }}
                    />
                    <div className="flex justify-end space-x-2 py-3">
                        <Button type={"button"} onClick={onRequestClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isSubmit
                            className={
                                edit
                                    ? ""
                                    : "!bg-lightgray cbutton px-5 py-2 !text-black "
                            }
                        >
                            {edit ? "Save Changes" : "Add Contact"}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    );
}
export default InputModal;
