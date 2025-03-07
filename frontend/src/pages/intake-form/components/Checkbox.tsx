export const CheckboxField = (props: any) => {
  return (
    <div className="w-full font-normal h-10 mt-2 text-sm flex flex-row flex-nowrap items-center text-ellipsis text-nowrap gap-2 text-defaultGray truncate ">
      <input type="checkbox" name={props.field.name} value={props.field.value} />{' '}
      <label className="font-normal">{props.label}</label>
    </div>
  );
};
