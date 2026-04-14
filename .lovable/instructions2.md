# AURA Editor — Functional System Completion Guide

This document upgrades both:
- Anchor Mode (Object-based AR system)
- Creator Studio (Block-based logic system)

Goal:
Transform UI into a fully interactive, state-driven creation tool.

---

# PART 1 — ANCHOR MODE (OBJECT SYSTEM)

---

## 1. LAYOUT UPGRADE (3-ZONE SYSTEM)

### Replace layout:

[ Objects ] [ Editor ]

WITH:

[ Objects ] [ Preview Workspace ] [ Editor ]

---

### Implementation:

Insert CENTER panel between list + editor.

---

### CENTER PANEL STRUCTURE

TOP (Preview):
- Shows selected object (thumbnail for now)
- Later → real 3D canvas

BOTTOM (Drop Zone):
- Drag image here → creates object

---

## 2. OBJECT CREATION (REAL DRAG SYSTEM)

### Add handlers:

onDragOver → preventDefault  
onDrop → create object

---

### Drop behavior:

- create new object
- assign:
  id: Date.now()
  name: "New Object"
  thumbnail: default
  modelStatus: "missing"
  labels: []
  quizEnabled: false

- auto-select it

---

## 3. OBJECT STATE (STRICT RULE)

All changes must go through:

updateObject(id, updates)

---

NO local state for:
- labels
- quiz
- model

---

## 4. LABEL SYSTEM (FULLY FUNCTIONAL)

### Already exists → extend behavior

---

### ADD:

- inline editing (already present)
- auto-focus on new label
- delete label (already exists)

---

### CRITICAL:

Coordinates must:
- update live
- persist in state
- reflect immediately

---

## 5. OBJECT VISUAL FEEDBACK

When selected:

- highlight in list
- show in center preview
- editor reflects same object

---

## 6. REMOVE OBJECT (STABLE)

When deleting:

- remove from state
- auto-select next object
- fallback: null

---

## 7. OBJECT FLOW (FINAL)

User:

1. adds object (button or drop)
2. sees it in center
3. edits labels / quiz
4. repeats
5. publishes

---

# PART 2 — CREATOR STUDIO (BLOCK SYSTEM)

---

## 1. REMOVE STATIC demoNodes

Replace:

const demoNodes = [...]

WITH:

const [nodes, setNodes] = useState<CanvasNode[]>([])

---

## 2. DRAG → CREATE NODE

### Add drag source:

onDragStart:

e.dataTransfer.setData("block", JSON.stringify(block))

---

### Canvas:

onDrop:

- read block
- create node:

{
  id: Date.now()
  block
  x: mouseX
  y: mouseY
}

---

## 3. NODE MOVEMENT (DRAG)

Each node must support dragging.

---

### Add:

onMouseDown → start drag  
onMouseMove → update position  
onMouseUp → stop  

---

Update:

setNodes(prev =>
  prev.map(n =>
    n.id === draggingId
      ? { ...n, x: newX, y: newY }
      : n
  )
)

---

## 4. NODE SELECTION

Already exists → keep

Ensure:

selectedNode = id

---

## 5. DELETE NODE

Toolbar delete:

remove selected node:

setNodes(prev => prev.filter(n => n.id !== selectedNode))

---

## 6. DUPLICATE NODE

Toolbar duplicate:

copy selected node:

- new id
- offset position

---

## 7. CONNECTION SYSTEM (MINIMAL V1)

Remove static SVG lines.

---

### Add:

connections: { from: nodeId, to: nodeId }[]

---

### Interaction:

Click node A → click node B → create connection

---

## 8. PROPERTY PANEL → REAL STATE

Currently local state → wrong

---

### Fix:

Store node properties in node:

node.props = {}

---

Update via:

setNodes()

---

## 9. PLAY BUTTON (SIMULATION)

Minimal behavior:

- log node sequence
- simulate flow:

event → condition → action

---

## 10. SAVE / PUBLISH

Save:

console.log(nodes)

Publish:

console.log({
  nodes,
  connections
})

---

# PART 3 — UNIFICATION (IMPORTANT)

---

## COMMON MODEL

Anchor:

Object = {
  image,
  model,
  labels[],
  quiz[]
}

---

Creator:

Node = {
  block,
  position,
  props
}

---

## FUTURE LINK

Allow:

Object → attach logic graph

---

# PART 4 — UX PRINCIPLES

---

## 1. EVERYTHING IS DIRECT MANIPULATION

- drag = create
- click = select
- edit = immediate

---

## 2. NO DEAD UI

Every button must:
- mutate state
- reflect instantly

---

## 3. NO FAKE DATA

Remove all:
- sample arrays (after testing)
- demo nodes

---

# FINAL GOAL

User should feel:

"I am building real interactive AR experiences with direct control."

NOT:

"I am clicking through a demo UI"