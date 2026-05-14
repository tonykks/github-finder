# GitHub Finder

## 1. 프로젝트 소개

GitHub Finder는 사용자가 GitHub username을 입력하면 GitHub REST API를 통해 해당 사용자의 기본 정보와 공개 repository 목록을 조회하는 웹 애플리케이션입니다.

HTML, CSS, Vanilla JavaScript만 사용하여 구현했으며, 별도의 프레임워크 없이 브라우저에서 바로 실행할 수 있습니다.

## 2. 사용 기술

- HTML
- CSS
- Vanilla JavaScript
- Fetch API
- GitHub REST API

## 3. 주요 기능

- username 입력창과 검색 버튼
- Enter 키 검색
- GitHub 사용자 기본 정보 표시
  - 프로필 이미지
  - login
  - name
  - bio
  - followers
  - following
  - public repositories 수
  - GitHub 프로필 링크
- 공개 repository 목록 표시
  - repository 이름
  - 설명
  - star 수
  - fork 수
  - 사용 언어
  - repository 링크
- 빈 입력 에러 처리
- 존재하지 않는 사용자 에러 처리
- loading 메시지 표시
- 네트워크 오류 처리
- 모바일 반응형 UI
- repository 설명 등 일부 문자열에 대한 HTML 특수문자 처리

## 4. 사용한 GitHub REST API

### 사용자 정보 API

```text
https://api.github.com/users/{username}
```

사용한 주요 필드:

- `avatar_url`
- `login`
- `name`
- `bio`
- `followers`
- `following`
- `public_repos`
- `html_url`

### Repository 목록 API

```text
https://api.github.com/users/{username}/repos?sort=updated&per_page=100
```

사용한 주요 필드:

- `name`
- `description`
- `stargazers_count`
- `forks_count`
- `language`
- `html_url`

## 5. 파일 구조

```text
github-finder/
├── index.html
├── style.css
├── script.js
├── README.md
└── requirements.md
```

파일별 역할:

- `index.html`: 검색 화면, 사용자 정보 영역, repository 목록 영역의 HTML 구조를 담당합니다.
- `style.css`: 전체 레이아웃, 카드 UI, 버튼, 입력창, 모바일 반응형 스타일을 담당합니다.
- `script.js`: GitHub API 요청, 검색 이벤트 처리, 에러 처리, 화면 렌더링을 담당합니다.
- `README.md`: 프로젝트 소개와 실행 방법, 테스트 결과, AI 활용 기록을 정리한 제출용 문서입니다.
- `requirements.md`: 과제 요구사항을 정리한 문서입니다.

## 6. 실행 방법

1. 프로젝트 폴더를 엽니다.
2. `index.html` 파일을 브라우저에서 실행합니다.
3. 검색창에 GitHub username을 입력합니다.
4. `검색` 버튼을 클릭하거나 Enter 키를 누릅니다.
5. 사용자 정보와 공개 repository 목록을 확인합니다.

예시 검색어:

- `octocat`
- `torvalds`
- `gaearon`

## 7. 테스트 결과

다음 항목을 기준으로 기능을 확인했습니다.

- 빈 입력 상태에서 검색 시 `username을 입력해주세요.` 메시지가 표시됩니다.
- 존재하지 않는 username 검색 시 `존재하지 않는 사용자입니다.` 메시지가 표시됩니다.
- 정상 username 검색 시 사용자 프로필 정보가 화면에 표시됩니다.
- 정상 username 검색 시 공개 repository 목록이 카드 형태로 표시됩니다.
- 검색 중에는 loading 메시지가 표시되고, 입력창과 검색 버튼이 잠시 비활성화됩니다.
- 검색 버튼 클릭과 Enter 키 입력 모두 검색 기능이 동작합니다.
- repository가 없는 경우 `공개 repository가 없습니다.` 메시지가 표시됩니다.
- 모바일 화면 크기에서 입력창, 버튼, 프로필 카드, repository 카드가 세로 방향으로 보기 좋게 배치됩니다.
- IDE linter 확인 결과 오류가 발견되지 않았습니다.

## 8. AI 활용 기록

`requirements.md`를 작성한 뒤 Cursor Agent를 활용해 `index.html`, `style.css`, `script.js`, `README.md` 생성을 요청했습니다.

이후 구현된 GitHub Finder 앱의 기능 테스트를 진행했고, 과제 제출에 적합하도록 `README.md` 보강을 진행했습니다.
