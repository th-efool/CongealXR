# Anchor Mode — Layout Upgrade (Focus-Based UI)

Goal:
Reduce object list dominance and introduce a central visual workspace for 3D + drag/drop.

---

# 1. CHANGE MAIN LAYOUT STRUCTURE

## CURRENT

[ Object List ] [ Editor ]

---

## NEW STRUCTURE

[ LEFT: Objects ] [ CENTER: Preview Workspace ] [ RIGHT: Editor ]

---

# 2. LEFT PANEL (OBJECT LIST — REDUCE VISUAL WEIGHT)

## CHANGE GRID

Replace:

grid-cols-3

WITH:

grid-cols-2

---

## CHANGE CARD SHAPE

Replace:

aspect-square

WITH:

aspect-[4/3]

---

## RESULT

Objects become:
- wider
- shorter
- less dominant

---

# 3. ADD CENTER PANEL (CRITICAL)

Insert between left and right panels:

```tsx
<div className="flex-1 flex flex-col items-center justify-center border-l border-border/50 border-r border-border/50">
CONTENT OF CENTER PANEL
TOP: 3D PREVIEW AREA
<div className="w-full h-[60%] flex items-center justify-center">
  <div className="glass-card rounded-xl w-[80%] h-[80%] flex items-center justify-center text-5xl">
    {selected?.thumbnail}
  </div>
</div>
BOTTOM: DROP ZONE
<div className="w-full h-[40%] flex items-center justify-center">
  <div className="drag-placeholder rounded-xl p-6 text-center w-[70%]">
    <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
    <p className="text-xs text-muted-foreground">
      Drop image here to create object
    </p>
  </div>
</div>
4. MOVE DRAG-DROP FROM LEFT → CENTER
REMOVE from ObjectListPanel:

"Drag & drop images..."

KEEP ONLY IN CENTER PANEL

This gives:

→ clear input zone
→ real spatial meaning

5. OBJECT SELECTION FEEDBACK

When object selected:

Center preview updates
Add glow:
ring-2 ring-primary
6. OPTIONAL (HIGH VALUE)

Add small label above preview:

"Preview"

7. RESULTING FLOW

User now experiences:

Select object (left)
See it visually (center)
Edit properties (right)
FINAL MENTAL MODEL

LEFT → list of objects
CENTER → what this object is
RIGHT → how to change it

FINAL GOAL

The UI should feel like:

"I select an object, see it in front of me, and modify it"

NOT:

"I scroll and edit in a narrow panel"


---

# 🧠 Why this is a big upgrade (mechanism)

Right now:
```text
editing = abstract

After this:

editing = spatial + visual