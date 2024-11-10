import { User, Mail, MapPin, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";

export default async function UserCard({ id }: { id: string }) {
  const supabase=createClient(cookies())
  const res = await supabase.from('users').select().eq('id', id).single()
  if(res.error){
    return(<div>user not found</div>)
  }

  const user=res.data

  return (
    <Card className="bg-rosePineDawn-overlay">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-6 w-6" />
          <span>{user.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <div>
              <p>{user.address_line_1}</p>
              {user.address_line_2 && <p>{user.address_line_2}</p>}
              <p>{user.city}, {user.pincode}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{user.phone}</span>
        </div>
      </CardContent>
    </Card>
  )
}
