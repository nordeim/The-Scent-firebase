
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
import { Edit, Trash2, PlusCircle, MoreHorizontal, Eye } from "lucide-react";
import { MOCK_PRODUCTS } from '@/lib/constants'; // Using existing mock products
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Image from "next/image";


export default function InventoryTable() {
  // Using first 5 mock products for brevity
  const inventoryProducts = MOCK_PRODUCTS.slice(0, 5).map(p => ({
    ...p,
    stock: Math.floor(Math.random() * 200), // Mock stock
    lastRestocked: `2023-11-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}` // Mock date
  }));

  return (
     <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
       <div className="p-4 sm:p-6 flex justify-between items-center">
        <h3 className="text-xl font-semibold tracking-tight">Product Inventory</h3>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Last Restocked</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={40} 
                    height={40} 
                    className="rounded object-cover aspect-square"
                    data-ai-hint={product.dataAiHint || "product thumbnail"}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-center">
                   <Badge variant={product.stock < 20 ? "destructive" : (product.stock < 50 ? "secondary" : "default")} className="bg-opacity-70">
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.lastRestocked}</TableCell>
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
                        <Eye className="mr-2 h-4 w-4" /> View Product
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
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
        <Button variant="link" size="sm" className="text-primary hover:text-primary/80 p-0">View All Inventory</Button>
      </div>
    </div>
  );
}
