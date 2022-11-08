import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '@components/Layout/Layout'
import ProductSummary from '@components/ProductSummary/ProductSummary'
import { GetStaticProps } from 'next'

//el getStaticPath se debe usar cuando una pagina es dinamica, esto retorna la lista de paginas que se van a generar, es decir los posibles id's que se podrian visitar
export const getStaticPaths = async() => {
  const response = await fetch('http://localhost:3000/api/avo/')
  const {data:productList}:TAPIAvoResponse = await response.json()
  const paths = productList.map(({id})=>({
    params:{
      id,
    },
  })) 
  return {
    paths,
    fallback:false
  }
}

//para capturar el id se usa lo que se llama params, esto es deconstruido desde una propiedad que se llama context que viene en los parametros del getStaticProps
export const getStaticProps:GetStaticProps = async ({params}) => {
  const id = params?.id as string //en esta parte se pone params.id porque asi se llama la ruta dinamica, si se llamara number entonces se pone params.number
  const response = await fetch(`http://localhost:3000/api/avo/${id}`)
const product: TProduct = await response.json()
  return {
    props:{
      product
    }
  }
}


const ProductPage = ({product}: {product:TProduct} ) => {

  // const llamado = async()=>{
  // const response = await fetch('http://localhost:3000/api/avo/')
  // const {data:ProductList}:TAPIAvoResponse = await response.json()
  // const respuesta =  await ProductList.map(({id}) => ({
  //   params:{
  //     id
  //   }
  // }))
  // }

  return (
    <Layout>
      {product == null ? null : <ProductSummary product={product} />}
    </Layout>
  )
}

export default ProductPage
