
"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit2, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


// Mock data - in a real app, this would come from context or props
const MOCK_ORDERS = [
  { id: "#1001", customer: "Olivia Martin", date: "2023-11-01", total: "$124.99", status: "Shipped", payment: "Paid" },
  { id: "#1002", customer: "Jackson Lee", date: "2023-11-02", total: "$89.50", status: "Processing", payment: "Paid" },
  { id: "#1003", customer: "Isabella Nguyen", date: "2023-11-03", total: "$205.00", status: "Delivered", payment: "Paid" },
  { id: "#1004", customer: "William Kim", date: "2023-11-04", total: "$45.75", status: "Pending", payment: "Unpaid" },
  { id: "#1005", customer: "Sophia Davis", date: "2023-11-05", total: "$162.30", status: "Shipped", payment: "Paid" },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case "shipped": return "default";
    case "processing": return "secondary";
    case "delivered": return "outline"; // Using outline for a "completed" look
    case "pending": return "destructive"; // Or another color like orange if available
    default: return "secondary";
  }
};


export default function RecentOrdersTable() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-semibold tracking-tight">Recent Orders</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(order.status)} className="capitalize text-xs">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>
                   <Badge variant={order.payment === "Paid" ? "default" : "destructive"} className="bg-opacity-70">
                    {order.payment}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit2 className="mr-2 h-4 w-4" /> Edit Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="p-4 sm:p-6 border-t">
        <Button variant="link" size="sm" className="text-primary hover:text-primary/80 p-0">View All Orders</Button>
      </div>
    </div>
  );
}
