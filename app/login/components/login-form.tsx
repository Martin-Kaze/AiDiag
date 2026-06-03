"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const router = useRouter();
  const [spinner, setSpinner] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("error") === "reauth") {
    authClient.signOut().then(() => {
      router.replace("/login");
    });
    return; 
  }

  if (session) {
    router.push("/dashboard");
  }
}, [session, router]);

    const handleLogin = async () => {
    setSpinner(true);
    
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/login",
    });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Login to with your Youtube account
                </p>
              </div>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Here
              </FieldSeparator>
              <Field className="flex gap-4 w-fit mx-auto  ">
                <Button variant="outline" type="button" className=" p-3" onClick={handleLogin}>
                  {(spinner) ? <Spinner scale={10} className="mx-auto"/> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="450" height="45" className="size-7">
  <path 
    d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
    fill="#FF0000"
    
  />
</svg> }
                  

                  <span className="sr-only">Login with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center text-sm ">
                By clicking continue, you agree to our <a href="/terms">Terms of Service</a>{" "}
        and <a href="/privacy-policy">Privacy Policy</a>.
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placer.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover "
            />
          </div>
        </CardContent>
      </Card>
   
    </div>
  )
}
