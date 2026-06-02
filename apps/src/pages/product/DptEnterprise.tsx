import ProductLayout from './ProductLayout'

import productBg1Img from '../../assets/images/product_bg1_img.png'
import icoGood from '../../assets/images/ico-good.png'
import productCon1_1 from '../../assets/images/product_con1_1.jpg'
import productCon1_2 from '../../assets/images/product_con1_2.jpg'
import productCon1_3 from '../../assets/images/product_con1_3.jpg'
import productCon1_4 from '../../assets/images/product_con1_4.jpg'
import productCon1_5 from '../../assets/images/product_con1_5.jpg'
import productCon2 from '../../assets/images/product_con2.jpg'
import productBg2Logo from '../../assets/images/product_bg2_logo.png'
import productCon3_1 from '../../assets/images/product_con3_1.jpg'
import productCon3_2 from '../../assets/images/product_con3_2.jpg'
import productCon3_3 from '../../assets/images/product_con3_3.jpg'
import productCon3_4 from '../../assets/images/product_con3_4.jpg'
import productCon3_5 from '../../assets/images/product_con3_5.jpg'
import productCon3Plus from '../../assets/images/product_con3_plus.jpg'
import productCon4_1 from '../../assets/images/product_con4_1.jpg'
import productCon4_2 from '../../assets/images/product_con4_2.jpg'
import productCon4_3 from '../../assets/images/product_con4_3.jpg'
import productCon4_4 from '../../assets/images/product_con4_4.jpg'
import mainClImg1 from '../../assets/images/main_cl_img_1.png'
import mainClImg2 from '../../assets/images/main_cl_img_2.png'
import mainClImg3 from '../../assets/images/main_cl_img_3.png'
import mainClImg4 from '../../assets/images/main_cl_img_4.png'
import mainClImg5 from '../../assets/images/main_cl_img_5.png'
import productBg3Img from '../../assets/images/product_bg3_img.png'

function ProductEnterprise() {
  return (
    <ProductLayout>
      {/* 컨텐츠 */}
      <div className="contetns prd one">

          {/* 타이틀 영역 */}
          <div className="responsive title_area">
            <h2 data-aos="fade-left">DPT-Enterprise</h2>
            <p data-aos="fade-up" data-aos-delay="200">
              대규모 첨단 기업 및 국가중요시설 반·출입 정보보안 시스템,<span className="br"></span>
              저장매체 정보보안의 처음과 끝을 책임지는 DPT 엔터프라이즈(Enterprise)
            </p>
          </div>


          {/* 제품 소개 섹션1 */}
          <div className="section1">
            <div className="responsive">
              <div className="wrap">
                <div className="img" data-aos="fade-right">
                  <img src={productBg1Img} alt="" />
                </div>
                <div className="txt">
                  <div className="t-logo" data-aos="fade-left">
                    <span className="white">
                      Data Protection Technology,
                      <div className="t-ico"><img src={icoGood} alt="" /></div>
                    </span><br />
                    <span className="green">DPT Enterprise</span>
                  </div>
                  <p data-aos="fade-up">
                    DPT 엔터프라이즈는 첨단기술사업장, 공공기관, 국가시설 등의<br />
                    내부로 반입되는 노트북이나 저장매체로 인한 정보유출을 방지<br />
                    하기 위한 시스템입니다. 사업장 내부로 반입 전 노트북 파일을<br />
                    스캔하여 반출 시 비교분석 후 원복 또는 삭제하는 방식입니다.<br />
                    또한, 반입 시 Windows 최신 업데이트 체크. 바이러스와 악성코드<br />
                    검사로 사내 유입을 사전 차단할 수 있습니다.<br /><br />
                    <span className="txt-pc">
                      DPT 엔터프라이즈는 키오스크 뿐만 아니라 확장형 시스템을<br />
                      추가할 수 있어 대규모 사업장에서 정보유출 방지를 위한 핵심<br />
                      역할을 수행할 수 있습니다.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* txt-mobile */}
          <div className="responsive section_con txt-mobile">
            <p data-aos="fade-up">
              DPT 엔터프라이즈는 키오스크 뿐만 아니라 확장형 시스템을<br />
              추가할 수 있어 대규모 사업장에서 정보유출 방지를 위한 핵심<br />
              역할을 수행할 수 있습니다.
            </p>
          </div>

          {/* 핵심기술 */}
          <div className="responsive section_con">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">DPT-Enterprise 핵심기술</div>
            </h3>
            <p>
              DPT(Data Protection Technology)는 저장매체를 통한 기밀자료 유출방지 솔루션으로 사업장 내의 중요한 자료를 해당 노트북,
              저장매체로 반출을 시도하는 경우 이를 차단 및 관리하는 솔루션입니다. 방문자의 노트북 반입 시 파일메타정보를 스캔하고 반출 시
              비교 분석해 변화된 파일을 복원 또는 완전삭제합니다. 또한 무선통신(무선랜,블루투스) 및 USB 매체차단 기능, 특허받은 파일스캔
              방식과 에이전트 방식의 융합기술로 국내 노트북 정보보안 솔루션 시장을 선도하고 있습니다.
            </p>
            <div className="img">
              <ul>
                <li data-aos="fade-up"><img src={productCon1_1} alt="" /></li>
                <li data-aos="fade-up" data-aos-delay="100"><img src={productCon1_2} alt="" /></li>
                <li data-aos="fade-up" data-aos-delay="200"><img src={productCon1_3} alt="" /></li>
                <li data-aos="fade-up" data-aos-delay="300"><img src={productCon1_4} alt="" /></li>
                <li data-aos="fade-up" data-aos-delay="400"><img src={productCon1_5} alt="" /></li>
              </ul>
            </div>
            <ul className="info">
              <li>반입 후 생성, 수정, 삭제된 파일 검색 후 전송, 복원, 삭제 등 옵션 선택 가능</li>
              <li>변화된 파일 이력관리, 각종 통계 분석 및 리포트 관리자 페이지</li>
              <li>무선통신(무선랜,블루투스) USB, 웹캠, 노트북 매체차단 및 부분 활성화 옵션 선택 가능</li>
              <li>매체제어를 위한 에이전트 방식과 변화된 파일 검출을 위한 스캔 방식의 융합</li>
              <li>Windows XP~11(64bit) 지원</li>
              <li>Windows 운영체제 충돌 방지 (블루스크린 방지)</li>
              <li>Windows 최신 업데이트 체크, 보안 업데이트 체크</li>
              <li>바이러스 유입 차단을 위한 엔진 업데이트, 바이러스 검사 수행</li>
              <li>FAT32, NTFS, exFAT 파일 시스템 검색 및 비교 지원</li>
            </ul>
          </div>

          {/* 도입의 필요성 */}
          <div className="responsive section_con">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">DPT-Enterprise 도입의 필요성</div>
            </h3>
            <p>
              DPT 엔터프라이즈는 첨단기술사업장, 공공기관, 국가시설 등의 내부로 반입되는 노트북이나 저장매체로 인한 정보 유출을 방지하기 위한
              시스템입니다. 기존의 방식은 노트북 보안스티커 부착으로 매체 통제를 하고, X-RAY 검색대로 반출 시 보안 검색을 하는 방식입니다.
              하지만 저장매체의 파일 유출을 방지하기엔 역부족입니다. 반입 시 스캔 된 파일정보 대비 변화된 모든 데이터를 완벽하게 추적할 수 있습니다.
              이를 반입 시점으로 원복 또는 복원 불가능 하도록 완전삭제 할 수도 있고, 고객사 서버에 변화된 파일 데이터를 전송하여 사후 추적하여
              보안사고와 대비를 할 수 있습니다. 첨단기술의 유출을 방지하고자 하는 대규모 사업장이라면 DPT-Enterprise가 해답이 될 것입니다.
            </p>
            <ul className="info">
              <li>사업장을 출입하는 관계사 인력의 핵심정보 유출에 대한 원천적인 대비책 필요</li>
              <li>방문자 노트북으로 인한 바이러스 및 악성코드 유입을 방지할 수 있는 대비책 필요</li>
              <li>반입 · 반출 노트북과 저장매체의 효율적인 관리 및 통제 솔루션 필요</li>
              <li>방문자 노트북 테더링, USB 저장매체, 블루투스 차단 기능 필요</li>
              <li>빠른 속도의 검색/비교 분석, 실시간 모니터링으로 보안 GATE 업무의 효율성 필요</li>
              <li>삭제된 자료 복구 및 정상 파일, 삭제된 파일 영구삭제 기능 필요</li>
            </ul>
          </div>

          {/* 특장점 */}
          <div className="responsive section_con bg">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">DPT-Enterprise 특장점</div>
            </h3>
            <p>
              핵심 기술인 DPT는 2009년 부터 지속적으로 대기업 및 해외현지법인, 공공기관, 국가중요시설 등에 설치 운영되고 있습니다.
              반입시 방문자의 바이러스 및 악성코드 유입을 줄이고 완벽한 매체차단으로 반입 노트북을 통제할 수 있으며 반출 시에는 변화된
              파일만 선택적으로 영구삭제하여 운영의 효율성을 극대화할 수 있습니다. 특히 DPT-Enterprise는 대규모 사업장에 맞춰진 키오스크와
              확장형 시스템을 추가할 수 있고 기존 방문자 시스템과 연동하여 고객사 편의와 방문객의 효율성을 높일 수 있습니다.
            </p>
            <div className="bg_img" data-aos="fade-left">
              <img src={productCon2} alt="" />
            </div>
            <ul className="info">
              <li>기존 방문자 시스템과 연동이 가능하여 관리 일원화로 보안업무의 효율성 극대화</li>
              <li>출장자 노트북 보안 관리(내부 인원 출장 시), 출장자 노트북 시점 복원 및 관리</li>
              <li>노트북 하드디스크 영구삭제</li>
              <li>원거리 전국 본사와 지사 게이트일 경우, 통합 운영 관리 가능</li>
              <li>반입 전 노트북의 Windows 최신상태 검사(보안 업데이트)</li>
              <li>반입 전 노트북의 바이러스 백신 설치 유무 확인 및 검사</li>
              <li>반입 전 USB 저장장치, CD-ROM 바이러스 검사</li>
              <li>반입 후 노트북 매체 차단(유·무선네트워크, 블루투스, USB 등) 또는 선택적 활성화</li>
              <li>반출 시 사업장내에서 신규/추가/변경된 파일 삭제 및 이력관리(개인, 업체별)</li>
              <li>방문자 노트북, USB 저장장치, CD-ROM 반·출입 이력 관리</li>
            </ul>
          </div>

          {/* 기대효과 */}
          <div className="responsive section_con">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">DPT-Enterprise 기대효과</div>
            </h3>
          </div>

          {/* 기대효과 배경 섹션 */}
          <div className="section2">
            <div className="responsive">
              <div className="txt">
                <div data-aos="fade-left">
                  <img src={productBg2Logo} alt="" />
                </div>
                <p data-aos="fade-up">
                  대규모 사업장 방문객 및 노트북, 저장매체 반입·반출 관리 솔루션<br />
                  주요기능 : 노트북 반입·반출관리, USB저장장치 CD-ROM <br />
                  바이러스 검사기능, 기존 방문자 시스템 연동, 노트북 디스트 영구삭제<br />
                  내부 인원 출장 시 노트북 보안, 노트북 시점 복원 및 관리
                </p>
              </div>
            </div>
          </div>

          {/* 기대효과 상세 */}
          <div className="responsive section_con sm">
            <p>
              도입 이후 보안의 중요성에 비해 관리의 어려움과 추가 관리 인원 부담, 관계사의 불편함이 가중되는 어려움은 없으셨나요?
              DPT 엔터프라이즈는 강력한 보안기능뿐만 아니라 간단한 교육만으로 방문 노트북과 저장매체를 통제관리 할 수 있습니다.
              대규모 출입 지역 또는 원거리 본사와 지사에 설치하여 통합 관리가 가능하며, 방문객 뿐만 아닌 사내 직원의 출자용 공용 노트북
              보안과 관리까지 가능합니다.
            </p>
            <div className="img2">
              <ul>
                <li data-aos="fade-up">
                  <div><img src={productCon3_1} alt="" /></div>
                  <p>핵심정보 유출대비</p>
                </li>
                <li data-aos="fade-up" data-aos-delay="100">
                  <img src={productCon3Plus} alt="" />
                </li>
                <li data-aos="fade-up" data-aos-delay="150">
                  <div><img src={productCon3_2} alt="" /></div>
                  <p>바이러스 사전 차단</p>
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <img src={productCon3Plus} alt="" />
                </li>
                <li data-aos="fade-up" data-aos-delay="250">
                  <div><img src={productCon3_3} alt="" /></div>
                  <p>노트북 통제관리</p>
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <img src={productCon3Plus} alt="" />
                </li>
                <li data-aos="fade-up" data-aos-delay="350">
                  <div><img src={productCon3_4} alt="" /></div>
                  <p>노트북 매체제어</p>
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <img src={productCon3Plus} alt="" />
                </li>
                <li data-aos="fade-up" data-aos-delay="450">
                  <div><img src={productCon3_5} alt="" /></div>
                  <p>방문자 관리<br />(사내 출장자 관리)</p>
                </li>
              </ul>
            </div>
          </div>

          {/* 주요화면 및 규격 */}
          <div className="responsive section_con">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">DPT-Enterprise 주요화면 및 규격</div>
            </h3>
            <p>
              DPT 엔터프라이즈는 간결한 인터페이스와 보안 기능으로 보안담당자의 개입 없이 사용자가 스스로 반입과 반출을 진행하고
              관리자는 별도의 웹매니저로 현황 리포트, 정책 관리, 반·출입 통제, 매체제어, 보안 이슈 관리 등을 할 수 있습니다.
            </p>
            <div className="img3">
              <ul>
                <li>
                  <div><img src={productCon4_1} alt="" /></div>
                  <p>키오스크 반·출입 안내/보안동의서 작성</p>
                </li>
                <li>
                  <div><img src={productCon4_2} alt="" /></div>
                  <p>보안솔루션 실행</p>
                </li>
                <li>
                  <div><img src={productCon4_3} alt="" /></div>
                  <p>Windows 업데이트/바이러스 백신 체크</p>
                </li>
                <li>
                  <div><img src={productCon4_4} alt="" /></div>
                  <p>반입 노트북 파일 스캔</p>
                </li>
              </ul>
            </div>
            <table className="pyo">
              <tbody>
                <tr>
                  <th>구분</th>
                  <th>상세내역</th>
                </tr>
                <tr>
                  <td>DPT Client</td>
                  <td>
                    반·출입 되는 저장매체(노트북, PC, USB)에 대한 검색/비교 소프트웨어<br />
                    <span className="blue">모든 변화된 파일 검출 / Hidden 파티션 검출 또는 사용금지 기능</span><br />
                    DPT Client : Windows XP ~ 11 (스캐닝방식+Agent방식)<br />
                    <span className="blue">파일 스캐닝 + 매체차단 Agent 프로그램의 융합 방식</span><br />
                    <span className="blue">(유무선네트워크 , 블루투스, 웹캠, USB, CD-ROM 등 매체 차단 또는 선택적 사용)</span>
                  </td>
                </tr>
                <tr>
                  <td>DPT 관리<br />Appliance</td>
                  <td>
                    반·출입 관리, 통계, 리포팅 수행 및 Gate별 Appliance 통합 관리 (웹매니저)<br />
                    <span className="blue">내방객 노트북 반입/반출 관리, 조회 및 통계 분석, 변화된 파일 내역 관리</span><br />
                    매체 차단 개인/Gate/전체 정책 관리<br />
                    <span className="blue">파일 ID 분석, 키워드 기반 파일 검색(DB)</span><br />
                    하드웨어 사양 : Gate Appliance 데이터량에 따른 별도 제안
                  </td>
                </tr>
                <tr>
                  <td>DPT Gate<br />Appliance</td>
                  <td>
                    <span className="blue">출입Gate에 설치되는 일체형 Kiosk 타입으로 반·출입 절차 수행</span><br />
                    검색대 및 전자서명 모듈 포함한 일체형 Kiosk 타입<br />
                    Kiosk : 670 x 1770 x 500 (mm)<br />
                    하드웨어 사양(Kiosk) 별도 제안
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="notice">※ Kiosk와 사양은 납품사의 사정에 따라 협의 없이 변경 될 수 있습니다.</p>
          </div>

          {/* 주요 고객사 */}
          <div className="responsive section_con">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">주요 고객사</div>
            </h3>
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

          {/* 제품문의 */}
          <div className="responsive section_con">
            <h3>
              <span data-aos="fade-right" />
              <div data-aos="fade-up" data-aos-delay="200">제품문의</div>
            </h3>
          </div>

          {/* 제품문의 배경 섹션 */}
          <div className="section3">
            <div className="responsive">
              <div className="img" data-aos="fade-right">
                <img src={productBg3Img} alt="" />
              </div>
            </div>
          </div>

          {/* 연락처 */}
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

export default ProductEnterprise
