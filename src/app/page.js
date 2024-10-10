'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Country from "@/components/Country"

export default function Home(){

    const [countries, setCountries] = useState(null)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getCountries = async () => 
        {
            try{
                const res = await fetch("https://restcountries.com/v3.1/all")
                const dataJson = await res.json()
                setCountries(dataJson)
                console.log(dataJson)
            }catch(error){
                console.log(error)
                console.log("nie udało się pobrać danych")
                setError(false)
            }finally{
                setLoading(false)
            }
        }

        getCountries()
    }, [])

    return (
        <div className="flex flex-wrap justify-center gap-5 bg-gray-950">
            <p>{loading && "Ładowanie..."}</p>
            {error && "nie udało się pobrać danych"}
            {countries && countries.map((country, idx) => (
              <Link key={idx} href={`${country.cca2}`}>
              <Country  country={country}/>
              </Link>
            ))}
        </div>
    )
}