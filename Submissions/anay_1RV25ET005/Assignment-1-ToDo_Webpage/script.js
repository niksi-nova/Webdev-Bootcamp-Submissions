const input      = document.getElementById("taskInput");
const addBtn     = document.getElementById("addBtn");
const list       = document.getElementById("taskList");
const empty      = document.getElementById("emptyState");
const statsBar   = document.getElementById("statsBar");
const totalEl    = document.getElementById("totalCount");
const doneEl     = document.getElementById("doneCount");
const leftEl     = document.getElementById("leftCount");
const toast      = document.getElementById("gifToast");
const toastGif   = document.getElementById("toastGif");
const toastTitle = document.getElementById("toastTitle");
const toastSub   = document.getElementById("toastSub");

let count = 0;
let toastTimer = null;

const addGifs = [
  {
    src: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXRrbnM3a3BpYW96a3RieXJ3M3VqNWZra3hndWl5bnlsYzhscmRxNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ogwFX9sL9SgVVw1mU/giphy.gif",
    title: "Locked in!",
    sub: "the grind begins 🐱"
  },
];

const doneGifs = [
  {
    src: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHVub29iOWt3NnlzMnp5djIwaThrMjFrZnJmdmx2dG9jbjBwaWdkdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Qy9X6vhKq0OAkDBQxA/giphy.gif",
    title: "Task done!",
    sub: "W behavior fr 🔥"
  },
];

function showToast(pool) {
  const item = pool[Math.floor(Math.random() * pool.length)];
  toastGif.src           = item.src;
  toastTitle.textContent = item.title;
  toastSub.textContent   = item.sub;

  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function updateStats() {
  const items = list.querySelectorAll(".task-item");
  const done  = list.querySelectorAll(".task-item.done");
  const n     = items.length;

  empty.style.display    = n === 0 ? "block" : "none";
  statsBar.style.display = n === 0 ? "none"  : "flex";

  totalEl.textContent = n;
  doneEl.textContent  = done.length;
  leftEl.textContent  = n - done.length;
}

function addTask() {
  const text = input.value.trim();

  if (!text) {
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.style.borderColor = "var(--accent)";
    setTimeout(() => {
      input.style.borderColor = "";
      input.classList.remove("shake");
    }, 500);
    return;
  }

  count++;

  const li    = document.createElement("li");
  li.className = "task-item";

  const num   = document.createElement("span");
  num.className   = "task-num";
  num.textContent = String(list.querySelectorAll(".task-item").length + 1).padStart(2, "0");

  const check = document.createElement("div");
  check.className = "task-check";
  check.title     = "Mark as done";

  const span  = document.createElement("span");
  span.className   = "task-text";
  span.textContent = text;

  const del   = document.createElement("button");
  del.className = "del-btn";
  del.title     = "Delete";
  del.innerHTML = "&#x2715;";

  let gifShown = false;
  check.addEventListener("click", () => {
    const wasDone = li.classList.contains("done");
    check.classList.toggle("checked");
    li.classList.toggle("done");
    if (!wasDone && !gifShown) {
      showToast(doneGifs);
      gifShown = true;
    }
    updateStats();
  });

  del.addEventListener("click", () => {
    li.style.animation = "slideOut .22s ease forwards";
    setTimeout(() => { li.remove(); updateStats(); }, 210);
  });

  li.appendChild(num);
  li.appendChild(check);
  li.appendChild(span);
  li.appendChild(del);
  list.appendChild(li);

  input.value = "";
  input.focus();
  updateStats();
  showToast(addGifs);
}

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => { if (e.key === "Enter") addTask(); });