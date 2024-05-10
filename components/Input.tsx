import React from "react";
interface InputProps{
    id:string;
    type?:string;
    value:string;
    onChange:any;
    label:string

}
const Input:React.FC<InputProps> = (
    {
        id, 
        type,
        value,
        onChange,
        label

    }
) => {
    return (
        <div className="mt-1  relative">
        
        <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="
        block
        px-6
        py-6
        w-full
        rounded-md
        text-md
        text-white
        bg-neutral-700
        pb-1
        focus:outline-none
        focus:ring-0
        appearence-none
        peer
        "
        placeholder=""
        />

{/* element moves upward  -translate-y-3   , scale-75  reduces the size of the element to 75% of its original size in both dimensions (width and height). origin-[0] ----The origin point of the transformation will be at the top-left corner of the element (origin-[0] */}
        <label
        className="
        absolute
        top-4
        text-zinc-400
        left-6
        text-md
        transform
        -translate-y-3
        scale-75
        duration-150
        origin-[0]
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0
        peer-focus:scale-75
        peer-focus:-translate-y-3
        "
        htmlFor={id}
    
        >
       {label}
        </label>
    
        </div>
    

    )




}

export default Input