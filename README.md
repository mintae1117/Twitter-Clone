# 𝕏 Twitter clone coding
link : [사이트 바로가기](https://twitter-clone-73087.firebaseapp.com/)<br>
Twitter clone coding challenge in nomadcoder.<br>
2주간 진행한 트위터 완전코딩 챌린지 결과물 입니다.

<br>

## 📷 각 페이지별 화면 사진.
![](https://velog.velcdn.com/images/mintae1117/post/fb2d65f4-6abd-4d95-8ef2-88876c77fdc9/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/3a4d576d-9432-4079-855d-6b7ba41b2df3/image.png)
![](https://velog.velcdn.com/images/mintae1117/post/b911b285-9666-49c6-99cf-aef367ec69f6/image.png)

<br>

## 💻 사용 기술.

- `React.js`, `Typescript`, `Javascript`
- `emoji-picker-react`, `React-Router-Dom`, `Styled-components`, `Use-OutsideClick`
- `Firebase(auth, firestorDB, Storage, hosting)`, `Vite`
- Deploy : `Firebase-hosting`

<br>

## 😄 사용 가능한 기능, 디자인 설명.
<p>1. 로그인 페이지 : 비번 틀릴시 리셋 이메일 전송 여부 표시, 구글과 깃헙 로그인, 문제 발생 시 error 표시.</p>
<p>2. 계정생성 페이지 : 이메일 이용한 간단한 계정생성, 계정 존재시 리셋 이메일 전송 여부 표시, 구글과 깃헙 계정사용, 각 단계별 문제 발생 시 error 표시.</p>
<p>3. 홈 페이지 : 게시물 작성, 사진첨부, 첨부사진 표시, 첨부사진 삭제, 이모티콘 기입, 게시글 권한 식별, 권한 게시글 삭제, 권한 게시글 수정, 게시물 만든 시간 표시(just now,m,h,d...), 게시물 작성자 이름 표시, 사진용량 제한.</p>
<p>4. 프로필 페이지 : 프로필 사진,배경사진,이름 업로드 및 수정 가능, user info, user timeline 표시, 사진용량 제한 및 파일 변환 확인.</p>
<p>5. styled-component를 이용한 반응형 css, 원본 사이트와 최대한 동일한 UI로 구현.</p>

## 💪🏻 겪었던 어려움, 극복과정.
<p>파이어 베이스를 처음 쓰다 보니 storage 와 firestore에 어떤식으로 데이터를 저장해야 할지 그리고 어떤식으로 불러와야 할지 생각하는 것이 가장 힘들었던 것 같습니다.</p>
<p>저는 최대한 직관적인 저장과 호출 방식을 위해 userid와 매칭을 시킨 항목별 storage를 만들어(ex 배경화면, 프로필화면, 트윗이미지) 각 항목별로 이미지 또는 파일을 저장하고 삭제, 수정 할 수 있도록 하였습니다.</p>
<p>css는 반응형으로 만들기 위해 원본 트위터 사이트와 화면 크기를 px별로 조절해 가며 비교하여 최대한 원본가 가까운 ui로 만들도록 노력하였습니다.</p>
<p>거기서 그치지 않고 원본사이트에서 보기 힘들었던 부분은 자의적으로 조금 수정을 하여서 최대한 사이트를 보는 사람 입장에서 편하도록 만들었습니다.</p>
<p>마지막으로 emoji-picker-react에서 자체적 경고가 뜨는 prop들이 있었는데 경고가 떠도 코드는 잘 돌아갔으나 그 경고가 왜뜨는것인지 그리고 어떻게 해결할수 있을지를 찾기위해 stack overflow를 뒤지며 찾아 공부할 수 있었던 좋은 계기가 된 것 같습니다. 이다음에 emoji-picker-react를 쓰더라도 자신감을 가지고 당당히 사용할 수 있게 된것 같아 뿌듯했습니다.</p>