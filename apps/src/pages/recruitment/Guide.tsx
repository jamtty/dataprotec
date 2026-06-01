import RecruitmentLayout from './RecruitmentLayout'
import recruitmentBg1Img from '../../assets/images/recruitment_bg1_img.png'
import recruitment3Img from '../../assets/images/recruitment3_img.jpg'
import icoMailImg from '../../assets/images/ico_mail.jpg'

function RecruitmentGuide() {
  return (
    <RecruitmentLayout>
      <div className="contetns recruitment3">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">지원안내</h2>
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
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">지원분야</div></h3>

          <h4 className="margin">Software 엔지니어</h4>
          <p>
            새로운 패러다임을 창출할 역량있는 소프트웨어 개발자를 기다립니다.<span className="br"></span>
            열정적으로 문제에 접근하고 창의적으로 해결하는 소프트웨어 개발자로서 회사의 핵심가치와 비전을 나누고 싶습니다.
          </p>
          <ul className="info">
            <li>소프트웨어 엔지니어</li>
            <li>Delphi, C++ 개발언어 가능자</li>
            <li>웹 개발 / 데이타베이스(MS SQL Server, Mysql)</li>
          </ul>

          <h4 className="margin">마케팅 / 영업</h4>
          <p>
            고객가치를 실현하고 다양한 고객과의 관계 개선을 맡아 기업의 가치를 높일 수 있는 인재와 관련업체를 기다리고 있습니다.
          </p>
          <ul className="info">
            <li>IT솔루션 기획 및 마케팅 경험자</li>
            <li>IT솔루션 영업 가능자</li>
            <li>데이타프로텍 솔루션 영업을 희망하는 관련 기업</li>
          </ul>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">지원안내</div></h3>

          <h4 className="margin">데이타프로텍 채용과정</h4>
          <div className="img">
            <img src={recruitment3Img} alt="" />
          </div>

          <p>
            수시 / 공채 모두 온라인 지원을 통해 지원하실 수 있으며, 채용 사이트에 채용공고가 게재된 경우 채용사이트를 통해
            지원하실 수 있습니다. 우편 및 방문을 통한 접수는 받지 않으니 참고하여 주시기 바랍니다.<span className="br"></span>
            이력서에 기재된 학력 및 경력사항등이 허위로 판명될 경우 채용확정 결과와 관계없이 합격을 취소할 수 있습니다.<span className="br"></span><br />

            이력서를 작성하여 이메일로 보내주시면 수시 인재풀에 등록이 되며 검토 후 개별 연락을 드립니다.<span className="br"></span>
            기타 안내 및 문의는 전화로 받지 않으며 접수된 이력서는 온라인 지원을 위한 이외의 용도로 사용되지 않습니다.
          </p>

          <a href="mailto:recruit@dataprotec.co.kr" className="email"><img src={icoMailImg} alt="" /> recruit@dataprotec.co.kr</a>
        </div>

      </div>
    </RecruitmentLayout>
  )
}

export default RecruitmentGuide
