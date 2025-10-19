// ===============================
// SPLASH SCREEN
// ===============================
window.addEventListener("load", () => {
    const splash = document.getElementById("splash");
    const mainContent = document.getElementById("main-content");

    setTimeout(() => {
        splash.style.display = "none";
        mainContent.style.display = "block";
    }, 2000); // 2 seconds
});

// ===============================
// SAMPLE STORY DATA
// ===============================
const stories = [
    {
        id: "story1",
        title: "The Billionaire's Maid",
        cover: "assets/cover-images/story1.jpg",
        summary: "Shy Ella becomes a maid for arrogant billionaire Adrian Cole...",
        link: "stories/story1.html",
        category: "Modern Romance",
        topPick: true
    },
    {
        id: "story2",
        title: "Fated Hearts",
        cover: "assets/cover-images/story2.jpg",
        summary: "Two strangers keep meeting by accident until destiny strikes...",
        link: "stories/story2.html",
        category: "Emotional Drama",
        topPick: true
    },
    {
        id: "story3",
        title: "Royal Flame",
        cover: "assets/cover-images/story3.jpg",
        summary: "Princess Alara falls for her bodyguard...",
        link: "stories/story3.html",
        category: "Royal Romance",
        topPick: true
    },
    {
        id: "story4",
        title: "My Best Friend's Secret",
        cover: "assets/cover-images/story4.jpg",
        summary: "Lila discovers her best friend's hidden feelings...",
        link: "stories/story4.html",
        category: "College Romance",
        topPick: false
    },
    {
        id: "story5",
        title: "Whispers of Seoul",
        cover: "assets/cover-images/story5.jpg",
        summary: "An aspiring singer falls for a quiet producer in Seoul...",
        link: "stories/story5.html",
        category: "K-Drama",
        topPick: true
    }
];

// Coming Soon Stories
const comingSoon = [
    { title: "The Prince’s Lie", cover: "assets/cover-images/teaser1.jpg" },
    { title: "Perfectly Wrong", cover: "assets/cover-images/teaser2.jpg" },
    { title: "Her Last Goodbye", cover: "assets/cover-images/teaser3.jpg" },
    { title: "Fated Hearts - Season 2", cover: "assets/cover-images/teaser4.jpg" }
];

// ===============================
// CAROUSEL
// ===============================
const carouselContainer = document.getElementById("carouselContainer");
stories.filter(s => s.topPick).forEach(story => {
    const div = document.createElement("div");
    div.className = "carousel-item";
    div.innerHTML = `
        <img src="${story.cover}" alt="${story.title}">
        <h3>${story.title}</h3>
    `;
    div.onclick = () => { window.location.href = story.link; };
    carouselContainer.appendChild(div);
});

// ===============================
// STORY GRID
// ===============================
const storyGrid = document.getElementById("storyGrid");
stories.sort((a,b) => a.title.localeCompare(b.title)).forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
        <img src="${story.cover}" alt="${story.title}">
        <h3>${story.title}</h3>
        <p>${story.summary}</p>
    `;
    card.onclick = () => { window.location.href = story.link; };
    storyGrid.appendChild(card);
});

// ===============================
// COMING SOON GRID
// ===============================
const comingSoonGrid = document.getElementById("comingSoonGrid");
comingSoon.forEach(story => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
        <img src="${story.cover}" alt="${story.title}">
        <h3>${story.title}</h3>
        <p>Coming Soon 💌</p>
    `;
    comingSoonGrid.appendChild(card);
});

// ===============================
// SEARCH BAR WITH CATEGORY SUGGESTIONS
// ===============================
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filtered = stories.filter(s => s.title.toLowerCase().includes(query));
    storyGrid.innerHTML = "";
    filtered.forEach(story => {
        const card = document.createElement("div");
        card.className = "story-card";
        card.innerHTML = `
            <img src="${story.cover}" alt="${story.title}">
            <h3>${story.title}</h3>
            <p>${story.summary}</p>
        `;
        card.onclick = () => { window.location.href = story.link; };
        storyGrid.appendChild(card);
    });
});

// ===============================
// FAVORITES SYSTEM
// ===============================
stories.forEach(story => {
    if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", JSON.stringify([]));
});

function toggleFavorite(storyId) {
    let favs = JSON.parse(localStorage.getItem("favorites"));
    if(favs.includes(storyId)) {
        favs = favs.filter(id => id !== storyId);
    } else {
        favs.push(storyId);
    }
    localStorage.setItem("favorites", JSON.stringify(favs));
}

// ===============================
// OPTIONAL BACKGROUND MUSIC
// ===============================
let musicPlaying = false;
const audio = new Audio('assets/music.mp3');
audio.loop = true;

const musicToggle = document.getElementById("musicToggle");
musicToggle.addEventListener("click", () => {
    if (musicPlaying) { audio.pause(); musicPlaying = false; musicToggle.textContent = "🎵"; }
    else { audio.play(); musicPlaying = true; musicToggle.textContent = "🔇"; }
});

// ===============================
// NEW STORY ALERT
// ===============================
function showNewStoryAlert(title) {
    alert(`New story added: ${title}! Check it out 💖`);
}

// Example usage (can be triggered when you add new story dynamically)
// showNewStoryAlert("The Prince’s Lie");
