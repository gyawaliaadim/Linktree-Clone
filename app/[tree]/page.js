import Link from "next/link"
import clientPromise from "@/lib/mongodb"
import { notFound } from "next/navigation";

export default async function Page({ params }) {
    const tree = (await params).tree
    const client = await clientPromise;
    const db = client.db("LinkTreeClone")
    const collection = db.collection("tree")

    // If the handle is already claimed, you cannot create the bittree
    const item = await collection.findOne({treeName: tree})
    if(!item){
        return notFound()
    }

    console.log(item)

    const item2 = {
        "_id": {
            "$oid": "6729e97390cf30c8f66c4c68"
        },
        "links": [
            {
                "url": "https://www.instagram.com/codewithharry/?hl=en",
                "text": "Instagram"
            },
            {
                "url": "https://www.codewithharry.com",
                "text": "Website"
            },
            {
                "url": "https://www.YouTube.com/codewithharry/?hl=en",
                "text": "YouTube"
            }
        ],
        "tree": "harry",
        "profilePicture": "https://avatars.githubusercontent.com/u/48705673?v=4"
    }
    // return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
    //      {item && <div className="photo flex justify-center flex-col items-center gap-4"> 
    //         <img src={item.profilePicture} alt="" />
    //         <span className="font-bold text-xl">@{item.treeName}</span>
    //         <span className="desc w-80 text-center">{item.description}</span>
    //         <div className="links">
    //             {item.links.map((platform, index)=>{
    //                 return <Link  key={index} href= {platform.url}><div className="bg-purple-100 py-4 shadow-lg px-2 min-w-96 flex justify-center rounded-md my-3">
    //                    {platform.text}
                       
    //                 </div></Link> 
    //             })}
    //         </div>
    //   </div>}
    // </div> 

    return <div className=" py-20 px-20 w-full h-full items-center flex flex-col gap-5">

    <div className=" flex flex-col items-center justify-start w-full gap-5 ">
        <div className="profilePic flex justify-center">
            {item.profilePicture ? <div className="w-15 h-15 rounded-full" style={{ backgroundImage: `url(${item.profilePicture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                : <div className="w-15 h-15 rounded-[50%] bg-gray-600"></div>}
        </div>

        <div className="w-full info flex flex-col justify-center items-center text-center">
            <div className="treeName w-full">{item.treeName}</div>
            <div className="description w-full text-[12px]">{item.description}</div>
        </div>
    </div>
    <div className="bottom w-1/2 h-full">
        <div className="platforms w-full h-full flex flex-col gap-5">


        {
                 (item.links).map((platform, index) => {
                    
                    return<Link  key={index} href= {platform.url}>
                    <div className="w-full h-1/6" key={index}>
                        <div className="p-2 text-white w-full h-full rounded-2xl bg-gray-900 justify-start items-center flex ">
                            <div className="w-1/5 h-full flex justify-center items-center">
                                {platform.logo ?
                                    <div className="w-15 h-15 rounded-full" style={{ backgroundImage: `url("${platform.logo}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                    : <div className="w-15 h-15 rounded-[50%] bg-gray-600"></div>}
                          
                            </div>
                            <div className="line w-[2px] h-[50%] bg-gray-600 mx-2"></div>
                            <div className="right w-full h-full justify-center flex items-center"> {platform.text}</div>
                        </div>
                    </div>
                    </Link> 


})
            }
            


        </div>
    </div>
</div>
}