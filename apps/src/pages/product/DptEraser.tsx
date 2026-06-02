import ProductLayout from './ProductLayout'
import product3Bg1Img from '../../assets/images/product3_bg1_img.png'
import product3Bg1Logo2 from '../../assets/images/product3_bg1_logo2.png'
import product3Bg1Logo3 from '../../assets/images/product3_bg1_logo3.jpg'
import product3Con1_1 from '../../assets/images/product3_con1_1.jpg'
import product3Con1_2 from '../../assets/images/product3_con1_2.jpg'
import product3Con1_3 from '../../assets/images/product3_con1_3.jpg'
import product3Con1_4 from '../../assets/images/product3_con1_4.jpg'
import product3Con1_5 from '../../assets/images/product3_con1_5.jpg'
import product3Con2 from '../../assets/images/product3_con2.jpg'
import product3Bg2Logo from '../../assets/images/product3_bg2_logo.png'
import product3Con3_1 from '../../assets/images/product3_con3_1.jpg'
import product3Con3Plus from '../../assets/images/product3_con3_plus.jpg'
import product3Con3_2 from '../../assets/images/product3_con3_2.jpg'
import product3Con3_3 from '../../assets/images/product3_con3_3.jpg'
import product3Con3_4 from '../../assets/images/product3_con3_4.jpg'
import product3Con4_1 from '../../assets/images/product3_con4_1.jpg'
import product3Con4_2 from '../../assets/images/product3_con4_2.jpg'
import product3Con4_3 from '../../assets/images/product3_con4_3.jpg'
import product3Con4_4 from '../../assets/images/product3_con4_4.jpg'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'
import product3Bg3Img from '../../assets/images/product3_bg3_img.png'

function ProductEraser() {
  return (
    <ProductLayout>
      <div className="contetns prd three">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">DIGITAL ERASER</h2>
          <p data-aos="fade-up" data-aos-delay="200">네트워크 연동, USB 부팅, 디바이스 삭제 방식을 한 번에,<span className="br"></span>국가정보원 보안적합성 검증필 영구삭제 솔루션 디지털 이레이저</p>
        </div>

        <div className="section1">
          <div className="responsive">
            <div className="wrap">
              <div className="img" data-aos="fade-right">
                <img src={product3Bg1Img} alt="" />
              </div>
              <div className="txt">
                <div className="t-logo" data-aos="fade-left">
                  <span className="white">All-in-one Data Erasing,</span><br /><span className="green">Digital Eraser</span>
                </div>
                <p data-aos="fade-up">
                  디지털이레이저는 국가정보원 보안적합성<span className="br"></span>
                  검증필(NSPL-2010-018)을 인증 받은 데이터<span className="br"></span>
                  영구삭제 솔루션 입니다. 하나의 어플라이언스로<span className="br"></span>
                  네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제<span className="br"></span>
                  방식 등의 세 가지 방식을 통합지원 및 관리 가능하여<span className="br"></span>
                  경쟁력과 업무 효율성을 갖춘 솔루션으로 영구삭제의<span className="br"></span>
                  새로운 기준을 제시하는 올인원 어플라이언스입니다.
                </p>
                <div className="txt-pc" data-aos="fade-up">
                  <a href="https://www.nis.go.kr:4016/AF/1_7_2_2/view.do?seq=1768&currentPage=1&selectProduct=0&searchKeyword=%EB%94%94%EC%A7%80%ED%84%B8" target="_blank" rel="noreferrer noopener">
                    <img src={product3Bg1Logo2} className="margin" alt="" />
                  </a>
                </div>
              </div>
              <div className="s_logo txt-pc" data-aos="fade-up">
                <img src={product3Bg1Logo3} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DIGITAL ERASER 특장점</div></h3>
          <p>
            디지털이레이저는 국가정보원 보안적합성 검증필(NSPL-2010-018)을 인증 받은 데이터 영구삭제 솔루션 으로 하나의
            어플라이언스로 네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지 방식을 통합지원 및 관리 가능하여 경쟁력과
            업무 효율성을 갖춘 올인원 어플라이언스입니다. 특히, 검증받은 완전삭제 핵심 기능의 보안성과 운영의 편리성을 동시에 갖춰
            삭제방식에 따른 추가 장비와 소프트웨어를 따로 구입해야 하는 부담을 줄일 수 있습니다.
          </p>
          <div className="img">
            <ul>
              <li data-aos="fade-up"><img src={product3Con1_1} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={product3Con1_2} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={product3Con1_3} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="300"><img src={product3Con1_4} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="400"><img src={product3Con1_5} alt="" /></li>
            </ul>
          </div>
          <ul className="info">
            <li>국가정보원 보안적합성 검증필(NSPL-2010-018)</li>
            <li>0으로 삭제 (1Pass), 국정원 권고방식 (3Pass), US DoD 권고방식 (7Pass)의 완전삭제 알고리즘</li>
            <li>히든영역 (HPA, DCO) 검출 및 삭제</li>
            <li>단기 노트북 반·출입관리 솔루션 DPT 연계</li>
            <li>장·단기 출입자의 노트북 보안의 중점관리 가능</li>
            <li>노트북 반입시 PC 방역 자동 처리</li>
            <li>운영 체제 구분 없이 데이터 완전삭제 가능</li>
            <li>다수의 Disk 및 저장매체 멀티 삭제 가능</li>
            <li>개별 DISK, USB 메모리 등  다양한 매체 지원</li>
            <li>OS Boot Manager 관계 없이 One-Click 실행</li>
            <li>하나의 어플라이언스로 네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 지원</li>
            <li>네트워크 삭제 시 Windows OS 부팅 상태에서 프로그램 다운로드 방식으로 원클릭 삭제 가능</li>
            <li>관리자, 사용자 모든 삭제 내역을 통합 관리</li>
          </ul>
        </div>

        <div className="responsive section_con bg">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DIGITAL ERASER 도입의 필요성</div></h3>
          <p>
            데이타프로텍 디지털이레이저는 노트북 초기화로 보안 사고를 방지하거나 하드디스크 파쇄를 통한 물리 보안기기 등을 운영하거나
            도입을 검토하는 사업장에서 필요한 시스템입니다. 디지털 이레이저만의 가장 큰 특징은 노트북 반·출입 솔루션 DPT와 연동이 가능해
            사업장 반입부터 단기와 장기를 구분하여 선택적으로 초기화를 진행할 수 있어 보안사고를 방지할 수 있을 뿐 아니라 불필요한 초기화를
            선택할 수 있어 방문 기업의 업무 효율성과 인력 운영의 효율성을 재고할 수 있습니다. 삭제방식의 보안인증 신뢰성은 국가정보원 보안
            적합성 검증필 제품으로 다양한 하드웨어 지원 및 작업결과 리포트가 가능하며 복구 자체가 불가능한 완전삭제 알고리즘을 사용하여
            현재. 국내 첨단 반도체 기업에서 그 활용도를 입증 받고 있습니다.
          </p>
          <ul className="info">
            <li>중기, 장기 노트북을 사용하는 외부 인력 노트북의 초기화가 필요</li>
            <li>사업장을 출입하는 관계사 인력의 핵심정보 유출에 대한 원천 대비책이 필요</li>
            <li>사내의 중요 기밀자료 유출 대비책 필요</li>
            <li>신규, 조직 이동 등의 사내 재산 노트북의 대량 초기화 필요</li>
          </ul>
          <div className="bg_img" data-aos="fade-left">
            <img src={product3Con2} alt="" />
          </div>
        </div>

        <div className="responsive">
          <table className="pyo3">
            <tbody>
              <tr>
                <th>구분</th>
                <th>디지털이레이저</th>
                <th>A사 삭제솔루션</th>
                <th>B사 삭제기기</th>
                <th>C사 삭제기기</th>
              </tr>
              <tr>
                <td>노트북(PC) HDD 분리</td>
                <td>필요없음</td>
                <td>필요없음</td>
                <td>필수</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>노트북(PC) BIOS 설정변경</td>
                <td>필요없음</td>
                <td>필수</td>
                <td>필수</td>
                <td>필수</td>
              </tr>
              <tr>
                <td>HDD(저장매체) 멀티삭제</td>
                <td>가능</td>
                <td>가능</td>
                <td>불가</td>
                <td>불가</td>
              </tr>
              <tr>
                <td>HDD(저장매체) 재활용</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
                <td>가능</td>
              </tr>
              <tr>
                <td>사용자 인터페이스 디자인</td>
                <td>매우높음</td>
                <td>보통</td>
                <td>낮음</td>
                <td>보통</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DIGITAL ERASER 기대효과</div></h3>
        </div>
        <div className="section2">
          <div className="responsive">
            <div className="txt">
              <div data-aos="fade-left"><img src={product3Bg2Logo} alt="" /></div>
              <p data-aos="fade-up">
                디지털이레이저는 국가정보원 보안적합성 검증필(NSPL-2010-018)을<span className="br"></span>
                인증 받은 데이터 영구삭제 솔루션 입니다. 하나의 어플라이언스로<span className="br"></span>
                네트워크 연동 삭제, USB 부팅 삭제, 디바이스 삭제 방식 등의 세 가지<span className="br"></span>
                방식을 통합지원 및 관리 가능하여 경쟁력과 업무 효율성을 갖춘 솔루션으로<span className="br"></span>
                영구삭제의 새로운 기준을 제시하는 올인원 어플라이언스입니다.
              </p>
            </div>
          </div>
        </div>

        <div className="responsive section_con sm">
          <p>
            도입 이후 보안의 중요성에 비해 관리의 어려움과 추가 관리 인원 부담, 관계사의 불편함이 가중되는 어려움은 없으셨나요?
            디지털이레이저는 기존의 완전삭제 솔루션과 달리 하나의 어플라이언스로 다양한 삭제 기능을 지원합니다. 반·출입 솔루션
            DPT와 연동한다면, 사업장 전체의 반입출 인원 및 저장매체 보안을 통합관리할 수 있고 다수의 노트북을 정기적으로 완전
            삭제해야 하는 업무의 효율성을 높일 수 있습니다.
          </p>
          <div className="img2 sm">
            <ul>
              <li data-aos="fade-up">
                <div><img src={product3Con3_1} alt="" /></div>
                <p>탈부착 과정 없는 효율</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={product3Con3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="150">
                <div><img src={product3Con3_2} alt="" /></div>
                <p>다수 노트북 멀티 삭제</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={product3Con3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="250">
                <div><img src={product3Con3_3} alt="" /></div>
                <p>복구 불가능 완전삭제</p>
              </li>
              <li data-aos="fade-up" data-aos-delay="300"><img src={product3Con3Plus} alt="" /></li>
              <li data-aos="fade-up" data-aos-delay="350">
                <div><img src={product3Con3_4} alt="" /></div>
                <p>반·출입 연동 통합관리</p>
              </li>
            </ul>
          </div>
          <ul className="sm_list">
            <li>별도의 탈 부착 과정 없는 효율적 운영</li>
            <li>다수의 노트북을 동시에 완전삭제 멀티 기능</li>
            <li>쉬운 인터페이스로 전문 관리요원 필요 없음</li>
            <li>반출 시 복구 불가능한 상태로 완전 삭제</li>
          </ul>
          <ul className="sm_list margin">
            <li>운영체제(OS) 구분 없이 원클릭 완전 삭제</li>
            <li>(DPT연동 시) Windows 업데이트/바이러스 체크로 유입 차단</li>
            <li>(DPT연동 시) 노트북 반·출입의 모든 변화된 데이터 관리</li>
            <li>(DPT연동 시) 허가된 데이터 별도 반출 이력 관리</li>
          </ul>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">DIGITAL ERASER 주요화면 및 규격</div></h3>
          <p>
            디지털이레이저는 다수의 디스크를 동시에 완전삭제가 가능하며 진행상황을 쉽게 확인할 수 있는 인터페이스 구성으로 작업 효율과
            관리의 편리함을 동시에 추가된 어플라이언스입니다.
          </p>
          <div className="img3">
            <ul>
              <li>
                <div><img src={product3Con4_1} alt="" /></div>
                <p>메인</p>
              </li>
              <li>
                <div><img src={product3Con4_2} alt="" /></div>
                <p>사용자 신청번호 입력</p>
              </li>
              <li>
                <div><img src={product3Con4_3} alt="" /></div>
                <p>디지털 이레이저 진행</p>
              </li>
              <li>
                <div><img src={product3Con4_4} alt="" /></div>
                <p>디스크 정보 새로읽기</p>
              </li>
            </ul>
          </div>
          <table className="pyo4">
            <tbody>
              <tr>
                <th>하드웨어 Spec.</th>
                <th>지원장치</th>
              </tr>
              <tr>
                <td>CPU: intel i5 2.8GHz/8M</td>
                <td>3.5" SAS/SATA HDD</td>
              </tr>
              <tr>
                <td>RAM : DDR4 4G PC4-19200</td>
                <td>2.5" SAS/SATA HDD</td>
              </tr>
              <tr>
                <td>
                  HDD : M.2 Nvme 120G<span className="br"></span>
                  HBA : Adaptec 12G SAS Controller
                </td>
                <td>
                  M.2 Nvme SSD / M.2 SATA SSD support<span className="br"></span>
                  (2242,2260, 2280 Guide include )
                </td>
              </tr>
              <tr>
                <td>3.5" HotSwap SAS/SATA 4BAY</td>
                <td>USB-C 1port, USB 3.1 1port, USB 3.0 4Port, USB 2.0 4port</td>
              </tr>
              <tr>
                <td>
                  2.5" HotSwap SAS/SATA 4BAY<span className="br"></span>
                  All in One Media BAY
                </td>
                <td>
                  MS/MSPRO/MSDUO, SD/MMC/RS-MMC, CFI/CFII,<span className="br"></span>
                  T-Flash, MicroSD, XD type Flash Memory<span className="br"></span>
                  support (about 117 type memory)
                </td>
              </tr>
            </tbody>
          </table>
          <p className="notice">※ 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">주요 고객사</div></h3>
          <div className="img4">
            <ul>
              <li data-aos="fade-up"><img src={mainClImg1} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="100"><img src={mainClImg2} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="150"><img src={mainClImg3} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="200"><img src={mainClImg4} alt="고객사" /></li>
              <li data-aos="fade-up" data-aos-delay="250"><img src={mainClImg5} alt="고객사" /></li>
            </ul>
          </div>
        </div>

        <div className="responsive section_con">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">제품문의</div></h3>
        </div>
        <div className="section3">
          <div className="responsive">
            <div className="img" data-aos="fade-right">
              <img src={product3Bg3Img} alt="" />
            </div>
          </div>
        </div>
        <div className="responsive section_con cs">
          <div className="cs_txt">
            <div className="line">
              <p className="green">솔루션 AS 및 기술문의</p>
              <p>
                <strong>T.</strong> 070-7542-7788<br />
                <strong>E.</strong> support@dataprotec.co.kr
              </p>
            </div>
            <div className="line none">
              <p className="blue">보안솔루션 도입문의</p>
              <p>
                <strong>T.</strong> 031-701-0712<br />
                <strong>E.</strong> sales@dataprotec.co.kr
              </p>
            </div>
          </div>
        </div>

      </div>
    </ProductLayout>
  )
}

export default ProductEraser
