import { Program } from '@/common';
import { useAxios } from './useAxios';

export const useExportToCSV = () => {
    const { AxiosPrivate } = useAxios();

    const csvExport = async (program: Program | undefined) => {
        const exportEndpoint = 'export';
        const progPath = program?.toString();
        const csvData = (await AxiosPrivate.get(`/${progPath}/${exportEndpoint}`)).data;
        return csvData;
    }

    return {
        csvExport,
    };
};
