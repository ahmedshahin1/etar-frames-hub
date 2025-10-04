import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { z } from 'zod';

const customizeSchema = z.object({
  size: z.string().min(1, 'Size is required'),
  frameType: z.string().min(1, 'Frame type is required'),
  notes: z.string().optional(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

const Customize = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [formData, setFormData] = useState({
    size: '',
    frameType: '',
    notes: '',
    quantity: 1,
    ledOption: false,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Image size must be less than 10MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error('Please login to place custom orders');
        navigate('/auth');
        return;
      }

      // Validate form data
      customizeSchema.parse(formData);

      if (!imageFile) {
        toast.error('Please upload an image');
        setIsLoading(false);
        return;
      }

      // Upload image to Supabase Storage
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${session.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('custom-images')
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      // Create custom order (you'll need to create this table)
      const { error: orderError } = await supabase
        .from('custom_orders' as any)
        .insert({
          user_id: session.user.id,
          image_path: filePath,
          size: formData.size,
          frame_type: formData.frameType,
          notes: formData.notes,
          quantity: formData.quantity,
          led_option: formData.ledOption,
          status: 'pending',
        });

      if (orderError) throw orderError;

      toast.success('Custom order submitted successfully!');
      navigate('/account');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit order');
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
            <CardTitle className="text-2xl font-cairo">{t('common.customize')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Upload Image (max 10MB)</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview('');
                        }}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <label htmlFor="image" className="cursor-pointer block">
                      <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload (JPG, PNG)
                      </p>
                      <Input
                        id="image"
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <Label htmlFor="size">Size</Label>
                <Select
                  value={formData.size}
                  onValueChange={(value) => setFormData({ ...formData, size: value })}
                >
                  <SelectTrigger id="size">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (A4)</SelectItem>
                    <SelectItem value="medium">Medium (A3)</SelectItem>
                    <SelectItem value="large">Large (A2)</SelectItem>
                    <SelectItem value="xlarge">Extra Large (A1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Frame Type */}
              <div className="space-y-2">
                <Label htmlFor="frameType">Frame Type</Label>
                <Select
                  value={formData.frameType}
                  onValueChange={(value) => setFormData({ ...formData, frameType: value })}
                >
                  <SelectTrigger id="frameType">
                    <SelectValue placeholder="Select frame type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wood">Wooden Frame</SelectItem>
                    <SelectItem value="metal">Metal Frame</SelectItem>
                    <SelectItem value="acrylic">Acrylic Frame</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* LED Option */}
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="led"
                  checked={formData.ledOption}
                  onCheckedChange={(checked) => setFormData({ ...formData, ledOption: checked })}
                />
                <Label htmlFor="led">Add LED Lighting</Label>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                />
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or instructions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Submitting...' : t('common.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Customize;
