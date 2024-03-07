import React from "react";
import { ICompanyForm, IFormProps } from "../../utils/company.interface";
import AddressInputButton from "./AddressInputButton";
import AddressInputFields from "./AddressInputFields";

interface IAddressInputProps extends IFormProps<ICompanyForm> {}

const AddressInput: React.FC<IAddressInputProps> = ({ form }) => {
  return (
    <>
      {
        // @ts-ignore
        form.values.addresses?.length > 0 &&
          // @ts-ignore
          form.values.addresses.map((address, index) => (
            <AddressInputFields form={form} index={index} key={index} />
          ))
      }

      <AddressInputButton form={form} />
    </>
  );
};

export default AddressInput;
