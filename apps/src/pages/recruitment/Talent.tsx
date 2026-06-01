import RecruitmentLayout from './RecruitmentLayout'
import recruitmentBg1Img from '../../assets/images/recruitment_bg1_img.png'

function RecruitmentTalent() {
  return (
    <RecruitmentLayout>
      <div className="contetns recruitment1">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">인재상</h2>
          <p data-aos="fade-up" data-aos-delay="200">특허 원천기술과 연구개발로,<span className="br"></span>반·출입 정보보안 시장을 리드하고 있습니다.<span className="br"></span>핵심가치와 비전을 함께 할 인재를 기다립니다.</p>
        </div>

        <div className="section1">
          <div className="responsive">
            <div className="bg"></div>
            <div className="wrap">
              <div className="img" data-aos="fade-left">
                <img src={recruitmentBg1Img} alt="인재상 이미지" />
              </div>
            </div>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">인재상</div></h3>
          <ul className="list">
            <li data-aos="fade-right">
              <h4>Communication</h4>
              <p>자신의 주장을 설득력 있게 표현 및 전달 가능하며, 네트워크를 통해 정보를 수집하고<span className="br"></span>변화 과정에서 조직의 내외부 사람들에게 가치를 부여하고 영향을 미치는 인재</p>
            </li>
            <li data-aos="fade-left">
              <h4>Learning</h4>
              <p>전략적인 부가가치 기술을 향상 시킬 수 있는 지속적인 교육훈련 및 개인 개발기회를<span className="br"></span>활용하여 타 구성원에게 긍정적인 영향력과 팀의 성장을 높이는 인재</p>
            </li>
            <li data-aos="fade-right">
              <h4>Time Management</h4>
              <p>조직의 성과를 최대화 할 수 있도록 시간 등 제한된 자원의 우선 순위를 매겨 변화에<span className="br"></span>따른 위험 요소를 사전에 조절하고 관리할 수 있는 인재</p>
            </li>
            <li data-aos="fade-left">
              <h4>Self Management</h4>
              <p>긍정적인 마인드로 자기 피드백 습관(Self-feedback habit)을 프로젝트 오류에서<span className="br"></span>배우고 끊임없이 개선하여 전문적 가치를 지속시키는 향상시키는 인재</p>
            </li>
            <li data-aos="fade-right">
              <h4>Creative Intuition &amp; Action</h4>
              <p>상황에 따른 아이디어를 융통성있게 제안하고, 해결 방안을 구성원들과 함께<span className="br"></span>고민하고 방향성을 리드하며, 뛰어난 실행능력으로 해결책을 마련하는 인재</p>
            </li>
          </ul>
        </div>

      </div>
    </RecruitmentLayout>
  )
}

export default RecruitmentTalent
