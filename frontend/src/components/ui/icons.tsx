import {
  faSearch,
  faPhone,
  faEnvelope,
  faBars,
  faUpload,
  faExternalLinkAlt,
  faChevronDown,
  faChevronUp,
  faChevronLeft,
  faChevronRight,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Icon } from './Icon';

export const icons = {
  Search: <Icon icon={faSearch} />,
  Phone: <Icon icon={faPhone} />,
  Envelope: <Icon icon={faEnvelope} />,
  Bars: <Icon icon={faBars} />,
  Upload: <Icon icon={faUpload} />,
  ExernalLink: <Icon icon={faExternalLinkAlt} />,
  ArrowUp: <Icon icon={faChevronUp} />,
  ArrowRight: <Icon icon={faChevronRight} />,
  ArrowDown: <Icon icon={faChevronDown} />,
  ArrowLeft: <Icon icon={faChevronLeft} />,
  DoubleArrowLeft: (
    <>
      <Icon icon={faChevronLeft} />
      <Icon icon={faChevronLeft} />
    </>
  ),
  DoubleArrowRight: (
    <>
      <Icon icon={faChevronRight} />
      <Icon icon={faChevronRight} />
    </>
  ),
  Profile: <Icon icon={faUser} />,
};
