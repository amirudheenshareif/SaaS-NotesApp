import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header.jsx'

export const AppLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}
