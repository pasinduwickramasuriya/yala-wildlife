import AddHero from "@/components/admin/AddHero";
import AdminLayout from "@/components/admin/AdminLayout";

export default function HeroAdminPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <AdminLayout>
          <div>
            <AddHero />
          </div>
        </AdminLayout>{" "}
      </div>
    </>
  );
}
