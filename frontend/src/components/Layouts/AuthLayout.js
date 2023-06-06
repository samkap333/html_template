import React from 'react'
import { Outlet } from 'react-router-dom';
function AuthLayout() {
    return (
        <>
            <div className="wrapper">
                <div className="main authLayout">
                    <main className="content">
                        <Outlet />
                    </main>
                </div>

            </div>
        </>
    )
}
export default AuthLayout;
