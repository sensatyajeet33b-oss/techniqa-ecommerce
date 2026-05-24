import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./notFound.css"

export default function NotFound() {

    const navigate = useNavigate();

    useEffect(() => {

        document.title =
            "ERROR 404 | Tecniqa";

    }, []);

    return (

        <div className="nf-root">

            <Header />

            <main className="nf-wrap">

                <div className="nf-card">

                    <div className="nf-code">
                        404
                    </div>

                    <h1>
                        Page Not Found
                    </h1>

                    <p>
                        The page you're looking for
                        doesn't exist or may have
                        been moved.
                    </p>

                    <div className="nf-actions">

                        <button
                            className="nf-home-btn"
                            onClick={() => navigate("/")}
                        >
                            Back Home
                        </button>

                        <button
                            className="ud-outline-btn"
                            onClick={() =>
                                navigate(-1)
                            }
                        >
                            Go Back
                        </button>

                    </div>

                </div>

            </main>

            <Footer />

        </div>

    );
}