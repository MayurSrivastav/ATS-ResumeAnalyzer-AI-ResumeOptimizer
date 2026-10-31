import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import ResumeOptimizer from "./pages/ResumeOptimizer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

    return (

        <BrowserRouter>

            <Routes>

                {/* Default Route */}

                <Route

                    path="/"

                    element={<Navigate to="/login" replace />}

                />

                {/* Public Routes */}

                <Route

                    path="/login"

                    element={<Login />}

                />

                <Route

                    path="/signup"

                    element={<Signup />}

                />

                {/* Protected Routes */}

                <Route

                    path="/dashboard"

                    element={

                        <ProtectedRoute>

                            <Dashboard />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/resume-analyzer"

                    element={

                        <ProtectedRoute>

                            <ResumeAnalyzer />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/resume-optimizer"

                    element={

                        <ProtectedRoute>

                            <ResumeOptimizer />

                        </ProtectedRoute>

                    }

                />

                <Route

                    path="/analytics"

                    element={

                        <ProtectedRoute>

                            <Analytics />

                        </ProtectedRoute>

                    }

                />

                {/* Unknown Route */}

                <Route

                    path="*"

                    element={<Navigate to="/login" replace />}

                />

            </Routes>

        </BrowserRouter>

    );

};

export default App;