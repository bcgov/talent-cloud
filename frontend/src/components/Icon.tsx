import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = ({ icon }: { icon: IconProp }) => (
  <FontAwesomeIcon icon={icon} />
);
