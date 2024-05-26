import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Input,
} from '@material-tailwind/react';
import { Button } from '@/components/ui';
import { ButtonTypes } from '../../common';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

export const ProfileEditListSection = ({
  existingData,
  keyName,
  title,
  type,
  valueName,
  valueOptions,
  keyOptions,
  onSet,
}: {
  existingData: { key: string | undefined; value: string | undefined }[];
  keyName: string;
  title: string;
  type: string;
  valueName: string;
  valueOptions: { val: string; text: string }[];
  keyOptions?: { val: string; text: string }[];
  onSet: (value: { key: string | undefined; value: string | undefined }[]) => void;
}) => {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const handleAccordionOpen = () => setAccordionOpen((cur) => !cur);

  const onChange = (
    index: number,
    key: string | undefined,
    value: string | undefined,
  ) => {
    const newArray = [...existingData];
    newArray[index] = {
      key,
      value,
    };
    onSet(newArray);
  };

  const onAdd = () => {
    const newArray = [...existingData, { key: '', value: undefined }];
    onSet(newArray);
  };

  const onDelete = (index: number) => {
    const newArray = existingData.filter((_, i) => i !== index);
    onSet(newArray);
  };

  return (
    <Accordion
      title={title}
      placeholder={''}
      open={accordionOpen}
      icon={
        accordionOpen ? (
          <ChevronUpIcon className="h-8 w-5 fill-[#606060]" />
        ) : (
          <ChevronDownIcon className="h-8 w-5 fill-[#606060]" />
        )
      }
    >
      <AccordionHeader placeholder={title} onClick={handleAccordionOpen}>
        {title}
      </AccordionHeader>
      <AccordionBody>
        {existingData.map((data, i) => (
          <div className="flex flex-row gap-20 py-3 items-end" key={data.key}>
            <div className="basis-1/2 flex flex-col">
              <p className="font-bold text-sm">
                {keyName}
                <span className="text-red-300">*</span>
              </p>
              {keyOptions ? (
                <select
                  value={data.key}
                  className="rounded-md w-full"
                  onChange={(e) =>
                    onChange(i, e.target.value, existingData[i].value)
                  }
                >
                  {keyOptions.map((option) => (
                    <option value={option.val} key={option.val}>
                      {option.text}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  size="lg"
                  placeholder={keyName}
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900 w-full"
                  labelProps={{
                    className: 'before:content-none after:content-none',
                  }}
                  value={data.key}
                  onChange={(e) =>
                    onChange(i, e.target.value, existingData[i].value)
                  }
                  crossOrigin={''}
                />
              )}
            </div>
            <div className="basis-1/3">
              <p className="font-bold text-sm">
                {valueName}
                <span className="text-red-300">*</span>
              </p>
              <select
                value={data.value}
                className="rounded-md w-full"
                onChange={(e) => onChange(i, data.key, e.target.value)}
              >
                {valueOptions.map((option) => (
                  <option value={option.val} key={option.val}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
            <div className="basis-1/6">
              <Button
                variant={ButtonTypes.PRIMARY}
                text="Delete"
                onClick={() => onDelete(i)}
              />
            </div>
          </div>
        ))}
      </AccordionBody>
      <div className="py-3">
        <Button
          variant={ButtonTypes.TERTIARY}
          onClick={onAdd}
          text={`Add ${type}`}
        />
        {/* <Button placeholder={''} onClick={() => console.log(existingData)}>View</Button> */}
      </div>
    </Accordion>
  );
};
