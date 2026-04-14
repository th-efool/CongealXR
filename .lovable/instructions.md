# Creator Studio — Full Functional + Visual Fix Guide

---

# PART 1 — FIX HOVER WHITE ARTIFACT (CRITICAL)

## STEP 1 — REMOVE COLOR STACKING ISSUE

Current:
background: rgba(..., 0.3)

---

## FIX:

Use solid + opacity layer split:

style={{
  backgroundColor: node.block.color.replace("0.3", "0.15"),
  border: `1px solid ${node.block.color.replace("0.3", "0.4")}`
}}

---

## STEP 2 — DISABLE BACKDROP INTERFERENCE

Add to node class:

isolate

Example:

className="... hover-lift isolate"

---

## STEP 3 — FIX HOVER-LIFT

Your hover-lift likely applies:

transform + shadow

---

Modify CSS:

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
}

REMOVE heavy blur/glow shadows

---

## STEP 4 — ENSURE CANVAS IS DARK BASE

Add:

.canvas-grid {
  background-color: #0a0a0f;
}

---

# RESULT

No more white flashing / glow artifacts

---

# PART 2 — REMOVE STATIC DEMO SYSTEM

## STEP 1 — REPLACE demoNodes

REMOVE:

const demoNodes = [...]

---

ADD:

const [nodes, setNodes] = useState<CanvasNode[]>([]);

---

# PART 3 — DRAG BLOCK → CREATE NODE

## STEP 1 — BLOCK DRAG START

Add:

onDragStart={(e) =>
  e.dataTransfer.setData("block", JSON.stringify(block))
}

---

## STEP 2 — CANVAS DROP

On canvas div:

onDragOver={(e) => e.preventDefault()}

onDrop={(e) => {
  const data = JSON.parse(e.dataTransfer.getData("block"));

  const rect = e.currentTarget.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  setNodes(prev => [
    ...prev,
    {
      id: Date.now().toString(),
      block: data,
      x,
      y,
      props: {}
    }
  ]);
}}

---

# PART 4 — NODE DRAGGING (IMPORTANT)

## ADD STATE

const [draggingId, setDraggingId] = useState<string | null>(null);

---

## NODE HANDLERS

onMouseDown:
setDraggingId(node.id)

---

onMouseMove (on canvas):

if (!draggingId) return;

update node position

---

onMouseUp:

setDraggingId(null)

---

## UPDATE LOGIC

setNodes(prev =>
  prev.map(n =>
    n.id === draggingId
      ? { ...n, x: newX, y: newY }
      : n
  )
)

---

# PART 5 — FIX PROPERTY PANEL (CRITICAL)

## CURRENT PROBLEM

PropertyField uses local state → WRONG

---

## FIX: STORE IN NODE

Add:

node.props = {}

---

## Example:

updateNode(nodeId, { props: { ...node.props, delay: 100 } })

---

## REMOVE ALL LOCAL useState IN PropertyField

---

# PART 6 — NODE SELECTION SAFETY

## EDGE CASE

Deleting selected node leaves dangling state

---

## FIX

After delete:

if (selectedNode === deletedId) {
  setSelectedNode(null)
}

---

# PART 7 — DELETE NODE (REAL)

Hook Delete button:

setNodes(prev => prev.filter(n => n.id !== selectedNode))

---

# PART 8 — DUPLICATE NODE

Add:

copy node with:
- new id
- offset position (+20, +20)

---

# PART 9 — CONNECTION SYSTEM (MINIMAL V1)

## ADD STATE

const [connections, setConnections] = useState([]);

---

## INTERACTION

- click node A → store temp
- click node B → create connection

---

## STORE:

{ from: idA, to: idB }

---

# PART 10 — BOUNDS SAFETY

Prevent node from leaving canvas:

x = clamp(x, 0, width - nodeWidth)

---

# PART 11 — POINTER SAFETY

Use:

e.stopPropagation()

on node interactions

---

# PART 12 — Z-INDEX CONTROL

When dragging:

zIndex: 999

Else:

zIndex: 2

---

# PART 13 — PERFORMANCE EDGE CASE

Avoid re-render storm:

- throttle mouse move
- or use requestAnimationFrame

---

# PART 14 — EMPTY STATE

If no nodes:

show:

"Drag blocks to start building"

---

# FINAL SYSTEM

You now have:

- real node creation
- real dragging
- real editing
- real deletion
- clean visuals

---

# FINAL GOAL

User should feel:

"I am building a logic graph — not interacting with a demo UI"