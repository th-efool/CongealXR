\# Anchor Mode — Panel Control System (Resize + Toggle)



Goal:



Make LEFT and RIGHT panels:



\- Resizable (drag to adjust width)



\- Toggleable (collapse/expand)



\- Auto-collapse when too small



CENTER panel remains flexible.



\---



\# 1. ADD PANEL STATE



Inside AnchorModePage:



const \[leftWidth, setLeftWidth] = useState(280);



const \[rightWidth, setRightWidth] = useState(320);



const \[leftOpen, setLeftOpen] = useState(true);



const \[rightOpen, setRightOpen] = useState(true);



\---



\# 2. APPLY WIDTH STYLES



LEFT PANEL:



style={{ width: leftOpen ? leftWidth : 0 }}



RIGHT PANEL:



style={{ width: rightOpen ? rightWidth : 0 }}



\---



\# 3. ADD RESIZE HANDLES (CRITICAL)



\## LEFT HANDLE



Add a thin divider between LEFT and CENTER:



<div



&#x20; className="w-1 cursor-col-resize bg-border/50"



&#x20; onMouseDown={startLeftResize}



/>



\---



\## RIGHT HANDLE



<div



&#x20; className="w-1 cursor-col-resize bg-border/50"



&#x20; onMouseDown={startRightResize}



/>



\---



\# 4. RESIZE LOGIC



\## LEFT RESIZE



function startLeftResize(e) {



&#x20; function onMove(e) {



&#x20;   const newWidth = e.clientX;



&#x20;   if (newWidth < 180) {



&#x20;     setLeftOpen(false);



&#x20;     return;



&#x20;   }



&#x20;   setLeftWidth(Math.min(newWidth, 500));



&#x20; }



&#x20; function onUp() {



&#x20;   window.removeEventListener("mousemove", onMove);



&#x20;   window.removeEventListener("mouseup", onUp);



&#x20; }



&#x20; window.addEventListener("mousemove", onMove);



&#x20; window.addEventListener("mouseup", onUp);



}



\---



\## RIGHT RESIZE



function startRightResize(e) {



&#x20; function onMove(e) {



&#x20;   const newWidth = window.innerWidth - e.clientX;



&#x20;   if (newWidth < 200) {



&#x20;     setRightOpen(false);



&#x20;     return;



&#x20;   }



&#x20;   setRightWidth(Math.min(newWidth, 500));



&#x20; }



&#x20; function onUp() {



&#x20;   window.removeEventListener("mousemove", onMove);



&#x20;   window.removeEventListener("mouseup", onUp);



&#x20; }



&#x20; window.addEventListener("mousemove", onMove);



&#x20; window.addEventListener("mouseup", onUp);



}



\---



\# 5. ADD TOGGLE BUTTONS



\## LEFT TOGGLE



Top-left corner:



<button onClick={() => setLeftOpen(prev => !prev)}>



&#x20; Toggle



</button>



\---



\## RIGHT TOGGLE



Top-right corner:



<button onClick={() => setRightOpen(prev => !prev)}>



&#x20; Toggle



</button>



\---



\# 6. CENTER PANEL BEHAVIOR



Ensure:



className="flex-1"



It should automatically expand when panels collapse.



\---



\# 7. MIN WIDTH RULES



LEFT:



\- Minimum: 180px



\- Below → collapse



RIGHT:



\- Minimum: 200px



\- Below → collapse



\---



\# 8. OPTIONAL (HIGH VALUE)



When reopening panel:



if (!leftOpen) setLeftWidth(280)



if (!rightOpen) setRightWidth(320)



\---



\# 9. UX RESULT



User can:



\- Drag to resize panels



\- Collapse panels by shrinking



\- Toggle panels manually



\- Focus fully on center workspace



\---



\# FINAL GOAL



The UI should feel like:



A professional editor where panels adapt to the user's focus.



Not a fixed layout.

