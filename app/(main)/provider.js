import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from './_components/AppSidebar';

function DashboardProvider({ children }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className='w-full bg-gray-100'>
                <SidebarTrigger />
                {children}
            </div>
        </SidebarProvider>
    );
}

export default DashboardProvider;