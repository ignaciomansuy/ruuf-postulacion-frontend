'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from "react-hook-form"

interface IHouseForm {
  fullAddress: string
}
 
export default function Page() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<IHouseForm>()
  const onSubmit: SubmitHandler<IHouseForm> = async (data) => {
    const response = await fetch('http://localhost:3000/house', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "fullAddress": data.fullAddress
      }),
    })
 
    const response_data = await response.json()
    if (response.ok) {
      router.push(`/form2?houseId=${response_data.id}`)
    } else {
      console.log(response_data)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("fullAddress")} />
      <button type="submit">Submit</button>
    </form>
  )
}
