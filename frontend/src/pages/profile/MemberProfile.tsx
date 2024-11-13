import useMemberProfile from "@/hooks/useMemberProfile"
import { useRoleContext } from "@/providers"


const MemberProfile = () => {
    
    const {role, username} = useRoleContext()   
    console.log(role, username)
    const { personnel } = useMemberProfile()
    console.log(personnel)
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className={'pt-32 text-center'}>
                <h2 className="text-primary">Member Profile</h2>
                
                <h4>Coming Soon...</h4>
            </div>
            <div>
            {personnel ? <p>{personnel?.firstName} {personnel?.lastName}</p> : <p>Profile Not Found</p>}
            </div>
        </div>
    );
};

export default MemberProfile;
