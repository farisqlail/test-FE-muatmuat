
import React from "react";

import { Card, CardBody } from "@heroui/react";

export default function ProductCard({ data, openEditStock, openDeleteStock }) {
    const handleOpenEdit = (item, index) => {
        openEditStock(item, index);
    }

    const handleOpenDelete = (item, index) => {
        openDeleteStock(item, index);
    }

    return (
        <>
            {data.map((item, index) => (
                <Card className="lg:w-[400px] w-full border border-white bg-inherit">
                    <CardBody>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <span className="text-white">{item.name}</span>
                                <small className="text-gray-400">Rp {parseFloat(item.price).toLocaleString()} / {item.stock}</small>
                            </div>
                            <div className="flex gap-2">
                                <div className="border border-white rounded-full p-2" onClick={() => handleOpenEdit(item, index)}>
                                    <svg width="18px" height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                        <g id="SVGRepo_iconCarrier"> <path d="M13 0L16 3L9 10H6V7L13 0Z" fill="#ffffff" /> <path d="M1 1V15H15V9H13V13H3V3H7V1H1Z" fill="#ffffff" /> </g>
                                    </svg>
                                </div>
                                <div className="border border-white rounded-full p-2" onClick={() => handleOpenDelete(item, index)}>
                                    <svg width="18px" height="18px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                                        <g id="SVGRepo_iconCarrier"> <path d="M4 2H1V4H15V2H12V0H4V2Z" fill="#ffffff" /> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6H13V16H3V6ZM7 9H9V13H7V9Z" fill="#ffffff" /> </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </>
    )
}