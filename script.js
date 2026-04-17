let credits = 100;
let isPremium = false;
let selectedPlan = "monthly";

/* SEARCH */
async function searchSong() {
  const lyrics = document.getElementById("lyricsInput").value.trim();
  const results = document.getElementById("results");

  if (!lyrics) return;

  if (!isPremium && credits <= 0) {
    results.innerHTML = "<p>No credits left.</p>";
    return;
  }

  if (!isPremium) credits -= 10;

  const url = `https://api.lyrics.ovh/suggest/${lyrics}`;

  const res = await fetch(url);
  const data = await res.json();

  results.innerHTML = "";

  data.data.slice(0, 8).forEach(song => {
    const div = document.createElement("div");
    div.className = "result";

    div.innerHTML = `
      <img src="${song.album.cover}">
      <div>
        <div><b>${song.title}</b></div>
        <div>${song.artist.name}</div>
      </div>
    `;

    div.onclick = () =>
      window.open(`https://www.youtube.com/results?search_query=${song.title}+${song.artist.name}`);

    results.appendChild(div);
  });

  updateUI();
}

/* UI */
function updateUI() {
  document.getElementById("creditsDisplay").innerText =
    isPremium ? "👑 Premium" : `🎟️ ${credits}/100`;
}

updateUI();

/* PREMIUM */
function openPremium() {
  document.getElementById("premiumModal").classList.remove("hidden");
}

function closePremium() {
  document.getElementById("premiumModal").classList.add("hidden");
}

function selectPlan(el) {
  document.querySelectorAll(".plan-card").forEach(c => c.classList.remove("selected"));
  el.classList.add("selected");
  selectedPlan = el.dataset.plan;
}

function createPremium() {
  isPremium = true;
  closePremium();
  updateUI();
}

/* SIGN IN */
function openSignIn() {
  document.getElementById("signInModal").classList.remove("hidden");
}

function closeSignIn() {
  document.getElementById("signInModal").classList.add("hidden");
}

function signIn() {
  isPremium = true;
  closeSignIn();
  updateUI();
}
