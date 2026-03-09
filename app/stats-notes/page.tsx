"use client";

import React from "react";

export default function StatsCheatSheet() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-black font-sans min-h-screen">
      <div className="flex justify-between items-center mb-8 print:hidden border-b pb-4">
        <h1 className="text-2xl font-bold">Stats Cheat Sheet</h1>
        <button 
          onClick={handlePrint}
          className="px-4 py-2 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
        >
          Save as PDF
        </button>
      </div>

      <div className="print:block">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Statistics Final Exam Cheat Sheet</h1>
          <p className="text-gray-700 mt-2">Formulas & Logic Shortcuts</p>
        </div>

        <div className="space-y-8">
          {/* 1. Mutually Exclusive vs Independent */}
          <section>
            <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">1. Mutually Exclusive vs. Independent</h2>
            <p className="mb-4">
              These are the most heavily tested concepts (Q1, Q5, Q6). <strong>The Golden Rule:</strong> If events actually happen (Prob &gt; 0), they <strong>cannot be both</strong>.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div className="p-4 border border-gray-300 rounded">
                <h3 className="font-bold text-lg mb-2">Mutually Exclusive (Disjoint)</h3>
                <p className="mb-2 text-sm text-gray-700">Cannot happen at the same time. The overlap is zero.</p>
                <code className="block bg-gray-100 p-2 text-center font-bold">P(A ∩ B) = 0</code>
                <div className="mt-3 text-sm border-t pt-2">
                  <strong>Example:</strong> Flipping a coin and getting both Heads and Tails on a single flip.
                  <br/>OR Drawing a card that is both a King and a Queen.
                </div>
              </div>

              <div className="p-4 border border-gray-300 rounded">
                <h3 className="font-bold text-lg mb-2">Not Mutually Exclusive</h3>
                <p className="mb-2 text-sm text-gray-700">Can happen at the same time. Overlap is &gt; 0.</p>
                <code className="block bg-gray-100 p-2 text-center font-bold mb-2">P(A ∩ B) &gt; 0</code>
                <div className="mt-3 text-sm border-t pt-2">
                  <strong>Example:</strong> Drawing a card that is both a King and a Heart (The King of Hearts).
                </div>
              </div>

              <div className="p-4 border border-gray-300 rounded">
                <h3 className="font-bold text-lg mb-2">Independent</h3>
                <p className="mb-2 text-sm text-gray-700">One happening does not change the probability of the other.</p>
                <code className="block bg-gray-100 p-2 text-center font-bold mb-2">P(A|B) = P(A)</code>
                <code className="block bg-gray-100 p-2 text-center font-bold">P(A ∩ B) = P(A) · P(B)</code>
                <div className="mt-3 text-sm border-t pt-2">
                  <strong>Example:</strong> Flipping a coin and rolling a die. The coin landing on Heads doesn't change the odds of rolling a 6.
                  <br/>OR Drawing a card <em>with replacement</em> (putting it back before the next draw).
                </div>
              </div>

              <div className="p-4 border border-gray-300 rounded">
                <h3 className="font-bold text-lg mb-2">Dependent (Not Independent)</h3>
                <p className="mb-2 text-sm text-gray-700">One event happening changes the probability of the other.</p>
                <code className="block bg-gray-100 p-2 text-center font-bold mb-2">P(A|B) ≠ P(A)</code>
                <code className="block bg-gray-100 p-2 text-center font-bold">P(A ∩ B) ≠ P(A) · P(B)</code>
                <div className="mt-3 text-sm border-t pt-2">
                  <strong>Example:</strong> Drawing two cards <em>without replacement</em>. If you draw an Ace first, the odds of drawing a second Ace change because the deck is now smaller.
                </div>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-2 mt-6">The 4 Cases:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Mutually Exclusive, NOT Independent:</strong> They don't overlap (P(A ∩ B) = 0), so they impact each other.</li>
              <li><strong>Independent, NOT Mutually Exclusive:</strong> They don't impact each other (P(A ∩ B) = P(A) · P(B)), so they MUST overlap.</li>
              <li><strong>NEITHER:</strong> They overlap, but the overlap doesn't equal their individual probabilities multiplied.</li>
              <li><strong>BOTH:</strong> Impossible (unless one event has a 0% chance).</li>
            </ol>
          </section>

          {/* Probability Rules */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* General Addition */}
            <div className="p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-bold border-b border-black pb-2 mb-3">General Addition (A OR B)</h2>
              <p className="mb-2 text-sm">Add both, subtract overlap so you don't double count.</p>
              <code className="block bg-gray-100 p-2 text-center font-bold text-sm">P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</code>
            </div>

            {/* General Multiplication */}
            <div className="p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-bold border-b border-black pb-2 mb-3">Multiplication (A AND B)</h2>
              <p className="mb-2 text-sm">Find interval for ANY two events (even dependent).</p>
              <code className="block bg-gray-100 p-2 text-center font-bold text-sm">P(A ∩ B) = P(A|B) · P(B)</code>
            </div>

            {/* Conditional */}
            <div className="p-4 border border-gray-300 rounded">
              <h2 className="text-xl font-bold border-b border-black pb-2 mb-3">Conditional Probability</h2>
              <p className="mb-2 text-sm">Keywords: <strong>"Given that..."</strong>. Divide overlap by the condition.</p>
              <code className="block bg-gray-100 p-2 text-center font-bold text-sm">P(A|B) = P(A ∩ B) / P(B)</code>
            </div>
          </section>

          <div className="break-inside-avoid">
            {/* 5. In a Row & At Least */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">"In a Row" & "At Least One"</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 border border-gray-300 rounded">
                  <h3 className="font-bold">Consecutive Events</h3>
                  <p className="mb-2 text-sm text-gray-700">Same thing happening <em>n</em> times in a row.</p>
                  <code className="block bg-gray-100 p-2 text-center font-bold">P(event n times) = P(A)ⁿ</code>
                  <p className="mt-2 text-sm"><em>Example: Getting 3 tails in a row: 0.5³</em></p>
                </div>
                <div className="p-4 border border-gray-300 rounded">
                  <h3 className="font-bold">At Least One Rule</h3>
                  <p className="mb-2 text-sm text-gray-700">The complement of getting "none" <em>n</em> times.</p>
                  <code className="block bg-gray-100 p-2 text-center font-bold">P(at least one) = 1 - P(none)ⁿ</code>
                  <p className="mt-2 text-sm"><em>Example: Probability of seeing at least 1 winner in 5 games = 1 - P(loser)⁵</em></p>
                </div>
              </div>
            </section>
          </div>

          <div className="break-inside-avoid">
            {/* 6. Reversing Conditions */}
            <section className="mb-8 p-4 border border-gray-300 rounded">
              <h2 className="text-2xl font-bold border-b-2 border-black pb-2 mb-4">Reversing Conditions (Tree Diagrams)</h2>
              <p className="mb-2">Used when given <code>P(A|B)</code> but need <code>P(B|A)</code>. Divide the specific path by the sum of all paths leading to the outcome.</p>
              <div className="bg-gray-100 p-4 rounded text-center">
                <code className="block font-bold mb-2">P(B|A) = (Probability of specific path) / (Sum of all paths ending in A)</code>
                <code className="block text-sm">P(B|A) = P(B ∩ A) / [ P(A₁ ∩ B) + P(A₂ ∩ B) + P(A₃ ∩ B) ]</code>
              </div>
            </section>
          </div>

          <div className="break-inside-avoid">
            {/* Two-Way Tables & Normal Distributions */}
            <section className="grid grid-cols-2 gap-6">
              <div className="p-4 border border-gray-300 rounded">
                <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4">Two-Way Tables (Q8)</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Conditional P(A|B):</strong> The condition limits the denominator. Only look at that specific row/column total!</li>
                  <li><strong>Testing Independence:</strong> Check if <code>P(A|B) = P(A)</code> across the entire table.</li>
                  <li><strong>OR statement:</strong> <code>P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</code>. Find A total + B total, minus the cell where they overlap.</li>
                </ul>
              </div>
              <div className="p-4 border border-gray-300 rounded">
                <h2 className="text-xl font-bold border-b-2 border-black pb-2 mb-4">Normal Curves (Q9)</h2>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong>Normalcdf(low, high, μ, σ):</strong> Probability between two numbers.</li>
                  <li><strong>InvNorm(area, μ, σ):</strong> Value when given a percentage.</li>
                  <li><strong>"Top 11%":</strong> Calculator usually reads left-to-right. Area below top 11% is 0.89.</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
