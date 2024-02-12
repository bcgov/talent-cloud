import { ErrorContext } from "@/providers";
import { useContext } from "react";

export const useError = () => { 
    const {error, handleError} = useContext(ErrorContext);
    return {error, handleError};
}