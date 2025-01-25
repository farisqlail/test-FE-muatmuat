"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { getResource } from "@/utils/Fetch";

import Navbar from "@/components/Navbar";

export default function PokemonDetail() {
    const router = useRouter();
    const [pokemon, setPokemon] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResource(`pokemon/${router.query.id}/`);
                setPokemon(result)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, [])
    return (
        <div className="h-full lg:p-0 p-4 w-full">
            <Navbar />

            <div className="flex flex-col items-center gap-6 h-full mt-4">
                <Image
                    src={`/images/pokemon.png`}
                    width={768}
                    height={768}
                    className="h-full w-32 object-contain"
                />

                <div className="flex flex-col gap-2 lg:w-[400px]">
                    <ul>
                        <li><span className="font-semibold">Name:</span> {pokemon.name}</li>
                        <li><span className="font-semibold">Weight:</span> {pokemon.weight}</li>
                        <li><span className="font-semibold">Stats:</span> {pokemon.stats?.map((item) => (
                            <span className="text-wrap text-gray-500">{item.stat.name}, </span>
                        ))}</li>
                        <li><span className="font-semibold">Abillities :</span> {pokemon.abilities?.map((item) => (
                            <span className="text-wrap text-gray-500">{item.ability.name}, </span>
                        ))}</li>
                        <li><span className="font-semibold">Some Moves:</span> {pokemon.moves?.map((item) => (
                            <span className="text-wrap text-gray-500">{item.move.name}, </span>
                        ))}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}