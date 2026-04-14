\# Anchor Mode — Functional Editing Completion Guide



This document defines how to complete missing interactive editing features in the current implementation.



\---



\# 1. LABEL EDITING (CRITICAL)



\## CURRENT STATE

\- Labels can be added ✅

\- Labels can be removed ✅

\- Labels cannot be edited ❌



\---



\## GOAL

Each label must support editing:



\- name

\- description

\- position (x, y, z)



\---



\## STEP 1 — CREATE UPDATE HELPER



Inside ObjectEditorPanel:



```ts

function updateLabel(labelId, updates) {

&#x20; updateObject(object.id, {

&#x20;   labels: object.labels.map(l =>

&#x20;     l.id === labelId ? { ...l, ...updates } : l

&#x20;   )

&#x20; });

}

