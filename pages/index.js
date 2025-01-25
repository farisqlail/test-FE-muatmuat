"use client"

import React, { use, useEffect, useState } from "react";

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@heroui/react";

import { getResource } from "@/utils/Fetch";

import ProductCard from "@/components/ProductCard";
import ButtonCreate from "@/components/ButtonCreate";
import Navbar from "@/components/Navbar";

export const IconPlus = () => {
  return (
    <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0" />
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
      <g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>
    </svg>
  );
};

export default function Home() {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [dataStock, setDataStock] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [indexStock, setIndexStock] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd, onClose: onCloseAdd } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onOpenChange: onOpenChangeEdit, onClose: onCloseEdit } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete, onClose: onCloseDelete } = useDisclosure();

  useEffect(() => {
    const dataStock = typeof window !== "undefined" ? JSON.parse(localStorage.getItem('stock')) : false;
    setFilteredData(dataStock)
    setDataStock(dataStock)
  }, [dataStock]);

  const resetForm = () => {
    setName("")
    setStock("")
    setPrice("")
  }

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = dataStock.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    setFilteredData(filtered);
  };

  const createStock = () => {
    if (name == "" || stock == "" || price == "") {
      alert('Ada inputan yang kosong');
    } else {
      const data = {
        name: name,
        stock: stock,
        price: price
      }

      const dataStock =
        typeof window !== "undefined" ? JSON.parse(localStorage.getItem("stock")) || [] : false;
      dataStock.push(data);
      typeof window !== "undefined" ? localStorage.setItem("stock", JSON.stringify(dataStock)) : false;

      resetForm();
      onCloseAdd();
      alert('Data berhasil ditambahkan')
    }
  }

  const openEditStock = (item, index) => {
    onOpenEdit();
    setName(item.name);
    setStock(item.stock);
    setPrice(item.price);
    setIndexStock(index);
  }

  const openDeleteStock = (item, index) => {
    onOpenDelete();
    setName(item.name);
    setStock(item.stock);
    setPrice(item.price);
    setIndexStock(index);
  }

  const edit = (indexStock) => {
    const dataEdit = {
      name: name,
      stock: stock,
      price: price
    };

    const dataToUpdate = dataStock;
    const index = dataToUpdate.findIndex((_, index) => index === indexStock);
    dataToUpdate[index] = dataEdit;
    typeof window !== "undefined" ? localStorage.setItem("stock", JSON.stringify(dataToUpdate)) : false;

    resetForm();
    onCloseEdit();
    alert('data berhasil diubah')
  }

  const deleteData = (indexStock) => {
    const dataToDelete = dataStock;
    const index = dataToDelete.findIndex((_, index) => index === indexStock);
    dataToDelete.splice(index, 1);
    localStorage.setItem("stock", JSON.stringify(dataToDelete));
    onCloseDelete();
  }

  return (
    <div className="h-full w-full lg:p-0 p-4">
      <Navbar />
      <div className="flex flex-col items-center gap-6 h-full mt-4">
        <div className="flex justify-between pb-4 lg:w-[400px] w-full">
          <h1 className="text-2xl text-white">Manajemen Stock</h1>
          <ButtonCreate icon={IconPlus()} onOpenAdd={onOpenAdd} />
        </div>

        <div className="lg:w-[400px] w-full">
          <Input placeholder="Search ..." type="text" variant="bordered" value={searchQuery}
            onChange={handleSearchChange} />
        </div>

        <ProductCard data={filteredData} openEditStock={openEditStock} openDeleteStock={openDeleteStock} />
      </div>

      <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd}>
        <ModalContent>
          {(onCloseAdd) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Tambah Stock</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black">Nama Barang</label>
                  <Input
                    type="text"
                    variant="bordered"
                    className="text-black"
                    placeholder="Sate Ayam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black">Stock</label>
                  <Input
                    type="number"
                    variant="bordered"
                    className="text-black"
                    placeholder="10"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black">Harga</label>
                  <Input
                    type="number"
                    variant="bordered"
                    className="text-black"
                    placeholder="20000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2 w-full">
                  <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseAdd}>
                    Batal
                  </button>
                  <button
                    className="bg-green-500 rounded-lg p-3 w-full"
                    onClick={createStock}
                  >
                    Tambah
                  </button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenEdit} onOpenChange={onOpenChangeEdit}>
        <ModalContent>
          {(onCloseEdit) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Ubah Stock</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black">Nama Barang</label>
                  <Input
                    type="text"
                    variant="bordered"
                    className="text-black"
                    placeholder="Sate Ayam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black">Stock</label>
                  <Input
                    type="number"
                    variant="bordered"
                    className="text-black"
                    placeholder="10"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="" className="text-black">Harga</label>
                  <Input
                    type="number"
                    variant="bordered"
                    className="text-black"
                    placeholder="20000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2 w-full">
                  <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseEdit}>
                    Batal
                  </button>
                  <button
                    className="bg-green-500 rounded-lg p-3 w-full"
                    onClick={() => edit(indexStock)}
                  >
                    Ubah
                  </button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onCloseDelete) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-black">Hapus Stock</ModalHeader>
              <ModalBody>
                <span className="text-black">Apakah anda yakin ingin menghapus stock ini ? </span>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-2 w-full">
                  <button className="border border-black rounded-lg p-3 text-black w-full" onClick={onCloseDelete}>Batal</button>
                  <button className="bg-red-500 rounded-lg p-3 w-full" onClick={() => deleteData(indexStock)}>Ya, hapus</button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
