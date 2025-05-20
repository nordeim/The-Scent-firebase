
import AdminStats from '@/components/admin/AdminStats';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import InventoryTable from '@/components/admin/InventoryTable';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// Placeholder chart component (if you were to add charts)
// import { BarChart, LineChart } from 'lucide-react'; 
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


export const metadata = {
  title: 'Admin Dashboard | AromaGenius',
  description: 'Manage products, orders, and view statistics for AromaGenius.',
};

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
       <Breadcrumb className="mb-6 md:mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Admin Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-8">
        <AdminStats />
        
        {/* Example of how charts could be laid out */}
        {/* <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              <LineChart className="w-16 h-16" /> (Chart Placeholder)
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Customer Acquisition</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
              <BarChart className="w-16 h-16" /> (Chart Placeholder)
            </CardContent>
          </Card>
        </div> */}

        <RecentOrdersTable />
        <InventoryTable />
      </div>
    </div>
  );
}
