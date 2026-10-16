# Aside 한글 패치 (비공식)

Aside 브라우저의 설정 화면과 사이드바 UI 문구를 한국어로 보여주는 가벼운 DOM 번역 패치입니다.
채팅 내용, 모델명, 코드, 입력창은 번역하지 않습니다.

> 비공식 도구입니다. Aside 앱 폴더의 `main.html`, `sidepanel.html`에 스크립트 태그를 추가합니다. 사용은 본인 책임이며, Aside가 업데이트되면 다시 적용해야 합니다.

## 사용법
1. **Aside를 완전히 종료**합니다. (켜진 채로는 적용되지 않습니다)
2. `한글패치적용v2.bat`을 더블클릭합니다.
   - 최신 버전 폴더(`%LOCALAPPDATA%\Aside\User Data\AsideAgentManager\<버전>`)를 자동으로 찾아 패치합니다.
   - 원본은 `*.ko-v2-bak`으로 백업됩니다. 여러 번 실행해도 안전합니다.
3. Aside를 실행합니다.
4. 업데이트로 새 버전 폴더가 생기면 2번을 다시 실행합니다.

옵션: `apply-ko-patch-v2.ps1 -Extra` 로 `account-password.html`, `minipopup.html`까지 패치합니다.

## 복구
Aside 종료 후 `한글패치복구v2.bat`을 실행하면 HTML을 원복하고 `ko-i18n.js`를 삭제합니다.

## 동작 방식
- 사전에 **정확히 일치**하는 짧은 문구만 `nodeValue`/속성 값으로 교체합니다.
- 새로 추가된 노드만 큐에 넣고 200ms마다 모아 처리합니다. 한 번에 8ms/800노드까지만 처리합니다.
- `setInterval` 전체 스캔과 속성 감시를 쓰지 않으며, 번역 중에는 Observer를 끕니다.
- `pre`, `code`, `textarea`, `input`, `contenteditable`, 채팅 본문 영역은 건드리지 않습니다.
- 값이 섞인 문구(`Last updated at … chunks` 등)는 `logic.part.js`의 `RULES`로 처리합니다.

## 문구 추가/수정
1. `extra.part.js`에 `"English":"한국어"`를 추가합니다. (기본 사전은 `dict.part.js`)
2. `sh build.sh`로 `ko-i18n.js`를 다시 만듭니다.
3. Aside를 종료하고 적용 스크립트를 다시 실행합니다.

## 한계
- 상단 탭 제목, 주소 표시줄 등 Aside 브라우저 자체 UI는 번역되지 않습니다.
- 번역 문구의 맥락 차이(같은 영어 단어가 여러 뜻일 때)는 하나로 고정됩니다.
