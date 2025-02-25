import type { Availability } from '@/common';
import { AvailabilityType } from '@/common';
import { useState } from 'react';

export const useSchedulerDialog = () => {
  const [schedulerDialogOpen, setSchedulerDialogOpen] = useState(false);

  const [editCell, setEditCell] = useState<{
    from?: string;
    to?: string;
    availabilityType?: AvailabilityType | null;
    deploymentCode?: string;
    min?: string;
    max?: string;
  }>();

  const handleSchedulerOpen = () => setSchedulerDialogOpen(!schedulerDialogOpen);
  const getEditDialogTitle = () => {
    switch (editCell?.availabilityType) {
      case AvailabilityType.UNAVAILABLE:
        return 'Unavailable for Deployment';
      case AvailabilityType.DEPLOYED:
        return `Deployment: ${editCell.deploymentCode}`;
      default:
        return 'Set Unavailability';
    }
  };
  const openSchedulerDialog = (
    from?: string,
    to?: string,
    availabilityType?: AvailabilityType | null,
    deploymentCode?: string,
    min?: string,
    max?: string,
  ) => {
    if (!schedulerDialogOpen) {
      // Account for parameters
      setEditCell({ from, to, availabilityType, deploymentCode, min, max });
    } else {
      setEditCell(undefined);
    }
    setSchedulerDialogOpen(!schedulerDialogOpen);
  };
  const cellClick = (date: string, availability: Availability[]) => {
    const statusIndex = availability.findIndex((s) => s.date === date);
    if (statusIndex > -1) {
      const status = availability[statusIndex];
      // For all elements before (including this one), find the first break in availability type
      const elementsBefore = availability.slice(0, statusIndex + 1).reverse();
      const lastBreakIndex = elementsBefore.findIndex(
        (s) => s.availabilityType !== status.availabilityType,
      );
      const firstDateStatus =
        lastBreakIndex > -1 ? elementsBefore[lastBreakIndex - 1] : status;

      // For all elements after (including this one), find the next break in availability type
      const elementsAfter = availability.slice(statusIndex);
      const nextBreakIndex = elementsAfter.findIndex(
        (s) => s.availabilityType !== status.availabilityType,
      );
      const lastDateStatus =
        nextBreakIndex > -1 ? elementsAfter[nextBreakIndex - 1] : status;

      const firstDate = firstDateStatus.actualStartDate ?? firstDateStatus.date;
      const lastDate = firstDateStatus.actualEndDate ?? lastDateStatus.date;
      const availabilityType = status.availabilityType;

      if (status.availabilityType === AvailabilityType.AVAILABLE) {
        // Use actualStartDate / actualEndDate if it exists
        const min = lastBreakIndex > -1 ? firstDate : undefined;
        const max = nextBreakIndex > -1 ? lastDate : undefined;
        openSchedulerDialog(
          status.date,
          status.date,
          availabilityType,
          undefined,
          min,
          max,
        );
      } else {
        // Use actualStartDate / actualEndDate if it exists
        const deploymentCode = status.deploymentCode;
        openSchedulerDialog(firstDate, lastDate, availabilityType, deploymentCode);
      }
    }
  };
  return {
    handleSchedulerOpen,
    schedulerDialogOpen,
    editCell,
    setEditCell,
    getEditDialogTitle,
    cellClick,
  };
};
