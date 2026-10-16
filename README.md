# Aside 한글 패치 (비공식)

Aside 브라우저의 설정 화면과 사이드바 UI 문구를 한국어로 보여주는 가벼운 DOM 번역 패치입니다.
채팅 내용, 모델명, 코드, 입력창은 번역하지 않습니다.

> **안내 및 면책**
> 이 저장소는 개인적인 용도로 만든 비공식 도구를 참고용으로 공개한 것입니다. Aside와는 관련이 없으며, Aside 앱 폴더의 `main.html`, `sidepanel.html`을 수정합니다.
> 사용에 따른 모든 책임은 사용자 본인에게 있으며, 작성자는 이 도구의 사용으로 발생하는 문제(앱 오작동, 데이터 손실 등)에 대해 책임지지 않습니다. 사용 전 백업을 권장하며, 양해 부탁드립니다.
> 별도의 지원이나 업데이트는 보장하지 않습니다. Aside가 업데이트되면 다시 적용해야 합니다.

## 설치 (Windows)
1. 이 저장소를 받습니다. (`Code → Download ZIP` 후 압축 해제, 또는 `git clone https://github.com/kkamn2-prog/aside-ko-patch.git`)
2. 아래 사용법대로 `한글패치적용v2.bat`을 실행합니다. 별도 설치할 것은 없습니다. (PowerShell 5.1 이상, Windows 기본 포함)

> 지금까지 Windows의 Aside 1.26.x에서만 만들고 시험했습니다. 다른 버전에서 `main.html`/`sidepanel.html` 구조가 다르면 적용이 건너뛰어질 수 있습니다. 문제가 있으면 Issues에 남겨 주세요.

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
