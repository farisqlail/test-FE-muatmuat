"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { getResource } from "@/utils/Fetch";

import Navbar from "@/components/Navbar";

export default function Pokemon() {
    const router = useRouter();
    const [pokemon, setPokemon] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            try {
                const result = await getResource("pokemon?limit=20&offset=0");
                setPokemon(result.results)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetch();
    }, [])

    const toDetail = (index) => {
        router.push(`/pokemon/${index}`)
    }

    return (
        <div className="h-full lg:p-0 p-4 w-full ">
            <Navbar />

            <div className="flex flex-col items-center gap-6 h-full mt-4">
                <div className="columns-2 gap-4 mt-4">
                    {pokemon.map((item, index) => (
                        <div className="bg-red-500/50 p-4 w-full rounded-lg mb-4 h-[200px] flex flex-col justify-start" onClick={() => toDetail(index+1)}>
                            <span className="font-semibold text-xl text-white">{item.name}</span>
                            <Image
                                src={`/images/pokemon.png`}
                                width={768}
                                height={768}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}