# Anchor Mode — Resize System Fix (Smooth + Clamped + UX Cleanup)

Goal:
- Make resize follow cursor EXACTLY (no sliding feeling)
- Prevent auto-collapse (use hard limits instead)
- Move drop zone into left panel (above objects)

---

# 1. FIX RESIZE MECHANISM (CRITICAL)

## PROBLEM

Current resize uses:
- setState inside mousemove
→ causes lag + “sliding feel”

---

## FIX: USE REF + DIRECT STYLE MUTATION

### ADD REF

const leftRef = useRef<HTMLDivElement>(null);

---

## REPLACE startLeftResize WITH:

function startLeftResize(e) {
  e.preventDefault();

  function onMove(e) {
    if (!leftRef.current) return;

    let newWidth = e.clientX;

    // HARD LIMITS
    if (newWidth < 180) newWidth = 180;
    if (newWidth > 420) newWidth = 420;

    leftRef.current.style.width = newWidth + "px";
  }

  function onUp() {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  }

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}

---

## APPLY REF

LEFT PANEL:

<div ref={leftRef} style={{ width: 280 }}>

---

# RESULT

Resize now:
- follows cursor exactly
- no lag
- no stepping
- feels native

---

# 2. REMOVE AUTO COLLAPSE LOGIC

## DELETE THIS TYPE OF CODE

if (width < 120) setLeftOpen(false)

---

## REPLACE WITH HARD CLAMP

min = 180  
max = 420  

---

# RESULT

Panel:
- never disappears unexpectedly
- user stays in control

---

# 3. REMOVE COLUMN STEPPING LOGIC

## DELETE:

2-column → 1-column switching logic

---

## REPLACE WITH:

grid-cols-2 ALWAYS

---

OR (better):

auto-fit responsive:

grid-cols-[repeat(auto-fill,minmax(120px,1fr))]

---

# RESULT

Smooth layout → no jumps

---

# 4. MOVE DROP ZONE (IMPORTANT UX FIX)

## CURRENT (WRONG)

Drop zone in CENTER

---

## MOVE TO LEFT PANEL TOP

Inside left panel:

ADD ABOVE OBJECT GRID:

<div className="p-3 border-b border-border/50">
  <div className="drag-placeholder rounded-lg p-4 text-center">
    <Upload className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
    <p className="text-xs text-muted-foreground">
      Drop image to create object
    </p>
  </div>
</div>

---

## REMOVE FROM CENTER PANEL

Delete drop zone from center completely

---

# RESULT

Flow becomes:

Drop → Object appears → Select → Preview → Edit

---

# 5. OPTIONAL (HIGH VALUE — SMOOTHNESS BOOST)

Add:

document.body.style.cursor = "col-resize";

on start

and reset on mouseup

---

# 6. FINAL EXPECTED BEHAVIOR

User experiences:

- Drag feels locked to cursor (no lag)
- Panel resizes continuously (not stepped)
- Panel never disappears unexpectedly
- Drop action clearly belongs to object system

---

# FINAL RULE

Resize = direct manipulation, not state simulation