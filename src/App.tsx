import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/Router";
import { Suspense } from "react";

function App() {

    return (

        <BrowserRouter>
            <Suspense fallback={'...'} >
                <AppRouter />
            </Suspense>
        </BrowserRouter>
    );
}

export default App;