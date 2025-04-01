import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-2">
          <li>
            <Link href="/admin/packages" className="hover:underline">
              Packages
            </Link>
          </li>
          <li>
            <Link href="/admin/reviews" className="hover:underline">
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/admin/hero" className="hover:underline">
              Hero Sections
            </Link>
          </li>
          <li>
            <Link href="/admin/blog" className="hover:underline">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/admin" className="hover:underline">
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
