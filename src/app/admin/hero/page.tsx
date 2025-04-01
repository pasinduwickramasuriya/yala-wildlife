import AddHero from "@/components/admin/AddHero";
import AdminLayout from "@/components/admin/AdminLayout";

export default function HeroAdminPage() {
  return (<>
  <AdminLayout>
    <div>
      <AddHero />
    </div>
    </AdminLayout> </>);
}