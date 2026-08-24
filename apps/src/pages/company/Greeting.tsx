import CompanyLayout from './CompanyLayout'
import companyBg1Img from '../../assets/images/company_bg1_img.png'
import mainMapTitleImg from '../../assets/images/main_map_title@2x.png'

function CompanyGreeting() {
  return (
    <CompanyLayout>
      <div className="contetns company1">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">CEO 인사말</h2>
          <p data-aos="fade-up" data-aos-delay="200">첨단 기업 및 국가중요시설 반·출입 정보보안 시스템,<span className="br"></span>저장매체 정보보안의 '처음과 끝을 책임지는' 기업, 데이타프로텍</p>
        </div>
        
        {/* <div className="section1">
          <div className="responsive">
            <div className="wrap">
              <div className="img" data-aos="fade-left">
                <img src={companyBg1Img} alt="" />
              </div>
            </div>
          </div>
        </div> */}

        <div className="section_map company">
            <div className='inner'>
                <div className='tit'>
                    <img src={mainMapTitleImg} alt="" />
                </div>
                <div className='bg'></div>
            </div>
        </div>


        <div className="responsive section_con">
          <p data-aos="fade-up">
            인터넷과 정보통신 기술의 발전과 함께 디지털미디어의 발달로 개인정보뿐만
            아니라 기업의 거의 모든 가치들이 디지털화가 이뤄지고 있습니다.<br /><br />
            
            이는 쉽게 저장과 보관 이동이 가능한 형태인 만큼 가치를 지키기 위한 보안의 중요성이
            더욱 커지고 있습니다. 특히 보안사고의 특징은 빈도수가 크지 않더라도 한번
            발생하면 기업의 과거와 현재, 미래가치까지 훼손하여 막대한 손실을 끼치는
            경우가 대부분입니다. 이는 2005년 이후 최근까지 연간 기준으로 사상 최대의
            적발 건수를 기록하고 있는 통계에서도 근거를 찾을 수 있습니다.
          </p><br />
          <p data-aos="fade-up" data-aos-delay="100">
            기업의 가치를 지킬 수 있는 최고의 환경은 빠르게 변화하는 보안 환경의
            요구에 보다 먼저 고민하고 해결을 제안할 수 있는 기술력이라고 생각합니다.
            또한 고객의 보안의식이 함께 한다면 예방과 관리, 사후처리까지를 통합 관리
            할 수 있는 보안의 결정체가 될 수 있습니다.
          </p><br />
          <p data-aos="fade-up" data-aos-delay="150">
            데이타프로텍은 오직 저장매체 반·출입 시스템의 한 길만을 달려왔습니다.
            이는 보안의 처음과 끝을 책임지는 막중한 책임과 소명이 없다면 불가능합니다.
            먼저 고민하고, 끝까지 책임을 지겠다는 신념으로 최선을 다하고 있습니다.
          </p><br />
          <p data-aos="fade-up" data-aos-delay="200">
            설립 이후 최근까지 국내외 기업의 첨단기업가치를 지키는 반·출입 정보보안
            파트너로서의 역할을 충실히 수행하고 있다고 자부하고 있습니다.
          </p><br />
          <p data-aos="fade-up" data-aos-delay="250">
            첨단 보안의 다양한 요구와 한발 앞선 대처로 기업의 소중한 가치를 지키는
            정보보안 선두 기업으로 거듭날 수 있도록 오늘도 노력하겠습니다.<br /><br />
            감사합니다.
          </p><br /><br />
          <p data-aos="fade-up" data-aos-delay="300">
            <span className="name">(주)데이타프로텍 대표이사 <strong>정해선</strong></span>
          </p>
        </div>

      </div>
    </CompanyLayout>
  )
}

export default CompanyGreeting
