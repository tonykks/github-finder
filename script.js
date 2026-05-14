const searchForm = document.querySelector("#search-form");
const usernameInput = document.querySelector("#username-input");
const message = document.querySelector("#message");
const profileSection = document.querySelector("#profile-section");
const reposSection = document.querySelector("#repos-section");
const repoList = document.querySelector("#repo-list");
const repoCount = document.querySelector("#repo-count");
const searchButton = searchForm.querySelector("button");

const avatar = document.querySelector("#avatar");
const profileName = document.querySelector("#profile-name");
const profileLogin = document.querySelector("#profile-login");
const profileBio = document.querySelector("#profile-bio");
const followers = document.querySelector("#followers");
const following = document.querySelector("#following");
const publicRepos = document.querySelector("#public-repos");
const profileLink = document.querySelector("#profile-link");

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
      fetch(`https://api.github.com/users/${encodedUsername}/repos?sort=updated&per_page=100`),
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
  profileName.textContent = user.name || user.login;
  profileLogin.textContent = `@${user.login}`;
  profileBio.textContent = user.bio || "소개글이 없습니다.";
  followers.textContent = user.followers;
  following.textContent = user.following;
  publicRepos.textContent = user.public_repos;
  profileLink.href = user.html_url;

  profileSection.classList.remove("hidden");
}

// API에서 받은 repository 배열을 카드 목록으로 만듭니다.
function renderRepos(repos) {
  repoList.innerHTML = "";
  repoCount.textContent = `${repos.length}개`;

  if (repos.length === 0) {
    repoList.innerHTML = '<p class="repo-description">공개 repository가 없습니다.</p>';
    reposSection.classList.remove("hidden");
    return;
  }

  repos.forEach((repo) => {
    const repoCard = document.createElement("article");
    const title = document.createElement("h3");
    const link = document.createElement("a");
    const description = document.createElement("p");
    const meta = document.createElement("div");

    repoCard.className = "repo-card";
    link.href = repo.html_url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = repo.name;

    description.className = "repo-description";
    description.textContent = repo.description || "설명이 없습니다.";

    meta.className = "repo-meta";
    meta.innerHTML = `
      <span>Language: ${escapeHtml(repo.language || "N/A")}</span>
      <span>Stars: ${repo.stargazers_count}</span>
      <span>Forks: ${repo.forks_count}</span>
    `;

    title.appendChild(link);
    repoCard.append(title, description, meta);

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

// innerHTML에 넣는 값이 HTML로 해석되지 않도록 특수 문자를 바꿉니다.
function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
