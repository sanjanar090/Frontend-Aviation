'use client'
import { useState } from "react";

import DeviceStatusTable from '@/components/DeviceStatusTable'
import { Menu, Share2, Link2, Flag } from 'lucide-react'

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
export default function DevicesPage() {
      const [sidebarOpen, setSidebarOpen] = useState(true);
      const [activeTab, setActiveTab] = useState("dashboard");
  return (
    <div className="flex h-screen bg-gray-50">
          <Sidebar isOpen={sidebarOpen} />
    
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header currentPage="Devices" />
    <div className="bg-gray-50 min-h-screen">

      <main className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 text-sm text-gray-600">
            <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
            <span className="mx-2">/</span>
            <a href="#" className="text-gray-600 hover:text-gray-900">Devices</a>
          </div>

          <div className="mb-8">
            <DeviceStatusTable />
          </div>
        </div>
      </main>
    </div>
    </div>
    </div>
  )
}
