(function () {
  const page = location.pathname.split("/").pop() || "log-in.html";
  const stateKey = "upkeepmmPrototypeState";

  const defaultState = {
    adminJobStatus: "In Progress",
<<<<<<< HEAD
    adminJobAssignee: "Ko Kyaw Zin",
=======
    adminJobAssignee: "Kyaw Zin",
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
    technicianJobStatus: "In Progress",
    clientLastRequest: null,
  };

  function readState() {
    try {
      return { ...defaultState, ...JSON.parse(localStorage.getItem(stateKey) || "{}") };
    } catch (error) {
      return { ...defaultState };
    }
  }

  function writeState(nextState) {
    localStorage.setItem(stateKey, JSON.stringify({ ...readState(), ...nextState }));
  }

  function go(target) {
    location.href = target;
  }

  function wireNav(labels) {
    document.querySelectorAll("nav a").forEach((link) => {
      const label = link.textContent.trim().replace(/\s+/g, " ");
      if (labels[label]) link.href = labels[label];
    });
  }

  function wireButtonsByText(text, callback) {
    document.querySelectorAll("button").forEach((button) => {
      if (button.textContent.trim().replace(/\s+/g, " ").includes(text)) {
        button.addEventListener("click", callback);
      }
    });
  }

<<<<<<< HEAD
  function currentActiveLabel(role) {
    if (role === "admin") {
      if (page === "admin-request.html") return "Submit Job";
      if (page === "admin-settings.html") return "Settings";
      return "All Jobs";
    }
    if (role === "technician") {
      if (page === "technician-settings.html") return "Settings";
      return "All Jobs";
    }
    if (role === "client") {
      if (page === "client-request.html") return "New Request";
      if (page === "client-settings.html") return "Settings";
      return "My Requests";
    }
    return "";
  }

  function normalizeRoleNav(role, items) {
    const activeLabel = currentActiveLabel(role);
    const base =
      "flex items-center gap-md px-lg py-sm transition-colors duration-200";
    const active =
      "text-primary font-semibold border-l-[3px] border-primary bg-surface-container-low";
    const idle =
      "text-on-surface-variant hover:bg-surface-container-low";
    const logout =
      "flex items-center gap-md px-lg py-sm text-on-surface-variant hover:bg-surface-container-low transition-colors duration-200";

    document.querySelectorAll("nav a, aside a").forEach((link) => {
      const text = link.textContent.trim().replace(/\s+/g, " ");
      const item = items.find((candidate) => {
        const labels = [candidate.label, ...(candidate.aliases || [])];
        return labels.some((label) => text === label || text.endsWith(` ${label}`));
      });
      if (!item) return;

      link.href = item.href;
      link.className = item.label === activeLabel ? `${base} ${active}` : `${base} ${idle}`;
      const icon = link.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.textContent = item.icon;
        icon.setAttribute("data-icon", item.icon);
        icon.style.fontVariationSettings = item.label === activeLabel ? '"FILL" 1' : "";
      }
      const label = Array.from(link.querySelectorAll("span")).find((span) => !span.classList.contains("material-symbols-outlined"));
      if (label) {
        label.textContent = item.label;
        label.className = "font-body-sm text-body-sm";
      }
    });

    const logoutItems = Array.from(document.querySelectorAll("aside a, aside button")).filter((item) =>
      item.textContent.trim().replace(/\s+/g, " ").includes("Logout"),
    );
    logoutItems.forEach((item) => {
      if (item.tagName === "A") item.href = "log-in.html";
      if (item.tagName === "BUTTON") item.onclick = () => go("log-in.html");
      item.className = logout;
      const icon = item.querySelector(".material-symbols-outlined");
      if (icon) {
        icon.textContent = "logout";
        icon.setAttribute("data-icon", "logout");
      }
      const label = Array.from(item.querySelectorAll("span")).find((span) => !span.classList.contains("material-symbols-outlined"));
      if (label) {
        label.textContent = "Logout";
        label.className = "font-body-sm text-body-sm";
      }
    });
  }

=======
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
  function statusClasses(status) {
    const map = {
      Pending: "bg-tertiary-container/10 text-tertiary",
      Unassigned: "bg-slate-100 text-slate-600",
      Assigned: "bg-amber-100 text-amber-700",
      Acknowledged: "bg-blue-50 text-blue-700",
      "In Progress": "bg-indigo-100 text-indigo-700",
      Completed: "bg-green-50 text-green-700 border border-green-200",
      Verified: "bg-green-100 text-green-800 border border-green-200",
      Cancelled: "bg-red-50 text-red-700 border border-red-200",
    };
    return map[status] || "bg-surface-container-low text-on-surface-variant";
  }

  function setBadgeText(badge, status) {
    if (!badge) return;
    badge.textContent = status;
    badge.className = `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusClasses(status)}`;
  }

  function compactBadgeClasses(status) {
    const map = {
      Pending: "bg-tertiary-container/10 text-tertiary",
      Assigned: "bg-primary-container/10 text-primary",
      "In Progress": "bg-secondary-container/10 text-secondary",
      Completed: "bg-green-50 text-green-700 border border-green-200",
    };
    return map[status] || "bg-surface-container-high text-on-surface-variant border border-outline-variant";
  }

  function findTableRowById(jobId) {
    return Array.from(document.querySelectorAll("tbody tr")).find((row) =>
      row.textContent.includes(jobId),
    );
  }

  function initLogin() {
    const form = document.querySelector("form");
    if (page === "log-in.html" && form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        go("log-in-role.html");
      });
    }

    if (page === "log-in-role.html") {
      const targets = {
        Admin: "admin-portal.html",
        Technician: "technician-portal.html",
        Client: "client-portal.html",
      };
      document.querySelectorAll("button").forEach((button) => {
        const title = button.querySelector("h3")?.textContent.trim();
        if (targets[title]) button.addEventListener("click", () => go(targets[title]));
      });
    }
  }

  function initAdmin() {
    if (!page.startsWith("admin-")) return;

<<<<<<< HEAD
    normalizeRoleNav("admin", [
      { label: "All Jobs", href: "admin-portal.html", icon: "assignment" },
      { label: "Submit Job", href: "admin-request.html", icon: "add_task" },
      { label: "Settings", href: "admin-settings.html", icon: "settings" },
    ]);

=======
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
    wireNav({
      "All Jobs": "admin-portal.html",
      "Submit Job": "admin-request.html",
      Settings: "admin-settings.html",
      Logout: "log-in.html",
    });

    if (page === "admin-portal.html") {
      const state = readState();
      const row = findTableRowById("#JO-8821");
      if (row) {
        const statusBadge = row.querySelector("td:nth-child(5) span");
        setBadgeText(statusBadge, state.adminJobStatus);
        const assigneeCell = row.querySelector("td:nth-child(6)");
        if (state.adminJobAssignee && assigneeCell && !assigneeCell.querySelector("select")) {
          assigneeCell.textContent = state.adminJobAssignee;
        }
      }

      document.querySelectorAll("tbody tr").forEach((tableRow) => {
        tableRow.style.cursor = "pointer";
        tableRow.addEventListener("click", (event) => {
          if (event.target.closest("select") || event.target.closest("button")) return;
          go("admin-job-detail.html");
        });
      });

      document.querySelectorAll("tbody tr button").forEach((button) => {
        if (!button.textContent.trim().includes("Assign")) return;
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          const tableRow = button.closest("tr");
          const select = tableRow?.querySelector("select");
<<<<<<< HEAD
          const assignee = select?.value && !select.value.includes("Select") ? select.value : "Ko Min Thu";
=======
          const assignee = select?.value && !select.value.includes("Select") ? select.value : "John Smith";
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
          const statusBadge = tableRow?.querySelector("td:nth-child(5) span");
          const assigneeCell = tableRow?.querySelector("td:nth-child(6)");
          setBadgeText(statusBadge, "Assigned");
          if (assigneeCell) assigneeCell.innerHTML = `<span class="text-body-sm font-medium">${assignee}</span>`;
          if (tableRow?.textContent.includes("#JO-8821")) {
            writeState({ adminJobStatus: "Assigned", adminJobAssignee: assignee });
          }
        });
      });
    }

    if (page === "admin-job-detail.html") {
      wireButtonsByText("Export PDF", (event) => {
        event.preventDefault();
        event.currentTarget.textContent = "PDF Ready";
      });

      document.querySelectorAll("button").forEach((button) => {
        const icon = button.querySelector(".material-symbols-outlined")?.textContent.trim();
        if (icon === "arrow_back") button.addEventListener("click", () => go("admin-portal.html"));
      });

      const state = readState();
      const headerBadge = Array.from(document.querySelectorAll("span")).find((span) =>
        span.textContent.trim().toUpperCase() === "IN PROGRESS",
      );
      if (headerBadge) headerBadge.lastChild.textContent = state.adminJobStatus.toUpperCase();

      const currentStatus = Array.from(document.querySelectorAll("label"))
        .find((label) => label.textContent.trim() === "Current Status")
        ?.parentElement?.querySelector("span.font-body-sm");
      if (currentStatus) currentStatus.textContent = state.adminJobStatus;

      const statusSelect = document.getElementById("status-select");
      const statusButton = document.getElementById("update-status-btn");
      const assignmentSelect = Array.from(document.querySelectorAll("select")).find((select) =>
        select.textContent.includes("Select Vendor or Technician"),
      );
      const assignmentButton = Array.from(document.querySelectorAll("button")).find((button) =>
        button.textContent.trim() === "Update Assignment",
      );
      const currentTechnician =
<<<<<<< HEAD
        document.querySelector('img[alt="Ko Kyaw Zin"]')?.nextElementSibling?.querySelector("p") ||
        Array.from(document.querySelectorAll("p")).find((text) => text.textContent.trim() === "Ko Kyaw Zin");
=======
        document.querySelector('img[alt="Kyaw Zin"]')?.nextElementSibling?.querySelector("p") ||
        Array.from(document.querySelectorAll("p")).find((text) => text.textContent.trim() === "Kyaw Zin");
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
      if (currentTechnician && state.adminJobAssignee) currentTechnician.textContent = state.adminJobAssignee;
      assignmentButton?.addEventListener("click", () => {
        const selected = assignmentSelect?.selectedOptions[0]?.textContent.trim();
        if (!selected || selected.includes("Select Vendor")) return;
        const assignee = selected.replace(/\s*\(.+\)\s*$/, "");
        writeState({ adminJobAssignee: assignee, adminJobStatus: "Assigned" });
        if (currentTechnician) currentTechnician.textContent = assignee;
        if (currentStatus) currentStatus.textContent = "Assigned";
        if (headerBadge) headerBadge.lastChild.textContent = "ASSIGNED";
        assignmentButton.textContent = "Assignment Updated";
        setTimeout(() => {
          assignmentButton.textContent = "Update Assignment";
        }, 1200);
      });

      statusButton?.addEventListener("click", () => {
        const selected = statusSelect?.selectedOptions[0]?.textContent.trim();
        if (!selected || selected.includes("Select")) return;
        writeState({ adminJobStatus: selected });
        if (currentStatus) currentStatus.textContent = selected;
        if (headerBadge) headerBadge.lastChild.textContent = selected.toUpperCase();
        statusButton.textContent = "Status Updated";
        setTimeout(() => {
          statusButton.textContent = "Update Status";
        }, 1200);
      });
    }

    if (page === "admin-request.html") {
      const saveRequest = () => {
        writeState({ adminJobStatus: "Unassigned", adminJobAssignee: "" });
      };
      wireButtonsByText("Cancel", () => go("admin-portal.html"));
      document.querySelector("form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        saveRequest();
        go("admin-portal.html");
      });
      wireButtonsByText("Submit", () => saveRequest());
    }
  }

  function initTechnician() {
    if (!page.startsWith("technician-")) return;

<<<<<<< HEAD
    normalizeRoleNav("technician", [
      { label: "All Jobs", href: "technician-portal.html", icon: "assignment" },
      { label: "Settings", href: "technician-settings.html", icon: "settings" },
    ]);

=======
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
    wireNav({
      "All Jobs": "technician-portal.html",
      Settings: "technician-settings.html",
      Logout: "log-in.html",
    });

    if (page === "technician-portal.html") {
      const state = readState();
      const row = findTableRowById("#ORD-8992");
      const badge = row?.querySelector(".min-w-\\[100px\\] span");
      if (badge) {
        badge.textContent = state.technicianJobStatus;
        badge.className = `px-md py-1 rounded-full text-xs font-semibold ${compactBadgeClasses(state.technicianJobStatus)}`;
      }
      document.querySelectorAll("button").forEach((button) => {
        const icon = button.querySelector(".material-symbols-outlined")?.textContent.trim();
        if (icon === "chevron_right") button.addEventListener("click", () => go("technician-job.html"));
      });
    }

    if (page === "technician-job.html") {
      wireButtonsByText("Back", () => go("technician-portal.html"));
      const doneButton = Array.from(document.querySelectorAll("button")).find((button) =>
        button.textContent.trim() === "Mark as Done",
      );
      const updateDoneAvailability = () => {
        const ready =
          document.getElementById("pre-check")?.textContent.trim() === "check_box" &&
          document.getElementById("post-check")?.textContent.trim() === "check_box";
        if (!doneButton) return;
        doneButton.disabled = !ready;
        doneButton.classList.toggle("cursor-not-allowed", !ready);
        doneButton.classList.toggle("opacity-60", !ready);
        doneButton.classList.toggle("bg-primary", ready);
        doneButton.classList.toggle("text-on-primary", ready);
      };
      document.querySelectorAll('input[type="file"]').forEach((input) => {
        input.addEventListener("change", () => setTimeout(updateDoneAvailability, 50));
      });
      updateDoneAvailability();
      doneButton?.addEventListener("click", () => {
        if (doneButton.disabled) return;
        writeState({ technicianJobStatus: "Completed", adminJobStatus: "Completed" });
        go("technician-portal.html");
      });
    }
  }

  function initClient() {
    if (!page.startsWith("client-")) return;

<<<<<<< HEAD
    normalizeRoleNav("client", [
      { label: "My Requests", href: "client-portal.html", icon: "list_alt", aliases: ["Requests"] },
      { label: "New Request", href: "client-request.html", icon: "add_circle", aliases: ["New"] },
      { label: "Settings", href: "client-settings.html", icon: "settings" },
    ]);

=======
>>>>>>> 4c7e3ae1ace9a5262849a3c00af6a1e5a6ba6042
    wireNav({
      "My Requests": "client-portal.html",
      "New Request": "client-request.html",
      Settings: "client-settings.html",
      Logout: "log-in.html",
    });

    if (page === "client-portal.html") {
      const state = readState();
      if (state.clientLastRequest && !document.body.textContent.includes(state.clientLastRequest.title)) {
        const tbody = document.querySelector("tbody");
        const row = document.createElement("tr");
        row.className = "table-row-hover transition-colors group";
        row.innerHTML = `
          <td class="px-lg py-md font-data-tabular text-data-tabular text-on-surface-variant">#ORD-NEW</td>
          <td class="px-lg py-md">
            <div class="font-body-sm text-body-sm font-bold text-on-surface">${state.clientLastRequest.title}</div>
            <div class="text-[12px] text-on-surface-variant">${state.clientLastRequest.category}${state.clientLastRequest.subcategory ? " / " + state.clientLastRequest.subcategory : ""}</div>
          </td>
          <td class="px-lg py-md text-body-sm">Recently submitted</td>
          <td class="px-lg py-md"><span class="inline-flex items-center px-sm py-0.5 rounded-full bg-on-surface-variant/10 text-on-surface-variant font-bold text-[10px] uppercase">Normal</span></td>
          <td class="px-lg py-md"><span class="inline-flex items-center px-sm py-0.5 rounded-full bg-tertiary-container/10 text-tertiary font-bold text-[10px] uppercase">Pending</span></td>
          <td class="px-lg py-md text-right"><button class="px-md py-1 text-primary font-bold text-body-sm rounded-lg hover:bg-primary/5 transition-colors">View</button></td>
        `;
        tbody?.prepend(row);
      }

      document.querySelectorAll("tbody tr").forEach((row) => {
        row.style.cursor = "pointer";
        row.addEventListener("click", () => go("client-request-detail.html"));
      });
      document.querySelectorAll("td button").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          go("client-request-detail.html");
        });
      });
    }

    if (page === "client-request.html") {
      const saveRequest = () => {
        const title = document.querySelector('input[placeholder*="Leaking"]')?.value || "New maintenance request";
        const category = document.getElementById("cat-parent")?.value || "General";
        const subcategory = document.getElementById("cat-child")?.value || "";
        writeState({ clientLastRequest: { title, category, subcategory, status: "Pending" } });
      };
      wireButtonsByText("Cancel", () => go("client-portal.html"));
      document.querySelector("form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        saveRequest();
        go("client-portal.html");
      });
      wireButtonsByText("Submit Request", () => saveRequest());
    }

    if (page === "client-request-detail.html") {
      document.querySelectorAll("button").forEach((button) => {
        if (button.textContent.trim().includes("Back to Request List")) {
          button.addEventListener("click", () => go("client-portal.html"));
        }
      });
      document.querySelectorAll("a").forEach((link) => {
        if (link.textContent.trim() === "My Requests") link.href = "client-portal.html";
      });
    }
  }

  initLogin();
  initAdmin();
  initTechnician();
  initClient();
})();
