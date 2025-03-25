import { useAxios } from './useAxios';

export const useExportToCSV = () => {
    const { AxiosPrivate } = useAxios();

    const bcwsExport = async () => {
        const csvData = (await AxiosPrivate.get('/bcws/export-test')).data;
        return csvData;
    }

    const emcrExport = async () => {
        const csvData = (await AxiosPrivate.get('/emcr/export-test')).data;
        return csvData;
    }

    return {
        bcwsExport,
        emcrExport,
    };
};
