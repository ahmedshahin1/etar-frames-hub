import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import logo from "@/assets/logo.jpg";

const phoneSchema = z.string().regex(/^01\d{9}$/, "رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم");

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [tab, setTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الدخول");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const phone1 = formData.get("phone1") as string;
    const phone2 = formData.get("phone2") as string;

    try {
      // Validate phone numbers
      phoneSchema.parse(phone1);
      phoneSchema.parse(phone2);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone1,
            phone2,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;

      if (data.user) {
        // Update profile with phone numbers
        const { error: profileError } = await supabase
          .from("profiles" as any)
          .update({
            phone1,
            phone2,
            name,
          })
          .eq("id", data.user.id);

        if (profileError) throw profileError;
      }

      toast.success("تم إنشاء الحساب بنجاح");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || "حدث خطأ أثناء إنشاء الحساب");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={logo} alt="ETAR" className="h-20 w-20 mx-auto mb-4 rounded-lg" />
          <CardTitle className="font-cairo text-2xl">مرحباً بك في إطار</CardTitle>
          <CardDescription>سجل دخولك أو أنشئ حساب جديد</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={(v) => setTab(v as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
              <TabsTrigger value="signup">إنشاء حساب</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">البريد الإلكتروني</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">كلمة المرور</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">الاسم</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    required
                    placeholder="example@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">كلمة المرور</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone1">
                    رقم الهاتف الأول <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signup-phone1"
                    name="phone1"
                    type="tel"
                    required
                    placeholder="01xxxxxxxxx"
                    maxLength={11}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone2">
                    رقم الهاتف الثاني <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signup-phone2"
                    name="phone2"
                    type="tel"
                    required
                    placeholder="01xxxxxxxxx"
                    maxLength={11}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
