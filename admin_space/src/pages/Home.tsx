import React from 'react';

// Example image imports (you'll need to adjust the paths as necessary)

const Home: React.FC = () => {
    return (
        <div>
            {/* <Navbar /> */}

            {/* Hero Section */}
            <section className="relative bg-gray-900 text-white py-16">
                <div className="absolute inset-0">
                    <img src={`https://picsum.photos/200/300`} alt="Hero" className="w-full h-full object-cover opacity-50" />
                </div>
                <div className="relative container mx-auto p-4 flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Space</h1>
                    <p className="text-lg mb-8">Manage your workspace efficiently with our intuitive tools and features.</p>
                    <a href="/dashboard" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
                        Go to Dashboard
                    </a>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <img src={`https://picsum.photos/200/300`} alt="Feature 1" className="w-full h-40 object-cover rounded-t-lg mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Feature 1</h3>
                            <p className="text-gray-700">Description of feature 1. This is a short explanation of what this feature does and how it benefits users.</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <img src={`https://picsum.photos/200/300`} alt="Feature 2" className="w-full h-40 object-cover rounded-t-lg mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Feature 2</h3>
                            <p className="text-gray-700">Description of feature 2. This is a short explanation of what this feature does and how it benefits users.</p>
                        </div>
                        {/* Add more feature blocks as needed */}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto p-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
                    <p className="text-center text-lg mb-8">Have questions or need support? Feel free to contact us.</p>
                    <div className="flex justify-center">
                        <a href="/contact" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

