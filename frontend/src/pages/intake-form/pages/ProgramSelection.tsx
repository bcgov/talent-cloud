import { Field, FieldAttributes, FieldProps, FormikFormProps, useField, useFormikContext } from "formik";

interface T {
  program: string;
}

export const ProgramSelection = () => {
  const {values, handleChange} = useFormikContext();  
  console.log(values)
  return(
    <>
    {/* Program Selection Section */}
    <Field render={(field: FieldAttributes<HTMLSelectElement>, form: FormikFormProps)=> <CustomComponent field={field} form={form}/>}/>
    {/* Program Details */}
    <CustomField name={""} value={""}/>
    </>
  )
}

// TODO remove this is just an example

export const CustomComponent = ({field, form}: {field: FieldAttributes<any>, form: FormikFormProps}) => {

  console.log(field, form)
  return(
    <input {...field}/>
  )
}

// TODO remove this is just an example
export const CustomField = (props: {name:string,value:string}) => {
const [field, meta, helpers]= useField(props.name);  
  return(
    <input {...field}/>

  )
}