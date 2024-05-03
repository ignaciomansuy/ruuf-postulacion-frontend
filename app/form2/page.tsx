'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
 
interface QuoreForm {
  monthlyConsumption: number
}

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [price, setPrice] = useState(null)
  const { register, handleSubmit } = useForm<QuoreForm>()


 
  const houseId = searchParams.get('houseId')
  if (!houseId) {
    return (
      <p>Null house id</p>
    )
  }
  const onSubmit: SubmitHandler<QuoreForm> = async (data) => {
    
    const response = await fetch('http://localhost:3000/quote', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "houseId": houseId,
        "monthlyConsumption": data.monthlyConsumption
      }),
    })
 
    // Handle response if necessary
    if (response.ok) {
      const response_data = await response.json()
      console.log(response_data)
      setPrice(response_data.price)
    } else {
      console.log(response)
    }
  }
  if (!price) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("monthlyConsumption", {
    valueAsNumber: true,
  })} type='number'/>
        <button type="submit">Submit</button>
      </form>
    )
  } else {
    return(
      <p>Price: {price}</p>
    )
  }
}