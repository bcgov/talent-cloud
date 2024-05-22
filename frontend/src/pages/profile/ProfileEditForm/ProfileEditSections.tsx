import { Status } from "@/common";
import { SectionHeader } from "@/components";
import { Divider } from "@/components/ui/Divider";
import { useGetFilters } from "@/hooks/useGetFilters";
import { Personnel } from "@/pages/dashboard";
import { FormikState, FormikProps } from "formik";
import { useState, ChangeEvent } from "react";
import { pendingSection, sections } from "./constants";
import { SectionProps, FieldType } from "./types";
import { Route } from "@/providers";
import { SectionField } from "./ProfileEditSection";

export const Sections = ({ props, errors, ministry, route, status }: SectionProps) => {

  const sectionsByStatus = status === Status.PENDING ? [pendingSection, ...sections] : sections
  const filteredSections =
    sectionsByStatus
      .filter(itm => route === Route.EMCR ? itm?.program !== Route.BCWS : itm?.program !== Route.EMCR)

  const { locations, divisions } = useGetFilters();

  const [divisionOptions, setDivisionOptions] = useState(divisions.filter(itm => itm.ministry === ministry).map(itm => ({ label: itm.division, value: itm.division })))


  const handleChangeLocation = (
    e: ChangeEvent<HTMLSelectElement>,
    props: FormikState<Personnel> & FormikProps<Personnel>,
  ) => {
    const fieldName = e.target.name;
    if (!e.target.value) {
      props.setValues({
        ...props.values,
        [fieldName]: "",
        [`${fieldName}FireCentre`]: "",
        [`${fieldName}Region`]: "",
      });
    } else {
      const location = locations.find((itm) => itm.locationName === e.target.value);
      props.setValues({
        ...props.values,
        [fieldName]: location?.locationName,
        [`${fieldName}FireCentre`]: location?.fireCentre,
        [`${fieldName}Region`]: location?.region,

      });
    }
  };

  const handleChangeMinistry = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const filteredDivisions = divisions?.filter(itm => itm.ministry === e.target.value).map(itm => ({ label: itm.division, value: itm.division }))
    setDivisionOptions(filteredDivisions)
  };



  const getOnChange = (name: string) => {
    switch (name) {
      case 'homeLocation':
      case 'workLocation':
        return handleChangeLocation
      case 'ministry':
        return handleChangeMinistry
      default:
        return props.handleChange
    }
  }
  const getOptions = (field: FieldType) => {
    switch (field.name) {
      case 'homeLocation':
      case 'workLocation':
        return locations.map(itm => ({ label: itm.locationName, value: itm.locationName }))
      case 'division':
        return divisionOptions
      default:
        return field.options
    }

  }
  return (
    <div className="flex flex-col w-full items-start justify-start space-y-8">
      {
        filteredSections.map((section, sectionIndex) =>
          <>
            <SectionHeader section={section.header} />
            <div className="w-full grid grid-cols-1 lg:grid-cols-2  gap-6">
              {
                section.fields.filter(itm => route === Route.EMCR ? itm?.program !== Route.BCWS : itm?.program !== Route.EMCR).filter(itm => !itm.status || itm?.status === Status.PENDING && status === Status.PENDING ? true : false)
                  .map((field) =>
                    <SectionField key={field.name} props={props} field={field} errors={errors} options={getOptions(field)} onChange={getOnChange(field.name)} />
                  )}
            </div>
            {sectionIndex !== filteredSections.length && <Divider />}
          </>
        )}
    </div>
  )
}

