import AddBlog from "@/components/admin/AddBlog";
import AdminLayout from "@/components/admin/AdminLayout";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminLayout>
        <AddBlog />
      </AdminLayout>
    </div>
  );
}