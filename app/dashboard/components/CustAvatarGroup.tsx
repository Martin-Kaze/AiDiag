
import AvatarClient from "./AvatarClient";
import YtConnButt from "./YtConnButt"
import youtube from '@/lib/youtube';


const getdata = async () => { 
return await youtube();
}

export async function CustAvatarGroup( ) {

  const data = await getdata();

  if (!data || data.length === 0) {
    return (
      <YtConnButt/>
    );
  }

 
  return (

    <AvatarClient data={data}/>
  )
}
