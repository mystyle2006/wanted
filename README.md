## version
- yarn 4.x
- nodejs 18.x

## 실행 방법
```
# package install
yarn

# db 실행
docker-compose up -d

# db schema migration
yarn migrate:dev

# 기본 시드 정보가 필요하시면 실행
yarn seed

# 실행
yarn start:dev

# 테스트
yarn test
```

## API 문서
postman으로 바로 실행해볼 수 있도록 추가하였습니다. 
아래 파일을 postman에 import 하세요!
(improt 방법: postman 실행 -> file -> import -> json 드래그 앤 드랍)
- [wanted.postman_collection.json](wanted.postman_collection.json)

## 키워드 알림 기능
게시글, 댓글 생성 로직과 알림 부분의 디커플링을 하기 위해 nestjs 에서 제공하는 간단한 event 방식을 활용하였습니다.
다만 이렇게 디커플링 시 데이터 유실에 대해 고민이 많이 필요한데 실제 구현에는 그런 부분은 적용하지 않았고 간략하게 실무에서 적용한다면 아래와 같이
추가 개선해볼 수 있을 것 같습니다.

1. 이벤트 발생 예외 처리 적용
2. 이벤트 실패 시 재시도 처리 적용
3. 이벤트 큐를 활용하여 안정적으로 처리
