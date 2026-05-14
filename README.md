# GitHub Finder

## 프로젝트 소개

GitHub Finder는 사용자가 GitHub username을 입력하면 GitHub REST API를 통해 해당 사용자의 기본 정보와 공개 repository 목록을 조회하는 웹 애플리케이션입니다.

강사님 예시 화면을 참고하여 상단 navbar, 검색 박스, 사용자 프로필 카드, 최신 repository list 형태의 UI로 구성했습니다. HTML, CSS, Vanilla JavaScript만 사용했기 때문에 별도 설치 없이 브라우저에서 바로 실행할 수 있습니다.

## 사용 기술

- HTML
- CSS
- Vanilla JavaScript
- Fetch API
- GitHub REST API

## 주요 기능

- GitHub username 입력 및 검색 버튼 제공
- Enter 키를 통한 검색 지원
- 검색 중 loading 메시지 표시
- 빈 입력 에러 처리
- 존재하지 않는 사용자 에러 처리
- 네트워크 오류 처리
- GitHub 사용자 프로필 정보 표시
  - avatar 이미지
  - View Profile 링크
  - Public Repos
  - Public Gists
  - Followers
  - Following
  - Company
  - Website/Blog
  - Location
  - Member Since
- `Company`, `Website/Blog`, `Location` 값이 없을 경우 `정보 없음` 표시
- `Member Since`는 `YYYY-MM-DD` 형식으로 표시
- 최신 업데이트 순 repository 최대 5개 표시
  - repository 이름
  - Stars
  - Watchers
  - Forks
- 데스크톱에서는 badge가 균형 있게 한 줄로 표시
- 모바일에서는 화면 폭에 맞게 badge가 자동 줄바꿈되는 반응형 UI 적용

## 사용한 GitHub REST API

### 사용자 정보 API

```text
https://api.github.com/users/{username}
```

사용한 주요 필드:

- `avatar_url`
- `html_url`
- `public_repos`
- `public_gists`
- `followers`
- `following`
- `company`
- `blog`
- `location`
- `created_at`

### Repository 목록 API

```text
https://api.github.com/users/{username}/repos?sort=updated&per_page=5
```

사용한 주요 필드:

- `name`
- `html_url`
- `stargazers_count`
- `watchers_count`
- `forks_count`

## 파일 구조

```text
github-finder/
├── index.html
├── style.css
├── script.js
├── README.md
└── requirements.md
```

파일별 역할:

- `index.html`: navbar, 검색 영역, 사용자 정보 영역, 최신 repository 영역의 HTML 구조를 담당합니다.
- `style.css`: 전체 레이아웃, 프로필 카드, badge, repository list, 모바일 반응형 스타일을 담당합니다.
- `script.js`: GitHub API 요청, 검색 이벤트 처리, 에러 처리, loading 처리, 화면 렌더링을 담당합니다.
- `README.md`: 프로젝트 소개, 기능, 실행 방법, 테스트 내용, AI 활용 기록을 정리한 제출용 문서입니다.
- `requirements.md`: 과제 요구사항을 정리한 문서입니다.

## 실행 방법

1. 프로젝트 폴더를 엽니다.
2. `index.html` 파일을 브라우저에서 실행합니다.
3. 검색창에 GitHub username을 입력합니다.
4. `검색` 버튼을 클릭하거나 Enter 키를 누릅니다.
5. 사용자 정보와 최신 repository 목록을 확인합니다.

예시 검색어:

- `octocat`
- `karpathy`
- `torvalds`

## 테스트 내용

다음 항목을 기준으로 기능과 화면을 확인했습니다.

- 빈 입력 상태에서 검색 시 `username을 입력해주세요.` 메시지가 표시되는지 확인했습니다.
- 존재하지 않는 username 검색 시 `존재하지 않는 사용자입니다.` 메시지가 표시되는지 확인했습니다.
- 정상 username 검색 시 사용자 avatar, profile link, public repos, public gists, followers, following 정보가 표시되는지 확인했습니다.
- `Company`, `Website/Blog`, `Location` 값이 없을 때 `정보 없음`으로 표시되는지 확인했습니다.
- `Member Since`가 `YYYY-MM-DD` 형식으로 표시되는지 확인했습니다.
- 최신 업데이트 순 repository가 최대 5개까지 표시되는지 확인했습니다.
- repository 목록에 `Stars`, `Watchers`, `Forks` badge가 표시되는지 확인했습니다.
- 검색 버튼 클릭과 Enter 키 입력 모두 검색 기능이 동작하는지 확인했습니다.
- 검색 중 loading 메시지가 표시되고, 입력창과 검색 버튼이 잠시 비활성화되는지 확인했습니다.
- 데스크톱 화면에서 사용자 정보 badge가 한 줄로 정렬되는지 확인했습니다.
- 모바일 화면에서 사용자 badge와 repository badge가 화면 폭에 맞게 자동 줄바꿈되는지 확인했습니다.
- IDE linter 확인 결과 오류가 발견되지 않았습니다.

## AI 활용 기록

이번 과제에서는 Cursor Agent를 활용하여 요구사항을 실제 웹 애플리케이션 코드로 구현하는 과정을 진행했습니다.

### 1. 요구사항 정리

먼저 과제에서 필요한 기능을 `requirements.md`에 정리했습니다.

정리한 주요 요구사항은 다음과 같습니다.

- GitHub username 입력창 구현
- 검색 버튼 구현
- Enter 키 검색 지원
- GitHub 사용자 정보 표시
- 공개 repository 목록 표시
- 존재하지 않는 사용자 에러 처리
- 빈 입력 에러 처리
- loading 메시지 표시
- 모바일 반응형 UI 적용
- HTML, CSS, Vanilla JavaScript, Fetch API 사용

### 2. Cursor Agent를 활용한 초기 코드 생성

`requirements.md`를 작성한 뒤 Cursor Agent에게 해당 파일을 읽고 요구사항에 맞게 구현을 진행해달라고 요청했습니다.

Cursor Agent를 통해 다음 파일 생성을 요청했습니다.

- `index.html`
- `style.css`
- `script.js`
- `README.md`

초기 구현에서는 GitHub REST API를 사용해 사용자 정보와 repository 목록을 가져오는 기본 기능을 만들었습니다.

이 단계에서 구현된 주요 내용은 다음과 같습니다.

- 검색 form 구성
- GitHub username 입력 처리
- 검색 버튼 및 Enter 키 이벤트 처리
- `fetch`를 사용한 GitHub API 요청
- 사용자 정보 렌더링
- repository 목록 렌더링
- 빈 입력, 존재하지 않는 사용자, 네트워크 오류 처리
- loading 메시지 표시
- 기본 반응형 UI 구성

### 3. 기능 테스트와 오류 확인

초기 구현 후 Cursor Agent와 함께 기능이 정상적으로 동작하는지 확인했습니다.

확인한 내용은 다음과 같습니다.

- username을 입력하지 않고 검색했을 때 에러 메시지가 표시되는지 확인
- 존재하지 않는 username을 검색했을 때 에러 메시지가 표시되는지 확인
- 정상 username 검색 시 사용자 정보가 표시되는지 확인
- repository 목록이 정상적으로 출력되는지 확인
- 검색 버튼 클릭과 Enter 키 입력이 모두 동작하는지 확인
- loading 메시지가 표시되는지 확인
- 모바일 화면에서도 레이아웃이 깨지지 않는지 확인
- IDE linter 오류가 없는지 확인

### 4. 강사님 예시 화면 기준 UI 개선

기능이 정상 작동한 뒤, 강사님 예시 화면과 비슷한 형태로 UI 수정을 Cursor Agent에게 요청했습니다.

이때 앱을 처음부터 다시 만들지 않고 기존 기능과 API 로직을 유지한 상태에서 UI 중심으로 수정했습니다.

수정한 주요 내용은 다음과 같습니다.

- 상단 파란색 navbar 추가
- 검색 영역을 큰 hero 카드가 아닌 흰색 박스 형태로 변경
- 제목을 `Search GitHub Users`로 변경
- 설명 문구를 `Enter a username to fetch a user profile and repos`로 변경
- 사용자 정보 영역을 좌우 2단 구조로 변경
- 왼쪽에는 avatar 이미지와 `View Profile` 버튼 배치
- 오른쪽에는 사용자 정보 badge와 list 배치
- `Public Repos`, `Public Gists`, `Followers`, `Following` badge 추가
- `Company`, `Website/Blog`, `Location`, `Member Since` 정보 표시
- 값이 없는 항목은 `정보 없음`으로 표시
- `Member Since`는 `YYYY-MM-DD` 형식으로 표시
- repository 영역 제목을 `Latest Repos`로 변경
- repository 목록을 1열 list 형태로 변경
- 최신 업데이트 순 repository를 최대 5개만 표시
- 각 repository에 `Stars`, `Watchers`, `Forks` badge 표시

### 5. 세부 레이아웃 조정

UI를 예시 화면과 더 비슷하게 만들기 위해 Cursor Agent를 활용해 여러 차례 세부 스타일을 조정했습니다.

조정한 내용은 다음과 같습니다.

- 전체 container 폭 조정
- 사용자 정보 badge가 desktop에서 한 줄로 보이도록 수정
- badge 간격과 padding 조정
- `Followers`처럼 숫자가 긴 badge도 안정적으로 보이도록 최소 폭 조정
- repository badge의 길이를 일정하게 맞춤
- repository 이름과 badge가 세로 중앙 정렬되도록 수정
- 검색 input과 button 높이를 조금 줄여 compact한 화면 구성
- 모바일에서는 badge가 화면 폭에 맞게 2줄 또는 3줄로 자동 줄바꿈되도록 유지

### 6. 제출용 README 보강

마지막으로 Cursor Agent를 활용해 최종 구현 내용을 기준으로 제출용 `README.md`를 보강했습니다.

README에는 다음 항목을 포함하도록 정리했습니다.

- 프로젝트 소개
- 사용 기술
- 주요 기능
- 사용한 GitHub REST API
- 파일 구조
- 실행 방법
- 테스트 내용
- AI 활용 기록

AI는 코드 초안 생성, 기능 구현, UI 개선, 문서 정리에 활용했으며, 최종 기능 동작과 화면 구성은 직접 확인하면서 과제 요구사항에 맞게 수정했습니다.
