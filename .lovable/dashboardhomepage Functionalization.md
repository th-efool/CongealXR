# HomePage — Create Flow (Pre-Editor Setup)

Goal:
Create button should open a modal to collect project details before navigating to editor.

---

# 1. ADD STATE

Inside HomePage:

const [createModal, setCreateModal] = useState(false);
const [newProject, setNewProject] = useState({
  title: "",
  type: "Game",
  template: "",
  tags: ""
});

---

# 2. MODIFY QUICK ACTION (IMPORTANT)

Find:

onClick={() => navigate(action.route)}

---

Replace logic:

If action.title includes "Create":

onClick={() => setCreateModal(true)}

Else:
keep navigation

---

# 3. ADD CREATE MODAL UI

Add BELOW return (bottom of component):

{createModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="glass-card rounded-xl p-6 w-96 space-y-4">

      <h2 className="text-sm font-bold">Create New Project</h2>

      <!-- Title -->
      <input
        placeholder="Project Name"
        className="w-full bg-secondary/30 p-2 rounded text-xs"
        value={newProject.title}
        onChange={(e) =>
          setNewProject({ ...newProject, title: e.target.value })
        }
      />

      <!-- Type -->
      <select
        className="w-full bg-secondary/30 p-2 rounded text-xs"
        value={newProject.type}
        onChange={(e) =>
          setNewProject({
            ...newProject,
            type: e.target.value
          })
        }
      >
        <option value="Game">Game</option>
        <option value="AR Lesson">AR Lesson</option>
      </select>

      <!-- Template -->
      <input
        placeholder="Template (optional)"
        className="w-full bg-secondary/30 p-2 rounded text-xs"
        value={newProject.template}
        onChange={(e) =>
          setNewProject({ ...newProject, template: e.target.value })
        }
      />

      <!-- Tags -->
      <input
        placeholder="Tags (comma separated)"
        className="w-full bg-secondary/30 p-2 rounded text-xs"
        value={newProject.tags}
        onChange={(e) =>
          setNewProject({ ...newProject, tags: e.target.value })
        }
      />

      <!-- Actions -->
      <div className="flex justify-end gap-2">
        <button
          className="px-3 py-1 text-xs bg-secondary/50 rounded"
          onClick={() => setCreateModal(false)}
        >
          Cancel
        </button>

        <button
          className="px-3 py-1 text-xs bg-primary text-white rounded"
          onClick={() => {
            setCreateModal(false);

            // Navigate based on type
            if (newProject.type === "Game") {
              navigate("/app/studio");
            } else {
              navigate("/app/anchor");
            }
          }}
        >
          Create
        </button>
      </div>

    </div>
  </div>
)}

---

# 4. OPTIONAL (HIGH VALUE)

Disable Create button if title is empty:

disabled={!newProject.title}

---

# 5. FINAL FLOW

User clicks:
→ "Create New Game" / "Create AR Lesson"

→ Modal opens  
→ fills:
   - title
   - type
   - template
   - tags  

→ clicks Create  
→ navigates to correct editor  

---

# FINAL RULE

No direct navigation for creation.

Creation always starts with metadata input.