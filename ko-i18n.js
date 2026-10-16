/* Aside UI Korean patch v2 - light: exact-match nodeValue/attr only, childList+characterData observer, throttled+budgeted, no polling */
(function () {
  'use strict';
  var DICT = {
    "Aside Settings":"Aside 설정","Settings":"설정","General":"일반","Personalization":"개인 설정","Personal":"개인","Agent":"에이전트",
    "Usage":"사용량","Plan & Usage":"요금제 및 사용량","Models":"모델","Model":"모델","CLI & Remote":"CLI 및 원격","Developers":"개발자",
    "Channels":"채널","Skills":"스킬","App Connections":"앱 연결","Browser Import":"브라우저 가져오기","Archived Chats":"보관된 채팅","Archived chats":"보관된 채팅",
    "Account":"계정","Appearance":"모양","Agents":"에이전트","Chat":"채팅","Chats":"채팅","New chat":"새 채팅","New Chat":"새 채팅",
    "Projects":"프로젝트","Project":"프로젝트","Create":"만들기","Create a Project":"프로젝트 만들기","Routines":"루틴","My routines":"내 루틴",
    "Memory":"메모리","Memories":"메모리","Passwords":"비밀번호","Password":"비밀번호","Privacy":"개인정보","Security & Privacy":"보안 및 개인정보",
    "Billing":"결제","Statistics":"통계","Overview":"개요","Activity heatmap":"활동 히트맵","Activity Heatmap":"활동 히트맵",
    "Plugins & MCPs":"플러그인 및 MCP","MCPs":"MCP","Servers":"서버","Presets":"프리셋","Providers":"제공업체","Provider":"제공업체",
    "Preferences":"기본 설정","Import":"가져오기","About Aside":"Aside 정보","Default search engine":"기본 검색 엔진","New tab mode":"새 탭 모드",
    "Open new tabs in Search or Ask":"새 탭을 검색 또는 질문 모드로 열기","Auto Picture-in-Picture":"자동 화면 속 화면","Screenshot":"스크린샷","Spell check":"맞춤법 검사",
    "Browser":"브라우저","Check for updates":"업데이트 확인","Background service":"백그라운드 서비스","Aside account":"Aside 계정",
    "Sign in":"로그인","Sign out":"로그아웃","Import bookmarks":"북마크 가져오기","Import from another browser":"다른 브라우저에서 가져오기","Preferred languages":"선호 언어",
    "Sync":"동기화","Profile":"프로필","Danger zone":"위험 구역","Devices":"기기","Delete account":"계정 삭제","Avatar":"프로필 사진","Your name":"이름","Email":"이메일",
    "Permanently delete your account and all associated data":"계정과 연결된 모든 데이터를 영구 삭제합니다","Browser data recovery":"브라우저 데이터 복구",
    "Computer Use":"컴퓨터 사용","Agent runtime":"에이전트 런타임","Sandbox":"샌드박스","File permissions":"파일 권한","Tool permissions":"도구 권한",
    "Completion sound":"완료 소리","Play a sound when agents finish or need attention":"에이전트가 끝나거나 확인이 필요할 때 소리 재생","Current version":"현재 버전",
    "Clean up agent tabs":"에이전트 탭 정리","Automatically close tabs Aside used for tasks":"작업에 쓴 탭 자동 닫기","Task notifications":"작업 알림",
    "Access permission":"접근 권한","Read and write permission for agents.":"에이전트의 읽기 및 쓰기 권한입니다.","Follow-up behavior":"후속 메시지 방식",
    "Queue follow-ups while Aside runs or steer the current run.":"실행 중에는 후속 메시지를 대기열에 넣거나 현재 실행을 조정합니다.",
    "Messages access":"메시지 접근","Let Aside read your iMessages and send messages you approve.":"Aside가 iMessage를 읽고 승인한 메시지를 보내도록 허용합니다.",
    "Enable sandbox":"샌드박스 켜기","Aside runs commands in a sandbox, which keeps its work limited to the files and folders you allow.":"Aside는 샌드박스에서 명령을 실행해 허용한 파일과 폴더로만 작업을 제한합니다.",
    "Ask Aside on tab switch":"탭 전환 시 Aside 동작","When you switch tabs, start a new chat or keep the current chat.":"탭을 바꿀 때 새 채팅을 시작할지 현재 채팅을 유지할지 정합니다.",
    "Tabs":"탭","Keyboard shortcuts":"키보드 단축키","Theme":"테마","Choose how Aside looks":"Aside 모양을 선택하세요","Tab style":"탭 스타일",
    "Shrink tabs to fit":"탭 너비에 맞게 줄이기","Tabs shrink to fit as the tab bar fills up.":"탭 바가 차면 탭이 줄어듭니다.","Zoom level":"확대 비율",
    "Customize sidebar":"사이드바 맞춤 설정","Choose which sections appear above your tabs.":"탭 위에 표시할 섹션을 선택하세요.","Tab switcher order":"탭 전환 순서",
    "Choose how tabs are ordered when switching.":"전환할 때 탭 정렬 방식을 선택하세요.","Advanced":"고급","Recent chats in sidebar":"사이드바 최근 채팅",
    "How many recent chats to show in the sidebar.":"사이드바에 최근 채팅을 몇 개 보여줄지 정합니다.","Customize Tidy Tabs":"탭 정리 맞춤 설정",
    "New tab position":"새 탭 위치","Choose where new tabs are added in the sidebar.":"사이드바에서 새 탭이 추가될 위치를 선택하세요.","Transparency":"투명도",
    "Extension shortcuts":"확장 단축키","Manage shortcuts for Aside extensions":"Aside 확장 단축키 관리",
    "Plan":"요금제","Credits":"크레딧","Aside credits usage":"Aside 크레딧 사용량","Auto-reload":"자동 충전","Invite your friends to Aside":"친구를 Aside에 초대하기",
    "You both get 100 credits after signup":"가입하면 둘 다 100크레딧을 받습니다","Share a free week of Aside Pro with friends":"친구에게 Aside Pro 1주 무료 이용권을 공유하세요",
    "Personal Assistants":"개인 비서","Messengers":"메신저","Add":"추가","Set who can use this bot to run browser tasks.":"이 봇으로 브라우저 작업을 실행할 사람을 정하세요.",
    "Require mentions in threads":"스레드에서 멘션 필수","Require an @mention for the bot to respond in a thread or topic.":"스레드나 주제에서 봇이 답하려면 @멘션이 필요합니다.",
    "Reconnect":"다시 연결","Use this when messages stop arriving.":"메시지가 오지 않을 때 사용하세요.","Disconnect":"연결 해제","You can reconnect later by adding this again.":"나중에 다시 추가해 연결할 수 있습니다.",
    "No paired people":"연결된 사람 없음","Approved people will appear here.":"승인된 사람이 여기에 표시됩니다.",
    "Skill & MCP":"스킬 및 MCP","Remote Control":"원격 제어","FAQs":"자주 묻는 질문","Aside Skills":"Aside 스킬","Allow agents to interact with Aside through CLI and skills":"에이전트가 CLI와 스킬로 Aside와 상호작용하도록 허용",
    "Aside CLI":"Aside CLI","Update":"업데이트","Reinstall":"다시 설치","Install":"설치","Download":"다운로드","Copy command":"명령어 복사","Add skill to...":"스킬 추가...",
    "Enable Aside MCP server":"Aside MCP 서버 켜기","Upgrade to Pro":"Pro로 업그레이드","Allow remote sessions on this machine":"이 PC에서 원격 세션 허용",
    "Run tasks here from your other devices — logins and browsing stay on this machine.":"다른 기기에서 이 PC로 작업을 실행합니다. 로그인과 브라우징은 이 PC에 그대로 남습니다.",
    "Task models":"작업 모델","Image generation model":"이미지 생성 모델","Model used to generate and edit images":"이미지를 만들고 편집할 때 쓰는 모델입니다",
    "Connect":"연결","Default model":"기본 모델","The last used model becomes the default for new chat":"마지막으로 쓴 모델이 새 채팅의 기본 모델이 됩니다",
    "Search":"검색","Search models":"모델 검색","Search providers":"제공업체 검색","No models found":"모델을 찾을 수 없음","No matching providers":"일치하는 제공업체 없음","No matching models":"일치하는 모델 없음",
    "Automatic":"자동","Selected automatically":"자동으로 선택됨","Subscription":"구독","Subscription usage":"구독 사용량","Not available":"사용할 수 없음","Free":"무료","Local":"로컬",
    "Default":"기본","Fast":"빠름","Standard":"표준","Deep":"깊게","Visual":"화면 이해","Thinking level":"생각 수준","Speed":"속도","Reasoning":"추론",
    "Quick, cheap, bounded side work":"빠르고 저렴한 간단한 보조 작업","Durable internal background work, and memory dreaming":"내부 백그라운드 작업과 메모리 정리",
    "Hard reasoning, planning, judging, and synthesis":"어려운 추론, 계획, 판단, 종합","Image, screenshot, CAPTCHA, and page interpretation":"이미지, 스크린샷, 캡차, 페이지 해석",
    "Auto-compaction limit":"자동 압축 한도","Percent of each model's context window":"각 모델 컨텍스트 창의 비율","Search settings":"설정 검색","No settings found":"설정을 찾을 수 없음",
    "Cancel":"취소","Save":"저장","Delete":"삭제","Edit":"편집","Retry":"다시 시도","Close":"닫기","Continue":"계속","Back":"뒤로","Next":"다음","Finish":"완료","Submit":"제출","Send":"보내기",
    "Copy":"복사","Copied!":"복사됨","Rename":"이름 바꾸기","Archive":"보관","Share":"공유","Copy link":"링크 복사","Remove":"제거","Configure":"설정하기","Upgrade":"업그레이드","Start":"시작",
    "Chats you archived are kept here until you delete them.":"보관한 채팅은 삭제하기 전까지 여기에 보관됩니다.","Couldn’t load archived chats":"보관된 채팅을 불러오지 못했습니다","Please try again.":"다시 시도해 주세요.",
    "No archived chats":"보관된 채팅 없음","Chats you archive will appear here.":"보관한 채팅이 여기에 표시됩니다.","Previous page":"이전 페이지","Next page":"다음 페이지","Unarchive":"보관 해제",
    "Delete chat?":"채팅을 삭제할까요?","This will permanently delete this chat and its messages.":"이 채팅과 메시지가 영구 삭제됩니다.","Chat actions":"채팅 작업",
    "Search chats":"채팅 검색","Search tasks":"작업 검색","Search..":"검색..","Toggle sidebar":"사이드바 켜기/끄기","Close sidebar":"사이드바 닫기","Could not search chats":"채팅을 검색하지 못했습니다","No chats found":"채팅을 찾을 수 없음",
    "Filter chats":"채팅 필터","All statuses":"모든 상태","Running":"실행 중","Failed":"실패","Needs review":"확인 필요","Done":"완료","Status":"상태","All projects":"모든 프로젝트","List":"목록","Card":"카드",
    "Newest first":"최신순","Oldest first":"오래된순","Load more":"더 보기","Loading...":"불러오는 중...","Loading…":"불러오는 중…",
    "Ask AI a task, @ for context":"AI에게 작업을 맡기세요. @로 맥락 추가","Reply, @ for context":"답장하세요. @로 맥락 추가","Tasks":"작업","New Session":"새 세션",
    "Share chat":"채팅 공유","Don't share":"공유 안 함","Anyone with the link":"링크가 있는 누구나","Anyone with the link can view this chat":"링크가 있는 누구나 이 채팅을 볼 수 있습니다",
    "Archive chat?":"채팅을 보관할까요?","This will archive this chat.":"이 채팅을 보관합니다.","Rename chat":"채팅 이름 바꾸기","Choose a short, recognizable name.":"짧고 알아보기 쉬운 이름을 정하세요.",
    "Send feedback":"피드백 보내기","Copy session ID":"세션 ID 복사","Routine details":"루틴 상세","Routine actions":"루틴 작업","Repeat":"반복","Last run":"마지막 실행","Next run":"다음 실행","Not run yet":"아직 실행 안 함","Not scheduled":"예약 없음","Runs on":"실행 기기","Active":"활성","Completed":"완료됨","Paused":"일시정지됨",
    "Outputs":"결과물","Output artifacts":"결과 파일","Todo list":"할 일 목록","Subagents":"서브에이전트","Agent Tabs":"에이전트 탭","Switch to tab":"탭으로 전환","Started by":"시작한 사람",
    "Working directory":"작업 폴더","Choose the default folder used for new work in this Project.":"이 프로젝트에서 새 작업에 쓸 기본 폴더를 선택하세요.","Instruction":"지침","Files":"파일","No files yet":"아직 파일 없음","Chats always stay in the sidebar.":"채팅은 사이드바에 항상 표시됩니다.","Bookmarks":"북마크",
    "My Skills":"내 스킬","Built-in Skills":"내장 스킬","System":"시스템","Password Manager":"비밀번호 관리자","Import skill folder":"스킬 폴더 가져오기","Create new skill":"새 스킬 만들기","Name":"이름","Description":"설명","Instructions":"지침",
    "Create MCP server":"MCP 서버 만들기","Edit MCP server":"MCP 서버 편집","Transport":"전송 방식","Command":"명령어","Authentication":"인증","Request headers":"요청 헤더","Headers":"헤더","Client ID":"클라이언트 ID","Client Secret":"클라이언트 비밀키","Test connection":"연결 테스트","View tools":"도구 보기","Refresh tools":"도구 새로고침","Connected":"연결됨","Invalid server":"잘못된 서버","Unreachable":"연결할 수 없음",
    "Password managers":"비밀번호 관리자","Aside Vault":"Aside 금고","Data management":"데이터 관리","Autofill":"자동 입력","Connect external password manager":"외부 비밀번호 관리자 연결","Auto lock":"자동 잠금","Lock access again after inactivity":"잠시 쓰지 않으면 다시 잠그기","Enable Autofill":"자동 입력 켜기","Automatically fill in passwords on websites":"웹사이트에서 비밀번호 자동 입력","Recovery key":"복구 키","Vaults":"금고","Cloud sync":"클라우드 동기화","Clear vault data":"금고 데이터 지우기","Delete all stored passwords and vault data":"저장된 모든 비밀번호와 금고 데이터 삭제",
    "Browsing history":"방문 기록","Adblock":"광고 차단","Ads privacy":"광고 개인정보","Manage ad topics, site-suggested ads, and ad measurement":"광고 주제, 사이트 추천 광고, 광고 측정 관리","Site settings":"사이트 설정","Manage site permissions (location, camera, pop-ups, and more)":"사이트 권한 관리 (위치, 카메라, 팝업 등)","Delete browsing history":"방문 기록 삭제","Delete history, cookies, cache, and more":"기록, 쿠키, 캐시 등 삭제","View browsing history":"방문 기록 보기","Help improve Aside":"Aside 개선 돕기","Share crash reports, bug reports, and usage statistics.":"충돌 보고서, 버그 보고서, 사용 통계를 공유합니다.","Allow third-party cookies":"타사 쿠키 허용","Used for embedded content, ads, and tracking by websites.":"삽입 콘텐츠, 광고, 사이트 추적에 사용됩니다.","Block ads and trackers":"광고와 추적기 차단","Manage filters":"필터 관리",
    "Payment Use":"결제 사용","Let Aside buy things for you":"Aside가 대신 구매하게 하기","Cards":"카드","Recent activity":"최근 활동","Allow payments":"결제 허용","Before paying":"결제 전 확인","Spending limit":"지출 한도","No cards yet":"아직 카드 없음","Add card":"카드 추가",
    "Communications":"연락","Let Aside reach out for you":"Aside가 대신 연락하게 하기","Allow sending":"보내기 허용","Ask before sending":"보내기 전에 묻기","Send without asking":"묻지 않고 보내기","Match my tone":"내 말투 맞추기","Detected Apps":"감지된 앱","Custom instructions":"맞춤 지침",
    "Experimental":"실험 기능","Features":"기능","These settings are only available to internal users and canary builds.":"이 설정은 내부 사용자와 카나리 빌드에서만 쓸 수 있습니다.",
    "Configure memories":"메모리 설정","Control how Aside generates and retains memories across all Projects.":"모든 프로젝트에서 Aside가 메모리를 만들고 보관하는 방식을 정합니다.","Enable memories":"메모리 켜기","Generate new memories from chats":"채팅에서 새 메모리 만들기",
    "History":"기록","Context Awareness":"맥락 인식","Let Aside remember your day":"Aside가 하루를 기억하게 하기","Capture":"기록","Retention":"보관 기간","Summary model":"요약 모델","Clear history":"기록 지우기",
    "Mini popup":"미니 팝업","Chat with Aside anytime":"언제든 Aside와 채팅","Keyboard shortcut":"키보드 단축키","Enable Mini popup":"미니 팝업 켜기",
    "Lasso":"올가미 선택","Text selection":"텍스트 선택","Enable on text selection":"텍스트 선택 시 켜기","Lasso selection":"올가미 선택","Enable on lasso selection":"올가미 선택 시 켜기","Hotkey":"단축키","Add shortcut":"단축키 추가","Prompt":"프롬프트","Open URL":"URL 열기",
    "Notification Use":"알림 사용","Subscribed sites":"구독한 사이트","Recent notifications":"최근 알림","Revoke":"취소하기",
    "Discard feedback?":"피드백을 버릴까요?","Your feedback will be lost.":"작성한 피드백이 사라집니다.","Discard":"버리기","Keep editing":"계속 편집","Feedback sent. Thank you!":"피드백을 보냈습니다. 감사합니다!","Failed to send feedback.":"피드백을 보내지 못했습니다.","Share bugs, ideas, or anything else. We read every message.":"버그, 아이디어 등 무엇이든 공유해 주세요. 모든 메시지를 읽습니다.","Describe your feedback…":"피드백을 적어주세요…","Attach images":"이미지 첨부",
    "Sign in to sync your data between devices.":"기기간 데이터를 동기화하려면 로그인하세요.","You're using Aside in local mode":"Aside를 로컬 모드로 사용 중입니다","Sign in to sync your browser data. Aside Vault data on this device stays separate.":"브라우저 데이터를 동기화하려면 로그인하세요. 이 기기의 Aside 금고 데이터는 따로 유지됩니다.",
    "Importing browser data":"브라우저 데이터 가져오는 중","Browser data imported.":"브라우저 데이터를 가져왔습니다.","No browsers found":"브라우저를 찾을 수 없음","Already imported":"이미 가져옴",
    "Set as default":"기본값으로 설정","Aside works best as your default browser":"Aside는 기본 브라우저일 때 가장 좋습니다","Used for searches from the address bar":"주소창 검색에 사용됩니다",
    "Search engine settings are unavailable":"검색 엔진 설정을 쓸 수 없음","Unavailable":"쓸 수 없음","Ask":"질문","Show floating player when switching from a video tab":"동영상 탭에서 전환하면 떠 있는 플레이어 표시","Capture the current page from the right-click menu":"우클릭 메뉴에서 현재 페이지 캡처","Check spelling as you type":"입력할 때 맞춤법 검사",
    "Aside is up to date.":"Aside가 최신 버전입니다.","Restart to finish updating.":"업데이트를 마치려면 다시 시작하세요.","Checking for updates.":"업데이트를 확인 중입니다.","Background service is not responding. Restart Aside.":"백그라운드 서비스가 응답하지 않습니다. Aside를 다시 시작하세요.",
    "Copyright © 2026 At Your Side Inc. All rights reserved.":"Copyright © 2026 At Your Side Inc. All rights reserved.",
    "Enter a name":"이름을 입력하세요","Filter rules":"필터 규칙","Add filter":"필터 추가","Recommended":"추천","Regional":"지역","Custom":"맞춤","Disable Adblock?":"광고 차단을 끌까요?","Ads and trackers will no longer be blocked. You can turn this back on anytime.":"광고와 추적기가 더 이상 차단되지 않습니다. 언제든 다시 켤 수 있습니다.","Disable":"끄기","Loading…":"불러오는 중…","Clear cache":"캐시 지우기",
    "Period":"기간","Items to delete":"삭제할 항목","All time":"전체 기간","Last 15 min":"최근 15분","Last 30 min":"최근 30분","Last 24 hours":"최근 24시간","Last 7 days":"최근 7일","Last 4 weeks":"최근 4주","Cookies and other site data":"쿠키 및 기타 사이트 데이터","Cached images and files":"캐시된 이미지와 파일","Download history":"다운로드 기록","Autofill form data":"자동 입력 양식 데이터","Site storage":"사이트 저장소","Allow":"허용","Block all":"모두 차단",
    "Unlock":"잠금 해제","Saved passwords are unavailable.":"저장된 비밀번호를 쓸 수 없습니다.","Import password":"비밀번호 가져오기","Export":"내보내기","Format":"형식","Export passwords":"비밀번호 내보내기","Always allow":"항상 허용","Never":"안 함",
    "How can I use Aside CLI?":"Aside CLI는 어떻게 쓰나요?","What is Remote Control?":"원격 제어란 무엇인가요?","Aside CLI in a terminal":"터미널에서 Aside CLI","Install command copied.":"설치 명령어를 복사했습니다.","Skill installed to all available agents.":"쓸 수 있는 모든 에이전트에 스킬을 설치했습니다.","No installed agents found.":"설치된 에이전트를 찾을 수 없습니다.","Skill downloaded.":"스킬을 내려받았습니다.","Install to all agents":"모든 에이전트에 설치",
    "Off":"끔","Connecting…":"연결 중…","Ready for remote sessions":"원격 세션 준비됨","Error":"오류","Turn on to let your other devices run browser tasks on this machine.":"켜면 다른 기기가 이 PC에서 브라우저 작업을 실행할 수 있습니다.","Command copied.":"명령어를 복사했습니다.",
    "Total Sessions":"전체 세션","Last Active":"마지막 활동","Never":"없음","Avg Sessions / Week":"주당 평균 세션","Less":"적음","More":"많음","Sun":"일","Mon":"월","Tue":"화","Wed":"수","Thu":"목","Fri":"금","Sat":"토",
    "You've reached the Free plan limit. Pause a routine or upgrade.":"무료 요금제 한도에 도달했습니다. 루틴을 멈추거나 업그레이드하세요.","You can keep up to 3 routines active on the Free plan.":"무료 요금제에서는 루틴을 3개까지 활성화할 수 있습니다.","Pending sync":"동기화 대기 중",
    "Couldn’t update shortcut":"단축키를 바꾸지 못했습니다","Reset to":"초기값으로 되돌리기:","Not set":"설정 안 함","Use 300 characters or fewer.":"300자 이하로 입력하세요.","Prompt":"프롬프트",
    "At top":"맨 위","At bottom":"맨 아래","Tinted":"색조 있음","Transparent":"투명","Reduce window transparency. Improves performance":"창 투명도를 줄입니다. 성능이 좋아집니다","Use Liquid Glass effect":"리퀴드 글래스 효과 사용","System":"시스템","Light":"라이트","Dark":"다크","Recently used":"최근 사용순","Tab order":"탭 순서","Chats, Bookmarks":"채팅, 북마크",
    "Aside, Anywhere":"어디서든 Aside","Control Aside from Slack, Discord, or Telegram to work remotely or build a chatbot for your team.":"Slack, Discord, Telegram에서 Aside를 제어해 원격으로 일하거나 팀 챗봇을 만드세요.","Manual setup":"수동 설정","Bot Token":"봇 토큰","App Token":"앱 토큰","Application ID":"애플리케이션 ID","Public Key":"공개 키","Failed to create connection.":"연결을 만들지 못했습니다.","Access":"접근","Paired people only":"연결된 사람만","Everyone":"모두","Chat behavior":"채팅 동작","Approve":"승인","Ignore":"무시","Paired":"연결됨","Permission":"권한","Admin":"관리자","Member":"멤버","Enable":"켜기",
    "You might not need an MCP":"MCP가 필요 없을 수도 있습니다","Aside understands and works with websites without MCPs.":"Aside는 MCP 없이도 웹사이트를 이해하고 작업할 수 있습니다.","Local stdio":"로컬 stdio","Streamable HTTP":"Streamable HTTP","URL":"URL","Advanced settings":"고급 설정","Leave blank to keep existing":"기존 값을 유지하려면 비워두세요","Authorize":"승인하기",
    "API Key":"API 키","Region":"지역","Please enter your API key":"API 키를 입력하세요","Provider JSON":"제공업체 JSON","Base URL":"기본 URL","Select models":"모델 선택","Connection failed":"연결 실패","Waiting for sign-in to complete":"로그인 완료를 기다리는 중","Try again":"다시 시도","Authorization code":"인증 코드","Continue with":"다음으로 계속:",
    "Let Aside buy things for you":"Aside가 대신 사게 하기","Aside can check out on sites you use, with cards you allow.":"허용한 카드로 이용하는 사이트에서 결제할 수 있습니다.","Ask every time":"매번 묻기","Auto-approve under a limit":"한도 이하 자동 승인","Never pay":"결제 안 함","No payments yet":"아직 결제 없음",
    "Aside may reach people from the apps you turn on.":"켜둔 앱으로 사람들에게 연락할 수 있습니다.","Drafts still show in the session for review.":"초안은 세션에 표시되어 검토할 수 있습니다.","Follow up after sending":"보낸 뒤 후속 확인","Custom instructions":"맞춤 지침",
    "Enable the agent-led onboarding skill and the `onboarding` REPL global.":"에이전트 주도 온보딩 스킬을 켭니다.","Start onboarding":"온보딩 시작","KakaoTalk":"카카오톡","Aside Code":"Aside 코드",
    "No memory files yet":"아직 메모리 파일 없음","Open file":"파일 열기","Edit AGENTS.md":"AGENTS.md 편집","Open Project Folder":"프로젝트 폴더 열기","Add a file to project":"프로젝트에 파일 추가","Project settings":"프로젝트 설정","Project name":"프로젝트 이름",
    "Search filters":"필터 검색","No matching filters":"일치하는 필터 없음","Enter application identifier":"앱 식별자 입력","Never observe":"기록 안 함","Source":"출처","Application":"앱","Website":"웹사이트",
    "Aside subscribes to web push notifications so AI can continue long-running work, like checking mail, handling DMs, and waiting for replies.":"Aside가 웹 푸시 알림을 구독해 메일 확인, DM 처리, 답장 대기 같은 긴 작업을 이어갑니다.","No sites with AI notification permission":"AI 알림 권한이 있는 사이트 없음",
    "Aside CLI updated.":"Aside CLI가 업데이트됐습니다.","Aside CLI installed.":"Aside CLI가 설치됐습니다.","This will run the install script again and may overwrite your current CLI installation.":"설치 스크립트를 다시 실행해 현재 CLI 설치를 덮어쓸 수 있습니다."
  };
  Object.assign(DICT, {
    "Archived":"보관","Extensions":"확장 프로그램","Docs":"문서","Community":"커뮤니티","New":"새 기능",
    "Aside captures what you do in your browser and apps so agents can recall it later.":"Aside가 브라우저와 앱에서의 활동을 기록해 에이전트가 나중에 떠올릴 수 있게 합니다.",
    "Enable Context Awareness":"맥락 인식 켜기","Capture your activity on this device.":"이 기기에서의 활동을 기록합니다.",
    "Running normal":"정상 작동 중","Rebuild":"다시 만들기",
    "Episodic memory retention":"에피소드 메모리 보관 기간","How long to keep daily observation logs":"일일 관찰 기록을 얼마나 보관할지 정합니다","Never forget":"잊지 않음",
    "Open Aside with your shortcut and start chatting from anywhere.":"단축키로 Aside를 열고 어디서든 채팅을 시작하세요.",
    "Open Mini popup from anywhere with your shortcut":"단축키로 어디서든 미니 팝업 열기",
    "Select and take action":"선택하고 바로 실행","Drag over text or draw a circle to ask a question or run a shortcut in seconds.":"텍스트를 드래그하거나 원을 그려 질문하거나 단축키를 바로 실행하세요.",
    "Drag text click the blue dot.":"텍스트를 드래그한 뒤 파란 점을 클릭하세요.","Press Alt twice and draw a circle.":"Alt를 두 번 누른 뒤 원을 그리세요.",
    "Summarize":"요약","Translate":"번역","Copy code":"코드 복사","Search image":"이미지 검색",
    "Memory settings":"메모리 설정","Rebuilding":"다시 만드는 중","Last updated":"마지막 업데이트","Just now":"방금 전","just now":"방금 전",
    "Never forget (keep forever)":"잊지 않음 (영구 보관)","1 week":"1주","2 weeks":"2주","1 month":"1개월","3 months":"3개월","6 months":"6개월","1 year":"1년","Forever":"영구"
  });
  var MAP = new Map();
  Object.keys(DICT).forEach(function (k) { MAP.set(k, DICT[k]); });
  DICT = null;

  var ATTRS = ['placeholder', 'title', 'aria-label'];
  var ATTR_SEL = '[placeholder],[title],[aria-label]';
  var SKIP_TAGS = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, CODE: 1, PRE: 1, INPUT: 1, NOSCRIPT: 1 };
  // chat message bodies / editors: never touch
  var MSG_SEL = 'pre,code,.markdown,.prose,[data-message-id],[data-message-role],[data-role="message"],[role="log"]';
  var SKIP_SEL = MSG_SEL + ',textarea,input,[contenteditable=""],[contenteditable="true"],[contenteditable="plaintext-only"],' +
    '.ProseMirror,.cm-editor,.monaco-editor';

  var NODE_BUDGET = 800;   // max text nodes examined per slice
  var TIME_BUDGET = 8;     // ms per slice
  var DEBOUNCE = 200;      // ms between flushes
  var MAX_PENDING = 3000;

  var pending = new Set();
  var timer = 0;
  var obs = null;
  var active = null;       // { walker } being processed across slices

  function blocked(el) {
    if (!el) return true;
    if (SKIP_TAGS[el.tagName]) return true;
    if (el.isContentEditable) return true;
    return !!(el.closest && el.closest(SKIP_SEL));
  }

  // strings with embedded values; anchored, tried only when exact lookup misses
  function rel(s) {
    if (s === 'just now') return '방금 전';
    var m = /^(a|an|\d+) (second|minute|hour|day|week|month|year)s? ago$/.exec(s);
    if (!m) return s;
    var u = { second: '초', minute: '분', hour: '시간', day: '일', week: '주', month: '개월', year: '년' }[m[2]];
    return (m[1] === 'a' || m[1] === 'an' ? '1' : m[1]) + u + ' 전';
  }
  var RULES = [
    [/^Last updated at (.+), ([\d,]+) chunks?$/, function (m) { return '마지막 업데이트: ' + rel(m[1]) + ', 청크 ' + m[2] + '개'; }],
    [/^Last updated (.+ ago|just now)$/, function (m) { return '마지막 업데이트: ' + rel(m[1]); }]
  ];
  function lookup(t) {
    var ko = MAP.get(t);
    if (ko !== undefined || t.length > 120 || t.charCodeAt(0) !== 76 /* L */) return ko;
    for (var i = 0; i < RULES.length; i++) {
      var m = RULES[i][0].exec(t);
      if (m) return RULES[i][1](m);
    }
    return undefined;
  }

  function tText(node) {
    var v = node.nodeValue;
    if (!v || v.length > 300) return;
    var t = v.trim();
    if (!t) return;
    var ko = lookup(t);
    if (ko === undefined || ko === t) return;
    if (blocked(node.parentElement)) return;
    var i = v.indexOf(t);
    node.nodeValue = v.slice(0, i) + ko + v.slice(i + t.length);
  }

  function tAttrs(el) {
    if (el.nodeType !== 1 || el.tagName === 'SCRIPT' || el.tagName === 'STYLE') return;
    var checked = false, bad = false;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute(a);
      if (!v || v.length > 300) continue;
      var ko = MAP.get(v.trim());
      if (ko === undefined || ko === v) continue;
      if (!checked) { bad = !!(el.closest && el.closest(MSG_SEL)); checked = true; }
      if (!bad) el.setAttribute(a, ko);
    }
  }

  function enqueue(node) {
    if (pending.size >= MAX_PENDING) { pending.clear(); pending.add(document.body); return; }
    pending.add(node);
  }

  function schedule(ms) {
    if (timer) return;
    timer = setTimeout(flush, ms || DEBOUNCE);
  }

  function flush() {
    timer = 0;
    var t0 = performance.now(), seen = 0;
    if (obs) obs.disconnect();           // our own writes must not re-trigger us
    try {
      while (performance.now() - t0 < TIME_BUDGET && seen < NODE_BUDGET) {
        if (!active) {
          var it = pending.values().next();
          if (it.done) break;
          var root = it.value;
          pending.delete(root);
          if (!root.isConnected) continue;
          if (root.nodeType === 3) { tText(root); seen++; continue; }
          if (root.nodeType !== 1) continue;
          tAttrs(root);
          var els = root.querySelectorAll ? root.querySelectorAll(ATTR_SEL) : [];
          for (var j = 0; j < els.length && j < 500; j++) tAttrs(els[j]);
          active = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        }
        var n = active.nextNode();
        if (!n) { active = null; continue; }
        tText(n); seen++;
      }
    } catch (e) { /* never break the host page */ }
    reconnect();
    if (active || pending.size) schedule(50);
  }

  function reconnect() {
    if (!obs) return;
    obs.takeRecords();
    obs.observe(document.documentElement, { subtree: true, childList: true, characterData: true });
  }

  function start() {
    obs = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        var m = muts[i];
        if (m.type === 'characterData') { enqueue(m.target); }
        else { for (var k = 0; k < m.addedNodes.length; k++) enqueue(m.addedNodes[k]); }
      }
      schedule();
    });
    reconnect();
    if (document.body) { enqueue(document.body); schedule(); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
