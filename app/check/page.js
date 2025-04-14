"use client"

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

export default function App() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      links: [{ text: "", url: "", logo: "" }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links"
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`links.${index}.text`)} placeholder="Text" />
          <input {...register(`links.${index}.url`)} placeholder="URL" />
          <input {...register(`links.${index}.logo`)} placeholder="Logo" />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ text: "", url: "", logo: "" })}>Add Link</button>
      <button type="submit">Submit</button>
    </form>
  );
}
