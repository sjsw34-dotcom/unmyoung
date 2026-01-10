# 환경변수 파일 생성 안내

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 복사해주세요:

```
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq
TOSS_SECRET_KEY=test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Vercel 환경변수 설정

배포 후 Vercel 대시보드에서 다음 환경변수를 추가하세요:

1. Settings > Environment Variables
2. 위 3개 변수 추가
3. 단, `NEXT_PUBLIC_APP_URL`은 배포된 URL로 변경
   예: `https://unmyoung.vercel.app`
