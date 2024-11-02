import { createClient } from "@/supabase/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CustomerType } from "@/lib/types";
import EditCustomers from "@/components/dashboard/customers/edit-cutomers"

export default async function Page() {
  const supabase = createClient(cookies());

  /**** get customers links ****/
  const customerRes = await supabase.from('customers').select().order('updated_at',{ascending:false});
  if (customerRes.error || !customerRes.data) {
    console.log(customerRes.error)
    redirect('/error')
  }
  const customers: CustomerType[] = customerRes.data.map(item => ({
    ...item,
    image_full: supabase.storage.from('images').getPublicUrl(item.image).data.publicUrl
  }))
  return (
    <div>
      {/* {JSON.stringify(customers)} */}
      <EditCustomers customers={customers}/>
    </div>
  )
}
