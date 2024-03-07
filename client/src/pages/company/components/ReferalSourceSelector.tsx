import React, { useState } from "react";
import { fetchReferalSourceQuery } from "../query/company.query";
import { Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { ICompanyForm } from "../utils/company.interface";

interface IReferalSourceProps {
  form: UseFormReturnType<ICompanyForm>;
}

const ReferalSourceSelector: React.FC<IReferalSourceProps> = ({ form }) => {
  const { data: referalSouce } = fetchReferalSourceQuery();

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const options =
    referalSouce?.map((source) => ({
      label: source.name,
      value: source.name,
    })) || [];

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const finalOptions =
    filteredOptions.length > 0
      ? filteredOptions
      : [{ label: searchValue, value: searchValue }];

  return (
    <>
      <Select
        label="Referal Source"
        placeholder="Referal Source"
        searchable
        searchValue={searchValue}
        onSearchChange={handleSearch}
        data={finalOptions}
        {...form.getInputProps("referalSource")}
      />
    </>
  );
};

export default ReferalSourceSelector;
