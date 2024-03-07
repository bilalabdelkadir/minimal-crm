import SaveAndCancelBtn from "@/components/SaveAndCancelBtn";
import {
  onErrorNotfication,
  onSuccessNotification,
} from "@/pages/auth/shared/auth.utils";
import { Collapse, Divider, Grid } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { AxiosError } from "axios";
import { createCompanyMutation } from "../query/company.query";
import { ICompanyForm } from "../utils/company.interface";
import { companySchema } from "../utils/company.schema";
import CompanyOptionalInputFields from "./CompanyOptionalInputFields";
import CompanyRequiredInputFields from "./CompanyRequiredInputFields";
import OptionalFieldsButton from "./OptionalFieldsButton";

interface ICompanyFormProps {
  companyModalHandler: {
    readonly open: () => void;
    readonly close: () => void;
    readonly toggle: () => void;
  };
}

const CompanyForm: React.FC<ICompanyFormProps> = ({ companyModalHandler }) => {
  const [openedCollapse, { toggle: toggleColapse }] = useDisclosure(false);

  const form = useForm<ICompanyForm>({
    validateInputOnBlur: true,
    initialValues: {
      name: "",
      email: "",
      phone: undefined,
      secondaryEmail: undefined,
      secondaryPhone: undefined,
      preferredContactMethod: undefined as any,
      referalSource: undefined,
      preferredCurrency: undefined,
      preferredLanguage: undefined,
      website: undefined,
      contacts: [],
      tags: [],
      addresses: [],
    },

    validate: zodResolver(companySchema),
  });

  const reseter = () => {
    companyModalHandler.close();
    form.reset();
  };

  const createCompany = createCompanyMutation(
    (error: AxiosError | any) => {
      onErrorNotfication(error);
    },
    () => {
      onSuccessNotification({ message: "company created successfully" });
      reseter();
    },
  );

  const onSubmit = (values: ICompanyForm) => {
    createCompany.mutate(values);
  };
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Grid m={"lg"}>
        <CompanyRequiredInputFields form={form} />

        <OptionalFieldsButton
          onClick={toggleColapse}
          openedCollapse={openedCollapse}
          btnTitle="Show All Optional Fields"
        />
      </Grid>
      <Collapse in={openedCollapse}>
        <CompanyOptionalInputFields form={form} />
      </Collapse>
      <Divider />
      <SaveAndCancelBtn
        isLoading={createCompany.isLoading}
        closeModal={companyModalHandler.close}
      />
    </form>
  );
};

export default CompanyForm;
