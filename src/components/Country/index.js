import Image from "next/image"

export default function Country({ country }){
    return (
        <div className="flex flex-col justify-center items-center text-center w-[300px] h-[220px] p-1 mt-1 ml-1 border border-white text-white bg-slate-500">
            <Image
            src={country.flags.png}
            height={200}
            width={300}
            alt={country.name.common}
            className="w-[240px] h-[160px]"
            />
            {country.name.common} <br></br>
            {country.cca2}
        </div>
    )
}