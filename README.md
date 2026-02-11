# useless-but-beautiful-cli

쓸모는 없지만 터미널의 분위기를 바꿔주는 작은 CLI 모음.

## Commands

- `vibe rain [seconds]`: 비 오는 듯한 랜덤 텍스트 애니메이션
- `vibe breathe [cycles]`: 짧은 호흡 루틴
- `vibe quote`: 랜덤 감성 문장 출력
- `vibe sunset [seconds]`: 노을 톤 파형 애니메이션
- `vibe noise [seconds]`: CRT 느낌의 텍스트 노이즈
- `vibe clock [seconds]`: 현재 시간을 잠깐 띄워두는 디지털 시계
- `vibe stars [seconds]`: 반짝이는 별 하늘 애니메이션
- `vibe train [seconds]`: 선로 위를 지나가는 작은 기차
- `vibe typewriter [text]`: 입력 텍스트를 타자기처럼 천천히 출력

## Quick Start

```bash
cd /Users/jooyeonseo/SCW/cofounder/github/useless-but-beautiful-cli
npm link
vibe quote
vibe rain 6
vibe breathe 3
vibe sunset 8
vibe noise 5
vibe clock 10
vibe stars 8
vibe train 10
vibe typewriter "hello midnight"
```

## Dev

```bash
npm run lint
npm start -- help
```

## Why

생산성을 높이진 않지만, 개발의 리듬을 잠깐 바꿔주는 도구일겁니다.
