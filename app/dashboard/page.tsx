import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Footer } from "@/components/ForAllPage/Footer";
import { Menu } from "@/components/ForAllPage/Menu";
import { CustAvatarGroup } from "@/components/ForDashboad/CustAvatarGroup";
export default async function Dashboard() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect("/login");
  }
  const tokens = await auth.api.getAccessToken({
    headers: await headers(),
    body: { providerId: "google" },
  });

 let subscriptions: any[] = [];

  if (tokens?.accessToken) {
    let nextPageToken = "";
    do {
      let url = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50`;
      if (nextPageToken) {
        url += `&pageToken=${nextPageToken}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });
      const data = await response.json();
      if (data.items) {
        subscriptions = [...subscriptions, ...data.items];
      }
      nextPageToken = data.nextPageToken;
      
    } while (nextPageToken); 
  }
  return (

    <div className="flex flex-col min-h-screen w-full">
      
      <header className="w-full">
        <Menu />
      </header>
      
      <main className="relative flex flex-1 flex-col items-center justify-center gap-4 p-8 max-w-3xl w-full mx-auto">
         
        <p className="text-3xl font-bold text-center"> Your subcriptions</p>
    
        <CustAvatarGroup data={subscriptions}/>

      </main> 

      <Footer/>
    
    </div>
  
  );
}