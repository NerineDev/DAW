# 🎓 Multimedia Integration Demo -- Online Education

Interactive web application demonstrating the integration of multimedia
elements and dynamic behavior using HTML5, CSS3 and JavaScript.

------------------------------------------------------------------------

## 📌 Project Overview

This project showcases:

-   HTML5 `<video>` and `<audio>` integration\
-   Chapter-based video navigation using time control\
-   Automatic quiz activation after video completion\
-   Dynamic feedback and controlled retry logic\
-   Audio playback with synchronized dynamic captions\
-   Responsive design for multiple screen sizes

The goal is to demonstrate event-driven programming, DOM manipulation,
and multimedia handling in a client-side web environment.

------------------------------------------------------------------------

## 🚀 Features

### 🎬 Video Module

-   MP4 (H.264) video integration\
-   Chapter navigation via `data-time` attributes\
-   Dynamic time jumps using `currentTime`\
-   Status text updates on interaction

### 📝 Interactive Quiz

-   Automatically appears when the video ends\
-   Form evaluation using `FormData`\
-   Per-question feedback\
-   Global score display\
-   Lock/unlock mechanism requiring video replay for retry

### 🎧 Audio Module

-   MP3 audio integration\
-   Dynamic subtitle updates using the `timeupdate` event\
-   Text changes based on playback intervals

### 📱 Responsive Design

-   CSS media queries\
-   Layout adjustments for:
    -   Mobile (\~400px)\
    -   Tablet (\~820px)\
    -   Desktop (\~1080px)

------------------------------------------------------------------------

## 🛠 Technologies Used

-   HTML5 (semantic structure)\
-   CSS3 (responsive layout, flexbox, grid)\
-   JavaScript (event handling, DOM manipulation)\
-   Browser DevTools (debugging & DOM inspection)

------------------------------------------------------------------------

## 📂 Project Structure

    /media
      video.mp4
      audio.mp3

    index.html
    styles.css
    script.js
    README.md

------------------------------------------------------------------------

## 🧠 Key Concepts Demonstrated

-   Event-driven programming in JavaScript\
-   Multimedia control via HTMLMediaElement API\
-   Form handling with `FormData`\
-   UI state management (lock/unlock logic)\
-   Separation of concerns (HTML / CSS / JS)\
-   Cross-browser multimedia compatibility

------------------------------------------------------------------------

## 📄 Academic Context

Developed as part of:

**Diseño de Interfaces Web -- UD4**\
Integration of interactive and multimedia content in a web-based
educational environment.
