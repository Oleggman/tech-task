import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export const SharedLayout = () => {
  return (
      <>
          <header>
              <nav>
                  
              </nav>
          </header>

          <main>
              <Suspense fallback={<h2>Loading...</h2>}>
                  <Outlet />
              </Suspense>
          </main>
      </>
  )
}
