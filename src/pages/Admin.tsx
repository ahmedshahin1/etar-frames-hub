import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Package, ShoppingCart, Settings } from 'lucide-react';

const Admin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please login');
        navigate('/auth');
        return;
      }

      // Check if user has admin role using the has_role function
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: session.user.id,
        _role: 'admin'
      });

      if (error) throw error;

      if (!data) {
        toast.error('Access denied: Admin only');
        navigate('/');
        return;
      }

      setIsAdmin(true);
    } catch (error: any) {
      toast.error(error.message || 'Failed to verify admin access');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container py-8">
          <div className="text-center">Loading...</div>
        </main>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <h1 className="text-3xl font-bold font-cairo mb-6">{t('admin.dashboard')}</h1>
        
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              {t('admin.products')}
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t('admin.orders')}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.products')}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button>{t('admin.addProduct')}</Button>
                <p className="text-muted-foreground mt-4">Product management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.orders')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Order management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Fee Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
