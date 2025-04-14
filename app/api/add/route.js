import clientPromise from "@/lib/mongodb"


export async function POST(request) {
    const body = await request.json()

    const client = await clientPromise;
    const db = client.db("LinkTreeClone")
    const collection = db.collection("tree")

    // If the handle is already claimed, you cannot create the bittree
    const doc = await collection.findOne({treeName: body.treeName})

    if (doc){
      return Response.json({ success: false, error: true, message: 'This Linktree already exists!', result: null })
    }

    const result = await collection.insertOne(body)
     
    return Response.json({ success: true, error: false, message: 'Your Linktree has been generated!', result: result,  })
  }