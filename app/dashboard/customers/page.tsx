import EditCustomers from "@/components/dashboard/customers/edit-cutomers"
import { getCustomers } from "@/lib/queries";

export const revalidate = 3600;
export default async function Page() {
  const customers = await getCustomers();

  return (
    <div>
      {/* {JSON.stringify(customers)} */}
      <EditCustomers customers={customers} />
    </div>
  )
}
