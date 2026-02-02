import React from 'react'

export default function StudyGuide() {
    return (
        <div className="min-h-screen bg-white text-black font-sans p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 tracking-tight">AP Calculus BC: Taylor Series & Power Series</h1>

            <div className="space-y-8 text-lg leading-relaxed text-gray-800">
                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">1. Definition of a Taylor Series</h2>
                    <p className="mb-4">
                        A Taylor series is an infinite sum of terms that are expressed in terms of the function's derivatives at a single point. For a smooth function <span className="font-mono bg-gray-100 px-1 rounded">f(x)</span> at <span className="font-mono bg-gray-100 px-1 rounded">x = c</span>, the Taylor series is given by:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm overflow-x-auto border border-gray-200 my-4">
                        f(x) = f(c) + f'(c)(x-c) + (f''(c)/2!)(x-c)^2 + (f'''(c)/3!)(x-c)^3 + ...
                    </div>
                    <p>
                        When <span className="font-mono bg-gray-100 px-1 rounded">c = 0</span>, this is called a <strong>Maclaurin series</strong>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">2. Common Maclaurin Series</h2>
                    <p className="mb-4">You must memorize these for the AP exam:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <span className="font-bold">e^x</span> = 1 + x + x^2/2! + x^3/3! + ... (Converges for all x)
                        </li>
                        <li>
                            <span className="font-bold">sin(x)</span> = x - x^3/3! + x^5/5! - ... (Odd powers, alternating)
                        </li>
                        <li>
                            <span className="font-bold">cos(x)</span> = 1 - x^2/2! + x^4/4! - ... (Even powers, alternating)
                        </li>
                        <li>
                            <span className="font-bold">1/(1-x)</span> = 1 + x + x^2 + x^3 + ... (Geometric, converges for |x| &lt; 1)
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">3. Lagrange Error Bound</h2>
                    <p className="mb-4">
                        When we approximate a function using an nth-degree Taylor polynomial <span className="font-mono bg-gray-100 px-1 rounded">P_n(x)</span>, the error (remainder) <span className="font-mono bg-gray-100 px-1 rounded">R_n(x)</span> is bounded by:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-lg font-mono text-sm border border-gray-200 my-4">
                        |R_n(x)| &le; (M / (n+1)!) * |x - c|^(n+1)
                    </div>
                    <p>
                        Where <span className="font-mono bg-gray-100 px-1 rounded">M</span> is the maximum value of the absolute value of the (n+1)th derivative on the interval between <span className="font-mono bg-gray-100 px-1 rounded">c</span> and <span className="font-mono bg-gray-100 px-1 rounded">x</span>.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-200 pb-2">4. Tips for Success</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                        <li>Always check the interval of convergence using the Ratio Test.</li>
                        <li>Don't forget to check the endpoints!</li>
                        <li>For alternating series, the error is simply less than the absolute value of the first omitted term.</li>
                    </ul>
                </section>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-400 text-sm">
                <p>&copy; 2026 AP Study Hub. accurate content for review purposes only.</p>
            </div>
        </div>
    )
}
