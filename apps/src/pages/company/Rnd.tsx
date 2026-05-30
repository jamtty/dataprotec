import CompanyLayout from './CompanyLayout'
import company3Con1_3 from '../../assets/images/company3_con1_3.png'
import company3Con1_1a from '../../assets/images/company3_con1_1_a.png'
import company3Con1_1b from '../../assets/images/company3_con1_1_b.png'
import company3Con1_1c from '../../assets/images/company3_con1_1_c.png'
import company3Con1_1d from '../../assets/images/company3_con1_1_d.png'
import company3Con1_1 from '../../assets/images/company3_con1_1.png'
import company3Con1_2a from '../../assets/images/company3_con1_2_a.png'
import company3Con1_2b from '../../assets/images/company3_con1_2_b.png'
import company3Con1_2c from '../../assets/images/company3_con1_2_c.png'
import company3Con1_2 from '../../assets/images/company3_con1_2.png'
import company3Con2 from '../../assets/images/company3_con2.jpg'
import company3Con3 from '../../assets/images/company3_con3.jpg'
import company3Con4_1 from '../../assets/images/company3_con4_1.jpg'
import company3Con4_2 from '../../assets/images/company3_con4_2.jpg'
import company3Con4_3 from '../../assets/images/company3_con4_3.jpg'
import company3Con4_4 from '../../assets/images/company3_con4_4.jpg'
import company3Con4_5 from '../../assets/images/company3_con4_5.jpg'
import company3Con4_6 from '../../assets/images/company3_con4_6.jpg'
import company3Con4_7 from '../../assets/images/company3_con4_7.jpg'
import company3Con4_8 from '../../assets/images/company3_con4_8.jpg'
import blankImg from '../../assets/images/blank.jpg'
import productCon5_1 from '../../assets/images/product_con5_1.jpg'
import productCon5_2 from '../../assets/images/product_con5_2.jpg'
import productCon5_3 from '../../assets/images/product_con5_3.jpg'
import productCon5_4 from '../../assets/images/product_con5_4.jpg'
import productCon5_5 from '../../assets/images/product_con5_5.jpg'
import productCon5_6 from '../../assets/images/product_con5_6.jpg'

function CompanyRnd() {
  return (
    <CompanyLayout>
      <div className="contetns company3">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">R&amp;D</h2>
          <p data-aos="fade-up" data-aos-delay="200">설립 이후 끊임없는 연구개발과 특허 원천기술로, 반·출입 정보보안 시장을 리드하고 있습니다.<span className="br"></span>먼저 고민하고 끝까지 책임지는 기술, 데이타프로텍</p>
        </div>

        <div className="section1">
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">사업영역</div></h3>
          <div className="w-wrap">
            <div className="img position">
              <div className="img_3" data-aos="fade-zoom-in" data-aos-offset="100" data-aos-delay="300"><img src={company3Con1_3} alt="" /></div>
              <div className="img_1" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-delay="600">
                <div className="s_wrap">
                  <div className="s_1" data-aos="fade-zoom-in" data-aos-delay="1100"><img src={company3Con1_1a} alt="" /></div>
                  <div className="s_2" data-aos="fade-zoom-in" data-aos-delay="1300"><img src={company3Con1_1b} alt="" /></div>
                  <div className="s_3" data-aos="fade-zoom-in" data-aos-delay="1500"><img src={company3Con1_1c} alt="" /></div>
                  <div className="s_4" data-aos="fade-zoom-in" data-aos-delay="1700"><img src={company3Con1_1d} alt="" /></div>
                  <img src={company3Con1_1} alt="" />
                </div>
              </div>
              <div className="img_2" data-aos="fade-zoom-in" data-aos-offset="200" data-aos-delay="900">
                <div className="s_wrap">
                  <div className="s_1" data-aos="fade-zoom-in" data-aos-delay="1900"><img src={company3Con1_2a} alt="" /></div>
                  <div className="s_2" data-aos="fade-zoom-in" data-aos-delay="2100"><img src={company3Con1_2b} alt="" /></div>
                  <div className="s_3" data-aos="fade-zoom-in" data-aos-delay="2300"><img src={company3Con1_2c} alt="" /></div>
                  <img src={company3Con1_2} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="txt_area">
            <h4>DATAPROTEC</h4>
            <p>먼저 고민하고, 끝까지 책임지는 기술</p>
          </div>
          <div className="img" data-aos="fade-zoom-in" data-aos-delay="200" data-aos-duration="500">
            <img src={company3Con2} alt="" />
          </div>
          <div className="txt_area">
            <p>데이타프로텍 보안 기술은,<span className="br"></span>고객사의 해외 법인 기술정보 유출 방지를 위해<span className="br"></span><strong>미국, 중국, 유럽</strong>에서 운영 중입니다.</p>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">조직도</div></h3>
          <div className="img">
            <img src={company3Con3} alt="" />
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">인증현황</div></h3>
          <div className="img">
            <ul>
              <li><img src={company3Con4_1} alt="" /></li>
              <li><img src={company3Con4_2} alt="" /></li>
              <li><img src={company3Con4_3} alt="" /></li>
            </ul>
            <ul>
              <li><img src={company3Con4_4} alt="" /></li>
              <li><img src={company3Con4_5} alt="" /></li>
              <li><img src={company3Con4_6} alt="" /></li>
            </ul>
            <ul>
              <li><img src={company3Con4_7} alt="" /></li>
              <li><img src={company3Con4_8} alt="" /></li>
              <li className="blank"><img src={blankImg} alt="" /></li>
            </ul>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">주요 고객사</div></h3>
          <div className="img4">
            <ul>
              <li data-aos="fade-up"><img src={productCon5_1} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={productCon5_2} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="150"><img src={productCon5_3} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={productCon5_4} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="250"><img src={productCon5_5} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="300"><img src={productCon5_6} alt="" /></li>
            </ul>
          </div>
        </div>

      </div>
    </CompanyLayout>
  )
}

export default CompanyRnd
