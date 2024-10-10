'use client'
import {useState, useEffect} from "react"
import Image from "next/image"
import Link from "next/link" 
import Country from "@/components/Country"

export default function CountryPage({params}){

    const [country, setCountry] = useState({})
    const [downloading, setDownloading] = useState(true)
    const [error, setError] = useState(false)
    const [neighbors, setNeighbors] = useState({})

    useEffect(() => {
        const getCountry = async () =>
        {
            try{
                const res = await fetch(`https://restcountries.com/v3.1/alpha/${params.countrytag}`)
                const dataJson = await res.json()
                console.log(dataJson)
                setCountry(dataJson[0])

                if(dataJson[0]?.borders?.length) {
                    const neighborsData = await Promise.all(
                        dataJson[0].borders.map(async (border) => {
                            const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                            const data = await res.json()
                            return data[0]
                        })
                    )
                    setNeighbors(neighborsData)
                }
            }catch(error){
                setError(true)
                console.log(error)
            }finally{
                setDownloading(false)
                console.log('sigma')
            }
        }
        getCountry()
    }, [params.countrytag])

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-black">
            {downloading && <h1>Pobieranie danych...</h1>}
            {error && <h1>Nie udało się pobrać danych</h1>}
            {country?.cca2 != null && (
            <div className="flex flex-col justify-center items-center h-[500px] w-[1000px] bg-slate-500 text-white">
                <Image
                    src={country.flags.png}
                    height={300}
                    width={500}
                    alt={country.name.common}
                    className="w-[500px] h-[300px]"
                />
                <h1 className="text-4xl font-bold mt-6">{country.name.common} ({country.cca2})</h1>  
                <p className="text-xl text-slate-300 mt-6 text-left">Stolica: {country.capital}</p>
                <p className="text-xl text-slate-300 text-left">Populacja: {country.population}</p>  
            </div>
            )}

            <div>
                <h1 className="text-white text-4xl font-bold text-center mt-10">Kraje Sąsiadujące:</h1>
                {downloading && <h1>Pobieranie danych...</h1>}
                {error && <h1>Nie udało się pobrać danych</h1>}
                <div className="flex flex-wrap justify-center gap-4 mt-6">
                    {neighbors.length > 0 ? (
                        neighbors.map((neighbor, idx) => (
                            <Link key={idx} href={`/${neighbor.cca2}`}>
                                <Country country={neighbor}/>
                            </Link>
                        ))
                    ) : (
                        <h1 className="text-xl text-white">Brak krajów sąsiadujących.</h1>
                    )}
                </div>
            </div>
        </div>
    )
}
