import { ButtonTypes } from '@/common';
import { Button } from '@/components';
import type { ReactComponentElement } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

// types
export interface ModalGridItemProps {
  description: string;
  title: string;
  titleStyle?: string;
}

export interface ModalGridProps {
  gridContainer: ReactComponentElement<any>;
  gridHeader: string;
}
export type ModalContentProps = ModalGridProps & {
  contentHeader: string;
  onClose?: () => void;
};
export type ModalProps = ModalContentProps & {
  modalButton: ReactComponentElement<any>;
};

export const ModalGridItem = ({
  description,
  title,
  titleStyle,
}: ModalGridItemProps) => {
  return (
    <>
      <div
        className={`col-span-1 !text-sm !text-[#1A5A96] !font-bold !font-sans ${titleStyle}`}
      >
        {title}
      </div>
      <div className="col-span-5 !text-sm !text-[#313132] !font-sans !font-normal">
        {description}
      </div>
    </>
  );
};

export const ModalGrid = ({ gridHeader, gridContainer }: ModalGridProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full py-6 px-6">
        {/* Grid Header */}
        <div>
          <p className="subtext">{gridHeader}</p>
        </div>
        {/* Grid of items or sections*/}
        <div>{gridContainer}</div>
      </div>
    </>
  );
};

const ModalContent = ({
  contentHeader,
  gridContainer,
  gridHeader,
  onClose,
}: ModalContentProps) => {
  return (
    <div
      id="modalPopup"
      className="fixed top-0 left-0 w-screen h-screen flex 
  items-center justify-center bg-black bg-opacity-20 z-40"
    >
      <div className="flex flex-col items-stretch w-[70%] h-[75%] bg-red-500 bg-white shadow-md rounded-sm overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex w-full bg-[#F6F9FC] border-b-[2px] border-[#F2F2F2] py-6 px-6">
          <p className="font-bold text-lg text-[#003366]">{contentHeader}</p>
        </div>
        {/* Grid */}
        <ModalGrid gridContainer={gridContainer} gridHeader={gridHeader} />
        <div className="flex w-full mt-auto">
          <div className="flex flex-row w-full content-end py-6 px-6 border-t-4 justify-end">
            <Button
              variant={ButtonTypes.PRIMARY}
              type="button"
              onClick={onClose}
              text="Close"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Modal = ({
  modalButton,
  contentHeader,
  gridHeader,
  gridContainer,
  onClose,
}: ModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>{modalButton}</button>
      {showModal &&
        createPortal(
          <ModalContent
            gridContainer={gridContainer}
            gridHeader={gridHeader}
            onClose={onClose || (() => setShowModal(false))}
            contentHeader={contentHeader}
          />,
          document.body,
        )}
    </>
  );
};
