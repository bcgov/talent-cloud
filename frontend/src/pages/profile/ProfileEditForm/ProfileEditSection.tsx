import { Select, TextInput } from "@/components"
import { SectionFieldType } from "./types"
import { ChangeEvent } from "react"


export const SectionField = ({ props, field, errors, options, onChange }: SectionFieldType) => {

  return (
    <>
      {field.type === 'text' || field.type === 'tel' ? <TextInput

        {...props}
        {...field}
        disabled={field.disabled}
        label={field.label}
        required={field.required}
        onChange={onChange}
        error={errors[field.name]}

      /> : <Select
        {...props}
        {...field}
        disabled={field.disabled}
        label={field.label}
        required={field.required}
        options={options}
        error={errors[field.name]}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e, props)}
      />}

    </>
  )
}
