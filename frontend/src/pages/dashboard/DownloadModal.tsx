
// react
import { useState } from 'react';

// hooks

// common
import { ButtonTypes, Program } from '@/common';

// ui
import {
  Button,
} from '@/components';


import { useExportToCSV } from '@/hooks/useExportToCSV';
import { classes } from '@/components/filters/classes';

export const DownloadModal = ({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) => {
  const [downloadName, setDownloadName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { csvExport } = useExportToCSV();

  const downloadClick = async () => {
    setSubmitting(true);
    try {
      const csvReceipt = await csvExport(program);
      const url = window.URL.createObjectURL(new Blob([csvReceipt]));
      const link = document.createElement('a');
      link.href = url;
      link.download =
        program?.toString().toUpperCase() + ' - ' + downloadName + '.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      setDownloadName('');
      onClose();
    }
  };

  return (
    <div className="max-w-md px-6 pb-8">
      <div className='flex flex-col space-y-2'>
      <p className="text-sm text-[#606060] pb-6 pt-2">Export all active, inactive members and pending approval applicants.</p>
      <div className="pb-32">
        <label>Export as</label>
      <input
        className={classes.menu.container}
        disabled={submitting}
        id="memberDownload"
        type="text"
        placeholder="Enter a filename for your CSV download..."
        value={submitting ? 'Please wait...' : downloadName}
        onChange={(e) => setDownloadName(e.target.value)}
      />
      </div>
      <div className="w-full border border-t-gray-500 border-t-.5"></div>
      <div className="flex flex-row items-center justify-end space-x-2">
      <Button
          variant={ButtonTypes.SECONDARY}
          text={'Cancel'}
          disabled={submitting}
          onClick={onClose}
        />
        <Button
          loading={submitting}
          variant={ButtonTypes.SOLID}
          text={'Export'}
          disabled={!downloadName || submitting}
          onClick={downloadClick}
        />
      </div>
    </div>
    </div>
  );
};