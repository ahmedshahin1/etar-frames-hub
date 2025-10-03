import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { User, Session } from "@supabase/supabase-js";

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الخروج");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <p>جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <h1 className="font-cairo font-bold text-4xl mb-8">حسابي</h1>

        <div className="grid gap-6 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الحساب</CardTitle>
              <CardDescription>بياناتك الشخصية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">الاسم</p>
                <p className="font-medium">{user.user_metadata?.name || "غير محدد"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">رقم الهاتف الأول</p>
                <p className="font-medium">{user.user_metadata?.phone1 || "غير محدد"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">رقم الهاتف الثاني</p>
                <p className="font-medium">{user.user_metadata?.phone2 || "غير محدد"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>طلباتي</CardTitle>
              <CardDescription>سجل طلباتك السابقة</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">لا توجد طلبات حتى الآن</p>
            </CardContent>
          </Card>

          <Button variant="destructive" onClick={handleLogout} className="w-full">
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
