This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# URACCAR

이것은 19년도 한양대학교 졸업프로젝트로 제출한 "오픈소스 TRACCAR를 활용한 위치 기록 및 공유 서비스"의 프론트엔드(React.js) + 백엔드(Firebase) 소스코드입니다.

## 소개

**Uraccar**는 사용한다는 의미의 "Use"와 프로젝트의 메인 플랫폼인 "Traccar"의 합성어입니다.<br>
[Traccar](https://www.traccar.org/)는 현대적인 GPS 추적 플랫폼 오픈소스입니다.

### 개발 배경

스마트폰의 사용이 증가하면서 이동 경로 데이터가 많아졌습니다. 방대해진 데이터를 통해 얻을 수 있는 통찰력이 있다고 생각했기 때문에 위치 데이터를 기반으로 하는 서비스에 대한 개발을 진행하게 되었습니다.

### 작품 구성 및 상세 내용

Traccar를 기반으로 만든 [Uraccar 스마트폰 어플리케이션](https://github.com/dormkim/Zolp)을 이용해 사용자의 위치를 날짜 단위로 기록합니다. 기록된 데이터는 Traccar 서버에 저장됩니다.

Uraccar 웹 어플리케이션을 이용해 Traccar 서버와 동기화를 진행합니다. 동기화를 진행하는 과정에서 기록된 경로 데이터를 바탕으로 STAY POINT를 추출하고 이를 사용자에게 노출하여 각 장소에 대한 개인적 의미를 부여받습니다.

개인적 의미가 부여된 각 STAY POINT들은 공유 여부 설정을 통해 본인 이외의 다른 사용자에게도 노출됩니다.

### 상세 기술

[Mining User Similarity Based on Location History](https://dl.acm.org/doi/pdf/10.1145/1463434.1463477)를 참고하여 STAY POINT 추출 알고리즘을 제작하였습니다. 몇 번의 실험을 통해 200m 이내에 30분 이상 위치해있는 경우, 기록된 이동 경로의 각 좌표의 평균점으로 STAY POINT로 추출되도록 설정했습니다.

![결과 화면](https://github.com/psch300/uraccar/blob/master/public/result1.png)

### 프로젝트 시연 영상

[![프로젝트 시연 영상](https://img.youtube.com/vi/OzcTzka0dPQ/0.jpg)](https://youtu.be/OzcTzka0dPQ)