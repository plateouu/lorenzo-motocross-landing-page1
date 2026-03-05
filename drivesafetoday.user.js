// ==UserScript==
// @name         DriveSafeToday Auto-Solver & Auto-Next
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Automatically goes to the next page and answers tests using Gemini API. NOW AUTO-SUBMITS TESTS.
// @author       You
// @match        *://*.drivesafetoday.com/*
// @match        *://drivesafetoday.com/*
// @include      *drivesafetoday.com/*
// @grant        GM_xmlhttpRequest
// @connect      generativelanguage.googleapis.com
// ==/UserScript==

(function() {
    'use strict';
    
    console.log("🟢 [DriveSafeToday Auto] SCRIPT IS BOOTING UP!");

    // User's specifically requested model and API key
    const GEMINI_API_KEY = "AIzaSyC9B7AaAEfPO0c2SLZ2zTaag8VBcQesisA";
    const MODEL = "gemini-3-flash-preview"; 

    // Look for all questions grouped on the page
    const questionsContainer = document.querySelectorAll('.gray-bg-card');
    const isQuizPage = questionsContainer.length > 0 && document.querySelector('.radio-button--custom') !== null;
    
    // ============================================
    // UI OVERLAY FOR VISUAL STATUS
    // ============================================
    const statusDiv = document.createElement("div");
    statusDiv.style.position = "fixed";
    statusDiv.style.bottom = "20px";
    statusDiv.style.left = "20px";
    statusDiv.style.backgroundColor = "rgba(0,0,0,0.85)";
    statusDiv.style.color = "#00ff00";
    statusDiv.style.padding = "10px 15px";
    statusDiv.style.borderRadius = "8px";
    statusDiv.style.zIndex = "2147483647"; // Max z-index possible
    statusDiv.style.fontFamily = "monospace";
    statusDiv.style.fontSize = "16px";
    statusDiv.style.border = "2px solid #00ff00";
    statusDiv.style.boxShadow = "0px 0px 15px rgba(0,255,0,0.8)";
    statusDiv.style.pointerEvents = "none";
    
    // Inject the UI aggressively
    const injectUI = setInterval(() => {
        if (document.body) {
            if (!document.body.contains(statusDiv)) {
                document.body.appendChild(statusDiv);
                updateStatus("Script started! Checking page type...");
            }
            clearInterval(injectUI);
        }
    }, 50);
    
    function updateStatus(text) {
        statusDiv.innerHTML = "<b>[DriveSafe Auto]</b><br>" + text;
        console.log("🟢 [DriveSafeToday Auto] " + text.replace(/<br>/g, " "));
    }
    
    // ============================================
    // 1. AUTO-NEXT LOGIC FOR REGULAR PAGES
    // ============================================
    if (!isQuizPage) {
        
        let timerHitZeroAt = null;

        const nextInterval = setInterval(() => {
            if (!document.body.contains(statusDiv)) document.body.appendChild(statusDiv); // keep it alive
            
            const nextBtn = document.querySelector('.dev-next-button');
            
            if (nextBtn) {
                // Check if button is inherently disabled
                const isBtnDisabled = nextBtn.classList.contains('disabled') || 
                                      nextBtn.hasAttribute('disabled') || 
                                      nextBtn.classList.contains('dev-disabled-quiz');
                
                // TIMER CHECK: The server strictly enforces the timer.
                let timerActive = false;
                const timers = document.querySelectorAll('.dev-timer, .dev-timer-seconds');
                timers.forEach(t => {
                    // Ignore popover timers or total progress timers
                    if (!t.closest('.popover-content') && !t.classList.contains('dev-update-progress')) {
                        const tText = t.innerText.trim();
                        // If it contains a number 1-9 (e.g. "01m:20s"), the timer is still ticking down
                        if (/[1-9]/.test(tText)) {
                            timerActive = true;
                        }
                    }
                });
                
                // Proceed if button is not locked and timer shows zero
                if (!isBtnDisabled && !timerActive) {
                    if (!timerHitZeroAt) {
                        timerHitZeroAt = Date.now();
                    }

                    const timeElapsed = Date.now() - timerHitZeroAt;
                    
                    if (timeElapsed >= 3500) {
                        updateStatus("Time's up! Navigating forward...");
                        clearInterval(nextInterval); // Stop checking
                        
                        // Directly trigger a click event
                        nextBtn.click();
                        
                        // Fallback to direct navigation in case the click event is suppressed/prevented
                        setTimeout(() => {
                            if (nextBtn.href && !nextBtn.href.endsWith('#')) {
                                window.location.href = nextBtn.href;
                            }
                        }, 500);
                    } else {
                        // visually update buffer countdown
                        updateStatus(`Timer is 00:00!<br>Syncing with Server: ${(3.5 - timeElapsed/1000).toFixed(1)}s left`);
                    }
                } else {
                    timerHitZeroAt = null; // Reset if the timer somehow jumps back up
                    if (timerActive) {
                       updateStatus("Counting down...<br>Timer still ticking.");
                    } else if (isBtnDisabled) {
                       updateStatus("Timer 0, but button is locked.<br>Waiting for unlock...");
                    }
                }
            } else {
                 updateStatus("Looking for Next button...");
            }
        }, 500); // Poll every half-second
    } 
    
    // ============================================
    // 2. QUIZ / TEST SOLVER LOGIC
    // ============================================
    else {
        
        let prompt = `You are taking a Defensive Driving Course final exam/quiz. Answer the following multiple choice questions correctly based on safe, legal defensive driving principles.

Respond ONLY with a valid JSON array of strings containing the correct option letters in order (e.g. ["A", "C", "D", "B"]). Do NOT include markdown blocks like \`\`\`json, just output the raw bracketed array and absolutely no other text.

`;
        
        const questionElements = [];
        
        questionsContainer.forEach((container, index) => {
            const qTextElem = container.querySelector('.h4Mask');
            if (!qTextElem) return;
            
            const qText = qTextElem.innerText.trim();
            prompt += `Question ${index + 1}: ${qText}\n`;
            
            const options = container.querySelectorAll('.radio-button--custom li');
            let hasOptions = false;
            
            options.forEach(opt => {
                const label = opt.querySelector('label');
                if (label) {
                    const optLetter = label.getAttribute('data-question');
                    const optText = label.innerText.trim();
                    prompt += `Option ${optLetter}: ${optText}\n`;
                    hasOptions = true;
                }
            });
            
            if (hasOptions) {
                prompt += "\n";
                questionElements.push({ container, index });
            }
        });

        if (questionElements.length > 0) {
            let injectQuizUI = setInterval(() => {
                if (document.body) {
                    if (!document.body.contains(statusDiv)) document.body.appendChild(statusDiv);
                    updateStatus("Quiz page detected.<br>Requesting answers from Gemini API...");
                    clearInterval(injectQuizUI);
                }
            }, 100);
            
            GM_xmlhttpRequest({
                method: "POST",
                url: `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    "contents": [{
                        "parts": [{ "text": prompt }]
                    }],
                    "generationConfig": {
                        "temperature": 0.1
                    }
                }),
                onload: function(response) {
                    try {
                        const res = JSON.parse(response.responseText);
                        
                        if (res.error) {
                            updateStatus("API Error: " + res.error.message);
                            return;
                        }
                        
                        let textParams = res.candidates[0].content.parts[0].text.trim();
                        const match = textParams.match(/\[.*?\]/s);
                        if (match) {
                            textParams = match[0];
                        }
                        
                        const answers = JSON.parse(textParams.replace(/'/g, '"'));
                        
                        answers.forEach((ansLetter, idx) => {
                            const qData = questionElements[idx];
                            if (qData) {
                                const labels = qData.container.querySelectorAll('label');
                                labels.forEach(label => {
                                    if (label.getAttribute('data-question') === ansLetter) {
                                        const radioId = label.getAttribute('for');
                                        const radio = document.getElementById(radioId);
                                        
                                        if (radio && !radio.disabled) {
                                            radio.click();
                                        } else if (label && !label.disabled) {
                                            label.click();
                                        }
                                    }
                                });
                            }
                        });
                        
                        updateStatus("All answers selected!<br>Auto-submitting in 2.5 seconds...");
                        
                        // Give the UI time to register all clicks before hitting submit
                        setTimeout(() => {
                            // Find any submit button (usually has 'submit', 'grade', or class 'dev-submit-btn' / 'btn-primary')
                            const submitBtn = document.querySelector('input[type="submit"], button[type="submit"], .dev-submit-btn, .btn.secondary-button--filled');
                            if (submitBtn) {
                                updateStatus("Clicking Submit Form...");
                                submitBtn.click();
                                
                                // Fallback just in case they use a raw form submit rather than a button click listener
                                setTimeout(() => {
                                    const form = document.querySelector('form');
                                    if (form) form.submit();
                                }, 500);
                            } else {
                                updateStatus("Could not find the submit button automatically.<br>Please submit manually.");
                            }
                        }, 2500);
                        
                    } catch(err) {
                        updateStatus("Failed to parse Gemini response!");
                        console.error("[DriveSafeToday Auto] Failed to parse:", err);
                    }
                }
            });
        }
    }
})();
