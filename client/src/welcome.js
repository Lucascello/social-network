import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration";
import Login from "./login";
import ResetPassword from "./resetPassword";

export default function Welcome() {
    return (
        <>
            <header className="header">
                <h1 className="title">The Social-List </h1>
                <h1 className="titletwo">Connecting you to the RIGHT people</h1>
                <img className="social" src="/social.png" alt="logo" />
            </header>
            <hr></hr>
            <main>
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/resetPassword">
                            <ResetPassword />
                        </Route>
                    </div>
                </BrowserRouter>
            </main>
        </>
    );
}
