import AddPackage from "@/components/admin/AddPackage";
import AdminLayout from "@/components/admin/AdminLayout";

export default function PackagesPage() {
  return (
    <>
      <div className="min-h-screen bg-background">
        <AdminLayout>
          <AddPackage />
        </AdminLayout>
      </div>
    </>
  );
}
