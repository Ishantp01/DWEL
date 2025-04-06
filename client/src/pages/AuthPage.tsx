import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

const API_URL = 'http://localhost:5000/api/users';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    document.title = isLogin ? "DWEL | Login" : "DWEL | Sign Up";
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password || (!isLogin && !name)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(isLogin ? `${API_URL}/login` : `${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          ...(isLogin ? {} : { name }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({
        title: isLogin ? "Login Successful" : "Account Created",
        description: isLogin
          ? "Welcome back to DWEL!"
          : "Your account has been created successfully",
      });

      // Optional: save token if returned
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4 py-8 flex flex-1 items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/landing" className="inline-flex items-center text-sm text-muted-foreground hover:text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-8 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-synergy-purple to-synergy-blue" />
            <span className="ml-2 text-2xl font-semibold text-white">DWELL</span>
          </div>

          <Card className="bg-card/30 border-border shadow-lg backdrop-blur-sm">
            <CardContent className="pt-6">
              <h1 className="text-2xl font-bold text-center mb-6">
                {isLogin ? "Sign In to Your Account" : "Create New Account"}
              </h1>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                    {isLogin && (
                      <Link to="/auth" className="text-xs text-synergy-purple hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-2.5 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-synergy-purple to-synergy-blue hover:brightness-110 transition-all"
                >
                  {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  className="text-synergy-purple hover:underline font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to SynergyOS's Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
