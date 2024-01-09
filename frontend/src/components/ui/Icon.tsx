import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const Icon = ({ icon }: { icon: IconProp }) => (
  <FontAwesomeIcon icon={icon} />
);
