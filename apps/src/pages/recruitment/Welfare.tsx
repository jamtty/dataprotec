import RecruitmentLayout from './RecruitmentLayout'
import recruitmentBg1Img from '../../assets/images/recruitment_bg1_img.png'

function RecruitmentWelfare() {
  return (
    <RecruitmentLayout>
      <div className="contetns recruitment2">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">복지후생</h2>
          <p data-aos="fade-up" data-aos-delay="200">사람의 가치를 소중하게 생각하고,<span className="br"></span>성장과 성공을 함께 나누도록 노력하고 있습니다.</p>
        </div>

        <div className="section1">
          <div className="responsive">
            <div className="bg"></div>
            <div className="wrap">
              <div className="img" data-aos="fade-left">
                <img src={recruitmentBg1Img} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">복지후생</div></h3>
          <ul className="list">
            <li data-aos="fade-right">
              <h4>능력 향상을 위한 자기 개발, 문화 활동비 지원</h4>
              <ul className="info">
                <li>해당 직무 전공 및 인문 서적 지원</li>
                <li>각종 세미나 및 자기 개발을 위한 교육 프로그램 지원</li>
                <li>문화활동을 위한 지원 프로그램</li>
              </ul>
            </li>
            <li data-aos="fade-left">
              <h4>성과급, 프로젝트 인센티브</h4>
              <ul className="info">
                <li>연초 목표 대비 성과 시 평가에 따른 인센티브 지급</li>
                <li>장기근속자 및 우수사원 포상</li>
                <li>4대보험, 퇴직연금 의무 가입</li>
              </ul>
            </li>
            <li data-aos="fade-right">
              <h4>선택적 자율 출근 제도 및 지원</h4>
              <ul className="info">
                <li>자율적으로 본인 출퇴근 시간을 정하는 제도</li>
                <li>야근 식대 지원, 야근 근무 퇴근 시 교통비 지원</li>
                <li>팀별 정기 회식비 지원</li>
              </ul>
            </li>
            <li data-aos="fade-left">
              <h4>근무, 휴무와 휴가</h4>
              <ul className="info">
                <li>주5일 근무</li>
                <li>여름, 겨울 각 일주일 리프레시 휴가 (근무 연차 기준 이상)</li>
                <li>경조사, 프로젝트 포상 휴가</li>
                <li>본인 생일 케익 쿠폰 지급</li>
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </RecruitmentLayout>
  )
}

export default RecruitmentWelfare
