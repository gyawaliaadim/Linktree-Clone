"use client"

import Button from "@/components/Button";
// import InputText from "@/components/InputText";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from "react-hook-form"



export default function Home() {
    const searchParams = useSearchParams();
    const [treeParam, settreeParam] = useState(searchParams.get('tree'))
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
        treeName: treeParam
        }
    });



    
    const [imageSrc, setImageSrc] = useState("");
    const [LinkMessage, setLinkMessage] = useState(null);
    const linkTextValue = watch("text", "")
    const handleLocalChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("pic", file); // Manually set file in react-hook-form
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLinkChange = (e) => {
        try {
            const link = e.target.value;
            new URL(link)
            setLinkMessage(null)
            setValue("pic", link); // Manually set link in react-hook-form
            setImageSrc(link);
        }
        catch {

            setLinkMessage("Invalid URL")
        }
    };

    useEffect(() => {
        if (treeParam) {
            setValue("treeName", treeParam);
        }
    }, [treeParam, setValue]);


    const onSubmit = async (data) => {
        console.log(data)
    }



    return (
        <div className="container">
            <div className="flex w-full h-[calc(100vh-104px)] bg-slate-800">
























            <div className="left w-2/3 h-full  pt-2 items-center justify-start flex flex-col " >
                    <h1 className="font-extrabold text-3xl">Create your Tree</h1>


                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <>
                            <div className="flex flex-col gap-5" >
                                <h2>Step 1, Claim your Linktree</h2>
                                <div>
                                    <input
                                        className={`py-2 px-4 w-[300px] h-[32px] rounded-2xl bg-white text-black ${errors.treeName ? 'border-2 border-red-500' : ''}`}
                                        {...register("treeName", {
                                            required: { value: true, message: "This field is required" },
                                            minLength: { value: 3, message: "Min length is 3" }
                                        })}
                                    />
                                    {errors.treeName && <div className='text-red-500'>{errors.treeName.message}</div>}
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <h2>Step 2, Add Links</h2>
                                <div className="flex gap-5">
                                    <label htmlFor="linkPic" className="flex gap-2 ">
                                        <p className="min-w-[200px]"> Add Picture of {linkTextValue || ""}</p>
                                        <select
                                            id="linkPic"
                                            value={mode}
                                            onChange={(e) => {
                                                setMode(e.target.value);
                                                setValue("pic", ""); // clear previous value when mode switches
                                                setImageSrc("");
                                            }}
                                            className="border px-2 py-1 rounded"
                                        >

                                            <option className="text-black" value="local">Local Upload</option>
                                            <option className="text-black" value="link">Link</option>
                                        </select>
                                    </label>
                                    {mode === "local" ? (
                                        < input className=" outline-1 outline-white p-1 rounded-2xl text-white " type="file" accept="image/*" onChange={handleLocalChange} />
                                    ) : (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Enter image link"
                                                onChange={handleLinkChange}
                                                className="border px-2 py-2 rounded"
                                            />
                                            {LinkMessage && <div className="text-red-600">{LinkMessage}</div>}
                                        </>
                                    )}





                                </div>
                                <div className="flex gap-10">

                                    {imageSrc &&/* imageSrc && ( */
                                        <img
                                            src={imageSrc}
                                            alt="Selected"
                                            className="w-[50px] h-[50px] object-cover object-center rounded-[50%]"
                                        />}

                                    <input
                                        id="LinkTextId"
                                        placeholder={`Instagram`}
                                        className={`px-4 w-[300px] h-[32px] rounded-2xl bg-white text-black ${errors.link ? 'border-2 border-red-500' : ''}`}

                                        {...register("text", {
                                            required: { value: true, message: "This field is required" },

                                        })}
                                    />
                                    <input
                                        placeholder={`https://www.instagram.com/${treeParam}`}
                                        className={`py-2 px-4 w-[300px] h-[32px] rounded-2xl bg-white text-black ${errors.link ? 'border-2 border-red-500' : ''}`}
                                        {...register("link", {
                                            required: { value: true, message: "This field is required" },
                                            minLength: { value: 8, message: "" },
                                            validate: value => {
                                                try {
                                                    new URL(value);
                                                    return true;
                                                } catch {
                                                    return "Invalid URL";
                                                }
                                            },
                                        })}
                                    />
                                    {errors.link && <div className='text-red-500'>{errors.link.message}</div>}
                                </div>
                                <button className=' bg-white text-black w-20 h-[32px] rounded-full'>+ Links</button>
                            </div>
                            <div>
                                <h2>Step 3, Add your Profile Picture and finalize</h2>
                                <label htmlFor="">
                                    <select
                                        id="linkPic"
                                        value={mode}
                                        onChange={(e) => {
                                            setMode(e.target.value);
                                            setValue("pic", ""); // clear previous value when mode switches
                                            setImageSrc("");
                                        }}
                                        className="border px-2 py-1 rounded"
                                    >

                                        <option className="text-black" value="local">Local Upload</option>
                                        <option className="text-black" value="link">Link</option>
                                    </select>
                                </label>

                            </div>
                            <div>
                                <button className=" bg-black text-white p-5 rounded-full" type="submit">Claim your handle</button>
                            </div>
                        </>
                    </form>
                </div>
































                <div className="flex w-1/3 *justify-center items-center h-full bg-[url('/banner.png')] bg-contain bg-no-repeat bg-center ">
                </div>

            </div>
        </div>
    );
}
