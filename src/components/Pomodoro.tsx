import React from 'react'
import { useForm } from 'react-hook-form'

const Pomodoro = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={25}
          type="number"
          {...register('taskTime', {
            required: true,
            min: 0,
          })}
        />
        {errors.taskTime && 'Your input is required'}
        <input type="submit" />
      </form>
    </>
  )
}

export default Pomodoro
