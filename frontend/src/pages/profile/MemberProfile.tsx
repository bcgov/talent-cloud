import useMemberProfile from "@/hooks/useMemberProfile"
import { useRoleContext } from "@/providers"

const MemberProfile = () => {
    const { role, loading } = useRoleContext()
    console.log(role, "ROLE")
    const { personnel } = useMemberProfile()
    console.log(personnel)
    return (<></>)
}

export default MemberProfile