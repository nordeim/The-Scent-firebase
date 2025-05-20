
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const stats = [
  { title: "Total Sales", value: "$24,500.75", icon: <DollarSign className="h-6 w-6 text-muted-foreground" />, dataAiHint: "money stack" },
  { title: "Total Orders", value: "1,245", icon: <ShoppingCart className="h-6 w-6 text-muted-foreground" />, dataAiHint: "shopping cart"},
  { title: "Active Customers", value: "327", icon: <Users className="h-6 w-6 text-muted-foreground" />, dataAiHint: "people group"},
  { title: "Products in Stock", value: "189", icon: <Package className="h-6 w-6 text-muted-foreground" />, dataAiHint: "product box"},
];

export default function AdminStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
