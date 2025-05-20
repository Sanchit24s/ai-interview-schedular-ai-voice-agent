"use client";
import React from 'react';
import DashboardProvider from './provider';
import Provider from '../provider';

function DashboardLayout({ children }) {
    return (
        <div>
            <Provider>
                <DashboardProvider>
                    <div className='p-10'>
                        {children}
                    </div>
                </DashboardProvider>
            </Provider>
        </div>
    );
}

export default DashboardLayout;