import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const addressSchema = z.object({
  governorate: z.string().min(1, 'Governorate is required'),
  city: z.string().min(1, 'City is required'),
  street: z.string().min(1, 'Street address is required'),
  postalCode: z.string().optional(),
});

const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(80);
  const [formData, setFormData] = useState({
    governorate: '',
    city: '',
    street: '',
    postalCode: '',
  });

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        toast.error('Please login to checkout');
        navigate('/auth');
      }
    });
  }, [navigate]);

  useEffect(() => {
    // Calculate delivery fee based on governorate
    const fees: Record<string, number> = {
      'Alexandria': 60,
      'الإسكندرية': 60,
      'Cairo': 75,
      'القاهرة': 75,
      'Giza': 75,
      'الجيزة': 75,
    };
    setDeliveryFee(fees[formData.governorate] || 80);
  }, [formData.governorate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate form
      addressSchema.parse(formData);

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Create order (simplified - you'd normally get cart items)
      const { error: orderError } = await supabase
        .from('orders' as any)
        .insert({
          user_id: session.user.id,
          total_price: 0, // Calculate from cart
          delivery_fee: deliveryFee,
          address_json: formData,
          status: 'pending',
        });

      if (orderError) throw orderError;

      toast.success('Order placed successfully!');
      navigate('/account');
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || 'Failed to place order');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-cairo">{t('checkout.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">{t('checkout.deliveryInfo')}</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="governorate">{t('checkout.governorate')}</Label>
                  <Select
                    value={formData.governorate}
                    onValueChange={(value) => setFormData({ ...formData, governorate: value })}
                  >
                    <SelectTrigger id="governorate">
                      <SelectValue placeholder="Select governorate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Alexandria">Alexandria / الإسكندرية</SelectItem>
                      <SelectItem value="Cairo">Cairo / القاهرة</SelectItem>
                      <SelectItem value="Giza">Giza / الجيزة</SelectItem>
                      <SelectItem value="Other">Other / أخرى</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">{t('checkout.city')}</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street">{t('checkout.street')}</Label>
                  <Input
                    id="street"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">{t('checkout.postalCode')}</Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>{t('checkout.deliveryFee')}</span>
                  <span className="font-bold">{deliveryFee} {t('common.egp')}</span>
                </div>
                <p className="text-sm text-muted-foreground">{t('checkout.codOnly')}</p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Processing...' : t('checkout.placeOrder')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Checkout;
