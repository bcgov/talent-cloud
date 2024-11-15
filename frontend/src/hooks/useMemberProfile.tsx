import { useEffect, useState } from 'react';
import type { Personnel } from '@/pages/dashboard';
import type { FormikValues } from 'formik';
import { useAxios } from './useAxios';
import { useRoleContext } from '@/providers';


const useMemberProfile = (): {
    personnel?: Personnel;
    updatePersonnel: (person: FormikValues | Personnel) => Promise<void>;
    loading: boolean;
} => {
    const [personnel, setPersonnel] = useState<Personnel>();
    const { AxiosPrivate } = useAxios();
    const { program } = useRoleContext()
    const [loading, setIsLoading] = useState(false);
    const getProfileDetails = async () => {
        setIsLoading(true)
        try {
            const response = await AxiosPrivate.get(`/personnel`);
            response && setPersonnel({ ...response.data });
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        getProfileDetails()
    }, []);

    const updatePersonnel = async (personnel: FormikValues | Personnel) => {
        try {

            const res =
                program &&
                (await AxiosPrivate.patch(
                    encodeURI(`/member/${personnel.id}`),
                    personnel,
                ));
            res && setPersonnel(res.data);
        } catch (e) {
            console.log(e);
        }
    };

    return {
        personnel,
        loading,
        updatePersonnel,
    };
};

export default useMemberProfile;
