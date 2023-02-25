<h1 align="middle">🎱</h1>
<h2 align="middle">level1 - 행운의 로또</h2>
<p align="middle">자바스크립트로 구현 하는 로또 어플리케이션</p>

<br/>
<br/>
<br/>

사이트 : [로또 게임 사이트](https://hozzijeong.github.io/javascript-lotto-1/dist/index.html)

# 📍 학습 목표

- UI와 도메인 영역을 분리할 수 있는 설계를 고민해보고, 목적에 맞게 객체와 함수를 활용
- 단위 테스트 기반으로 점진적인 리팩터링

## 🎯 기능 요구 사항

어느 평화로운 개발팀,
개발하다 한번씩 심심풀이로 돌려보는 용도로 간단한 콘솔 기반의 로또게임을 만들어 보기로 한다.

- 로또 구입 금액을 입력하면 구입 금액에 해당하는 만큼 로또를 발행해야 한다.
- 로또 번호는 오름차순으로 정렬하여 보여준다.
- 로또 1장의 가격은 1,000원이다.
- 당첨 번호와 보너스 번호를 입력받는다.
- 사용자가 구매한 로또 번호와 당첨 번호를 비교하여 당첨 내역 및 수익률을 출력한다.
- 당첨은 1등부터 5등까지 있다. 당첨 기준과 금액은 아래와 같다.
  - 1등: 6개 번호 일치 / 2,000,000,000원
  - 2등: 5개 번호 + 보너스 번호 일치 / 30,000,000원
  - 3등: 5개 번호 일치 / 1,500,000원
  - 4등: 4개 번호 일치 / 50,000원
  - 5등: 3개 번호 일치 / 5,000원
- 당첨 통계를 출력한 뒤에는 재시작/종료 여부를 입력받는다.
  - 재시작할 경우 구입 금액 입력부터 게임을 다시 시작하고, 종료하는 경우 그대로 프로그램을 종료시킨다.
- 사용자가 잘못된 값을 입력한 경우 throw문을 사용해 예외를 발생시키고, 에러 메시지를 출력 후 그 부분부터 입력을 다시 받는다.

실행 결과 예시

```
  > 구입금액을 입력해 주세요.8000
  8개를 구매했습니다.
  [8, 21, 23, 41, 42, 43]
  [3, 5, 11, 16, 32, 38]
  [7, 11, 16, 35, 36, 44]
  [1, 8, 11, 31, 41, 42]
  [13, 14, 16, 38, 42, 45]
  [7, 11, 30, 40, 42, 43]
  [2, 13, 22, 32, 38, 45]
  [1, 3, 5, 14, 22, 45]

> 당첨 번호를 입력해 주세요. 1,2,3,4,5,6

> 보너스 번호를 입력해 주세요. 7

당첨 통계
--------------------
3개 일치 (5,000원) - 1개
4개 일치 (50,000원) - 0개
5개 일치 (1,500,000원) - 0개
5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
6개 일치 (2,000,000,000원) - 0개
총 수익률은 62.5%입니다.

> 다시 시작하시겠습니까? (y/n)
```

## ✅ 프로그래밍 요구 사항

이전 미션의 프로그래밍 요구 사항은 기본으로 포함한다.

- 변수 선언시 const 만 사용한다.
- 함수(또는 메서드)의 들여쓰기 depth는 1단계까지만 허용한다.
- 함수의 매개변수는 2개 이하여야 한다.
- 함수에서 부수 효과를 분리하고, 가능한 순수 함수를 많이 활용한다.
- 3개 이상의 인스턴스 변수를 가진 클래스를 쓰지 않는다.
- 모든 기능을 TDD로 구현하는 것을 시도하여, 테스트 할 수 있는 도메인 로직에 대해서는 모두 단위 테스트가 존재해야 한다. (단, UI 로직은 제외)

**1단계**

- 로또 번호와 당첨 로또 번호의 유효성 검사시 발생하는 중복 코드를 제거해야 한다.
- 클래스(또는 객체)를 사용하는 경우, 프로퍼티를 외부에서 직접 꺼내지 않는다. 객체에 메시지를 보내도록 한다.

## 📝 과제 진행 요구사항

**기능 목록 및 commit 로그 요구 사항**

- 기능을 구현하기 전에 docs/REQUIREMENTS.md 파일에 구현할 기능 목록을 정리해 추가한다.
- git의 commit 단위는 앞 단계에서 REQUIREMENTS.md 파일에 정리한 기능 목록 단위로 추가한다.

**실행 환경 확인**
1단계는 콘솔 기반, 2단계는 웹 기반으로 진행하게 된다.

- 1단계는 npm run start-step1 커맨드로 앱을 실행할 수 있도록 한다.
  - 앱의 진입점이 되는 파일은 src/step1-index.js
- 2단계는 npm run start-step2 커맨드로 앱을 실행할 수 있도록 한다.
  - 앱의 진입점이 되는 파일은 src/step2-index.js

---

## 웹 기반 콘솔 피드백

- [ ] 일관성 있는 element 추가
- [ ] modal에 dialog 태그 사용
- [ ] 제출에 submit 이벤트 핸들링 사용
- [ ] view 와 component 역할 분리
