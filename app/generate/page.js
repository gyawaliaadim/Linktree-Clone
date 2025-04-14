"use client"

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form"
import { z } from "zod";

// const schema = z.object({
//     profileURL: z.string().url({
//         message: "Invalid URL"
//     }),
//     treeName: z.string().min(3, {
//         message: "Minimum length is 3"
//     })
// })

// const Platform = z.object({
//     logo: z.string().url({
//         message: "Invalid URL"
//     }),
//     accountURL: z.string().url({
//         message: "Invalid URL"
//     }),
//     platformName: z.string().min(1, {
//         message: "This field in necessary"
//     })
// })


export default function Home() {

    const searchParams = useSearchParams();
    const [treeParam, settreeParam] = useState(searchParams.get('tree'))
    const {
        register,
        control,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            treeName: treeParam,
            profilePicture:"",
            description:"I love to do ",
            links: [
                { text: "Instagram", url: `https://instagram.com/${searchParams.get("tree")}`, logo: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" } // at least one field to begin
            ]
        },
        // resolver: zodResolver(schema)
    });
    //  This gives you everything in real-time


    const { fields, append, remove } = useFieldArray({
        control,
        name: "links"
    });


    const onSubmit = async (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        console.log(typeof(data))
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: "follow"
        };
    
       const r = await fetch("http://localhost:3000/api/add", requestOptions)
       const result = await r.json()
       if(result.success){ 
         console.log("Sucess")
         alert("Your linktree has been made sucessfully, goto your handle by adding /treeName to this URL")
    
        }
        else{
            setError("treeName",{message:result.message})
          console.log("Reject")
        }
     
    }

    return (
        <div className="flex">
            <div className="left w-2/3  pl-6 pt-6 items-start justify-start flex flex-col">
                <h1 className="font-extrabold text-3xl">Create your Tree</h1>
                <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full min-h-screen">
                    <div className="top flex gap-2 w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <h2>Claim your Linktree</h2>
                            <div>
                                <input
                                    className={`textBox w-2/5 ${errors.treeName ? 'border-2 border-red-500' : ''}`}
                                    {...register("treeName", {
                                        required: { value: true, message: "This field is required" },
                                        minLength: { value: 3, message: "Min length is 3" },
                                        maxLength: { value: 15, message: "Max length is 15" },
                                        validate: (text) => !text.includes(" ") || "No spaces are allowed"
                                    })}
                                    
                                />
                                {errors.treeName && <div className='text-red-500'>{errors.treeName.message}</div>}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-3/5">
                            <h2>Save your Profile Picture</h2>
                            <div>
                                <input
                                    placeholder="URL of your Profile Picture"
                                    className={`w-full textBox ${errors.profilePicture ? 'border-2 border-red-500' : ''}`}
                                    {...register("profilePicture", {
                                        required: { value: true, message: "This field is required" },
                                        minLength: { value: 3, message: "Min length is 3" },
                                        validate: (value) => {
                                            try {
                                                new URL(value);
                                                return true;
                                            } catch {
                                                return "Invalid URL";
                                            }
                                        }
                                    })}
                                />
                                {errors.profilePicture && <div className='text-red-500'>{errors.profilePicture.message}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2>Add your description</h2>
                        <div>
                            <textarea
                                className={`bg-white text-black p-2 rounded-2xl w-full ${errors.description ? 'border-2 border-red-500' : ''}`}
                                placeholder="I love Basketball, ..."
                                {...register('description', {
                                    required: { value: true, message: "This field is required" },
                                    maxLength: { value: 200, message: "Max length is 200" },
                                })}
                            />
                            {errors.description && <div className='text-red-500'>{errors.description.message}</div>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-center">
                                <div className="w-1/3">
                                    <input
                                        className={`w-full textBox ${errors.links?.[index]?.text ? 'border-2 border-red-500' : ''}`}
                                        {...register(`links.${index}.text`, {
                                            required: { value: true, message: "This field is required" }
                                        })}
                                        placeholder="Platform (e.g. Instagram)"
                                    />
                                    {errors.links?.[index]?.text && (<div className="text-red-500">{errors.links[index].text.message}</div>)}
                                </div>
                                <div className="w-1/3">
                                    <input
                                        className={`w-full textBox ${errors.links?.[index]?.url ? 'border-2 border-red-500' : ''}`}
                                        {...register(`links.${index}.url`, {
                                            required: {
                                                value: true, message: "This field is required",
                                                validate: (value) => {
                                                    try {
                                                        new URL(value);
                                                        return true;
                                                    } catch {
                                                        return "Invalid URL";
                                                    }
                                                }
                                            }
                                        })}
                                        placeholder="URL"
                                    />
                                    {errors.links?.[index]?.url && (<div className="text-red-500">{errors.links[index].url.message}</div>)}
                                </div>
                                <div className="w-1/3">
                                    <input
                                        className={`w-full textBox ${errors.links?.[index]?.logo ? 'border-2 border-red-500' : ''}`}
                                        {...register(`links.${index}.logo`, {
                                            required: { value: true, message: "This field is required" },
                                            validate: (value) => {
                                                try {
                                                    new URL(value);
                                                    return true;
                                                } catch {
                                                    return "Invalid URL";
                                                }
                                            }
                                        })}
                                        placeholder="Logo URL"
                                    />
                                    {errors.links?.[index]?.logo && (<div className="text-red-500">{errors.links[index].logo.message}</div>)}
                                </div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        index > 0
                                            ? remove(index)
                                            : setError(`links`, { message: "Add at least one platform" })
                                    }
                                    className="text-black p-2 rounded-[50%] w-10 h-10 bg-white cursor-pointer hover:bg-gray-200"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {fields.length < 1 && errors.links && <div className="text-red-500">{errors.links.message}</div>}

                        <button type="button"className=" p-2 bg-white text-black rounded-full w-1/6 h-2/5 cursor-pointer hover:bg-gray-300" onClick={() => append({ text: "", url: "", logo: "" })}>
                            + Add Link
                        </button>
                    </div>
                    <button type="submit" className="w-1/5 btn">Submit</button>
                </form>
            </div>
            <div className="right w-1/3 p-5   justify-start items-center flex flex-col ">
                <div className=" py-20 px-20 w-full h-full items-center flex flex-col gap-5 bg-[url('/phone.png')] bg-[length:80%_100%] bg-no-repeat object-fill bg-center">

                    <div className=" flex flex-col items-center justify-start w-full gap-5 ">
                        <div className="profilePic flex justify-center">
                            {watch("profilePicture") ? <div className="w-15 h-15 rounded-full" style={{ backgroundImage: `url(${watch("profilePicture")})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                                : <div className="w-15 h-15 rounded-[50%] bg-gray-600"></div>}
                        </div>

                        <div className="w-full info flex flex-col justify-center items-center text-center">
                            <div className="treeName w-full">{watch("treeName")}</div>
                            <div className="description w-full text-[12px]">{watch("description")}</div>
                        </div>
                    </div>
                    <div className="bottom w-full h-full">
                        <div className="platforms w-full h-full flex flex-col gap-5">

   
                        {
                                (watch("links")).map((platform, index) => (

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


                                ))
                            }
                            


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}