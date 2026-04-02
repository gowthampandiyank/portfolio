import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import { Eye, EyeOff } from "lucide-react";


const AdminLogin = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://gowthampandiyank.github.io/portfolio-builder-pro/#/admin/login",
      });

      if (error) throw error;

      toast.success("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      toast.error(err.message || "Unable to send reset email.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              "https://gowthampandiyank.github.io/portfolio-builder-pro/#/admin/login",
          },
        });

        if (error) throw error;
        toast.success("Account created successfully. You can sign in now.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          if (
            error.message.toLowerCase().includes("invalid login credentials")
          ) {
            throw new Error("Wrong email or password.");
          }
          throw error;
        }

        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;

const { data: roles, error: roleError } = await supabase
  .from("user_roles")
  .select("role")
  .eq("user_id", userData.user?.id)
  .eq("role", "admin");

if (roleError) throw roleError;

if (!roles || roles.length === 0) {
  await supabase.auth.signOut();
  toast.error("Access denied. Admin privileges required.");
  return;
}
        toast.success("Welcome back!");
        navigate("/admin");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            <span className="text-primary">G</span>P Admin
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignUp ? "Create your account" : "Sign in to manage projects"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-border bg-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-border bg-elevated px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              aria-label="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {!isSignUp && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="self-end text-xs text-primary hover:underline bg-transparent border-none cursor-pointer"
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md text-sm font-semibold hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-4">
          {isSignUp ? "Already have an account?" : "Need an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-primary hover:underline bg-transparent border-none cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>

        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
