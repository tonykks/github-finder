const searchForm = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username-input");
const message = document.querySelector("#message");
const profileSection = document.querySelector("#profile-section");
const reposSection = document.querySelector("#repos-section");
const repoList = document.querySelector("#repo-list");
const repoCount = document.querySelector("#repo-count");
const searchButton = searchForm.querySelector("button");

const avatar = document.querySelector("#avatar");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const publicRepos = document.querySelector("#public-repos");
const publicGists = document.querySelector("#public-gists");
const profileLink = document.querySelector("#profile-link");
const profileCompany = document.querySelector("#profile-company");
const profileBlog = document.querySelector("#profile-blog");
const profileLocation = document.querySelector("#profile-location");
const memberSince = document.querySelector("#member-since");

// 검색 폼을 제출하면 브라우저 새로고침을 막고 GitHub 검색을 시작합니다.
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();

  if (!username) {
    showMessage("username을 입력해주세요.", true);
    hideResults();
    return;
  }

  await searchGitHubUser(username);
});

// GitHub API에서 사용자 정보와 repository 목록을 가져옵니다.
async function searchGitHubUser(username) {
  setLoading(true);
  hideResults();
  showMessage("사용자 정보를 불러오는 중입니다...");

  try {
    const encodedUsername = encodeURIComponent(username);

    // 사용자 정보와 repository 목록은 서로 독립적이므로 동시에 요청합니다.
    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${encodedUsername}`),
      fetch(`https://api.github.com/users/${encodedUsername}/repos?sort=updated&per_page=5`),
    ]);

    if (userResponse.status === 404) {
      showMessage("존재하지 않는 사용자입니다.", true);
      return;
    }

    if (!userResponse.ok || !reposResponse.ok) {
      showMessage("GitHub 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.", true);
      return;
    }

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    renderProfile(user);
    renderRepos(repos);
    showMessage("검색이 완료되었습니다.");
  } catch (error) {
    showMessage("네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.", true);
  } finally {
    setLoading(false);
  }
}

// API에서 받은 사용자 정보를 화면에 채웁니다.
function renderProfile(user) {
  avatar.src = user.avatar_url;
  avatar.alt = `${user.login} 프로필 이미지`;
  publicRepos.textContent = user.public_repos;
  publicGists.textContent = user.public_gists;
  followers.textContent = user.followers;
  following.textContent = user.following;
  profileLink.href = user.html_url;
  profileCompany.textContent = getDisplayValue(user.company);
  profileLocation.textContent = getDisplayValue(user.location);
  memberSince.textContent = formatDate(user.created_at);

  if (isEmpty(user.blog)) {
    profileBlog.removeAttribute("href");
    profileBlog.classList.add("muted");
    profileBlog.textContent = "정보 없음";
  } else {
    profileBlog.href = normalizeUrl(user.blog);
    profileBlog.classList.remove("muted");
    profileBlog.textContent = user.blog;
  }

  profileSection.classList.remove("hidden");
}

// API에서 받은 repository 배열을 카드 목록으로 만듭니다.
function renderRepos(repos) {
  repoList.innerHTML = "";
  repoCount.textContent = "";

  if (repos.length === 0) {
    repoList.innerHTML = '<p class="repo-description">공개 repository가 없습니다.</p>';
    reposSection.classList.remove("hidden");
    return;
  }

  repos.forEach((repo) => {
    const repoCard = document.createElement("article");
    const title = document.createElement("h3");
    const link = document.createElement("a");
    const meta = document.createElement("div");
    const stars = document.createElement("span");
    const watchers = document.createElement("span");
    const forks = document.createElement("span");

    repoCard.className = "repo-card";
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = repo.name;

    meta.className = "repo-meta";
    stars.textContent = `Stars: ${repo.stargazers_count}`;
    watchers.textContent = `Watchers: ${repo.watchers_count}`;
    forks.textContent = `Forks: ${repo.forks_count}`;

    title.appendChild(link);
    meta.append(stars, watchers, forks);
    repoCard.append(title, meta);

    repoList.appendChild(repoCard);
  });

  reposSection.classList.remove("hidden");
}

// 안내 메시지와 에러 메시지를 같은 위치에 보여줍니다.
function showMessage(text, isError = false) {
  message.textContent = text;
  message.classList.toggle("error", isError);
}

// 새 검색을 시작하기 전에 이전 결과를 숨깁니다.
function hideResults() {
  profileSection.classList.add("hidden");
  reposSection.classList.add("hidden");
  repoList.innerHTML = "";
  repoCount.textContent = "";
}

// 검색 중에는 중복 클릭을 막기 위해 입력창과 버튼을 잠시 비활성화합니다.
function setLoading(isLoading) {
  searchButton.disabled = isLoading;
  usernameInput.disabled = isLoading;
}

function isEmpty(value) {
  return value === null || value === undefined || String(value).trim() === "";
}

function getDisplayValue(value) {
  return isEmpty(value) ? "정보 없음" : value;
}

function formatDate(value) {
  return value ? value.slice(0, 10) : "정보 없음";
}

function normalizeUrl(value) {
  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  return `https://${value}`;
}
