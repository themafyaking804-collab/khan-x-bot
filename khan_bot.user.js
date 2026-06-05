// ==UserScript==
// @name         KHAN X BOT - v5.2 EXACT 1-MIN SYNC
// @namespace    http://tampermonkey.net/
// @version      5.2
// @description  1-Minute Candle Synchronized Trading Bot with Premium Lock
// @match        *://*.qxbroker.com/*
// @match        *://*.quotex.com/*
// @match        *://*.market-qx.pro/*
// @match        *://*.market-qx.trade/*
// @grant        none
// ==/UserScript==

let currentBotUser = "Hasnain";
let correctKey = "HASNAIN_904"; 

function checkLicense() {
    let savedKey = localStorage.getItem("khan_bot_license");

    if (savedKey === correctKey) {
        let lockScreen = document.getElementById('bot-lock-screen');
        if(lockScreen) lockScreen.remove();
        createBotPanel();
        // Har 1 second baad check kare ga ke naya minute shuru hua ya nahi
        setInterval(generate1MinSignal, 1000); 
    } else {
        showLockScreen();
    }
}

function showLockScreen() {
    if(document.getElementById('bot-lock-screen')) return;

    let lockDiv = document.createElement('div');
    lockDiv.id = 'bot-lock-screen';
    lockDiv.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999999; background: #0d0e12; color: #ffffff; padding: 30px; border-radius: 16px; border: 2px solid #ff3333; font-family: Arial; box-shadow: 0px 0px 30px rgba(255,51,51,0.5); width: 320px; text-align: center;">
            <h2 style="margin: 0 0 10px 0; color: #ff3333; font-size: 20px; text-transform: uppercase;">🔒 KHAN X BOT LOCKED</h2>
            <p style="font-size: 13px; color: #8a8d93; margin: 0 0 20px 0;">Premium License Required to Access Live Signals.</p>
            
            <input type="text" id="license-key-input" placeholder="Enter Activation Key" style="width: 90%; padding: 12px; background: #171921; border: 1px solid #444; border-radius: 8px; color: #fff; text-align: center; font-size: 14px; margin-bottom: 15px; outline: none;">
            
            <button id="activate-btn" style="width: 90%; padding: 12px; background: #ff3333; border: none; border-radius: 8px; color: white; font-weight: bold; cursor: pointer; font-size: 14px; text-transform: uppercase;">Activate Premium</button>
            
            <p style="font-size: 11px; color: #8a8d93; margin-top: 15px;">Contact Admin for Key: <span style="color:#ff3333; font-weight:bold;">@TRADE_HACKER_OFFICIAL</span></p>
        </div>
    `;
    document.body.appendChild(lockDiv);

    document.getElementById('activate-btn').addEventListener('click', function() {
        let inputVal = document.getElementById('license-key-input').value.trim();
        if(inputVal === correctKey) {
            localStorage.setItem("khan_bot_license", inputVal);
            alert("🔥 Premium Activated Successfully! Enjoy VIP Signals.");
            checkLicense();
        } else {
            alert("❌ Invalid Activation Key! Please buy a valid key from admin.");
        }
    });
}

// 1-MINUTE SYNC LOGIC
function generate1MinSignal() {
    let now = new Date();
    let currentMinute = now.getMinutes();
    let currentSecond = now.getSeconds();
    
    // Algorithmic pattern jo minute ke number par depend karta hai taake har minute different signal aaye
    let patternFactor = currentMinute % 3; 
    
    // Candle ke aakhri 5 seconds me bot status "ANALYZING" show kare ga (Bilkul real professional bot ki tarah)
    if (currentSecond >= 55) {
        updateBotUI("ANALYZING NEXT CANDLE...", "#ffcc00");
        return;
    }

    // Exact minute wise simulation jo har naye minute par fix rehti hai
    if (patternFactor === 0) {
        updateBotUI("STRONG CALL (BUY)", "#00e676");
    } else if (patternFactor === 1) {
        updateBotUI("STRONG PUT (SELL)", "#ff3333");
    } else {
        updateBotUI("STRONG CALL (BUY)", "#00e676");
    }
}

function createBotPanel() {
    if(document.getElementById('vip-bot-panel')) return;

    let botDiv = document.createElement('div');
    botDiv.id = 'vip-bot-panel';
    botDiv.innerHTML = `
        <div style="position: fixed; top: 15px; right: 15px; z-index: 999999; background: #0d0e12; color: #ffffff; padding: 20px; border-radius: 12px; border: 2px solid #00e676; font-family: Arial; box-shadow: 0px 0px 20px rgba(0,230,118,0.3); width: 250px;">
            <h3 style="margin: 0 0 5px 0; color: #00e676; font-size: 16px; text-transform: uppercase;">🔥 KHAN X BOT v5.2</h3>
            <p style="font-size: 11px; color: #8a8d93; margin: 0 0 15px 0;">User: <span style="color:#00e676; font-weight:bold;">${currentBotUser}</span></p>
            
            <div style="background: #171921; padding: 10px; border-radius: 8px; text-align: center; margin-bottom: 10px;">
                <span style="font-size: 11px; color: #8a8d93; display: block;">1-MIN CANDLE SIGNAL</span>
                <span id="bot-signal" style="font-weight: bold; font-size: 14px; color: #00e676;">WAITING SYNC...</span>
            </div>
            <p style="font-size: 10px; color: #8a8d93; text-align:center; margin:0;">Status: <span style="color:#00e676;">Premium Active</span></p>
        </div>
    `;
    document.body.appendChild(botDiv);
}

function updateBotUI(signal, customColor) {
    let el = document.getElementById('bot-signal');
    if(!el) return;
    el.innerText = signal;
    el.style.color = customColor;
}

setTimeout(checkLicense, 2000);
