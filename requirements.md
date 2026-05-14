# 과제3. GitHub Finder 앱 만들기

## 과제 목표

사용자가 GitHub username을 입력하면 GitHub REST API를 이용하여 해당 사용자의 기본 정보와 공개 repository 목록을 화면에 출력하는 Web App을 만든다.

## 참고 API

https://api.github.com/

https://docs.github.com/ko/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2026-03-10

## 필수 기능

1. username 입력창 만들기
2. 검색 버튼 만들기
3. Enter 키 검색 지원
4. GitHub 사용자 정보 출력
5. repository 목록 출력
6. 존재하지 않는 사용자 에러 처리
7. 빈 입력 에러 처리
8. loading 메시지 표시
9. 모바일 반응형 UI 적용

## 사용자 정보 API

https://api.github.com/users/{username}

표시할 필드:
- avatar_url
- login
- name
- bio
- followers
- following
- public_repos
- html_url

## Repository 목록 API

https://api.github.com/users/{username}/repos

표시할 필드:
- name
- description
- stargazers_count
- forks_count
- language
- html_url

## 기술 조건

- HTML
- CSS
- Vanilla JavaScript
- fetch API 사용
- 초보자가 이해할 수 있도록 코드 주석 작성

## 파일 구조

github-finder/
├── index.html
├── style.css
├── script.js
└── README.md