import Link from "next/link"
import { notFound } from "next/navigation";

export default async function Page() {
    // const tree = (await params).tree
    // const client = await clientPromise;
    // const db = client.db("LinkTreeClone")
    // const collection = db.collection("tree")

    // If the handle is already claimed, you cannot create the bittree
    // const item = await collection.findOne({ treeName: tree })



    const item = {

        "_id": "67fd71ec986064e14a7ee800",
        "treeName": "aadimgyawali",
        "profilePicture": "https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/6557420216a456cfaef685c0_6399a4d27711a5ad2c9bf5cd_ben-sweet-2LowviVHZ-E-unsplash-1-p-1600.jpg",
        "description": "I love to code.",
        "links": [
            {
                "text": "Instagram",
                "url": "https://instagram.com/aadmgyawali46",
                "logo": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
            },
            {
                "text": "X",
                "url": "https://x.com/aadimgy",
                "logo": "https://upload.wikimedia.org/wikipedia/commons/b/b7/X_logo.jpg"
            },
            {
                "text": "LinkedIn",
                "url": "https://www.linkedin.com/in/aadimgyawali/",
                "logo": "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
            },
            {
                "text": "Faceobook",
                "url": "https://www.facebook.com/mr.aadimgy/",
                "logo": "https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg"
            }
        ]
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

                        return <Link key={index} href={platform.url}>
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
