import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustAvatarGroup } from "../dashboard/CustAvatarGroup"
import YtConnButt from "../dashboard/YtConnButt"
export default function TestComp( props : any) {
  
  return (
 

  <Card className="w-100  h-fit grid-">

    <CardHeader className="p-0">
      <CardTitle className="text-center border-b pb-2  ">Your Social Media Accounts</CardTitle>
    </CardHeader>

    <CardContent>
     { props.data ? <CustAvatarGroup data={props.data} /> : <YtConnButt /> }
    </CardContent>

  </Card>

  )
}