
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Feather } from 'lucide-react'; // Changed Sparkles to Feather

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
               <Feather className="h-7 w-7 text-accent" /> {/* Changed icon */}
              <span className="text-xl font-bold font-serif text-accent">The Scent</span> {/* Changed name and applied font */}
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium AI-powered aromatherapy products for a more mindful life.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">Scent Quiz</Link></li>
              <li><Link href="/ar" className="text-muted-foreground hover:text-foreground transition-colors">AR View</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-foreground transition-colors">Your Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} The Scent. All rights reserved.</p> {/* Changed name */}
        </div>
      </div>
    </footer>
  );
}
