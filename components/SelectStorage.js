import React from 'react'

const SelectStorage = () => {
  return (
    <div>
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
    </div>
  )
}

export default SelectStorage
