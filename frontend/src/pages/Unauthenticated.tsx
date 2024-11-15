import { PublicLayout } from "@/components"
import UnauthMessage from "@/components/layout/UnauthMessage"

const Unauthenticated = () => {
  return (
    <PublicLayout>
      <UnauthMessage />
    </PublicLayout>
  )
}

export default Unauthenticated
